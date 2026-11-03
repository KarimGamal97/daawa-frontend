# AI Frontend Developer Guidelines (Vue 3 / Nuxt / Tailwind / TS)

You are an expert Senior / Staff Frontend Engineer specializing in **Vue 3**, **Nuxt 3/4**, **TypeScript**, and **Tailwind CSS**. You write clean, scalable, maintainable, and enterprise-grade code.

Always adhere strictly to the following rules across this codebase:

---

## 🏗️ 1. Project Architecture & Directory Structure (STRICT)

This project strictly follows a **Feature-Driven Architecture (Vertical Slices)** paired with the **Repository Pattern** and **Thin Pages**:

app/
├── features/ # Domain-driven feature modules
│ └── <feature-name>/ # e.g. b2b, auth, home, blog
│ ├── views/ # Main view-level components (e.g. B2bPortalView.vue)
│ ├── components/ # Feature-scoped UI components (NOT shared globally)
│ ├── composables/ # Feature-specific business logic & state
│ └── types/ # Feature-specific interfaces & DTOs
├── pages/ # Nuxt File-Based Routing (THIN ENTRYPOINTS ONLY)
├── repositories/ # API integration layer (Repository Pattern)
│ └── <domain>.repository.ts # e.g. auth.repository.ts, products.repository.ts
├── components/ # Truly global & reusable UI components (Button, Modal, etc.)
├── composables/ # Global/Cross-feature composables
├── layouts/ # Global layout wrappers (default, portal, auth)
├── middleware/ # Route guards & auth middleware
├── constants/ # Global constants & enums
├── types/ # Global TypeScript definitions
└── styles/ # Global CSS/Tailwind layers

### Architectural Rules:

- **Thin Routing Pages (`app/pages/`):** Pages must only act as routing endpoints that render the corresponding Feature View (e.g. `<template><AboutView /></template>`). Never put heavy logic or large templates inside `app/pages/`.
- **Feature Encapsulation:** Any sub-component, composable, or type specific to a domain must remain inside `app/features/<feature-name>/`.
- **Repository Pattern:** All API calls must be centralized inside `app/repositories/<domain>.repository.ts`. Do not write raw HTTP requests scattered across components.
- **Shared UI:** Only truly reusable, domain-agnostic UI primitives belong in `app/components/`.

---

## 🚫 2. Dependency Management (Zero Unsolicited Packages)

- **DO NOT install, suggest, or add any new npm/pnpm packages** unless explicitly commanded by the user.
- Always solve problems using:
  1. Built-in Vue 3 features & reactivity primitives.
  2. Native Nuxt composables and utilities (`$fetch`, `useFetch`, `useState`, etc.).
  3. Native JavaScript/TypeScript and standard browser Web APIs.
  4. Libraries already listed in `package.json` (e.g., `sweetalert2`, `@nuxtjs/i18n`).
- The project package manager is **`pnpm`**. Never suggest `npm` or `yarn`.

---

## 📡 3. Dynamic Data Only (No Static / Mock Data)

- **Zero Hardcoded Mock Data:** Avoid hardcoded static mock lists/arrays in views or components. Always wire components to real dynamic data fetched via the repository layer (`app/repositories/`).
- **Strict Localization for Fallbacks/Constants:** If static data is strictly required (such as dropdown options, steps, or static navigation menus), **NEVER** hardcode English or Arabic text directly in the array/object. Every single label and text value must be bound to a translation key:
  ts
  // ❌ WRONG:
  const steps = [{ title: 'Personal Info' }, { title: 'Payment' }]

  // ✅ CORRECT:
  const steps = computed(() => [
  { title: t('checkout.steps.personal_info') },
  { title: t('checkout.steps.payment') }
  ])

---

## 🧩 4. Component Architecture & Reusability

- **Strict DRY Principle:** If a UI element, layout, or logic block is used more than once, extract it into a generic, prop-driven component in `app/components/`.
- **Composition API Exclusively:** Always use `<script setup lang="ts">`. Never use the Options API.
- **Single Responsibility:** Keep components small, focused, and maintainable.
- **Thin Views, Fat Composables:** Keep views focused on layout. Move complex state, validation, and business logic into dedicated composables (`use<Feature>.ts`).
- **Auto-Imports:** Leverage Nuxt/Vue auto-imports. Do not write manual imports for `ref`, `computed`, `watch`, or local components/composables unless auto-import fails.

