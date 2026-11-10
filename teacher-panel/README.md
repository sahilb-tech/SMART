# VICO Teacher Panel — Frontend Milestone 1

This is the updated frontend based on the supplied `VICO-Teacher-Dashboard-Separate-Pages.zip`.

## Run locally

1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. Open a terminal in this folder and run:
   ```bash
   npm install
   ```
   Installs the dependencies listed in `package.json`.
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Starts the local frontend development server. Open the localhost URL printed by Vite.
5. Create a production build:
   ```bash
   npm run build
   ```
   Generates the production frontend in `dist/`.

## Implemented in this milestone

- Final seven-item sidebar: Dashboard, Teaching & Learning, Exercises, Periodic Tests, Results & Progress, My Classes, Resource Library.
- Teaching & Learning contains Curriculum, Teaching Mode, Resources, and Teaching History tabs.
- Study Material has been renamed Resource Library.
- Shared Foundation and Class selectors remain in the top bar.
- Global Add New modal supports Study Material, Lesson Note, Exercise, Periodic Test, and Question Bank Item records.
- Study Material records created in the modal appear in Resource Library and are persisted in browser localStorage.
- Search and resource-type filtering are available in Resource Library.
- Responsive styling retains the existing purple VICO design language.

## Important limitations

This is a frontend prototype. It does not include a backend, database, authentication, server-side authorization, real file upload/storage, student synchronization, or real assessment submission/grading. The selected file's name is recorded in browser storage, but the file bytes are not uploaded or retained. Dashboard counts and existing sample records remain illustrative. Do not use this prototype to store sensitive student information.

## Curriculum correction

- Foundation 1 now uses the textbook shown in the user's reference: **The Super Machine: Computer**, with its nine chapters beginning with Chapter 1 — The Super Machine: Computer.
- Foundation 2 retains the separate nine-chapter structure beginning with **More About a Computer**.
- Foundations 3 and above display a not-configured message rather than borrowing another Foundation's textbook.
- Completion figures are explicitly marked as not recorded; the earlier misleading 50% sample progress was removed from the curriculum view.
- Topic names are transcribed from the supplied screenshot where legible; confirm exact punctuation/wording against the official Foundation 1 PDF before publishing.


## Foundation curriculum mapping
- Foundation 1 maps to Class 1 and uses **The Super Machine: Computer** (Chapter 1: The Super Machine: Computer through Chapter 9: Introduction to AI and Robotics).
- Foundation 2 maps to Class 2 and uses **Mastering Coding: AI and Robotics** (Chapter 1: More About a Computer through Chapter 9: AI and Robotics).
- Foundation 3 maps to Class 3 and Foundation 4 maps to Class 4. Their curriculum is intentionally unconfigured; the Teaching & Learning page shows an Add Content action instead of borrowing another Foundation's chapters.
- The top bar has one combined Foundation/Class selector. Sections remain managed inside My Classes and class-specific workflows.


## Digital textbook lesson presentation
Foundation 1 Chapter 1 lesson content is reconstructed into readable text blocks and individual illustration cards. The original scanned full-page image is no longer used as the primary lesson display. Illustration crops are taken from the supplied textbook pages and displayed beside their labels and explanations. Chapter 1 source coverage currently includes: What is a Machine?, Is Computer a Machine?, Types of Machines, and Types of Computers. Other chapters remain awaiting their official source PDFs; do not invent their textbook text or artwork.


## Foundation 1 — complete textbook chapter integration
The uploaded `foundation 1 class 1.zip` contains nine scanned chapter PDFs. The frontend now includes digital lesson content for chapters 2–9 based on OCR review of those source PDFs. Lesson content is presented as editable text, key points, classroom activities, and separate visual cards rather than embedding full-page scans. Some illustrations are lightweight visual symbols in this frontend prototype; replace them with approved, individually extracted or commissioned cartoon assets during the visual asset pass. The official chapter PDFs remain the source of truth.


