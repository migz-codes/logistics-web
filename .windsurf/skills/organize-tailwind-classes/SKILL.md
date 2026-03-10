---
name: organize-object-properties
description: Organize object properties by logical categories (size, function, importance) for better maintainability
---

# Organize Object Properties

## Purpose

This skill helps organize object properties by logical categories instead of having them randomly ordered. This makes TypeScript interfaces, React props, configuration objects, and any object structure more maintainable, readable, and consistent across your codebase.

## Prerequisites

- Basic understanding of object structures
- Knowledge of object organization principles

## Usage

### Step 1: Identify Random Property Order

Look for interfaces, types, or objects where properties are randomly ordered like this:

```typescript
// Tailwind CSS classes example
interface FieldTws {
  input?: string
  label?: string
  wrapper?: string
  required?: string
  leftIcon?: string
  errorIcon?: string
  inputWrapper?: string
  passwordIcon?: string
  passwordToggle?: string
  leftIconWrapper?: string
  rightIconWrapper?: string
  errorIconWrapper?: string
}

// React component props example
interface FieldProps {
  name: Path<T>
  register?: UseFormRegister<T>
  label: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  id?: string
  leftIcon?: string
  rightIcon?: ReactNode
  showPassword?: boolean
  onTogglePassword?: () => void
  className?: string
  disabled?: boolean
  required?: boolean
  errorMessage?: string
  tws?: FieldTws
}

// Configuration object example
const config = {
  timeout: 5000,
  retries: 3,
  apiUrl: 'https://api.example.com',
  debug: false,
  version: '1.0.0',
  maxConnections: 10,
  enableLogging: true
}
```

### Step 2: Choose Organization Strategy

Choose one of these organization patterns:

**A. Size/Visual Hierarchy** (for UI components)

- **Small elements** (icons, indicators): `icon`, `indicator`, `badge`
- **Medium elements** (labels, buttons): `label`, `button`, `input`
- **Large elements** (containers, wrappers): `wrapper`, `container`, `section`
- **Layout elements** (grid, flex): `grid`, `flex`, `layout`
- **Interactive states** (hover, focus): `hover`, `focus`, `active`

**B. Function/Purpose** (for any object)

- **Core/Identity**: `id`, `name`, `type`, `key`
- **Content/Data**: `value`, `label`, `title`, `description`
- **Behavior/Actions**: `onClick`, `onChange`, `onSubmit`, `handler`
- **State/Flags**: `disabled`, `loading`, `required`, `visible`
- **Styling/Appearance**: `className`, `style`, `theme`, `variant`
- **Configuration**: `timeout`, `retries`, `maxItems`, `debug`

**D. String Length** (for precise organization)

- **Short names** (2-4 characters): `id`, `name`, `type`, `label`, `tws`
- **Medium names** (5-8 characters): `leftIcon`, `rightIcon`, `disabled`, `required`, `register`
- **Long names** (9+ characters): `className`, `placeholder`, `errorMessage`, `showPassword`, `onTogglePassword`

### Step 3: Apply the Organization

Transform the interface/object using your chosen strategy:

**Example A - Size Hierarchy (Tailwind classes):**

```typescript
interface FieldTws {
  // Small elements
  icon?: string
  indicator?: string
  errorIcon?: string
  leftIcon?: string
  rightIcon?: string
  passwordIcon?: string

  // Medium elements
  label?: string
  input?: string
  button?: string
  required?: string
  passwordToggle?: string

  // Large elements
  wrapper?: string
  inputWrapper?: string
  leftIconWrapper?: string
  rightIconWrapper?: string
  errorIconWrapper?: string
  container?: string
}
```

**Example B - Function/Purpose (React props):**

```typescript
interface FieldProps {
  // Core/Identity
  name: Path<T>
  id?: string
  type?: 'text' | 'email' | 'password'

  // Content/Data
  label: string
  placeholder?: string
  value?: string
  errorMessage?: string

  // Behavior/Actions
  register?: UseFormRegister<T>
  onTogglePassword?: () => void

  // State/Flags
  disabled?: boolean
  required?: boolean
  showPassword?: boolean

  // Styling/Appearance
  className?: string
  leftIcon?: string
  rightIcon?: ReactNode

  // Configuration
  tws?: FieldTws
}
```

**Example D - String Length (React props):**

```typescript
interface FieldProps<T extends FieldValues = FieldValues> {
  id?: string
  name: Path<T>
  label: string
  tws?: FieldTws
  type?: 'text' | 'email' | 'password'
  leftIcon?: string
  rightIcon?: ReactNode
  disabled?: boolean
  required?: boolean
  register?: UseFormRegister<T>
  className?: string
  placeholder?: string
  errorMessage?: string
  showPassword?: boolean
  onTogglePassword?: () => void
}
```

## Examples

### Before (Random Order)

```typescript
// Tailwind classes
interface ButtonTws {
  wrapper?: string
  icon?: string
  label?: string
  hover?: string
  focus?: string
  disabled?: string
  loading?: string
}

// React props
interface UserCardProps {
  className?: string
  name: string
  email?: string
  avatar?: string
  onClick?: () => void
  isLoading?: boolean
  variant?: 'primary' | 'secondary'
}

// API configuration
const apiConfig = {
  debug: true,
  baseUrl: 'https://api.example.com',
  timeout: 5000,
  version: 'v1',
  retries: 3
}
```

