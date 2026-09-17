---
layout: default
title: Home
description: >-
  Breanna Hollinshed — Geospatial Science student and mixed-media artist.
  Spatial analysis, original artwork, and notes from the middle of both.
---

<div class="wrap">

  <section class="hero hero--home">
    <div>
      <p class="eyebrow">Hello, I'm Bree</p>
      <h1 data-words>Mapping Country, connecting community</h1>
      <p class="lead">
        A geospatial science student turning spatial data into tools that
        connect people to Community, Country, and the decisions that shape
        both — and a mixed-media artist working in ochre, ink and layered
        paper under {{ site.data.studio.name }}.
      </p>

      <div class="btn-row">
        <a class="btn btn-primary" href="{{ '/Projects/' | relative_url }}">
          View my projects
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
        <a class="btn" href="{{ '/Art/' | relative_url }}">Browse the art store</a>
      </div>

      <p class="hero__meta">
        <span><span class="hero__dot" aria-hidden="true"></span> Open to work &amp; collaborations</span>
        <span>Adelaide, South Australia</span>
      </p>
    </div>

    <div class="topo" data-reveal="scale">
      <canvas data-topo aria-hidden="true"></canvas>
      <span class="topo__ring" aria-hidden="true"></span>
      <span class="topo__ring topo__ring--inner" aria-hidden="true"></span>
      <span class="topo__coords" aria-hidden="true">34&deg;55'S<br>138&deg;36'E</span>
      <span class="topo__tag">Live contour field</span>
    </div>
  </section>

</div>

{%- assign ticker = "ArcGIS Pro,QGIS,Python,Hydrology,Multi-criteria analysis,Mixed media,Community mapping,Git &amp; GitHub,Cartography,Native food systems" | split: "," -%}
<div class="marquee" aria-hidden="true">
  <div class="marquee__track">
    {%- for pass in (1..2) -%}
      {%- for word in ticker -%}
      <span class="marquee__item">{{ word }}</span>
      {%- endfor -%}
    {%- endfor -%}
  </div>
</div>

<div class="wrap">

  <section class="section">
    <div class="section-head" data-reveal>
      <div>
        <p class="eyebrow">Start here</p>
        <h2>Three ways in</h2>
      </div>
      <p class="muted">Maps, artwork, and the thinking behind both.</p>
    </div>

    <div class="cards" data-stagger data-reveal>
      <a class="card spot" href="{{ '/Projects/' | relative_url }}">
        <span class="card-meta">01 — Portfolio</span>
        <h3>Geospatial projects</h3>
        <p>Flood modelling, land suitability, and other work grounded in real places.</p>
        <span class="card__go">See the work <span aria-hidden="true">&rarr;</span></span>
      </a>
      <a class="card spot" href="{{ '/Art/' | relative_url }}">
        <span class="card-meta">02 — Studio</span>
        <h3>{{ site.data.studio.name }} store</h3>
        <p>Original mixed-media pieces, made by hand and available to buy.</p>
        <span class="card__go">Browse the store <span aria-hidden="true">&rarr;</span></span>
      </a>
      <a class="card spot" href="{{ '/Blog/' | relative_url }}">
        <span class="card-meta">03 — Journal</span>
        <h3>Writing &amp; notes</h3>
        <p>What I'm learning, building and reading — in progress, not polished.</p>
        <span class="card__go">Read the blog <span aria-hidden="true">&rarr;</span></span>
      </a>
    </div>
  </section>

  {%- assign featured_art = site.art | where: "featured", true | sort: "order" -%}
  {%- if featured_art.size == 0 -%}
    {%- assign featured_art = site.art | sort: "order" -%}
  {%- endif -%}
  {%- if featured_art.size > 0 %}
  <section class="section">
    <div class="section-head" data-reveal>
      <div>
        <p class="eyebrow">{{ site.data.studio.name }}</p>
        <h2>From the studio</h2>
      </div>
      <a class="arrow-link" href="{{ '/Art/' | relative_url }}">Visit the store <span aria-hidden="true">&rarr;</span></a>
    </div>

    <div class="art-grid" data-stagger data-reveal>
      {%- for item in featured_art limit: 3 %}
        {% include art-card.html item=item %}
      {%- endfor %}
    </div>
  </section>
  {%- endif %}

  <section class="section">
    <div class="section-head" data-reveal>
      <div>
        <p class="eyebrow">Selected work</p>
        <h2>Recent projects</h2>
      </div>
      <a class="arrow-link" href="{{ '/Projects/' | relative_url }}">All projects <span aria-hidden="true">&rarr;</span></a>
    </div>

    <div class="cards" data-stagger data-reveal>
      <div class="card spot">
        <span class="card-meta">GIS &middot; Hydrology</span>
        <h3>Onkaparinga flood modelling</h3>
        <p>A unit hydrograph and isochrones map built from a DEM of the Adelaide Hills, modelling how long floodwater takes to reach a pour point.</p>
        <span class="card__go"><a href="{{ '/Projects/' | relative_url }}">Read the case study <span aria-hidden="true">&rarr;</span></a></span>
      </div>
      <div class="card spot">
        <span class="card-meta">GIS &middot; Land suitability</span>
        <h3>Quandong orchard siting</h3>
        <p>Weighted multi-criteria decision analysis to find suitable land near Melrose for growing quandongs, a native bush food.</p>
        <span class="card__go"><a href="{{ '/Projects/' | relative_url }}">Read the case study <span aria-hidden="true">&rarr;</span></a></span>
      </div>
    </div>
  </section>

  {%- if site.posts.size > 0 %}
  <section class="section">
    <div class="section-head" data-reveal>
      <div>
        <p class="eyebrow">Journal</p>
        <h2>Latest writing</h2>
      </div>
      <a class="arrow-link" href="{{ '/Blog/' | relative_url }}">All posts <span aria-hidden="true">&rarr;</span></a>
    </div>

    <div class="post-list" data-reveal>
      {%- for post in site.posts limit: 3 %}
        {% include post-row.html post=post %}
      {%- endfor %}
    </div>
  </section>
  {%- endif %}

  <section class="cta-band spot" data-reveal="scale">
    <p class="eyebrow" style="justify-content:center">Say hello</p>
    <h2>Working on something that needs a map — or a wall that needs a painting?</h2>
    <p class="lead" style="margin-inline:auto;text-align:center">
      I'm most interested in community and environmental mapping, and I take on
      a small number of commissions each year.
    </p>
    <div class="btn-row">
      <a class="btn btn-primary" href="{{ '/Contact/' | relative_url }}">Get in touch</a>
      <a class="btn" href="{{ '/About/' | relative_url }}">More about me</a>
    </div>
  </section>

</div>
