---
title: Recall
line: Code search in the terminal, across all my projects
language: Rust
status: active
featured: true
keywords: [rust, terminal, tui, daemon, watcher, code, search, memory, files]
source: https://github.com/Flame338/recall-tui
numbers:
  - value: 13.7×
    caption: faster indexing of a whole drive, from 1,286 to 17,614 files a second.
  - value: 3.9 KB
    caption: of memory per indexed file. It was 25.7 KB.
  - value: ≈ 1 s
    caption: from saving a file to finding the change in results.
summary: Code search in the terminal, across every project on my machine. A background daemon watches the folders, so an edit shows up in results about a second after I save. Reopening a project only re-indexes the files that changed.
---

## What it is

Recall is code search in the terminal, across every project on my machine. It is written in Rust and calls LuxCore through its C API.

A scanner that respects .gitignore finds the files. A background daemon with a Windows directory watcher keeps the index current, so an edit shows up in results about a second after I save. Each project's index is saved, and reopening a project only re-indexes the files that changed.

I can search all my projects at once. There is also a JSON command line for scripts.

## The hard part

Indexing a whole drive used about 8% CPU on a 24-thread machine. I measured a baseline before changing anything. It showed less than one busy core, and 96% of worker time was inside cold file reads. Raising the reader threads from 3 to 16 took cold indexing from 894 to 3,616 files a second.

Memory was the second problem. After indexing a whole C: drive, Recall held 4.8 GB. Fixing that meant reworking LuxCore's index memory and loading the other saved projects lazily. Memory at open went from 884 MB to 0.4 MB.

## What still bothers me

I have built and tested Recall only on Windows. There is no CI for it yet.
