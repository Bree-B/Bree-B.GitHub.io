# bree-b.github.io

Personal site for Breanna Hollinshed — Geospatial Science student at Flinders
University and mixed-media artist under Bunya Art. Portfolio, blog, and an art
store, built with [Jekyll](https://jekyllrb.com) and served by GitHub Pages at
<https://bree-b.github.io>.

Everything is editable from a browser through a CMS — see
[Editing with the CMS](#editing-with-the-cms).

---

## Contents

- [Project structure](#project-structure)
- [Editing with the CMS](#editing-with-the-cms)
  - [Writing a blog post](#writing-a-blog-post)
  - [Listing a piece of art](#listing-a-piece-of-art)
  - [Taking payment](#taking-payment)
- [Build guide for macOS](#build-guide-for-macos)
  - [1. Install the Xcode command line tools](#1-install-the-xcode-command-line-tools)
  - [2. Install Homebrew](#2-install-homebrew)
  - [3. Install a modern Ruby](#3-install-a-modern-ruby)
  - [4. Install the project's gems](#4-install-the-projects-gems)
  - [5. Preview the site](#5-preview-the-site)
- [Everyday commands](#everyday-commands)
- [Editing the site by hand](#editing-the-site-by-hand)
- [How deploys work](#how-deploys-work)
- [Troubleshooting](#troubleshooting)

---

## Project structure

| Path | Purpose |
| --- | --- |
| `index.md` | Home — hero, studio preview, recent projects, latest posts |
| `About.md` | Background, tools, and experience |
| `Projects.md` | Selected geospatial work |
| `Art.md` | The art store — lists everything in `_art/` |
| `Blog.md` | Blog index — lists everything in `_posts/` |
| `Contact.md` | Where to get in touch |
| `404.html` | Shown for any address that doesn't exist |
| `_posts/` | One Markdown file per published blog post |
| `_drafts/` | Unpublished posts. Never built, so safe to leave half-finished |
| `_art/` | One Markdown file per artwork listing |
| `_data/studio.yml` | Studio name, currency, shipping note, store notices |
| `_config.yml` | Site title, description, nav links, social links, collections |
| `_layouts/` | Page shells — `default`, `page`, `post`, `art` |
| `_includes/` | Reused fragments — header, footer, cards, lightbox, backdrop |
| `_sass/` | The stylesheet, split into tokens, base, layout, components, pages, motion |
| `assets/css/style.scss` | Pulls the `_sass/` partials together — the only file Jekyll compiles |
| `assets/js/app.js` | All interaction: animations, filters, lightbox, theme toggle |
| `assets/images/art/` | Artwork photographs — see the README in that folder |
| `assets/images/posts/` | Images used inside blog posts |
| `assets/images/projects/` | Project map exports — see the README in that folder |
| `feed.xml` `sitemap.xml` `robots.txt` | Generated for readers and search engines |
| `.pages.yml` | CMS configuration — what fields appear in the editor |
| `Gemfile` | Ruby gems needed to preview the site locally |
| `_site/` | Build output — generated, ignored by git, never edited by hand |

---

## Editing with the CMS

There is nothing to install and nothing to host. The site uses
[Pages CMS](https://pagescms.org), which reads the `.pages.yml` file in this
repository and turns it into a visual editor.

**First time:**

1. Go to <https://app.pagescms.org> and sign in with GitHub.
2. Grant it access to the `Bree-B/Bree-B.GitHub.io` repository.
3. Pick the repository from the list.

You'll see **Blog posts**, **Drafts**, **Artwork**, **Studio & store
settings**, and the individual pages down the left-hand side. Saving anything
writes a commit to this repository, and GitHub Pages rebuilds the live site a
minute or so later.

It works on a phone, which is the point — you can list a piece from the studio
without opening a laptop.

> Everything the CMS does, you can also do by editing files directly here on
> GitHub or on your own machine. The CMS is a nicer front door, not a
> different system.

### Writing a blog post

In the CMS: **Blog posts → Add entry**. Fill in the title, pick a date, write,
and save.

By hand: create `_posts/YYYY-MM-DD-some-title.md`:

```markdown
---
title: "Reading a flood before it arrives"
date: 2026-08-14
tags: [gis, hydrology]
blurb: "One or two sentences for the blog index and the RSS feed."
---

The opening paragraph.

<!--more-->

Everything after that marker is the rest of the post.
```

The filename date sets the address, so `2026-08-14-reading-a-flood-before-it-arrives.md`
publishes at `/blog/reading-a-flood-before-it-arrives/`. Reading time is
calculated for you.

`_drafts/template-post.md` is a reference for the formatting the site
supports — headings, quotes, code, images. Files in `_drafts/` are never
published, so it's also the right place to park a half-written post.

### Listing a piece of art

In the CMS: **Artwork → Add entry**. The fields map to what shows on the page:

| Field | What it does |
| --- | --- |
| Status | `available`, `sold`, `reserved`, `commission` or `print` — sets the badge and the button |
| Category | `original`, `print` or `commission` — becomes a filter button on the Art page |
| Sort order | Lower numbers come first |
| Show on the home page | Puts the piece in the "From the studio" row |
| Price | Numbers only. Leave it empty for "price on enquiry" |
| Main photograph | Until this is set, the store shows a gradient panel with the piece's initials |
| Checkout link | See below. Empty means the button reads "Enquire about this piece" |

A piece that sells doesn't need deleting — set its status to `sold` and it
stays up, greyed out, as a record of the work.

### Taking payment

The site is a set of static files, so it has no checkout of its own. Each
listing instead carries a **checkout link**, and the "Buy this piece" button
points at it. Any of these work:

- A [Stripe Payment Link](https://stripe.com/docs/payment-links) — free to
  create, one per piece, takes card payments directly.
- An Etsy or Big Cartel listing, if you already sell there.
- A PayPal.me or Square link.

Leave the field empty and the button becomes **Enquire about this piece**,
pointing at the Contact page — which is the right default for originals, where
you'll want to quote postage anyway.

Where those enquiries go, the currency, and the shipping note all live under
**Studio & store settings** in the CMS (`_data/studio.yml` in the repository).

> The Art page currently shows a notice saying the listings are starter
> samples. Clear the **Notice on the Art page** field once your own work is up
> and it disappears.

---

## Build guide for macOS

You only need to do steps 1–4 once per machine. After that, previewing the
site is a single command.

These instructions assume **zsh**, which is the default shell on every version
of macOS since Catalina. Check yours with `echo $SHELL` — if it says `bash`,
use `~/.bash_profile` anywhere the guide says `~/.zshrc`.

### 1. Install the Xcode command line tools

Ruby gems include native C extensions that have to be compiled locally, which
needs Apple's compiler toolchain.

```sh
xcode-select --install
```

A dialog will appear — click **Install** and wait for it to finish. If you
already have them, you'll see `command line tools are already installed`,
which is fine.

### 2. Install Homebrew

Homebrew is the package manager we'll use to install Ruby.

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

At the end it prints two `eval` commands under **Next steps**. You must run
them, or the `brew` command won't be found. The correct path depends on your
Mac's processor:

**Apple Silicon (M1/M2/M3/M4)** — Homebrew installs to `/opt/homebrew`:

```sh
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**Intel Macs** — Homebrew installs to `/usr/local`:

```sh
echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zshrc
eval "$(/usr/local/bin/brew shellenv)"
```

Not sure which you have? Run `uname -m` — `arm64` means Apple Silicon,
`x86_64` means Intel. Confirm Homebrew works with `brew --version`.

### 3. Install a modern Ruby

> **Don't use the Ruby that ships with macOS.** It's old, and it lives in a
> system directory that macOS protects, so `gem install` fails there with
> permission errors. Installing gems with `sudo` to work around this is how
> people break their Ruby setup — do not do it.

```sh
brew install ruby
```

Homebrew won't put its Ruby ahead of the system one automatically, so add it
to your `PATH`. Use the block matching your processor:

**Apple Silicon:**

```sh
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

**Intel:**

```sh
echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Verify you picked up the new one:

```sh
which ruby     # should print a path containing /opt/homebrew or /usr/local
ruby -v        # should be 3.1 or newer, NOT 2.6.x
```

If `ruby -v` still shows 2.6.x, your `PATH` edit didn't take effect — open a
new Terminal window and check again.

### 4. Install the project's gems

Clone the repository, then install the gems listed in the `Gemfile`:

```sh
git clone https://github.com/Bree-B/Bree-B.GitHub.io.git
cd Bree-B.GitHub.io
bundle install
```

If `bundle` isn't found, install it first with `gem install bundler`, then
re-run `bundle install`.

This creates a `Gemfile.lock` recording the exact versions installed. Commit
that file — it keeps builds reproducible across machines.

### 5. Preview the site

```sh
bundle exec jekyll serve
```

Leave it running and open <http://localhost:4000>. Jekyll watches the folder
and rebuilds automatically when you save a file — just refresh the browser.

Press `Ctrl+C` in the Terminal to stop the server.

> `bundle exec` runs Jekyll with exactly the gem versions from the `Gemfile`.
> Getting into the habit of using it avoids confusing version mismatches later.

---

## Everyday commands

Run all of these from the repository folder.

| Command | What it does |
| --- | --- |
| `bundle exec jekyll serve` | Preview at <http://localhost:4000>, rebuilding on save |
| `bundle exec jekyll serve --livereload` | Same, but refreshes the browser for you |
| `bundle exec jekyll serve --port 4001` | Use a different port if 4000 is taken |
| `bundle exec jekyll build` | Build once into `_site/` without serving |
| `bundle exec jekyll build --verbose` | Build with detailed output, useful when debugging |
| `bundle exec jekyll clean` | Delete `_site/` and the build cache |
| `bundle update` | Upgrade gems to newer allowed versions |

---

## Editing the site by hand

Most day-to-day changes are easier in [the CMS](#editing-with-the-cms). This
section is for the structural things it doesn't cover.

**Page content** lives in the Markdown files at the top level. Each starts with
a YAML front matter block between `---` fences:

```yaml
---
layout: default
title: About
description: A one-line summary used for search results and link previews.
---
```

Everything after the closing `---` is the page body. You can write Markdown,
raw HTML, or both.

**To add a new page**, create `Whatever.md` in the root with that same front
matter, then add it to the `nav` list in `_config.yml` so it appears in the
header:

```yaml
nav:
  - name: Whatever
    url: /Whatever/
```

**Colours, fonts and spacing** live in `_sass/_tokens.scss`. The `:root` block
drives the whole palette — change `--accent` there and it updates everywhere,
in both themes. The rest of the stylesheet is split by job:

| File | Contains |
| --- | --- |
| `_sass/_tokens.scss` | Colours, fonts, radii, timings — light and dark |
| `_sass/_base.scss` | Reset, typography, shared text utilities |
| `_sass/_layout.scss` | Background, header, nav, sections, footer |
| `_sass/_components.scss` | Buttons, cards, tags, badges, lightbox, filters |
| `_sass/_pages.scss` | Hero, art store, blog, project and post layouts |
| `_sass/_motion.scss` | Keyframes, scroll reveals, reduced-motion opt-outs |

`assets/css/style.scss` just imports those in order. Note the front matter
fences at the very top of it: they look odd, but they're what tells Jekyll to
compile the file, so don't delete them.

**Animations** are all in `assets/js/app.js`, one small function per feature,
and every one of them checks `prefers-reduced-motion` first. If a visitor has
asked their system to reduce motion, the contour map draws a single static
frame, scroll reveals resolve immediately, and nothing drifts or tilts.

**Project images** go in `assets/images/projects/`, artwork in
`assets/images/art/`, post images in `assets/images/posts/`. See the README
inside each folder.

> Changes to `_config.yml` are the one exception to live reload — Jekyll only
> reads that file at startup. Stop the server with `Ctrl+C` and start it again
> after editing it.

---

## How deploys work

Pushing to the `main` branch is the deploy:

```sh
git add .
git commit -m "Describe what changed"
git push origin main
```

GitHub then runs its own Jekyll build and publishes the result. You can watch
it under the repository's **Actions** tab, as a `pages-build-deployment` run.
It usually takes under a minute; give it two or three before worrying.

Two things worth knowing:

- **Nothing in `_site/` is uploaded.** GitHub rebuilds the site from source on
  its own servers. `_site/` is purely a local preview, which is why it's in
  `.gitignore`.
- **GitHub builds with its own pinned Jekyll**, which is a slightly older
  version than the one in the `Gemfile`. This site uses no plugins and only
  standard Markdown, Liquid and Sass, so the two produce the same output. The
  RSS feed and sitemap are written out by hand for that reason, rather than
  leaning on `jekyll-feed` and `jekyll-sitemap`. If you ever do add a plugin,
  check it against
  [GitHub's supported list](https://pages.github.com/versions/) first.
- **Saving in the CMS is also a deploy.** It commits straight to the branch,
  which kicks off the same build.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `zsh: command not found: brew` | The `eval` line from step 2 wasn't added. Re-run it, then open a new Terminal. |
| `zsh: command not found: bundle` | Run `gem install bundler`. If that fails with a permissions error, your `PATH` is still on system Ruby — redo step 3. |
| `You don't have write permissions for /Library/Ruby/Gems` | You're on macOS system Ruby. Redo step 3; don't use `sudo`. |
| `Could not find gem 'jekyll'` | Run `bundle install` from inside the repository folder. |
| `Address already in use - bind(2) for 127.0.0.1:4000` | Another Jekyll is still running. Close it, or use `--port 4001`. |
| Edits don't show up | Hard refresh with `Cmd+Shift+R`. If you edited `_config.yml`, restart the server. |
| Site looks unstyled | Check the front matter fences are still at the top of `assets/css/style.scss`. |
| A new post doesn't appear | Its filename must be `YYYY-MM-DD-title.md` and the date must not be in the future. |
| An artwork shows initials instead of a photo | The file named in its `image:` field isn't in `assets/images/art/` yet. |
| CMS says it can't find a configuration | `.pages.yml` must be on the branch you selected in Pages CMS. |
| Builds locally but the live site is stale | Check the **Actions** tab for a failed `pages-build-deployment` run and read its log. |
| Live site 404s and no build ever runs | Check **Settings → Pages** is set to deploy from `main` / `(root)`. If that's right and builds still never start, the account or repository may be flagged — contact [GitHub Support](https://support.github.com/contact). |
