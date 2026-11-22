#!/usr/bin/env python3
"""Capture/compare public copy and SEO metadata for pages excluded from edits.

Capture before release, then compare the local build and the production release.
This ignores build asset hashes, styling, and animation wrappers, not page copy.
The output file should stay local; it is release evidence, not a site asset.
"""
import argparse
import concurrent.futures
import datetime
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import urllib.request

PATHS = ["/", "/services/web-development", "/projects", "/contact", "/about"]


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.skip = []
        self.text = []
        self.title = []
        self.in_title = False
        self.metadata = []
        self.canonicals = []
        self.jsonld = []
        self.current_jsonld = None

    def handle_starttag(self, tag, attrs):
        attr = dict(attrs)
        if tag == "title":
            self.in_title = True
        if tag == "meta":
            self.metadata.append(sorted(attrs))
        if tag == "link" and attr.get("rel") == "canonical":
            self.canonicals.append(attr.get("href"))
        if tag == "script" and attr.get("type") == "application/ld+json":
            self.current_jsonld = []
        if tag in ("script", "style", "svg", "noscript"):
            self.skip.append(tag)

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if tag == "script" and self.current_jsonld is not None:
            self.jsonld.append(json.loads("".join(self.current_jsonld)))
            self.current_jsonld = None
        if self.skip and self.skip[-1] == tag:
            self.skip.pop()

    def handle_data(self, data):
        if self.current_jsonld is not None:
            self.current_jsonld.append(data)
        if self.in_title:
            self.title.append(data)
        elif not self.skip:
            self.text.append(data)

    def result(self):
        return {
            "copy": " ".join(" ".join(self.text).split()),
            "title": "".join(self.title),
            "metadata": sorted(self.metadata),
            "canonicals": self.canonicals,
            "jsonld": self.jsonld,
        }


def read_page(base, path):
    request = urllib.request.Request(base.rstrip("/") + path, headers={"User-Agent": "BryanDevelops-release-verification"})
    with urllib.request.urlopen(request, timeout=30) as response:
        assert response.status == 200, (path, response.status)
        parser = Page()
        parser.feed(response.read().decode())
        return path, parser.result()


def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True).encode()).hexdigest()


def main():
    args = argparse.ArgumentParser(description=__doc__)
    args.add_argument("mode", choices=["capture", "compare"])
    args.add_argument("base")
    args.add_argument("baseline", type=Path)
    options = args.parse_args()
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
        pages = dict(pool.map(lambda path: read_page(options.base, path), PATHS))
    if options.mode == "capture":
        assert not options.baseline.exists(), "Do not overwrite pre-release evidence."
        options.baseline.parent.mkdir(parents=True, exist_ok=True)
        options.baseline.write_text(json.dumps({"source": options.base, "capturedAt": datetime.datetime.now(datetime.timezone.utc).isoformat(), "pages": pages}, indent=2) + "\n")
        print(f"Captured {len(pages)} protected pages before release.")
    else:
        expected = json.loads(options.baseline.read_text())["pages"]
        for path in PATHS:
            # JSON round-trip normalizes parser tuples before comparing.
            actual = json.loads(json.dumps(pages[path]))
            for key, value in expected[path].items():
                assert actual[key] == value, f"{path}: changed {key} (baseline {digest(value)}, actual {digest(actual[key])})"
            print(f"PASS {path}: unchanged copy, title, metadata, canonical policy and JSON-LD")


if __name__ == "__main__":
    main()