### After (Organized by Strategy)

```typescript
// Tailwind classes - Size hierarchy
interface ButtonTws {
  // Small elements
  icon?: string
  loading?: string

  // Medium elements
  label?: string

  // Large elements
  wrapper?: string

  // Interactive states
  hover?: string
  focus?: string
  disabled?: string
}

// React props - Function/Purpose
interface UserCardProps {
  // Core/Identity
  name: string
  variant?: 'primary' | 'secondary'

  // Content/Data
  email?: string
  avatar?: string

  // Behavior/Actions
  onClick?: () => void

  // State/Flags
  isLoading?: boolean

  // Styling/Appearance
  className?: string
}

// API configuration - Function/Purpose
const apiConfig = {
  // Core settings
  baseUrl: 'https://api.example.com',
  version: 'v1',

  // Performance settings
  timeout: 5000,
  retries: 3,

  // Feature flags
  debug: true
}
```

## Best Practices

1. **Choose the Right Strategy**:

   - Use **Size hierarchy** for UI components and styling
   - Use **Function/Purpose** for general objects and APIs
   - Use **Importance** for component props
   - Use **String Length** for precise, predictable ordering

2. **Consistent Ordering**: Apply the same strategy across similar objects

3. **Clear Comments**: Add comments to separate categories

4. **Logical Grouping**: Group related properties together

5. **Maintain Scale**: Keep the small → medium → large flow (if using size strategy)

6. **String Length Order**: Organize by property name character count only (not including type annotations) for consistency

7. **Be Flexible**: Adapt categories to fit your specific domain

## Common Patterns

### Form Components (Function/Purpose)

```typescript
interface FormFieldProps {
  // Core/Identity
  name: string
  type?: string

  // Content/Data
  label?: string
  placeholder?: string
  value?: string
  error?: string

  // Behavior/Actions
  onChange?: (value: string) => void
  onBlur?: () => void
  onFocus?: () => void

  // State/Flags
  disabled?: boolean
  required?: boolean
  readOnly?: boolean

  // Styling/Appearance
  className?: string
  style?: React.CSSProperties

  // Configuration
  validation?: ValidationRules
}
```

### Data Models (Importance)

```typescript
interface User {
  // Required core properties
  id: string
  name: string
  email: string

  // Optional important properties
  avatar?: string
  role?: string
  department?: string

  // Optional rare properties
  bio?: string
  timezone?: string
  preferences?: UserPreferences

  // System properties
  createdAt: Date
  updatedAt: Date
}
```

### API Responses (Function/Purpose)

```typescript
interface ApiResponse<T> {
  // Core data
  data: T

  // Metadata
  message?: string
  status: 'success' | 'error'

  // Pagination
  page?: number
  limit?: number
  total?: number

  // System info
  timestamp: string
  requestId: string
}
```

### String Length Organization

```typescript
// Before - Random order
interface ButtonTws {
  wrapper?: string
  icon?: string
  label?: string
  hover?: string
  focus?: string
  disabled?: string
  loading?: string
}

// After - Organized by string length
interface ButtonTws {
  icon?: string
  label?: string
  loading?: string
  wrapper?: string
  disabled?: string
  hover?: string
  focus?: string
}
```

### Configuration Objects (Function/Purpose)

```typescript
const appConfig = {
  // Core settings
  appName: 'MyApp',
  version: '1.0.0',
  environment: 'production',

  // API settings
  apiBaseUrl: 'https://api.example.com',
  apiTimeout: 5000,
  apiRetries: 3,

  // Feature flags
  enableAnalytics: true,
  enableDebugMode: false,
  enableNewFeatures: false,

  // UI settings
  theme: 'light',
  language: 'en',
  timezone: 'UTC'
}
```

## Troubleshooting

- **Issue**: Can't decide which category a property belongs to

  - **Solution**: Consider the property's primary purpose. If it fits multiple categories, place it in the most important one

- **Issue**: Too many categories

  - **Solution**: Start with basic categories (Core, Content, Behavior, State, Styling) and refine as needed

- **Issue**: Mixed responsibilities

  - **Solution**: Group by the primary purpose or use a separate interface for each responsibility

- **Issue**: Team disagreement on ordering

  - **Solution**: Document the chosen strategy in team guidelines and be consistent

- **Issue**: Properties don't fit any category

  - **Solution**: Create a new category that makes sense for your domain, or use a "Miscellaneous" section at the end

- **Issue**: String length ordering feels arbitrary
  - **Solution**: Use consistent length ranges (2-6, 7-10, 11+ chars) and document the ranges in your team guidelines

## Next Steps

After organizing your object properties:

1. Apply the same pattern to other similar interfaces in your codebase
2. Create a team style guide for consistency
3. Add ESLint rules or lint-staged to enforce the pattern
4. Document the chosen strategy in your project's contributing guidelines
5. Consider creating templates for common object patterns
6. Review and refactor existing code to follow the new organization
