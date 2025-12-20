# Accessibility (A11y)

## Introduction

Accessibility ensures that everyone can use your application effectively, regardless of their abilities or disabilities. Building accessible software is both an ethical imperative and a practical necessity—approximately 15% of the world's population experiences some form of disability, and accessibility improvements often benefit all users, not just those with disabilities. Furthermore, many countries have legal requirements for digital accessibility, and accessible applications rank better in search engines.

Accessibility isn't an add-on feature you implement at the end; it must be considered from the beginning of your design and development process. The Web Content Accessibility Guidelines (WCAG) provide a comprehensive framework for accessible web development, organized around four principles: content must be Perceivable, Operable, Understandable, and Robust (POUR). Your capstone project should demonstrate awareness of accessibility principles and implement meaningful accommodations that make your application usable by diverse users.

## Understanding Accessibility Principles

Accessibility encompasses many dimensions, each addressing different types of disabilities and interaction patterns.

### Visual Accessibility

Visual accessibility accommodates users who are blind, have low vision, or have color vision deficiencies. Blind users typically navigate using screen readers that convert visual content to speech or Braille. Screen readers rely on semantic HTML, ARIA attributes, proper heading hierarchy, and descriptive alternative text to understand page structure and content.

Color contrast is critical for users with low vision or color blindness. WCAG requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. Never rely solely on color to convey information—use text labels, icons, or patterns in addition to color. Ensure your application is fully usable when zoomed to 200% without horizontal scrolling.

Provide text alternatives for all non-text content. Images need alt text that describes their content and purpose. Decorative images should have empty alt attributes (`alt=""`) so screen readers skip them. Complex images like charts or diagrams need extended descriptions. Video content requires captions and audio descriptions.

### Motor Accessibility

Motor accessibility serves users with limited dexterity, tremors, or paralysis. Keyboard navigation is essential—every interactive element must be reachable and operable using only a keyboard. The tab key should move through elements in a logical order, Enter and Space should activate buttons, and Escape should close dialogs.

Provide adequate target sizes for clickable elements—WCAG recommends at least 44x44 pixels. Avoid interfaces that require precise mouse movements or drag-and-drop without keyboard alternatives. Implement skip links that allow keyboard users to bypass repetitive navigation. Ensure focus indicators are clearly visible so users know where they are.

Consider voice control users who navigate by speaking element labels. Use descriptive, unique labels for interactive elements. Avoid generic labels like "Click here" or "Learn more" that don't distinguish elements.

### Auditory Accessibility

Auditory accessibility accommodates deaf and hard-of-hearing users. Provide captions for all audio content, including video dialogue, narration, and important sound effects. Live captions enable participation in real-time events. Transcripts provide an alternative way to consume audio content and improve SEO.

Don't rely solely on audio cues for important information. Provide visual alternatives for audio notifications, alarms, or feedback. In video calls or live streams, consider sign language interpretation for critical content.

### Cognitive Accessibility

Cognitive accessibility helps users with learning disabilities, attention deficits, memory challenges, or processing limitations. Use clear, simple language and provide plenty of white space. Break complex tasks into manageable steps with progress indicators. Avoid time limits or provide options to extend them.

Maintain consistent navigation and layout across your application. Use familiar UI patterns and provide clear feedback for actions. Allow users to reverse actions, prevent errors through validation and confirmation dialogs, and provide helpful error messages that suggest corrections.

### ARIA (Accessible Rich Internet Applications)

ARIA provides additional semantic information that standard HTML elements can't express. ARIA roles describe what an element is (button, dialog, navigation), ARIA properties provide characteristics (aria-label, aria-describedby), and ARIA states communicate dynamic changes (aria-expanded, aria-selected).

However, ARIA should complement, not replace, semantic HTML. Use native HTML elements when possible—a `<button>` is better than a `<div role="button">`. ARIA is most valuable for custom widgets, dynamic content updates, and complex interface patterns that don't have native HTML equivalents.

