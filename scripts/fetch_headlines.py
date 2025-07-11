#!/usr/bin/env python3
"""
Fetch latest Bologna tram headlines and open a draft PR with a markdown draft post.
"""
import os, datetime, feedparser, requests, json, subprocess, pathlib, html, textwrap

REPO = pathlib.Path(__file__).resolve().parents[1]
FEED_URL = "https://news.google.com/rss/search?q=tram+bologna+cantieri&hl=it&gl=IT&ceid=IT:it"
feed = feedparser.parse(FEED_URL)
if not feed.entries:
    print("No entries found")
    exit()

entry = feed.entries[0]
slug_date = datetime.date.today().isoformat()
slug_title = entry.title.lower().replace(" ", "-")[:50]
filename = REPO / f"content/news/{slug_date}-{slug_title}.md"
if filename.exists():
    print("Today's post already exists.")
    exit()

summary = html.unescape(entry.summary)
md = textwrap.dedent(f"""---
layout: ../../src/layouts/SatireLayout.astro
title: "{entry.title}"
pubDate: {slug_date}
---

> {summary}

**Punchline here →** _(edit before merging)_
""")
filename.write_text(md, encoding="utf-8")

subprocess.run(["git", "config", "user.email", "bot@trombologna.it"])
subprocess.run(["git", "config", "user.name", "tram-bot"])
branch = f"tram-bot/{slug_date}"
subprocess.run(["git", "checkout", "-b", branch])
subprocess.run(["git", "add", str(filename)])
subprocess.run(["git", "commit", "-m", f"feat: headline draft {slug_date}"])
subprocess.run(["git", "push", "-u", "origin", branch])

api_url = os.environ["GITHUB_API_URL"] + f"/repos/{os.environ['GITHUB_REPOSITORY']}/pulls"
headers = {"Authorization": f"token {os.environ['GITHUB_TOKEN']}",
           "Accept": "application/vnd.github+json"}
payload = {
    "title": f"Daily headline draft {slug_date}",
    "head": branch,
    "base": "main",
    "body": "Auto-generated draft post. Add satire & merge when ready.",
    "draft": True
}
requests.post(api_url, headers=headers, data=json.dumps(payload))
