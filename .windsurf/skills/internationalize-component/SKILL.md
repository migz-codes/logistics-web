---
name: internationalize-component
description: Guides the process of adding internationalization to React components using next-intl
---

# Internationalize Component Skill

This skill helps you add internationalization to React components using the next-intl system. It's a reusable capability that can be applied to any component in your codebase.

## What This Skill Does

Automates the process of converting hardcoded text in React components to use the next-intl translation system.

## Prerequisites
- Component should be in the codebase
- `messages/en.json` file should exist at `src/i18n/messages/en.json`
- Project should use next-intl

## Skill Execution Steps

### 1. Analyze the Component
// turbo
Read the target component file to identify all hardcoded text strings that need translation.

### 2. Add Translations to messages/en.json
// turbo
Add the identified text strings to the appropriate section in `src/i18n/messages/en.json`. Follow the existing structure:
- Use nested objects for related content (e.g., `form`, `info`, `hero`)
- Use camelCase for keys
- Group related translations together

### 3. Update Component Code
// turbo
Modify the component to use translations:
- Import `useTranslations` from `next-intl`
- Add translation hook: `const t = useTranslations('appropriate.section')`
- Replace hardcoded strings with `{t('key')}` calls
- For arrays/lists, use `t.raw('key')` when needed
- Update interfaces/props if needed to remove hardcoded text

### 4. Verify Translation Keys
// turbo
Check that all translation keys used in the component exist in `messages/en.json` and match exactly.

## Skill Usage Examples

### Before Applying Skill:
```tsx
export function HeroSection() {
  return (
    <section>
      <h1>Welcome to Our Service</h1>
      <p>Discover amazing features</p>
      <button>Get Started</button>
    </section>
  )
}
```

### After Applying Skill:
```tsx
'use client'

import { useTranslations } from 'next-intl'

export function HeroSection() {
  const t = useTranslations('home.hero')

  return (
    <section>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      <button>{t('getStarted')}</button>
    </section>
  )
}
```

### Skill-Generated JSON:
```json
{
  "home": {
    "hero": {
      "title": "Welcome to Our Service",
      "subtitle": "Discover amazing features", 
      "getStarted": "Get Started"
    }
  }
}
```

## Skill Best Practices

### Translation Key Structure
```json
{
  "sectionName": {
    "title": "Main Title",
    "description": "Description text",
    "form": {
      "firstName": "First Name",
      "lastName": "Last Name",
      "submit": "Submit"
    },
    "list": {
      "item1": "First item",
      "item2": "Second item"
    }
  }
}
```

### Component Pattern
```tsx
'use client'

import { useTranslations } from 'next-intl'

export function ComponentName() {
  const t = useTranslations('sectionName')

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <button>{t('form.submit')}</button>
    </div>
  )
}
```

## Skill Tips
- Always use descriptive key names
- Group related translations together
- Keep translation keys consistent across components
- Test the component after applying the skill
- Consider pluralization rules if applicable
- Use `t.raw()` for arrays that need to be mapped over

## Common Translation Sections for This Skill
- `hero`: For hero sections with titles, subtitles, CTAs
- `form`: For form labels, placeholders, buttons
- `info`: For informational content
- `list`/`items`: For lists of features or items
- `cta`: For call-to-action sections

## Skill Output
When this skill completes, you'll have:
1. A fully internationalized component using next-intl
2. Properly structured translations in `messages/en.json`
3. Consistent translation key naming
4. Verified translation key references

## How to Invoke
- **Automatic**: Cascade will automatically invoke this skill when it detects you need to internationalize a component
- **Manual**: Use `@internationalize-component` to manually invoke this skill on any component
