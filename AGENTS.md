# Project Context: Karthik's Dynamic Portfolio 2026

## 1. Tech Stack & Standards
- **Framework:** Next.js 16 (App Router)
- **CMS:** Sanity.io (Embedded Studio at /studio)
- **Styling:** Tailwind CSS (Mobile-first, Glassmorphism on Desktop)
- **Language:** TypeScript (Strict mode)
- **Data Fetching:** GROQ + Incremental Static Regeneration (ISR)

## 2. Coding Principles (The "Engineer" Standard)
- **Think Before Coding:** Always prioritize LLD (Low-Level Design) before implementation.
- **SOLID Principles:** Follow Single Responsibility for components and services.
- **Availability > Consistency:** Use ISR for high availability. 
- **Type Safety:** No `any` types. Define clear interfaces in `@/types`.
- **Performance:** Optimize images using Sanity Image Pipeline and Next/Image.

## 3. Component Architecture
- Use **Server Components** by default. Use Client Components ('use client') only for interactivity (framer-motion, three.js, forms).
- Follow the **Atomic Design** pattern for UI components.