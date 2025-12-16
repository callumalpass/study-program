# Semantic HTML

Semantic HTML uses elements that clearly describe their meaning and purpose to both browsers and developers. Instead of relying on generic containers like `<div>` and `<span>`, semantic elements like `<header>`, `<article>`, and `<footer>` convey the role and structure of content. This approach improves accessibility, SEO, code maintainability, and creates more meaningful, understandable web pages.

## What is Semantic HTML?

Semantic HTML means using the right HTML element for the right purpose. Elements should describe the meaning of their content, not just how it should look.

```html
<!-- Non-semantic (bad) -->
<div class="header">
    <div class="navigation">
        <div class="nav-item">Home</div>
    </div>
</div>

<!-- Semantic (good) -->
<header>
    <nav>
        <a href="/">Home</a>
    </nav>
</header>
```

The semantic version is clearer, more accessible, and provides better structure for search engines and assistive technologies.

## Why Semantic HTML Matters

**Accessibility**: Screen readers and assistive technologies understand semantic elements, enabling better navigation and comprehension for users with disabilities.

**SEO**: Search engines use semantic structure to understand and rank content more effectively.

**Maintainability**: Code is easier to read and maintain when elements clearly indicate their purpose.

**Consistency**: Reduces the need for excessive class names and creates more standardized markup.

**Future-proofing**: Semantic HTML adapts better to new devices and technologies.

## The Header Element

The `<header>` element represents introductory content or navigational aids. It typically contains logos, navigation, search forms, or headings.

```html
<header>
    <img src="logo.png" alt="Company Logo">
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
    </nav>
</header>
```

Headers can be used in multiple contexts:

```html
<!-- Page header -->
<header>
    <h1>Website Name</h1>
    <nav><!-- navigation --></nav>
</header>

<!-- Article header -->
<article>
    <header>
        <h2>Article Title</h2>
        <p>By John Doe | Published: Jan 15, 2025</p>
    </header>
    <p>Article content...</p>
</article>

<!-- Section header -->
<section>
    <header>
        <h3>Section Title</h3>
        <p>Section introduction</p>
    </header>
</section>
```

## The Nav Element

The `<nav>` element represents a section of navigation links. It should contain major navigation blocks, not every group of links.

```html
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
```

### Multiple Navigation Sections

Pages can have multiple `<nav>` elements:

```html
<!-- Primary navigation -->
<nav aria-label="Primary navigation">
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
    </ul>
</nav>

<!-- Secondary navigation -->
<nav aria-label="Account navigation">
    <ul>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><a href="/logout">Logout</a></li>
    </ul>
</nav>

<!-- Footer navigation -->
<footer>
    <nav aria-label="Footer navigation">
        <ul>
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/terms">Terms</a></li>
        </ul>
    </nav>
</footer>
```

Use `aria-label` to distinguish between multiple navigation sections for screen reader users.

## The Main Element

The `<main>` element represents the dominant content of the page. Each page should have only one `<main>` element, and it shouldn't be nested inside `<article>`, `<aside>`, `<footer>`, `<header>`, or `<nav>`.

```html
<body>
    <header>
        <!-- Site header -->
    </header>

    <main>
        <!-- Primary page content -->
        <h1>Page Title</h1>
        <p>This is the main content of the page.</p>
    </main>

    <footer>
        <!-- Site footer -->
    </footer>
</body>
```

The `<main>` element helps assistive technologies identify and navigate to the primary content, skipping repeated elements like headers and navigation.

## The Article Element

The `<article>` element represents self-contained, independently distributable content. It should make sense on its own and could be syndicated or reused elsewhere.

```html
<article>
    <header>
        <h2>Understanding Semantic HTML</h2>
        <p>Published on <time datetime="2025-01-15">January 15, 2025</time></p>
        <p>By <a href="/author/jane">Jane Smith</a></p>
    </header>

    <p>Semantic HTML improves accessibility, SEO, and code maintainability...</p>

    <footer>
        <p>Tags: <a href="/tag/html">HTML</a>, <a href="/tag/semantics">Semantics</a></p>
    </footer>
</article>
```