## Practical Implementation

### Semantic HTML and ARIA

```typescript
// Bad: Non-semantic div button
<div class="button" onclick="handleClick()">Submit</div>

// Good: Semantic button element
<button type="submit" onClick={handleClick}>Submit</button>

// Accessible navigation with landmarks
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</header>

<main>
  <article aria-labelledby="article-title">
    <h1 id="article-title">Article Title</h1>
    <p>Article content...</p>
  </article>
</main>

<aside aria-label="Related content">
  <h2>Related Articles</h2>
  <ul>...</ul>
</aside>

<footer>
  <nav aria-label="Footer navigation">
    <ul>...</ul>
  </nav>
</footer>

// Accessible form with proper labels and error messages
function AccessibleForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address');
      return;
    }
    // Submit form
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Contact form">
      <div>
        <label htmlFor="email-input">
          Email Address
          <span aria-label="required">*</span>
        </label>
        <input
          id="email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-required="true"
          aria-invalid={!!emailError}
          aria-describedby={emailError ? 'email-error' : undefined}
        />
        {emailError && (
          <div id="email-error" role="alert" className="error">
            {emailError}
          </div>
        )}
      </div>
      <button type="submit">Submit Form</button>
    </form>
  );
}
```

### Keyboard Navigation

```typescript
// Accessible dropdown menu with keyboard navigation
function AccessibleDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const options = ['Option 1', 'Option 2', 'Option 3'];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        if (!isOpen) {
          e.preventDefault();
          setIsOpen(true);
          setSelectedIndex(0);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setSelectedIndex(0);
        } else {
          setSelectedIndex((prev) => (prev + 1) % options.length);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setSelectedIndex((prev) => (prev - 1 + options.length) % options.length);
        }
        break;
      case 'Home':
        if (isOpen) {
          e.preventDefault();
          setSelectedIndex(0);
        }
        break;
      case 'End':
        if (isOpen) {
          e.preventDefault();
          setSelectedIndex(options.length - 1);
        }
        break;
    }
  };

  const handleOptionClick = (index: number) => {
    console.log(`Selected: ${options[index]}`);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div className="dropdown">
      <button
        ref={buttonRef}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen(!isOpen)}
      >
        Select an option
      </button>

      {isOpen && (
        <ul
          ref={menuRef}
          role="listbox"
          aria-activedescendant={selectedIndex >= 0 ? `option-${selectedIndex}` : undefined}
        >
          {options.map((option, index) => (
            <li
              key={option}
              id={`option-${index}`}
              role="option"
              aria-selected={index === selectedIndex}
              onClick={() => handleOptionClick(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOptionClick(index);
                }
              }}
              tabIndex={-1}
              className={index === selectedIndex ? 'selected' : ''}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Focus Management

```typescript
// Accessible modal dialog with focus trap
function AccessibleModal({ isOpen, onClose, title, children }: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus first focusable element in modal
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    } else {
      // Restore focus when modal closes
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }

    // Trap focus within modal
    if (e.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <h2 id="modal-title">{title}</h2>
        {children}
        <button onClick={onClose} aria-label="Close dialog">
          Close
        </button>
      </div>
    </div>
  );
}
```

### Screen Reader Announcements

```typescript
// Live region for dynamic content updates
function LiveRegionAnnouncer() {
  const [announcement, setAnnouncement] = useState('');

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncement(message);

    // Clear after announcement
    setTimeout(() => setAnnouncement(''), 1000);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}

