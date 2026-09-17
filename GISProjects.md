---
layout: default
title: GIS Projects
permalink: /GISProjects/
description: >-
  Geospatial work by Breanna Hollinshed - flood modelling on the Onkaparinga
  River and multi-criteria land suitability analysis for a quandong orchard.
---

<section class="hero">
  <p class="eyebrow">Portfolio</p>
  <h1>Projects</h1>
  <p class="lead">
    A selection of geospatial work — grounded in real places, real communities,
    and real questions about how decisions get made.
  </p>
</section>

<section class="section">
  <div class="section-head">
    <h2>Selected work</h2>
  </div>

  <div class="project-list">

    <article class="project">
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

    <article class="project">
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

  <p class="muted project-note">
    Both projects are GIST 1001/8001 coursework at Flinders University.
  </p>
</section>

<section class="section">
  <div class="section-head">
    <h2>In progress</h2>
  </div>
  <div class="cards">
    <div class="card">
      <span class="card-meta">Building now</span>
      <h3>This portfolio site</h3>
      <p>
        A home for my geospatial work, built with Jekyll and GitHub Pages —
        growing as each project wraps up.
      </p>
    </div>
  </div>
</section>

<section class="section">
  <p class="muted">
    More on <a href="https://github.com/Bree-B">GitHub</a> &mdash; or
    <a href="{{ '/Contact/' | relative_url }}">get in touch</a> if you'd like to work together.
  </p>
</section>
