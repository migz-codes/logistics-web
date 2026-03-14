# Frontend Type Sharing Guidelines

## 🎯 Purpose
Ensure all frontend requests use shared types from `src/types/api` instead of manual type definitions.

## 📍 Shared Types Location
All GraphQL-generated types are located in:
```
src/types/api/
├── index.ts     # Main exports
└── schema.ts    # Schema types
```

## ✅ Required Imports

### **Always import from shared types:**
```typescript
// ✅ CORRECT - Import from shared API types
import type { User, Role, Company, AuthResponse } from '@/types/api'

// ❌ INCORRECT - Don't define types locally
export type Role = 'ADMIN' | 'INVESTOR_ADMIN'
export interface User { ... }
```

## 🔄 Mutation/Response Interface Guidelines

### **Response Interfaces:**
- **DO** create response interfaces for GraphQL operations
- **DO** use shared types for the data structure
- **DON'T** duplicate shared type definitions

```typescript
// ✅ CORRECT
export interface LoginResponse {
  login: AuthResponse  // Shared type
}

export interface GetAllUsersResponse {
  getAllUsers: User[]  // Shared type
}

// ❌ INCORRECT
export interface LoginResponse {
  login: {
    accessToken: string
    refreshToken: string
    user: {
      id: string
      name: string
      // ... manual definition
    }
  }
}
```

### **Input Types:**
- **DO** import all input types from shared types
- **DON'T** redefine input types

```typescript
// ✅ CORRECT
import type { CreateUserInput, UpdateProfileInput } from '@/types/api'

// ❌ INCORRECT
export interface CreateUserInput {
  name: string
  email: string
  password: string
}
```

## 📋 File-by-File Requirements

### **1. Auth Mutations (`src/lib/apollo/mutations/auth.ts`)**
```typescript
import type {
  LoginInput,
  AuthResponse,
  CreateUserInput,
  LogoutResponse
} from '@/types/api'

// Response interfaces use shared types
export interface LoginResponse {
  login: AuthResponse
}

export interface RegisterResponse {
  register: AuthResponse
}

export interface LogoutResponseData {
  logout: LogoutResponse
}

export interface RefreshTokenResponse {
  refreshToken: AuthResponse
}
```

### **2. User Mutations (`src/lib/apollo/mutations/user.ts`)**
```typescript
import type {
  User,
  Role,
  Company,
  UpdateProfileInput,
  UpdatePasswordInput,
  UpdateUserRoleInput,
  WarehouseFiltersInput
} from '@/types/api'

// Response interfaces use shared types
export interface GetMeResponse {
  getMe: User
}

export interface GetAllUsersResponse {
  getAllUsers: User[]
}

export interface UpdateProfileResponse {
  updateProfile: User
}
```

### **3. Company Mutations (`src/lib/apollo/mutations/company.ts`)**
```typescript
import type {
  Company,
  CreateCompanyInput,
  UpdateCompanyInput,
  CompanyFiltersInput
} from '@/types/api'

// Response interfaces use shared types
export interface GetCompaniesResponse {
  getMyCompanies: Company[]
}

export interface CreateCompanyResponse {
  createCompany: Company
}
```

### **4. Store (`src/lib/store/user.ts`)**
```typescript
import type { User, Role } from '@/types/api'

// No local type definitions
```

### **5. Components**
```typescript
// Import shared types
import type { Role, User } from '@/types/api'

// Use in type casting
role: response.register.user.role as Role
```

## 🚨 Common Issues & Solutions

### **Naming Conflicts:**
When a response interface has the same name as a shared type:

```typescript
// ❌ PROBLEM - Naming conflict
export interface LogoutResponse {
  logout: LogoutResponse  // Conflicts with import
}

// ✅ SOLUTION - Use alias
export interface LogoutResponseData {
  logout: LogoutResponse  // Uses shared type
}
```

### **Missing Imports:**
Always check that all used types are imported:

```typescript
// ✅ CORRECT - All types imported
import type { User, Role, AuthResponse, LoginInput } from '@/types/api'

// ❌ INCORRECT - Missing imports
export interface LoginResponse {
  login: AuthResponse  // AuthResponse not imported
}
```

## 🔄 Type Generation Process

### **Backend (API):**
1. Update GraphQL schema/entities
2. Run `npm run graphql:types` in API
3. Types generated in `generated/types/`

### **Frontend:**
1. Copy generated types to `src/types/api/`
2. Update imports to use shared types
3. Remove any duplicate type definitions

## ✅ Pre-Commit Checklist

Before committing changes, verify:

- [ ] All imports use `@/types/api`
- [ ] No duplicate type definitions
- [ ] Response interfaces use shared types
- [ ] No naming conflicts (use aliases if needed)
- [ ] Components import shared types for casting

## 🎯 Benefits

1. **Single Source of Truth:** All types come from GraphQL schema
2. **Type Safety:** Frontend types exactly match backend
3. **No Duplicates:** Eliminates redundant type definitions
4. **Easy Maintenance:** Update in one place
5. **Consistency:** Same types across all frontend files

## 📝 Quick Reference

```typescript
// Standard import pattern
import type { 
  User, Role, Company, Warehouse,
  LoginInput, CreateUserInput, UpdateProfileInput,
  AuthResponse, LogoutResponse 
} from '@/types/api'

// Standard response pattern
export interface XxxResponse {
  xxx: SharedType  // Always use shared type
}
```

---

**Remember:** If you need to define a type locally, first check if it exists in `@/types/api`. If it does, import it instead of redefining!
