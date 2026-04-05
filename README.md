# Pith

Ultra-lightweight, semantic-first UI framework. Under 5KB total.

## What is Pith?

Pith is a minimal UI framework that styles native HTML elements directly. No complex class names, no build tools required, no dependencies. Just clean, semantic HTML that looks good out of the box.

## Why Pith?

Modern web development has become bloated. Pith is a response to that. It provides:

- Small size: Under 5KB minified and gzipped
- Zero dependencies: No npm packages, no frameworks
- Semantic HTML: Style native elements, not custom components
- Easy theming: CSS custom properties for everything
- Dark mode: Automatic support based on user preference
- Modern only: No legacy browser support means smaller code

## Quick Start

Add these two lines to your HTML:

```html
<link rel="stylesheet" href="https://raw.githubusercontent.com/kutt27/pith/main/dist/pith.min.css">
<script src="https://raw.githubusercontent.com/kutt27/pith/main/dist/pith.min.js"></script>
```

Then write normal HTML:

```html
<button>Click me</button>
<input type="text" placeholder="Enter text">
<dialog id="myDialog">
  <h2>Hello</h2>
  <button data-dialog-close>Close</button>
</dialog>
```

That's it. No classes needed for basic styling.

## What's Included

### CSS Components (6KB gzipped)

- Typography (headings, paragraphs, links, code)
- Buttons (multiple variants and sizes)
- Forms (inputs, textareas, selects, checkboxes)
- Tables (with hover and striped rows)
- Cards (content containers)
- Grid system (responsive layouts)
- Alerts (info, success, warning, danger)
- Badges (status indicators)
- Navigation (nav bars)
- Accordion (details/summary)
- Dialog (modals)
- Utility classes (spacing, text, display)

### JavaScript Components (2KB gzipped)

- Dropdowns (toggle menus)
- Tabs (switch between content)
- Tooltips (hover information)
- Toasts (notifications)
- Dialog helpers (open/close modals)

## Installation

### CDN

```html
<link rel="stylesheet" href="https://raw.githubusercontent.com/kutt27/pith/main/dist/pith.min.css">
<script src="https://raw.githubusercontent.com/kutt27/pith/main/dist/pith.min.js"></script>
```

### NPM

```bash
npm install pith-ui
```

### Download

Download the files from the repository and include them in your project.

## Documentation

See the full usage guide in `docs/USAGE.md` for detailed examples of every component.

See `docs/EXTENDING.md` to learn how to extend Pith with your own components.

## Examples

### Button Variants

```html
<button>Primary</button>
<button data-variant="secondary">Secondary</button>
<button data-variant="outline">Outline</button>
<button data-variant="ghost">Ghost</button>
<button data-variant="danger">Danger</button>
```

### Form

```html
<form>
  <label for="email">Email</label>
  <input type="email" id="email" placeholder="you@example.com">
  
  <label for="message">Message</label>
  <textarea id="message"></textarea>
  
  <button type="submit">Send</button>
</form>
```

### Grid Layout

```html
<div class="grid" data-cols="3">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

### Toast Notification

```javascript
Pith.toast('Hello, world!', 'success');
```

## Theming

Override CSS custom properties to customize the look:

```css
:root {
  --pith-primary: #2563eb;
  --pith-radius: 0.5rem;
  --pith-font-sans: 'Your Font', sans-serif;
}
```

## Browser Support

Works in all modern browsers. Internet Explorer is not supported.

## Philosophy

Pith follows these principles:

1. Semantic HTML first
2. Progressive enhancement
3. No dependencies
4. Small file size
5. Easy to understand
6. Easy to extend

## Building from Source

```bash
npm install
npm run build
```

This creates minified files in the `dist` directory.

## License

MIT

## Contributing

Contributions are welcome. Keep changes small and focused. Maintain the philosophy of simplicity and small size.

