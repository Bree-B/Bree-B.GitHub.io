# bree-b.github.io

Personal portfolio site for Breanna Hollinshed — Geospatial Science student at
Flinders University. Built with [Jekyll](https://jekyllrb.com) and served by
GitHub Pages at <https://bree-b.github.io>.

---

## Contents

- [Project structure](#project-structure)
- [Build guide for macOS](#build-guide-for-macos)
  - [1. Install the Xcode command line tools](#1-install-the-xcode-command-line-tools)
  - [2. Install Homebrew](#2-install-homebrew)
  - [3. Install a modern Ruby](#3-install-a-modern-ruby)
  - [4. Install the project's gems](#4-install-the-projects-gems)
  - [5. Preview the site](#5-preview-the-site)
- [Everyday commands](#everyday-commands)
- [Editing the site](#editing-the-site)
- [How deploys work](#how-deploys-work)
- [Analytics](#analytics)
- [Troubleshooting](#troubleshooting)

---

## Project structure

| Path | Purpose |
| --- | --- |
| `index.md` | Home — intro and what I'm currently working on |
| `About.md` | Background, tools, and experience |
| `Projects.md` | Selected geospatial work |
| `Contact.md` | Where to get in touch |
| `_config.yml` | Site title, description, nav links, social links |
| `_layouts/default.html` | Page shell — header, nav, footer |
| `_includes/project-figure.html` | Renders a project image only once the file exists |
| `_includes/analytics.html` | Optional visitor counting — off until configured |
| `assets/css/style.scss` | Design tokens and all site styles |
| `assets/images/projects/` | Project map exports — see the README in that folder |
| `Gemfile` | Ruby gems needed to preview the site locally |
| `_site/` | Build output — generated, ignored by git, never edited by hand |

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

## Editing the site

**Page content** lives in the four Markdown files at the top level. Each
starts with a YAML front matter block between `---` fences:

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

**Colours, fonts and spacing** are all in `assets/css/style.scss`. The design
tokens at the top (the `:root` block) drive the whole palette — change
`--accent` there and it updates everywhere. Note the empty `---` fences at the
very top of that file: they look odd, but they're what tells Jekyll to compile
the file, so don't delete them.

**Project images** go in `assets/images/projects/`. See the README inside that
folder for the naming convention.

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
  standard Markdown, Liquid and Sass, so the two produce the same output. If
  you ever add a plugin, check it against
  [GitHub's supported list](https://pages.github.com/versions/) first.

---

## Analytics

The site can count visitors without cookies, without a consent banner, and
without loading anything at all until you opt in. `_includes/analytics.html`
emits nothing unless `analytics.provider` is set in `_config.yml`, and it is
skipped entirely during local previews (`bundle exec jekyll serve`), so only
real traffic to <https://bree-b.github.io> is counted.

### Recommended: GoatCounter

[GoatCounter](https://www.goatcounter.com) is free for personal sites, stores
no cookies or personal data, and the script is about 3&nbsp;KB.

1. Sign up at <https://www.goatcounter.com> and pick a site code — for example
   `bree-b`, which gives you a dashboard at `https://bree-b.goatcounter.com`.
2. Uncomment the two analytics lines in `_config.yml`:

   ```yaml
   analytics:
     provider: goatcounter
     site: bree-b
   ```

3. Commit and push. GitHub Pages rebuilds, and counts start appearing in the
   GoatCounter dashboard within a minute or two.

You get page views, referrers, browsers, screen sizes, and rough country-level
locations — no individual visitors are identified or tracked between visits.

### Other supported providers

Swap `provider` and its settings if you would rather use something else:

| Provider | `_config.yml` keys |
| --- | --- |
| `goatcounter` | `site` — your `<site>.goatcounter.com` code |
| `plausible` | `domain` — the domain registered in Plausible |
| `umami` | `src` — your instance's script URL, and `website_id` |
| `cloudflare` | `token` — the Web Analytics beacon token |

[Plausible](https://plausible.io) is paid. [Umami](https://umami.is) is
open source and free to self-host. [Cloudflare Web
Analytics](https://www.cloudflare.com/web-analytics/) is free but reports
best when Cloudflare also proxies the domain.

### Turning it off

Comment out `provider` in `_config.yml` and push. The site goes back to
loading no analytics script whatsoever.

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
| Site looks unstyled | Check the empty `---` fences are still at the top of `assets/css/style.scss`. |
| Builds locally but the live site is stale | Check the **Actions** tab for a failed `pages-build-deployment` run and read its log. |
| Live site 404s and no build ever runs | Check **Settings → Pages** is set to deploy from `main` / `(root)`. If that's right and builds still never start, the account or repository may be flagged — contact [GitHub Support](https://support.github.com/contact). |
