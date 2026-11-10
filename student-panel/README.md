# SMART Student Panel — Textbook Content Development

## Run locally
1. Extract the ZIP.
2. Open the project folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.

This is the frontend-only Student Panel. No Supabase authentication, SQL, `.env`, or backend is required.

## Curriculum organization
Each Foundation has its own curriculum JSON and its own textbook PDF:
- Foundation 1 / Class 1: `src/curriculum/foundation1/class1.json` and `public/textbooks/foundation1/foundation-1-textbook.pdf`
- Foundation 2 / Class 2: `src/curriculum/foundation2/class2.json` and `public/textbooks/foundation2/foundation-2-textbook.pdf`
- Foundation 3 / Class 3: `src/curriculum/foundation3/class3.json` and `public/textbooks/foundation3/foundation-3-textbook.pdf`
- Foundation 4 / Class 4: `src/curriculum/foundation4/class4.json` and `public/textbooks/foundation4/foundation-4-textbook.pdf`

## Content provenance and status
- Foundation 1: lesson summaries, key learning points, examples and activities adapted from the supplied scanned textbook. This is adapted lesson content, not a verbatim transcription of every textbook page.
- Foundation 2: lesson summaries, key learning points, examples and activities adapted from the supplied Foundation 2 teacher-panel content. Consult its PDF for exact wording and illustrations.
- Foundation 3: topic-specific supplementary explanations, learning points, examples and practice activities have been added for the listed chapters/topics. The scanned PDF did not yield reliable text extraction in this pass, so these explanations are clearly labelled supplementary and must be checked against the textbook before being treated as textbook-derived content.
- Foundation 4: topic-specific supplementary explanations, learning points, examples and practice activities have been added for the listed chapters/topics. The scanned PDF did not yield reliable text extraction in this pass, so these explanations are clearly labelled supplementary and must be checked against the textbook before being treated as textbook-derived content.

The Student Panel displays the content provenance in the lesson view. It does not describe supplementary explanations as extracted textbook text.

## Other features retained
- Teacher Panel-inspired purple/lavender UI
- Four separate Foundation/Class selections
- Chapter and topic navigation
- Study Materials showing the selected Foundation's textbook only
- Clickable cartoon objects, gentle animations and mini learning game
- Browser-local lesson progress and notes


## Student Dashboard UI update
The Student Dashboard has been redesigned to align with the Teacher Panel visual language:
- Purple gradient sidebar with matching SMART branding and active navigation.
- Top navigation with Foundation/Class selector and student profile.
- Student welcome hero panel.
- Four learning summary cards.
- Today's Learning card showing the next incomplete topic in the selected Foundation.
- Quick Actions for lessons, practice, tests and study materials.
- Chapter progress list and overall progress ring.
- Responsive layouts for desktop, tablet and mobile.

The dashboard reads the existing local curriculum JSON files and browser-local progress. It does not require Supabase or authentication.

## Install and run
```bash
npm install
npm run dev
```
