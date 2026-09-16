# bree-b.github.io

Personal portfolio site for Breanna Hollinshed — Geospatial Science student at
Flinders University. Built with Jekyll and served by GitHub Pages.

## Structure

| Path | Purpose |
| --- | --- |
| `index.md` | Home — intro and what I'm currently working on |
| `About.md` | Background, tools, and experience |
| `Projects.md` | Selected geospatial work |
| `Contact.md` | Where to get in touch |
| `_layouts/default.html` | Page shell — header, nav, footer |
| `_includes/project-figure.html` | Renders a project image only once the file exists |
| `assets/css/style.scss` | Design tokens and all site styles |
| `assets/images/projects/` | Project map exports — see the README in that folder |

## Running locally

```sh
bundle exec jekyll serve
```

Then open <http://localhost:4000>.
