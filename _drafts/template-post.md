---
title: "A template post"
tags: [notes]
blurb: "One or two sentences that show up on the blog index and in the RSS feed."
# cover: /assets/images/posts/example.jpg
# cover_alt: "Describe the image for anyone who can't see it."
---

Posts in `_drafts/` never get published — this one is here as a reference for
the formatting the site supports. Copy it into `_posts/` and rename it to
`YYYY-MM-DD-some-title.md` when it's ready, or just write in the CMS, which
handles the filename for you.

<!--more-->

Everything above that `more` marker becomes the excerpt if you don't set a
`blurb`.

## Headings

`##` for sections, `###` for anything under them. Skip `#` — the title is
already the page's only `h1`.

### A sub-heading

Regular paragraphs, **bold**, *italic*, and [links](https://example.com) all
work as you'd expect.

## Lists

- An unordered item
- Another one

1. A numbered item
2. Another one

## Quotes

> Pulled-out quotes are set in the display serif, so they carry a bit of weight
> on the page. Keep them short.

## Code

Inline `code` looks like that. Fenced blocks get their own panel:

```python
import arcpy
arcpy.sa.Fill("dem.tif").save("dem_filled.tif")
```

## Images

Drop the file in `assets/images/posts/` and reference it:

```markdown
![Describe the image here](/assets/images/posts/example.jpg)
```

Images in a post are click-to-zoom automatically.