Each Foundation 1 Chapter 1–9 lesson has an `Original PDF` link in the topic viewer. Source PDFs are bundled under `public/textbook/foundation1/chapters/`. Digital lesson cards use textbook-derived explanations, key points, and activities. Visual emoji cards are temporary visual stand-ins for bespoke cartoon illustrations; the first chapter retains its individually cropped illustrations.


## Foundation 2 — Class 2 textbook integration
The supplied `Foundation 2.pdf` has been assigned to **Foundation 2 → Class 2** as requested. The book contains nine chapters: More About a Computer; Applications of Computers; Keyboard and Mouse; Parts of a Computer; IPO Cycle; Fun with Tux Paint; Sequencing and Decoding; Instructions and Direction Sense; and AI and Robotics. Chapter/topic lesson cards include textbook-aligned explanations, key points, classroom activities, and separate concept illustration cards. The full supplied PDF is bundled at `public/textbook/foundation2/class2/foundation-2-class-2-textbook.pdf` and is available from the topic viewer's Original textbook PDF link. The cover image in the supplied PDF says Foundation 1; the application catalogue assignment follows the user's explicit instruction to place this uploaded file under Foundation 2 → Class 2.

Foundation 2 lesson content is adapted from the uploaded 49-page scanned textbook. Some fine-print details in the scan are low-resolution; where exact wording was unclear, lesson cards use concise paraphrases of clearly legible concepts rather than claiming verbatim transcription. The current illustration cards are individual concept visuals, not full-page PDF screenshots. Bespoke textbook-style cartoon artwork can be added in a separate art pass.


## VICO Teacher Panel — unified UI standard
All seven teacher destinations follow a shared purple-and-white, child-friendly card system: Dashboard, Teaching & Learning, Exercises, Periodic Tests, Results & Progress, My Classes, and Resource Library. Shared patterns include consistent page headers and context strips, pastel icon tiles, rounded cards, soft borders/shadows, status pills, progress bars, compact metadata, responsive grids, and consistent primary/secondary actions. Teaching & Learning remains chapter/topic oriented; Exercises remains assignment/question oriented; Periodic Tests remains a separate formal assessment destination.


## Digital Classroom milestone
Teaching Mode now includes a teacher-led classroom session flow: start/end session controls, lesson-level presentation mode, keyboard navigation with Left/Right arrows and Escape, class discussion prompts derived from the selected lesson's supplied key points, activity guidance, topic-specific teacher notes saved locally in the browser, and completed-session history. Topic completion remains separately tracked from lesson-session history. These are frontend/local-browser capabilities; live projector casting, student-device synchronization, real-time responses, multi-user persistence, and server-backed analytics require a backend/realtime integration and are not represented as completed features.


## Curriculum PPT presentation section — current development update
- Added a chapter-wise **PPT Presentations** section inside Curriculum for Foundation 1 and Foundation 2.
- Each available topic presentation is linked to its textbook chapter and opens a four-slide preview: title, explanation, key learning points, and classroom activity.
- Slide content is drawn from the lesson data already present in the project; topics without supported lesson content are labelled as awaiting content rather than fabricated.
- Added **PPT presentation** as a content type in the global Add New workflow so teachers can catalogue a presentation against the selected Foundation/Class and chapter/topic.
- This is a frontend slide-preview prototype, not a generated downloadable `.pptx` file. Uploaded file bytes are not sent to a server or persisted; the current prototype records metadata only.

## Live classroom status
The teacher-side session controls remain a local frontend prototype. Permanent student accounts, student panel attendance, shared live lesson state, real-time slide synchronization, and student responses require backend authentication, database persistence, and a real-time service. They are not implemented by this frontend-only milestone.

## Full VICO Teacher Panel scope
See [`docs/VICO-TEACHER-PANEL-IMPLEMENTATION-SPEC.md`](docs/VICO-TEACHER-PANEL-IMPLEMENTATION-SPEC.md) for the complete seven-page product scope, confirmed permanent student account and side-by-side live teaching workflow, curriculum mappings, PPT requirements, system-wide requirements, phased delivery plan, and unresolved decisions. The current app remains a frontend prototype; production authentication, live multi-device sync, file storage, and authoritative assessment/progress data require backend services.
