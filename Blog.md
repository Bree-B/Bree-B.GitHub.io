---
layout: default
title: Blog
permalink: /Blog/
description: >-
  Notes from Breanna Hollinshed on geospatial work, studio practice, and
  whatever is being learned this week.
---

{%- assign posts = site.posts -%}
{%- assign featured = posts | first -%}

<div class="wrap">

  <section class="page-hero">
    <p class="eyebrow">Journal</p>
    <h1 data-reveal>Writing &amp; notes</h1>
    <p class="lead" data-reveal style="--reveal-delay:90ms">
      Half working notebook, half public record — what I'm learning in GIS,
      what's happening in the studio, and the occasional opinion about maps.
    </p>
  </section>

  {%- if posts.size > 0 %}

  <a class="post-featured" href="{{ featured.url | relative_url }}" data-reveal="scale">
    <p class="eyebrow" style="margin-bottom:0">Latest &middot; {{ featured.date | date: "%-d %B %Y" }}</p>
    <h3>{{ featured.title }}</h3>
    <p class="lead">{{ featured.blurb | default: featured.excerpt | strip_html | normalize_whitespace | truncate: 190 }}</p>
    <span class="arrow-link">Read the post <span aria-hidden="true">&rarr;</span></span>
  </a>

  {%- if posts.size > 1 %}
  <section class="section">
    <div class="section-head" data-reveal>
      <div>
        <p class="eyebrow">Archive</p>
        <h2>Everything else</h2>
      </div>
      <a class="arrow-link" href="{{ '/feed.xml' | relative_url }}">Subscribe by RSS <span aria-hidden="true">&rarr;</span></a>
    </div>

    <div class="post-list" data-reveal>
      {%- for post in posts offset: 1 %}
        {% include post-row.html post=post %}
      {%- endfor %}
    </div>
  </section>
  {%- endif %}

  {%- else %}

  <div class="empty" data-reveal>
    <h3>Nothing published yet</h3>
    <p>The first post is on its way. Check back soon, or subscribe to the feed.</p>
  </div>

  {%- endif %}

</div>
