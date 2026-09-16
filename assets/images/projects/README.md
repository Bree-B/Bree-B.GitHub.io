# Project images

Drop the map exports in this folder using exactly these filenames. Each figure
is rendered by `_includes/project-figure.html`, which only outputs a figure once
the matching file exists — so the Projects page stays tidy until the artwork is
added, and the images appear automatically on the next build.

| Filename | Project | Shows |
| --- | --- | --- |
| `onkaparinga-isochrones-map.png` | Flood modelling, Hahndorf | Isochrones map of the catchment, 8–80 hour flood flow bands |
| `onkaparinga-study-site.png` | Flood modelling, Hahndorf | Study-area extent in the Adelaide Hills |
| `quandong-suitability-map.png` | Quandong orchard MCDA | Suitability model #1, extremely low to extremely high |
| `quandong-study-site.png` | Quandong orchard MCDA | Study-area extent near Booleroo Centre and Melrose |

PNG or JPG both work, but keep the `.png` names above unless you also update the
`src` values in `Projects.md`. Web-sized exports (roughly 1600 px on the long
edge) keep page loads quick.
