# Contributing Guide

Hello and welcome to the Kwipoo project. This guide will help you contribute effectively. I love you.

## Commit Message Guidelines

We follow the Conventional Commits specification to maintain consistent and readable commit history. This format also (will) enable automated versioning and changelog generation.

### Format

<type>: short description

### Examples

feat: add ability to duplicate item sets
fix: prevent crash on empty spot list
style: update Tailwind spacing on modal
docs: add usage section to README
chore: bump version to 1.0.11

### Accepted Types

- feat - introduces a new feature
- fix - fixes a bug
- style - visual or styling related changes with no functional impact
- docs - documentation-only changes (e.g. README updates)
- refactor - internal code changes that do not change behavior
- chore - tooling, configuration, or version bumps

### Breaking Changes

To indicate a breaking change, include an exclamation mark after the type:

feat!: remove deprecated field from item schema
