# VICO Teacher Panel — Phase 1 Frontend Status

## Scope
Phase 1 is the frontend foundation for the seven-page teacher workspace. This is a client-side prototype and must not be represented as a production-connected classroom system.

## Seven primary pages
1. Dashboard — teaching overview, quick actions, class summary, upcoming tests, progress, pending work, and recent activity.
2. Teaching & Learning — Curriculum, Teaching Mode, Resources, and Teaching History.
3. Exercises — exercise library, search/filter, draft creation, and evaluation queue presentation.
4. Periodic Tests — assessment schedule, draft creation, and preparation checklist.
5. Results & Progress — overview, class performance, student support, and assessment results presentation.
6. My Classes — assigned class cards, student counts, curriculum context, and class search.
7. Resource Library — textbook and resource cards, search/filter, preview/open actions, and shared-resource presentation.

## Curriculum requirements represented in the frontend
- Foundation 1 · Class 1: The Super Machine: Computer; nine chapters ending with Introduction to AI and Robotics.
- Foundation 2 · Class 2: Mastering Coding: AI and Robotics; nine chapters beginning with More About a Computer and ending with AI and Robotics.
- Foundation 3 · Class 3 and Foundation 4 · Class 4: placeholders for future curriculum content.
- Foundation-specific progress is stored separately in browser local storage.
- Topic-linked PPT preview is available for topics with lesson content in the current source data.

## Current frontend interactions
- Sidebar navigation between all seven pages.
- Foundation/Class context selector.
- Curriculum chapter expansion, topic opening, progress marking, and lesson presentation mode.
- Topic-linked four-slide PPT preview with slide navigation.
- Teaching session start/end and local teaching-history records.
- Teacher notes saved locally.
- Exercise and periodic-test draft creation dialogs.
- Resource search/filter and global Add New content dialog.

## Explicit prototype limitations
- No server-side authentication or admin-created permanent student accounts yet.
- No real-time Teacher Panel ↔ Student Panel synchronization yet.
- No server file upload; the global Add New workflow records metadata locally in the browser.
- Exercise/test question authoring, assignment, student submissions, evaluation, and publication are not backend-connected.
- Sample dashboard metrics and sample class/student counts are demonstration data, not live records.
- localStorage is prototype persistence only; it is not a multi-user database.
- Offline behavior and curriculum editing permissions remain open product decisions.

## Verification
- Source files are maintained as a Vite + React application.
- Dependency installation was attempted but did not complete in this environment; therefore a production build and browser QA are still pending.
- Before merging, run `npm install`, `npm run build`, and `npm run dev` on a machine with registry access, then test all seven routes and responsive breakpoints.
