# Sidebar Migration Plan

Migrate the sidebar from vanilla DOM manipulation to Preact components, with UI/UX improvements.

## Current State

`src/components/sidebar.ts`:
- ~400 lines of manual DOM creation
- Module-level state for expanded subject
- Full re-render on every route change
- Progress calculation inline during render

## Target Component Structure

```
src/components/preact/sidebar/
  Sidebar.tsx           # Main container, mobile handling
  Nav.tsx               # Top navigation links
  SubjectList.tsx       # Grouped by year/semester
  SubjectItem.tsx       # Single subject with expand/collapse
  TopicList.tsx         # Topics, quizzes, exercises when expanded
  ProgressRing.tsx      # Circular progress indicator (reusable)
  index.ts
```

## Component Breakdown

### Sidebar.tsx
- Props: `currentPath`, `subjects`, `userProgress`
- Handles mobile open/close state
- Renders Nav + SubjectList
- Subscribes to route changes via context or prop

### Nav.tsx
- Props: `currentPath`
- Static links: Home, Curriculum, Progress, Settings, Export
- Highlights active link

### SubjectList.tsx
- Props: `subjects`, `userProgress`, `currentPath`, `expandedSubjectId`, `onExpandSubject`
- Groups subjects by year
- Renders collapsible year sections
- Maps subjects to SubjectItem

### SubjectItem.tsx
- Props: `subject`, `progress`, `isActive`, `isExpanded`, `onToggle`
- Shows subject code, title, progress ring
- Expand/collapse animation
- When expanded, renders TopicList

### TopicList.tsx
- Props: `subject`, `progress`, `quizzes`, `exercises`, `exams`, `projects`
- Lists topics with completion checkmarks
- Lists assessments with status indicators
- Handles navigation on click

### ProgressRing.tsx
- Props: `percentage`, `size`, `strokeWidth`
- SVG circular progress indicator
- Reusable across sidebar and other pages

## State Management

```tsx
// In Sidebar.tsx
const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(null);
const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set([1]));

// Auto-expand based on current route
useEffect(() => {
  const subjectMatch = currentPath.match(/\/subject\/([^/]+)/);
  if (subjectMatch) {
    setExpandedSubjectId(subjectMatch[1]);
  }
}, [currentPath]);
```

## UI/UX Improvements

### 1. Animated expand/collapse
```css
.topic-list {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 200ms ease-out;
}
.topic-list.expanded {
  grid-template-rows: 1fr;
}
.topic-list-inner {
  overflow: hidden;
}
```

### 2. Progress at a glance
- Show small progress ring next to each subject (not just when expanded)
- Color code: gray (not started), amber (in progress), green (completed)
- Show "3/7 topics" text on hover or always

### 3. Better visual hierarchy
- Indent topics under subjects more clearly
- Use subtle background color for expanded subject
- Add icons for topic types (📖 lesson, 📝 quiz, 💻 exercise, 📋 exam)

### 4. Quick filters
```tsx
// At top of subject list
<div class="sidebar-filters">
  <button class="filter-btn active">All</button>
  <button class="filter-btn">In Progress</button>
  <button class="filter-btn">Completed</button>
</div>
```

### 5. Keyboard navigation
- Arrow keys to move between subjects
- Enter to expand/collapse
- Escape to collapse and return to subjects list

### 6. Search subjects
```tsx
<input
  type="search"
  placeholder="Search subjects..."
  class="sidebar-search"
  onInput={(e) => setSearchQuery(e.target.value)}
/>
```
Filter subjects by title, code, or topic names.

### 7. Current topic indicator
When viewing a topic, show a "You are here" indicator or highlight in the sidebar, not just the subject.

### 8. Completion celebrations
Brief confetti or checkmark animation when completing a subject (optional, could be annoying).

## Migration Steps

### Phase 1: Foundation
1. Create `src/components/preact/sidebar/` directory
2. Create ProgressRing.tsx (standalone, testable)
3. Create Nav.tsx (simple, no state)

### Phase 2: Subject components
4. Create SubjectItem.tsx with expand/collapse
5. Create TopicList.tsx for expanded content
6. Create SubjectList.tsx to compose them

### Phase 3: Main sidebar
7. Create Sidebar.tsx
8. Handle mobile menu state
9. Wire up to router for currentPath

### Phase 4: Integration
10. Update `main.ts` to render Preact Sidebar instead of calling `renderSidebar()`
11. Remove old `sidebar.ts` after verification
12. Test all navigation paths

### Phase 5: Polish
13. Add animations
14. Add search/filter
15. Add keyboard navigation
16. Test mobile behavior

## Data Flow

```
main.ts
  └── renders Sidebar with props:
        - subjects (from curriculum)
        - userProgress (from storage)
        - currentPath (from router)

Sidebar
  └── Nav (currentPath)
  └── SubjectList
        └── SubjectItem[]
              └── TopicList (when expanded)
```

Progress updates: When a quiz/exercise is completed, the parent re-renders with new `userProgress`. React's diffing ensures only affected SubjectItems re-render.

## Open Questions

1. **Router integration**: Pass currentPath as prop, or use a context/hook?
2. **Progress subscription**: Re-render on storage change, or let parent handle?
3. **Mobile menu**: Keep current CSS-based approach, or manage in React state?
4. **Year grouping**: Collapsible years, or always show all?

## Estimated Effort

- Phase 1-2: Small (2-3 components, straightforward)
- Phase 3-4: Medium (integration, testing all routes)
- Phase 5: Small-Medium (polish features are incremental)

Total: Could be done incrementally over several sessions.
