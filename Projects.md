---
layout: default
title: Projects
permalink: /Projects/
description: >-
  Geospatial work by Breanna Hollinshed — flood modelling on the Onkaparinga
  River and multi-criteria land suitability analysis for a quandong orchard.
---

<div class="wrap">

  <section class="page-hero">
    <p class="eyebrow">Portfolio</p>
    <h1 data-reveal>Projects</h1>
    <p class="lead" data-reveal style="--reveal-delay:90ms">
      A selection of geospatial work — grounded in real places, real communities,
      and real questions about how decisions get made.
    </p>
  </section>

  <section>
    <div class="section-head" data-reveal>
      <div>
        <p class="eyebrow">Case studies</p>
        <h2>Selected work</h2>
      </div>
      <p class="muted">Both projects are GIST 1001/8001 coursework at Flinders University.</p>
    </div>

    <div class="project-list">

      <article class="project spot" data-reveal>
        <span class="card-meta">GIS &middot; Hydrology</span>
        <h3>Flood Modelling for the Onkaparinga River, Hahndorf</h3>
        <p>
          Built a unit hydrograph and isochrones map from a digital elevation
          model of the Adelaide Hills, modelling how long floodwater takes to
          reach a pour point after a rain event. Designed to support local council
          flood warnings and disaster-event management — turning a technical
          hydrology process into something a community can actually use.
        </p>
        <ul class="tags">
          <li>ArcGIS Pro</li>
          <li>DEM analysis</li>
          <li>Hydrology</li>
        </ul>
        {%- capture onkaparinga_media -%}
          {% include project-figure.html
             src="/assets/images/projects/onkaparinga-isochrones-map.png"
             alt="Isochrones map of the Onkaparinga River catchment at Hahndorf, shaded from 8 to 80 hours of flood flow time to the pour point"
             caption="Isochrones showing flood flow time to the pour point, in eight-hour bands." %}
          {% include project-figure.html
             src="/assets/images/projects/onkaparinga-study-site.png"
             alt="Satellite study-area map of the Onkaparinga catchment extent east of Adelaide in the Adelaide Hills"
             caption="Study area — the Adelaide Hills, east of Adelaide." %}
        {%- endcapture -%}
        {%- if onkaparinga_media contains "<figure" %}
        <div class="project-media">{{ onkaparinga_media }}</div>
        {%- endif %}
      </article>

      <article class="project spot" data-reveal>
        <span class="card-meta">GIS &middot; Land suitability</span>
        <h3>Best Location for a Quandong Orchard — Multi-Criteria Decision Analysis</h3>
        <p>
          Used weighted multi-criteria decision analysis in ArcGIS Pro to identify
          suitable land near Melrose, SA for growing quandongs — a native bush food
          used by First Nations peoples for over 65,000 years. Combined soil,
          rainfall, watercourse, land use, road and slope data into two suitability
          models, so growers can weigh cost against land quality.
        </p>
        <ul class="tags">
          <li>ArcGIS Pro</li>
          <li>MCDA</li>
          <li>Native food systems</li>
        </ul>
        {%- capture quandong_media -%}
          {% include project-figure.html
             src="/assets/images/projects/quandong-suitability-map.png"
             alt="Suitability map for siting a quandong orchard near Melrose, South Australia, graded from extremely low to extremely high suitability"
             caption="Suitability model #1, graded from extremely low to extremely high." %}
          {% include project-figure.html
             src="/assets/images/projects/quandong-study-site.png"
             alt="Satellite study-area map of the analysis extent around Booleroo Centre and Melrose in the southern Flinders Ranges"
             caption="Study area — Booleroo Centre and Melrose, southern Flinders Ranges." %}
        {%- endcapture -%}
        {%- if quandong_media contains "<figure" %}
        <div class="project-media">{{ quandong_media }}</div>
        {%- endif %}
      </article>

    </div>
  </section>

  <section class="section">
    <div class="section-head" data-reveal>
      <div>
        <p class="eyebrow">On the bench</p>
        <h2>In progress</h2>
      </div>
    </div>
    <div class="cards" data-stagger data-reveal>
      <div class="card spot">
        <span class="card-meta">Building now</span>
        <h3>This portfolio site</h3>
        <p>
          A home for my geospatial work, artwork and writing — built with Jekyll
          and GitHub Pages, growing as each project wraps up.
        </p>
      </div>
      <div class="card spot">
        <span class="card-meta">Next up</span>
        <h3>Python for spatial analysis</h3>
        <p>
          Moving the repetitive parts of my ArcGIS workflows into scripts, so the
          analysis is reproducible instead of remembered.
        </p>
      </div>
    </div>
  </section>

  <section class="cta-band spot" data-reveal="scale">
    <p class="eyebrow" style="justify-content:center">More</p>
    <h2>The code lives on GitHub</h2>
    <p class="lead" style="margin-inline:auto;text-align:center">
      Repositories, works in progress and the source of this site.
    </p>
    <div class="btn-row">
      <a class="btn btn-primary" href="{{ site.social.github }}" rel="noopener">Visit my GitHub</a>
      <a class="btn" href="{{ '/Contact/' | relative_url }}">Work together</a>
    </div>
  </section>

</div>
