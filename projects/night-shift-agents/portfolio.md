---
title: Night-shift agents
line: A turn-based game that six scheduled AI agents build
language: C++ · Godot
status: paused
featured: false
keywords: [cpp, c++, godot, game, agents, ai, linear, tickets, pull, requests, pipeline]
numbers:
  - value: "126"
    caption: pull requests merged through the pipeline.
  - value: "6"
    caption: agents, each with one job.
  - value: "335"
    caption: commits in the repository.
summary: A turn-based game that six scheduled AI agents build from Linear tickets. I approve their plans and answer their critiques. 126 pull requests have merged so far.
---

## What it is

Night-shift agents is a turn-based roguelike with a C++ core and a Godot 4.3 front end. Six AI agents build it from Linear tickets: an architect, an architecture reviewer, a coder, a critic, a product manager and a reviewer.

They run on a schedule. Four jobs run nightly and two run weekly.

## How a night build goes

The night build opens a draft pull request and gets it reviewed. It then fixes what the review found and records a demo video. It merges only if the reviewer approved the latest commit and CI is green.

Another job files a critique and up to three backlog tickets. A third job reproduces bug reports.

## My part

I approve a plan by changing a label on the Linear ticket. I answer the critique, and I report bugs.

The agents wrote a large share of the code. The repository is private, so there is no source link on this page.