### Common Article Use Cases

```html
<!-- Blog post -->
<article>
    <h2>Blog Post Title</h2>
    <p>Content...</p>
</article>

<!-- News article -->
<article>
    <h2>News Headline</h2>
    <p>Story...</p>
</article>

<!-- Forum post -->
<article>
    <header>
        <h3>Posted by User123</h3>
    </header>
    <p>Forum content...</p>
</article>

<!-- Product card -->
<article>
    <h3>Product Name</h3>
    <img src="product.jpg" alt="Product">
    <p>Description...</p>
    <button>Add to Cart</button>
</article>
```

Articles can be nested when they have a hierarchical relationship:

```html
<article>
    <h2>Blog Post</h2>
    <p>Main post content...</p>

    <!-- Comment as nested article -->
    <article>
        <h3>Comment by User</h3>
        <p>Comment content...</p>
    </article>
</article>
```

## The Section Element

The `<section>` element represents a thematic grouping of content, typically with a heading. It's a generic container for content that belongs together.

```html
<section>
    <h2>Our Services</h2>
    <p>We offer a wide range of services...</p>
</section>

<section>
    <h2>Contact Information</h2>
    <p>Email: info@example.com</p>
    <p>Phone: (555) 123-4567</p>
</section>
```

### Section vs Article vs Div

**Section**: Thematic grouping with a heading, part of a larger whole.

**Article**: Self-contained, independently distributable content.

**Div**: No semantic meaning, used purely for styling or scripting.

```html
<!-- Article containing sections -->
<article>
    <h1>Complete Guide to HTML</h1>

    <section>
        <h2>Introduction</h2>
        <p>HTML is...</p>
    </section>

    <section>
        <h2>Semantic Elements</h2>
        <p>Semantic HTML uses...</p>
    </section>

    <section>
        <h2>Best Practices</h2>
        <p>When writing HTML...</p>
    </section>
</article>
```

## The Aside Element

The `<aside>` element represents content tangentially related to the main content. It's often used for sidebars, pull quotes, advertising, or supplementary information.

```html
<main>
    <article>
        <h1>Main Article</h1>
        <p>Article content...</p>
    </article>

    <aside>
        <h2>Related Articles</h2>
        <ul>
            <li><a href="/article1">Related Article 1</a></li>
            <li><a href="/article2">Related Article 2</a></li>
        </ul>
    </aside>
</main>
```

### Aside Use Cases

```html
<!-- Sidebar -->
<aside>
    <h3>About the Author</h3>
    <p>John Smith is a web developer...</p>
</aside>

<!-- Pull quote -->
<aside>
    <blockquote>
        "Semantic HTML is essential for modern web development."
    </blockquote>
</aside>

<!-- Advertisement -->
<aside>
    <h4>Advertisement</h4>
    <!-- Ad content -->
</aside>

<!-- Related links -->
<aside>
    <h3>See Also</h3>
    <ul>
        <li><a href="/related">Related Topic</a></li>
    </ul>
</aside>
```

## The Footer Element

The `<footer>` element represents footer content for its nearest ancestor sectioning element or the entire page. It typically contains copyright information, contact details, or related links.

```html
<!-- Page footer -->
<footer>
    <p>&copy; 2025 Company Name. All rights reserved.</p>
    <nav>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
    </nav>
</footer>
```

Footers can be used in multiple contexts:

```html
<!-- Article footer -->
<article>
    <h2>Article Title</h2>
    <p>Content...</p>

    <footer>
        <p>Published: January 15, 2025</p>
        <p>Tags: HTML, Web Development</p>
    </footer>
</article>

<!-- Section footer -->
<section>
    <h2>Section Title</h2>
    <p>Content...</p>

    <footer>
        <p>Last updated: December 2025</p>
    </footer>
</section>
```

