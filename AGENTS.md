---

# Misti Cuy Architecture

This project follows a Feature First Architecture.

Every new functionality must belong to a feature.

Never place business components directly under src/components.

Only generic reusable UI components belong inside:

src/components

Feature-specific components belong inside:

src/features/<feature-name>

Example:

src/features/home/components

Never mix features.

---

# Design System

Always use the project's Design System.

Never hardcode:

- colors
- spacing
- border radius
- shadows
- transitions

Always use the exported design tokens.

Example:

theme.colors.primary

instead of

#7CB342

---

# Theme

Never hardcode colors.

Never hardcode spacing.

Never hardcode font sizes.

Always consume the Theme.

---

# Images

All public images must be stored inside:

public/assets/images

Structure:

public/assets/images/

hero/

story/

cuyes/

farm/

learning/

logos/

icons/

backgrounds/

Never create new folders without approval.

Never place images directly inside public/.

---

# Image Naming

Hero images

hero-home.png

hero-mis-cuyes.png

hero-aprende.png

Story images

chapter-001.png

chapter-002.png

chapter-003.png

Always use three digits.

Products

product-001.png

product-002.png

Never use names such as:

IMG001.jpg

photo.png

image-final.png

---

# Image Usage

Always use:

next/image

Never use HTML img.

Always provide:

alt

priority only for Hero images.

---

# Navigation

There is only one official Navigation component.

Never duplicate navigation.

Desktop and Mobile are managed by the Navigation module.

---

# Styling Rules

Prefer Tailwind utilities.

Avoid duplicated utility combinations.

Extract reusable UI when duplication appears.

---

# State Management

Prefer local state.

Avoid global state unless necessary.

Context should only be used for:

Navigation

Theme

Authentication

Future global settings

---

# Animations

Use Framer Motion.

Avoid CSS animation libraries.

Animations must be subtle.

Performance first.

---

# Story Engine

The Home page contains a Story Engine.

Every chapter is represented by:

Story

located in:

src/features/home/types/story.types.ts

Never hardcode chapters inside components.

All chapters must come from:

src/features/home/data/stories.ts

---

# Assets

Whenever possible use centralized asset maps.

Example:

src/assets/images.ts

Avoid repeating image paths throughout the project.

---

# Comments

Only use professional documentation blocks.

Avoid unnecessary inline comments.

Business rules may be documented.

UI code should be self explanatory.

---

# Future Backend

Never tightly couple UI to mock data.

Whenever mock data is required:

Place it inside:

data/

The UI must consume the data layer.

This will simplify future migration to APIs.

---

# Responsive Design

Mobile First.

Supported breakpoints:

Mobile

Tablet

Laptop

Desktop

Ultra Wide

Never create desktop-only layouts.

---

# Git

Never modify unrelated files.

Keep commits focused.

Avoid formatting unrelated code.

---

# Final Validation

Before completing any task verify:

✓ TypeScript passes

✓ ESLint passes

✓ No duplicated components

✓ Theme respected

✓ Design System respected

✓ Architecture respected

✓ Mobile responsive

✓ Desktop responsive

✓ Images optimized

✓ Imports cleaned

✓ No dead code

If any rule cannot be respected, explicitly explain why before finishing.
# Decision Policy

The AI must never introduce new libraries, architectural patterns, folder structures, naming conventions or technologies without explicit approval.

When an improvement is identified, propose it first.

Wait for approval before implementing it.