// Usage in components
function SearchResults({ results }: { results: any[] }) {
  const announceRef = useRef<(msg: string) => void>();

  useEffect(() => {
    if (results.length > 0) {
      announceRef.current?.(`Found ${results.length} results`);
    } else {
      announceRef.current?.('No results found');
    }
  }, [results]);

  return (
    <div>
      <LiveRegionAnnouncer ref={announceRef} />
      <ul aria-label="Search results">
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}

// Skip link for keyboard navigation
function SkipLink() {
  return (
    <a
      href="#main-content"
      className="skip-link"
      style={{
        position: 'absolute',
        left: '-9999px',
        top: '0',
        '&:focus': {
          left: '0',
          zIndex: 999
        }
      }}
    >
      Skip to main content
    </a>
  );
}
```

### Color Contrast and Visual Design

```typescript
// Color contrast checker utility
function checkContrast(foreground: string, background: string): {
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
} {
  const getLuminance = (color: string): number => {
    // Convert hex to RGB
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    // Calculate relative luminance
    const rsRGB = r / 255;
    const gsRGB = g / 255;
    const bsRGB = b / 255;

    const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
    const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
    const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

    return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  const ratio = (lighter + 0.05) / (darker + 0.05);

  return {
    ratio,
    passesAA: ratio >= 4.5,
    passesAAA: ratio >= 7
  };
}

// CSS for accessible focus indicators
const accessibleStyles = `
  /* Clear focus indicators */
  *:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    button {
      border: 2px solid currentColor;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Screen reader only text */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;
```

## Key Takeaways

- Use semantic HTML elements that convey meaning to assistive technologies
- Ensure all interactive elements are keyboard accessible with visible focus indicators
- Provide text alternatives for all non-text content (images, videos, audio)
- Maintain sufficient color contrast (minimum 4.5:1 for normal text)
- Never rely solely on color to convey information
- Implement proper heading hierarchy (h1, h2, h3) for document structure
- Use ARIA attributes to enhance semantics when HTML alone is insufficient
- Test with screen readers (NVDA, JAWS, VoiceOver) to verify actual accessibility
- Provide captions and transcripts for multimedia content
- Design for keyboard navigation from the start, not as an afterthought

## Common Mistakes

### Mistake 1: Non-Semantic HTML

**Problem:** Using divs and spans with click handlers instead of semantic HTML elements, making content invisible to assistive technologies.

**Solution:** Use semantic HTML elements (`<button>`, `<nav>`, `<article>`, `<header>`, etc.) that convey meaning to assistive technologies. If you must use divs for styling, add appropriate ARIA roles, but prefer native elements when possible.

### Mistake 2: Missing or Poor Alt Text

**Problem:** Images without alt attributes or with meaningless alt text like "image" or the filename, preventing screen reader users from understanding content.

**Solution:** Write descriptive alt text that conveys the content and purpose of images. For decorative images, use empty alt (`alt=""`) so screen readers skip them. For complex images, provide extended descriptions using aria-describedby or longdesc.

### Mistake 3: Keyboard Navigation Traps

**Problem:** Modal dialogs, dropdowns, or custom widgets that trap keyboard focus or don't allow keyboard access at all, preventing keyboard users from navigating.

**Solution:** Implement proper keyboard event handlers (Enter, Space, Escape, Arrow keys). Ensure focus moves logically through interactive elements. Implement focus traps for modals that keep focus within the dialog until closed. Test all functionality using only a keyboard.

### Mistake 4: Insufficient Color Contrast

**Problem:** Low contrast between text and background makes content difficult or impossible to read for users with low vision or color vision deficiencies.

**Solution:** Use contrast checking tools to verify at least 4.5:1 contrast for normal text and 3:1 for large text. Don't rely solely on color to convey information—supplement with text, icons, or patterns. Test your application in grayscale to verify information isn't lost.

### Mistake 5: Dynamic Content Without Announcements

**Problem:** Updates to page content (search results loading, form errors appearing, notifications) that aren't announced to screen reader users, leaving them unaware of changes.

**Solution:** Use ARIA live regions (`aria-live="polite"` or `aria-live="assertive"`) to announce dynamic content changes. Implement status messages using `role="status"` or `role="alert"`. Move focus to new content when appropriate. Test with screen readers to verify announcements work as expected.
