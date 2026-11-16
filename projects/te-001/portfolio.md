---
title: TE-001
line: A Raspberry Pi media player for CD, tape, AirPlay and Bluetooth
language: Python
status: in-progress
featured: false
keywords: [raspberry, pi, media, player, cd, tape, airplay, bluetooth, hardware, ansible]
numbers:
  - value: 20 of 20
    caption: simulated power cuts recovered cleanly on a sealed root.
  - value: "396"
    caption: tests passing in the container suite.
  - value: "0"
    caption: runs on real hardware so far.
summary: A Raspberry Pi media player for CD, tape, AirPlay and Bluetooth. I don't have the Pi yet, so for now it runs on a virtual device, where it recovered from 20 out of 20 simulated power cuts.
---

## What it is

TE-001 is a Raspberry Pi media player. It switches between CD, tape, a music library, Spotify, AirPlay and Bluetooth. A small OLED screen and buttons are the controls.

It is written in Python, and an Ansible playbook sets up the Pi.

## Testing without hardware

I don't have the Pi yet, so four test rigs stand in for the board.

| rig                                  | result           |
| ------------------------------------ | ---------------- |
| unit suite on Windows                | 370 passed       |
| container suite                      | 396 passed       |
| arm64 run of the playbook            | 66 checks passed |
| full system run in a virtual machine | 80 passed        |

The power-cut tests recovered 20 of 20 times on a sealed root and 5 of 5 times on an unsealed one. Running the playbook a second time changes nothing.

## What's left

None of it has run on a real Pi. Everything hardware-specific is marked unverified.
