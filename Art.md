---
layout: default
title: Art Store
permalink: /Art/
description: >-
  Original mixed-media artwork by Breanna Hollinshed, made by hand in Adelaide
  under Bunya Art. Browse available pieces, prints and commissions.
---

{%- assign pieces = site.art | sort: "order" -%}
{%- assign cats = site.art | map: "category" | compact | uniq | sort -%}

<div class="wrap">

  <section class="page-hero">
    <p class="eyebrow">{{ site.data.studio.name }}</p>
    <h1 data-reveal>The art store</h1>
    <p class="lead" data-reveal style="--reveal-delay:90ms">
      {{ site.data.studio.blurb | strip_newlines }}
      Everything here is made in Adelaide, on Kaurna Country, and posted
      anywhere in Australia.
    </p>
  </section>

  {%- if site.data.studio.sample_notice and site.data.studio.sample_notice != "" %}
  <div class="notice" data-reveal>
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true" style="flex:none;margin-top:.2rem"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/></svg>
    <p>{{ site.data.studio.sample_notice | strip_newlines }}</p>
  </div>
  {%- endif %}

  {%- if pieces.size > 0 %}
  <section>
    <div class="filters" data-filters role="group" aria-label="Filter artwork">
      <button class="filter" type="button" data-filter="all" aria-pressed="true">All work</button>
      <button class="filter" type="button" data-filter="available" aria-pressed="false">Available</button>
      {%- for cat in cats %}
      <button class="filter" type="button" data-filter="{{ cat | downcase }}" aria-pressed="false">{{ cat | capitalize }}</button>
      {%- endfor %}
      <button class="filter" type="button" data-filter="sold" aria-pressed="false">Sold</button>
    </div>

    <p class="mono-label" style="margin:-1rem 0 1.5rem"><span data-art-count>{{ pieces.size }} pieces</span></p>

    <div class="art-grid" data-art-grid data-stagger data-reveal>
      {%- for item in pieces %}
        {% include art-card.html item=item %}
      {%- endfor %}
    </div>
  </section>
  {%- else %}
  <div class="empty" data-reveal>
    <h3>The studio is between shows</h3>
    <p>There's nothing listed right now. New pieces go up here first — or get in touch about a commission.</p>
    <a class="btn btn-primary" href="{{ '/Contact/' | relative_url }}">Ask about a commission</a>
  </div>
  {%- endif %}

  <section class="section">
    <div class="section-head" data-reveal>
      <div>
        <p class="eyebrow">The practical part</p>
        <h2>How buying works</h2>
      </div>
    </div>

    <div class="cards" data-stagger data-reveal>
      <div class="card spot">
        <span class="card-meta">01</span>
        <h3>Pick your piece</h3>
        <p>Every original is one of one. Once it's sold it's marked sold and stays up as a record of the work.</p>
      </div>
      <div class="card spot">
        <span class="card-meta">02</span>
        <h3>Buy or enquire</h3>
        <p>Pieces with a checkout link can be bought on the spot. For everything else, send an enquiry and I'll reply with payment and postage details.</p>
      </div>
      <div class="card spot">
        <span class="card-meta">03</span>
        <h3>Packed and posted</h3>
        <p>{{ site.data.studio.shipping_note | strip_newlines }}</p>
      </div>
    </div>
  </section>

  <section class="cta-band spot" data-reveal="scale">
    <p class="eyebrow" style="justify-content:center">Commissions</p>
    <h2>Want something made for a particular wall?</h2>
    <p class="lead" style="margin-inline:auto;text-align:center">
      I take on a small number of commissions each year — usually mixed media on
      canvas or board, worked up from a conversation about the place it's for.
    </p>
    <div class="btn-row">
      <a class="btn btn-primary" href="{{ '/Contact/' | relative_url }}">Start a commission</a>
    </div>
  </section>

</div>