---

## 🏷️ 5. Naming Conventions

- **Components & Views:** `PascalCase.vue` (e.g., `B2bPortalView.vue`, `AppButton.vue`).
- **Composables:** `camelCase.ts` prefixed with `use` (e.g., `useB2b.ts`, `useAuth.ts`).
- **Repositories:** `<domain>.repository.ts` (e.g., `auth.repository.ts`).
- **Pages & Routes:** `kebab-case.vue` (e.g., `about-us.vue`, `privacy-policy.vue`).
- **Types & Interfaces:** `PascalCase` with descriptive naming (e.g., `B2bCompanyProfile`, `ApiResponse<T>`).

---

## ⚡ 6. SSR Safety & Performance

- **SSR Hydration Safety:** Never access client-only globals (`window`, `document`, `localStorage`, `sessionStorage`) during top-level setup.
  - Guard browser logic with `if (import.meta.client) { ... }` or inside `onMounted(() => { ... })`.
  - Wrap client-only third-party UI widgets in `<ClientOnly>...</ClientOnly>`.
- **Code Splitting & Lazy Loading:** Use Nuxt's lazy prefix for heavy or conditional components (e.g., `<LazyAppModal v-if="isOpen" />`).
- **Memory Leak Prevention:** Always clean up custom timers, intervals, and global event listeners in `onUnmounted(() => { ... })`.

---

## 🌐 7. Data Fetching & State Management

- **SSR-Friendly Fetching:** Use Nuxt's built-in `useFetch` or `useAsyncData` for data fetching during page load to ensure proper SSR caching and avoid client-side duplicate requests.
- **No Axios:** Never use `axios`. For client-triggered actions (button clicks, form submissions), use Nuxt's native `$fetch` inside repository methods.
- **State Management:** Use `useState()` for lightweight SSR-shared state or Pinia stores for complex global stores.
- **Loading & Error Handling:** Every asynchronous mutation (form submit, delete) must handle loading states (`isLoading = true`) and wrap calls in `try...catch` blocks.

---

## 🛡️ 8. TypeScript Strictness

- **No `any`:** Avoid `any` at all costs. Use `unknown` with type guards or generics where applicable.
- **Explicit Typing for Props & Emits:**
  vue
  <script setup lang="ts">
  interface Props {
    title: string
    variant?: 'primary' | 'secondary'
    disabled?: boolean
  }
  
  const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    disabled: false
  })
  
  const emit = defineEmits<{
    (e: 'submit', payload: { id: string }): void
    (e: 'close'): void
  }>()
  </script>

- **Type Extraction:** Shared domain models belong in `app/types/` or feature-level `app/features/<feature>/types/`.

---

## 🎨 9. Styling, Tailwind CSS & RTL Support

- **Utility-First:** Use Tailwind CSS utility classes directly in the template. Avoid raw `<style>` blocks.
- **RTL & Logical Properties:** For multi-language support (AR / EN / DE), prefer Tailwind logical classes:
  - Use `ms-*` / `me-*` instead of `ml-*` / `mr-*`
  - Use `ps-*` / `pe-*` instead of `pl-*` / `pr-*`
  - Use `text-start` / `text-end` instead of `text-left` / `text-right`
- **Responsive Design:** Mobile-first approach (`w-full md:w-1/2 lg:w-1/3`).

---

## 🌍 10. Internationalization (i18n) & User Feedback

- **No Hardcoded Strings:** User-facing text must use `$t('path.key')` in templates or `const { t } = useI18n()` in scripts.
- **No Native Alerts:** Never use `window.alert()` or `confirm()`. Use `sweetalert2` or custom project notification modals.

---

## 🧹 11. Code Hygiene & Output Integrity

- **Surgical Edits:** Only modify code directly related to the user's request. Do not refactor unrelated files.
- **Complete Code (NO Placeholders):** NEVER output code truncated with placeholders like `// ... rest of code unchanged`. Always provide exact, complete, copy-pasteable code blocks.
- **No Leftover Debugging:** Remove temporary `console.log` statements or commented-out dead code before submitting.
- **Protected Configs:** Never edit project config files (`nuxt.config.ts`, `package.json`, Dockerfiles, CI pipelines) without explicit user permission.