## Complete Semantic Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Semantic HTML Example</title>
</head>
<body>
    <header>
        <img src="logo.png" alt="Site Logo">
        <nav aria-label="Primary navigation">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/blog">Blog</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <header>
                <h1>Understanding Semantic HTML</h1>
                <p>
                    Published on <time datetime="2025-01-15">January 15, 2025</time>
                    by <a href="/authors/jane">Jane Smith</a>
                </p>
            </header>

            <section>
                <h2>What is Semantic HTML?</h2>
                <p>Semantic HTML uses elements that describe their meaning...</p>
            </section>

            <section>
                <h2>Benefits of Semantic HTML</h2>
                <ul>
                    <li>Improved accessibility</li>
                    <li>Better SEO</li>
                    <li>Easier maintenance</li>
                </ul>
            </section>

            <section>
                <h2>Common Semantic Elements</h2>
                <p>The most commonly used semantic elements include...</p>
            </section>

            <footer>
                <p>Tags:
                    <a href="/tag/html">HTML</a>,
                    <a href="/tag/semantics">Semantics</a>,
                    <a href="/tag/accessibility">Accessibility</a>
                </p>
            </footer>
        </article>

        <aside>
            <h3>Related Articles</h3>
            <ul>
                <li><a href="/html-basics">HTML Basics</a></li>
                <li><a href="/accessibility">Web Accessibility</a></li>
                <li><a href="/seo">SEO Best Practices</a></li>
            </ul>
        </aside>
    </main>

    <footer>
        <nav aria-label="Footer navigation">
            <ul>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/sitemap">Sitemap</a></li>
            </ul>
        </nav>
        <p>&copy; 2025 Web Development Guide. All rights reserved.</p>
    </footer>
</body>
</html>
```

## Other Semantic Elements

**time**: Represents dates and times:

```html
<time datetime="2025-01-15">January 15, 2025</time>
<time datetime="2025-01-15T14:30">Today at 2:30 PM</time>
```

**mark**: Highlights relevant text:

```html
<p>Search results for "<mark>semantic HTML</mark>"</p>
```

**figure and figcaption**: Images with captions:

```html
<figure>
    <img src="diagram.png" alt="HTML5 semantic elements diagram">
    <figcaption>Figure 1: HTML5 Semantic Elements</figcaption>
</figure>
```

**address**: Contact information:

```html
<address>
    Contact us at: <a href="mailto:info@example.com">info@example.com</a><br>
    123 Main Street, Springfield, IL 62701
</address>
```

## Semantic HTML Best Practices

**Use semantic elements first**: Before reaching for `<div>` or `<span>`, consider if a semantic element is more appropriate.

**One main per page**: Each page should have exactly one `<main>` element.

**Proper nesting**: Follow logical document structure and don't nest sectioning elements incorrectly.

**Headings hierarchy**: Use heading levels (h1-h6) in sequential order.

**ARIA when needed**: Use ARIA labels to provide additional context for assistive technologies.

**Test with screen readers**: Verify that your semantic structure works well with assistive technology.

## Common Mistakes

**Overusing div**: Using `<div>` when semantic elements would be more appropriate.

**Multiple main elements**: Only one `<main>` element should exist per page.

**Skipping heading levels**: Going from `<h1>` to `<h4>` without `<h2>` and `<h3>`.

**Using semantic elements for styling**: Choosing elements based on default styles rather than meaning.

**Forgetting alt text**: Images within semantic elements still need proper alt attributes.

## Conclusion

Semantic HTML is fundamental to creating accessible, maintainable, and SEO-friendly websites. By using elements like `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>`, you create clear document structure that benefits users, developers, and search engines alike. Always choose elements based on their semantic meaning, not their default appearance, and use CSS to control visual presentation.
