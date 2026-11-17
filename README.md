# Nexus Analytics — Enterprise SaaS Intelligence Platform

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TanStack Table](https://img.shields.io/badge/TanStack_Table-v8-FF4154)](https://tanstack.com/table)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154)](https://tanstack.com/query)
[![PWA](https://img.shields.io/badge/PWA-Installable-purple)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

Nexus Analytics is a commercial-grade, production-ready enterprise analytics SaaS platform engineered with modern React, TypeScript, TanStack Query, Redux Toolkit, Zustand, Recharts, and TanStack Table.

---

## 🏛️ System Architecture & State Boundaries

To ensure scalable maintenance and eliminate state synchronization bugs, state is divided into four distinct tiers:

1. **Server State (`@tanstack/react-query`)**:
   - Manages all remote API requests, stale-while-revalidate caching, pagination caching, and cache invalidation.
   - *Never* duplicated in Redux.
2. **Global Client State (`@reduxjs/toolkit`)**:
   - Manages user authentication, JWT session tokens, active RBAC role (`SuperAdmin`, `Analyst`, `Viewer`), and global notification alert queues.
3. **UI / Layout Preferences (`zustand`)**:
   - Manages dashboard widget visibility, table row density, and date range filters with zero boilerplate.
4. **Environment Context (`Context API`)**:
   - Manages theme mode (`dark` / `light` / `system`) and localization direction (`ltr` / `rtl`).

```
┌────────────────────────────────────────────────────────────────────────┐
│                          NEXUS ANALYTICS                               │
├────────────────────────────────────────────────────────────────────────┤
│ Presentation Layer (React 19, Tailwind v4, Lucide, Recharts)           │
├──────────────────────┬──────────────────────┬──────────────────────────┤
│ Server State         │ Global Business State│ UI & Local Preferences   │
│ (TanStack Query v5)  │ (Redux Toolkit)      │ (Zustand + Context API)  │
├──────────────────────┼──────────────────────┼──────────────────────────┤
│ • Ingestion cache    │ • Active User / Role │ • Widget toggles         │
│ • Record mutations   │ • Auth tokens        │ • Density preferences    │
│ • Optimistic updates │ • Global alert queue │ • Dark/Light theme mode  │
│ • Auto-refetching    │ • Persona switching  │ • Arabic RTL / EN LTR    │
├──────────────────────┴──────────────────────┴──────────────────────────┤
│ Real-Time Layer (WebSocket Telemetry Engine + SignalR Adapter)        │
├────────────────────────────────────────────────────────────────────────┤
│ Network & Transport Layer (Axios Interceptors, Typed DTOs, Errors)     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🌟 Implemented Enterprise Modules

1. **Executive Dashboard (`/dashboard`)**:
   - Dynamic KPI metric cards with comparison trends (Revenue, Subscriptions, Conversion, SLA Uptime).
   - Recharts interactive gradient area chart and workload allocation donut chart.
   - Export report generation modal dialog.
2. **Analytics Studio (`/analytics`)**:
   - Comparative multi-metric charts (Revenue targets vs Concurrency volumes).
   - Dynamic time-series filtering and regional dataset export.
3. **Data Management (`/data`)**:
   - Full **TanStack Table v8** datagrid.
   - Column-level sorting (ascending/descending indicator).
   - Global multi-column search and category dropdown filters.
   - Dynamic pagination with customizable page size.
   - Column visibility picker (show/hide columns on the fly).
   - Instant CSV export generator.
   - Slide-over "Provision Record" modal form with immediate cache invalidation.
4. **User & Access Management (`/users`)**:
   - Corporate directory with role badges (`SuperAdmin`, `Analyst`, `Viewer`).
   - Interactive role persona switcher demonstrating Role-Based Access Control (RBAC).
   - Instant account suspension and reactivation toggles.
5. **Real-Time Telemetry (`/monitoring`)**:
   - Live WebSocket / SignalR connection lifecycle status badge (`CONNECTED`, `RECONNECTING`, `DISCONNECTED`).
   - Streaming event ingestion ledger with real-time throughput gauge (EPS).
   - Pause / Resume and Clear ledger stream controls.
   - Complete C# ASP.NET Core SignalR `TelemetryHub` integration contract.
6. **System Settings (`/settings`)**:
   - Interface theme switcher (`Dark`, `Light`, `System`).
   - Internationalization switcher (English LTR vs Arabic RTL with Cairo font).
   - Profile management form.

---

## 💻 Running Locally (Windows / PowerShell)

```powershell
# Navigate to the workspace
cd E:\Nexus

# Install dependencies (already executed)
npm install

# Start Vite local development server
npm run dev

# Run production build and TypeScript verification
npm run build

# Run Playwright end-to-end tests
npx playwright test
```

---

## 📱 Progressive Web App (PWA)

Nexus Analytics is configured with `vite-plugin-pwa`:
- Installable on desktop (Chrome, Edge) and mobile (Android, iOS).
- Pre-caches core bundles (`sw.js` and Workbox).
- Provides runtime asset caching for offline resilience.

---

## 🌐 Internationalization & Arabic RTL

Built using `i18next` and `react-i18next`:
- Seamlessly flips document text direction (`dir="rtl"`) when Arabic is selected.
- Uses responsive Tailwind classes and Arabic-optimized typography (`Cairo`).
- Persists user language preference in `localStorage`.
