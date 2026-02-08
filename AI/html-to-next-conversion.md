# HTML to Next.js Structure Conversion Guide

## Overview

This guide converts HTML files to the Next.js App Router structure following the migration patterns from Vite + React to Next.js + React 19.

## HTML Analysis Process

### 1. Identify Page Structure
```bash
# Analyze HTML file structure
grep -E "<title|<h1|<h2|<nav|<main|<section" your-file.html
```

### 2. Map HTML Elements to Next.js Components

| HTML Element | Next.js Component | Location |
|-------------|------------------|----------|
| `<nav>` | Navigation | `app/components/shared/layout/Navigation/index.tsx` |
| `<header>` | Header | `app/components/pages/[PageName]/Header/index.tsx` |
| `<main>` | Page Content | `app/components/pages/[PageName]/index.tsx` |
| `<footer>` | Footer | `app/components/shared/layout/Footer/index.tsx` |
| Forms | Form Components | `app/components/shared/forms/` |

## Conversion Steps

### Step 1: Create Page Route
```typescript
// app/(routes)/[page-name]/page.tsx
import { PageName } from '@/components/pages/PageName'

export default function PageNameRoute() {
  return <PageName />
}

export const metadata = {
  title: 'Page Title - Your Site',
  description: 'Page description'
}
```

### Step 2: Convert HTML to React Components
```typescript
// app/components/pages/PageName/index.tsx
'use client'

import { Layout } from '@/components/shared/layout/Layout'
import { Header } from './Header'
import { Content } from './Content'

export function PageName() {
  return (
    <Layout>
      <Header />
      <Content />
    </Layout>
  )
}
```

### Step 3: Extract Reusable Components
```typescript
// app/components/shared/layout/Layout.tsx
'use client'

import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
```

### Step 4: Update HTML Attributes
```typescript
// Before
<div class="container">
  <a href="/about">About</a>
  <img src="/image.jpg" alt="Description">

// After
<div className="container">
  <Link href="/about">About</Link>
  <Image
    src="/image.jpg"
    alt="Description"
    width={500}
    height={300}
  />
```

## Common HTML Patterns to Next.js

### Navigation Menu
```html
<!-- HTML -->
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

```typescript
// Next.js
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav>
      <ul>
        <li>
          <Link href="/" className={pathname === '/' ? 'active' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className={pathname === '/about' ? 'active' : ''}>
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}
```

### Forms
```html
<!-- HTML -->
<form action="/submit" method="POST">
  <input type="text" name="name" required>
  <button type="submit">Submit</button>
</form>
```

```typescript
// Next.js
'use client'

import { useState } from 'react'

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

### Images
```html
<!-- HTML -->
<img src="/hero-image.jpg" alt="Hero" class="w-full">
```

```typescript
// Next.js
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Hero"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## File Structure After Conversion

```
app/
├── (routes)/
│   ├── page.tsx                    # Home route
│   ├── about/
│   │   └── page.tsx               # About route
│   └── contact/
│       └── page.tsx               # Contact route
├── components/
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Header/
│   │   │   │   └── index.tsx
│   │   │   └── index.tsx
│   │   ├── About/
│   │   │   └── index.tsx
│   │   └── Contact/
│   │       └── index.tsx
│   └── shared/
│       ├── layout/
│       │   ├── Layout/
│       │   │   └── index.tsx
│       │   ├── Header/
│       │   │   └── index.tsx
│       │   └── Footer/
│       │       └── index.tsx
│       └── forms/
│           └── ContactForm/
│               └── index.tsx
└── styles/
    └── globals.css
```

## Migration Checklist

### Pre-Conversion
- [ ] Analyze HTML structure and identify components
- [ ] Map HTML sections to React components
- [ ] Identify static vs dynamic content
- [ ] Plan component hierarchy

### Conversion Process
- [ ] Create route files for each page
- [ ] Convert HTML to React components
- [ ] Add 'use client' directives where needed
- [ ] Replace HTML attributes with React/Next.js equivalents
- [ ] Update links to use Next.js Link component
- [ ] Convert images to Next.js Image component
- [ ] Extract reusable components to shared directory

### Post-Conversion
- [ ] Test all routes and navigation
- [ ] Verify responsive design
- [ ] Check form functionality
- [ ] Validate SEO metadata
- [ ] Test performance optimizations

## Quick Reference

| HTML Element | Next.js Equivalent | Import |
|-------------|-------------------|---------|
| `<a href="">` | `<Link href="">` | `import Link from 'next/link'` |
| `<img>` | `<Image>` | `import Image from 'next/image'` |
| `class=""` | `className=""` | Built-in React |
| `onclick=""` | `onClick={}` | Built-in React |
| Forms | React state + handlers | `import { useState } from 'react'` |

## Tips for Success

1. **Start with layout components first** - Header, Footer, Navigation
2. **Convert one page at a time** - Test thoroughly before moving to next
3. **Extract reusable components early** - Avoid code duplication
4. **Use TypeScript interfaces** - Define props for all components
5. **Test responsive design** - Ensure mobile compatibility
6. **Optimize images** - Use Next.js Image for all images
7. **Add SEO metadata** - Include title, description for each page
