# VICO Teacher Panel — Product & Implementation Specification

## Product purpose
VICO Teacher Panel is a teacher-led digital teaching workspace. Teachers prepare and deliver textbook-aligned lessons, use visual explanations and PPT presentations, run classroom activities, assign exercises, conduct periodic tests, evaluate student work, and review learning progress. It is not primarily a school administration dashboard.

## Confirmed classroom operating model
- Admin creates permanent student accounts and assigns each student to the appropriate Foundation/Class/section.
- Students sign in to the Student Panel using their permanent accounts.
- Teachers teach from the Teacher Panel. Students attend the ongoing lesson through their Student Panel side by side; do not make a separate QR/PIN join or a mandatory Join Live Class action the core workflow.
- The teacher starts and controls the lesson. The current lesson, topic and presentation slide are synchronized to assigned students in real time.
- Students can view the lesson, participate verbally, complete digital activities and submit answers. Students do not independently control shared lesson navigation.
- Real-time multi-device synchronization requires a backend real-time service. LocalStorage is only suitable for prototype/local drafts, not authoritative student records, permissions, assessment data or classroom state.

## Navigation — exactly seven main pages
1. Dashboard (`/`)
2. Teaching & Learning (`/teaching-learning`)
3. Exercises (`/exercises`)
4. Periodic Tests (`/periodic-tests`)
5. Results & Progress (`/results-progress`)
6. My Classes (`/my-classes`)
7. Resource Library (`/resource-library`)

## Page requirements

### 1. Dashboard
- Teacher profile and selected Foundation/Class.
- Today's teaching schedule and next lesson.
- Continue Teaching / resume previous lesson.
- Start Teaching quick action.
- Lessons and topics completed.
- Upcoming exercises and periodic tests.
- Pending student submissions/evaluation.
- Recent teaching activity.
- Quick actions: Create Exercise, Create Test, Add Material.
- Clearly distinguish selected-class metrics from teacher-wide metrics.

### 2. Teaching & Learning
Contains exactly four internal tabs: Curriculum, Teaching Mode, Resources, Teaching History.

#### Curriculum
- Foundation/Class selector and textbook/edition selection.
- Chapter cards with child-friendly cartoon illustrations.
- Expandable topic lists, chapter/topic progress, lesson preview and Start Teaching.
- Dedicated chapter-wise and topic-wise PPT Presentations section.
- PPT preview, projector/full-screen mode, previous/next slide, teacher-controlled navigation and student-device synchronization.
- PPTs must be linked to their relevant textbook chapter/topic. Teacher-uploaded PPTs should be supported subject to file handling and permissions.

Curriculum mappings:
- Foundation 1 · Class 1: “The Super Machine: Computer” through “Introduction AI Robotics”; keep its nine chapters mapped only to Foundation 1.
- Foundation 2 · Class 2: “More About a Computer” through “AI and Robotics”; keep its nine chapters mapped only to Foundation 2.
- Foundation 3 · Class 3: placeholder/add-content state until official curriculum is provided.
- Foundation 4 · Class 4: placeholder/add-content state until official curriculum is provided.
- Never mix Foundation 1 and Foundation 2 books, chapters, lesson text, PPTs or progress.

#### Teaching Mode
Each topic should support, when grounded in source textbook content: topic introduction, simple explanation, cartoon illustration, real-world examples, key learning points, classroom activity, Ask the Students prompt, quick practice questions and learning outcomes.

Teacher controls: previous/next topic, Present to Class, start/end classroom session, full-screen presentation, show/hide answer, teacher notes, mark as taught and keyboard navigation.

#### Resources
- Chapter-related PDFs, videos, images, audio, presentations and supplementary resources.
- Preview, search and filtering.
- Associate resources with Foundation, Class, chapter and topic.
- Clearly distinguish official curriculum resources from teacher-supplied supplementary resources.

#### Teaching History
- Completed teaching sessions, Foundation/Class, chapter/topic, date, duration and taught status.
- Resume previous lesson/session.

### 3. Exercises
- Exercise library and Create Exercise workflow.
- Chapter/topic association and shared question bank.
- Assign to selected classes/students.
- Student submissions, evaluation queue, feedback, marks and publish results.
- Question types: MCQ, true/false, fill in the blanks, matching, short answer, image-based and practical activities.

### 4. Periodic Tests
- Periodic Test 1 and Periodic Test 2.
- Create/edit tests, chapter/topic coverage, question paper builder, marks, duration and schedule.
- Student attempts, automatic/manual evaluation and publish results.
- Keep formal tests distinct from practice exercises while reusing the shared question bank.

### 5. Results & Progress
- Individual student performance, chapter/topic progress, exercise and periodic-test results, class performance, learning gaps, teacher feedback and reports.
- Track topic completion separately from learning mastery/understanding.

### 6. My Classes
- Assigned Foundation/Class/sections, student directory and profiles, student learning activity, class progress, announcements and classroom participation.
- Enforce teacher access permissions for assigned classes and students.
- Attendance is not a primary feature in this phase.

### 7. Resource Library
- Central library for official textbooks, supplementary PDFs, PPTs, cartoon illustrations, videos, audio, worksheets, presentations and external links.
- Search/filter, preview/reuse and Foundation/Class/chapter/topic association.
- Distinguish official curriculum material from teacher supplementary material.

## System-wide requirements
- Consistent purple-and-white VICO UI, persistent sidebar and responsive teacher desktop/projector and student tablet/mobile layouts.
- Shared curriculum/content model across Teacher and Student Panels.
- Admin, Teacher and Student roles with secure authentication and class-scoped permissions.
- Real-time classroom state and student response service.
- Shared question bank for Exercises and Periodic Tests.
- Centralized progress, notifications and autosave.
- Secure student information, reliable error handling and weak-network recovery.
- Offline behavior must be specified before implementation; do not imply offline support until implemented and tested.

## End-to-end workflow
Dashboard → Teaching & Learning → select Foundation/Class → textbook → chapter → topic → lesson/PPT → teacher-led live teaching with Student Panel synchronization → Exercises → Periodic Tests → Results & Progress.

## Delivery phases
1. Seven-page UI/UX and navigation.
2. Curriculum, textbook, chapter and topic model.
3. Teaching Mode, textbook-grounded lesson content and PPT.
4. Live classroom and Teacher Panel–Student Panel synchronization.
5. Exercises and Periodic Tests.
6. Results & Progress and My Classes.
7. Resource Library integration, testing, security and optimization.

## Decisions still open — do not assume
- Offline support strategy.
- Illustration policy: bespoke illustration for every topic vs custom artwork for key topics plus reusable assets.
- Curriculum ownership/edit permissions: admin-only official curriculum vs teacher editing rights. Recommended safe default pending approval: admins own and publish official curriculum; teachers may add supplementary resources without altering official textbook content.

## Implementation status and honesty rules
The current project is a frontend prototype. LocalStorage-backed drafts/progress and mock/sample metrics are not a production backend. Permanent student account provisioning, cross-device live synchronization, server file upload/storage, authoritative assessment workflows, notifications and secure role-based APIs require backend integration and testing. Any sample/illustrative data must be labelled as such. Textbook lesson content must be supported by provided source files; do not invent missing textbook material.
