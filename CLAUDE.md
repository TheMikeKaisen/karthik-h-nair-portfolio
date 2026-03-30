@AGENTS.md
# Architecture Guide: Proof of Competence Platform

## 1. Data Contract (Sanity)
This project uses a relational schema in Sanity. All content types (Articles, DevLogs, Activities) must reference a central `category` document. 
- **Namespace Isolation:** Use URL prefixing: `/projects/[slug]`, `/garden/logs/[slug]`, `/garden/articles/[slug]`.
- **Relational Integrity:** Ensure `devLog` entries can reference a `relatedProject`.

## 2. Implementation Strategies
- **Dynamic Filtering:** Implement client-side filtering for the "Learning Lab" using search params for deep-linking capability.
- **Subscription Logic:** (Future) Prepare for Stripe integration. Use `isPremium` flag in schemas to trigger conditional rendering of the `excerpt` vs `content`.
- **Accessibility:** Ensure all components meet WCAG 2.1 standards (aria-labels, keyboard nav).

## 3. UI/UX Vision
- **Desktop:** High-end creative (Glassmorphism, 3D/Three.js in Hero).
- **Mobile:** Minimalist, high performance, clean typography.
- **Themes:** Dark mode by default, support Light mode toggle.