---
name: abstract-component
description: Guides the process of abstracting any component (UI, forms, data display, etc.) into a self-contained, reusable component
---

# Abstract Component

This skill helps you extract and abstract any component into a self-contained, reusable unit. Works for forms, data displays, UI sections, modals, cards, lists, and any other component type.

## Prerequisites

- A parent component with logic/UI to extract
- Clear understanding of what should be abstracted

## When to Use

Use this skill when you have:

- A large component that should be split into smaller pieces
- Repeated UI patterns that could be reused
- A section of JSX with its own state/logic
- Props being passed that could be fetched internally
- Any component that would benefit from isolation

## Abstraction Steps

### 1. Identify What to Abstract

// turbo
Identify the JSX block and related logic that should be extracted.

**Look for these patterns:**

| Type          | What to Look For                                    |
| ------------- | --------------------------------------------------- |
| **State**     | `useState`, `useReducer` related to the section     |
| **Data**      | `useQuery`, `useSWR`, `fetch` calls for the section |
| **Mutations** | `useMutation`, API calls triggered by the section   |
| **Forms**     | `useForm`, `register`, `handleSubmit`, validation   |
| **Effects**   | `useEffect` that only affects this section          |
| **Handlers**  | Event handlers (`onClick`, `onSubmit`, etc.)        |
| **JSX**       | The UI block to extract                             |

### 2. Create Component Directory

// turbo
Create a new directory for the abstracted component:

```bash
mkdir -p src/components/path/to/ParentComponent/NewComponentName
```

### 3. Create the Component File

// turbo
Create `index.tsx` in the new directory. Structure depends on component type:

#### Basic UI Component

```tsx
'use client'

import { useTranslations } from 'next-intl'
// Import UI components

interface ComponentNameProps {
  // Only props that CANNOT be fetched internally
}

export function ComponentName({ ...props }: ComponentNameProps) {
  const t = useTranslations('namespace')

  return <div>{/* UI content */}</div>
}
```

#### Component with Data Fetching

```tsx
'use client'

import { useQuery } from '@apollo/client/react'
import { useTranslations } from 'next-intl'
// Import UI components, queries, types

export function ComponentName() {
  const t = useTranslations('namespace')

  // Fetch own data
  const { data, loading, error } = useQuery<ResponseType>(QUERY)

  if (loading) return <Skeleton />
  if (error) return <ErrorState />

  return <div>{/* Render with data */}</div>
}
```

#### Component with State & Handlers

```tsx
'use client'

import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { useTranslations } from 'next-intl'
// Import UI components, mutations, types

export function ComponentName() {
  const t = useTranslations('namespace')

  // Local state
  const [isOpen, setIsOpen] = useState(false)

  // Mutations (if needed)
  const [mutate] = useMutation<MutationType>(MUTATION)

  // Handlers
  const handleAction = async () => {
    try {
      await mutate({
        variables: {
          /* ... */
        }
      })
      // Handle success
    } catch {
      // Handle error
    }
  }

  return <div>{/* UI with handlers */}</div>
}
```

#### Component with Form

```tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@apollo/client/react'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
// Import UI components, queries, mutations, schema

export function ComponentName() {
  const t = useTranslations('namespace')

  // Data fetching
  const { data } = useQuery<ResponseType>(QUERY)

  // Mutations
  const [mutate] = useMutation<MutationType>(MUTATION)

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormDataType>({
    resolver: zodResolver(schema),
    defaultValues: {
      /* ... */
    }
  })

  // Sync form with fetched data
  useEffect(() => {
    if (!data) return
    setValue('field', data.value)
  }, [data, setValue])

  // Submit handler
  const onSubmit = async (formData: FormDataType) => {
    try {
      await mutate({
        variables: {
          /* ... */
        }
      })
    } catch {
      // Handle error
    }
  }

  return <form onSubmit={handleSubmit(onSubmit)}>{/* Form fields */}</form>
}
```

### 4. Move Related Code

// turbo
Move from parent to new component:

1. **Imports**: Libraries, components, queries, mutations, types
2. **Hooks**: All hooks related to this section
3. **State**: `useState`, `useReducer` for this section
4. **Effects**: `useEffect` that only affects this section
5. **Handlers**: Event handlers for this section
6. **JSX**: The UI block

### 5. Update Parent Component

// turbo
In the parent component:

1. Remove moved imports, hooks, handlers, state
2. Import and use the new component:

```tsx
import { NewComponent } from './NewComponent'

// In render:
;<NewComponent />
```

### 6. Handle Shared State (if needed)

If the abstracted component needs to update shared/global state:

```tsx
// Using Jotai
import { useSetAtom } from 'jotai'
import { someAtom } from '@/lib/store'

const setValue = useSetAtom(someAtom)
setValue(newValue)

// Using Context
import { useContext } from 'react'
import { SomeContext } from '@/contexts'

const { setValue } = useContext(SomeContext)
setValue(newValue)

// Using Zustand
import { useStore } from '@/lib/store'

const setValue = useStore(state => state.setValue)
setValue(newValue)
```

## Best Practices

- **Self-contained**: Fetch data internally when possible
- **Minimal props**: Only pass what cannot be fetched/derived
- **Single responsibility**: Each component does one thing well
- **Colocate files**: Keep related files together (types, schema, utils)
- **Type safety**: Define and export interfaces
- **Error handling**: Handle loading, error, and empty states
- **Consistent naming**: Use PascalCase for components, camelCase for files

## Examples

### Example 1: Data Display Component

**Before:**

```tsx
export function DashboardPage() {
  const { data: stats } = useQuery(GET_STATS)
  const { data: users } = useQuery(GET_USERS)

  return (
    <div>
      <Card>
        <h2>Statistics</h2>
        <p>Total: {stats?.total}</p>
        <p>Active: {stats?.active}</p>
      </Card>
      <UserList users={users} />
    </div>
  )
}
```

**After:**

```tsx
// StatsCard/index.tsx
export function StatsCard() {
  const { data: stats } = useQuery(GET_STATS)
  return (
    <Card>
      <h2>Statistics</h2>
      <p>Total: {stats?.total}</p>
      <p>Active: {stats?.active}</p>
    </Card>
  )
}

// DashboardPage
export function DashboardPage() {
  return (
    <div>
      <StatsCard />
      <UserList />
    </div>
  )
}
```

### Example 2: Interactive Component

**Before:**

```tsx
export function SettingsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteItem] = useMutation(DELETE_ITEM)

  const handleDelete = async (id: string) => {
    await deleteItem({ variables: { id } })
    setIsModalOpen(false)
  }

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Delete</Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Button onClick={() => handleDelete(itemId)}>Confirm</Button>
        </Modal>
      )}
    </div>
  )
}
```

**After:**

```tsx
// DeleteItemModal/index.tsx
export function DeleteItemModal({ itemId }: { itemId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [deleteItem] = useMutation(DELETE_ITEM)

  const handleDelete = async () => {
    await deleteItem({ variables: { id: itemId } })
    setIsOpen(false)
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Delete</Button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <Button onClick={handleDelete}>Confirm</Button>
        </Modal>
      )}
    </>
  )
}

// SettingsPage
export function SettingsPage() {
  return (
    <div>
      <DeleteItemModal itemId={itemId} />
    </div>
  )
}
```

## Checklist

- [ ] Component is self-contained (fetches own data if needed)
- [ ] Minimal props (only what cannot be derived)
- [ ] All related state moved to component
- [ ] All related handlers moved to component
- [ ] Parent component simplified
- [ ] Types properly defined
- [ ] Loading/error states handled (if applicable)
- [ ] Shared state updates handled (if needed)
