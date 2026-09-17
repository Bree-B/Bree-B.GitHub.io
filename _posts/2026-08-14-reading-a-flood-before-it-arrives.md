---
title: "Reading a flood before it arrives"
date: 2026-08-14
tags: [gis, hydrology, arcgis]
blurb: "Isochrones turn a DEM into an answer to one question: how long have we got?"
---

The Onkaparinga project started with a digital elevation model of the Adelaide
Hills and one question a council actually asks: after the rain starts, how long
before the water gets *here*?

<!--more-->

## The chain of steps

The workflow is unglamorous and almost entirely about cleaning up before you
analyse anything:

1. **Fill the DEM.** Sinks in the elevation data are usually artefacts, and
   water that falls into one never leaves. Fill them first or everything
   downstream is wrong.
2. **Flow direction, then flow accumulation.** Which way does each cell drain,
   and how many cells drain through it. The second one is where the streams
   appear out of what looked like noise.
3. **Pour point and watershed.** Pick the point you care about — a bridge, a
   town, a gauge — and delineate everything upslope that drains to it.
4. **Flow length, converted to time.** This is the step that turns geometry
   into an answer. Weight the flow length by velocity and you get travel time
   instead of distance.
5. **Reclassify into bands.** Eight-hour bands, in this case. Those bands are
   the isochrones.

## Why isochrones and not a flood extent map

A flood extent map answers "how bad". An isochrone map answers "how long have
we got", and that's the question that changes what anyone does on the day.
Extent tells you who to warn. Travel time tells you when — and in what order.

The two maps use most of the same inputs. They're just cut for different
readers.

## The part that took longest

Not the hydrology. The legend.

Eight-hour bands sound obvious until you try to label them for someone who has
never read a raster. "8–16 hours" reads as a prediction, which it isn't; it's a
travel time under one modelled rainfall scenario. Getting that caveat onto the
map without burying the map in text took longer than the analysis did.

That's most of this work, honestly. The model is a few hours of processing. The
legibility is the job.
