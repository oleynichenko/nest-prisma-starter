---
name: plan-feature
description: >-
  Plans and implements the feature described in ASSIGNMENT.md using the Note
  module as the pattern. Use when the user mentions ASSIGNMENT.md, asks to
  plan a feature, or wants a plan before coding.
---

# Plan a feature

## Before planning

Read ASSIGNMENT.md, .cursor/rules/project.mdc, and src/modules/note.

If the Feature section of ASSIGNMENT.md is empty, stop and ask the user to fill it in. Do not invent a feature.

## Plan

Write the plan. Do not edit ASSIGNMENT.md. Do not change application code yet.

The plan names:

- the module to add and the Note files it copies
- Prisma model changes and the migration
- endpoints, DTOs, and status codes
- tests
- assumptions for anything the feature request leaves open
- removal of the sample Note module, its Prisma model, and a migration that drops the Note table, when Note is still present

Ask a question only when the feature cannot be built without the answer. Otherwise choose the smaller option and list it under Assumptions.


## After the plan is accepted

Implement only that plan.

Match src/modules/note: thin controller, business logic in the service, Prisma calls only in the service, DTOs for external input, a migration for every schema change, and tests for the new behavior.

Do not add dependencies or new layers unless the feature request requires them.
Do not change a test so that broken behavior passes.
Leave ASSIGNMENT.md unchanged unless the user asks to update it.
