# Nexus Analytics — Enterprise Intelligence & Analytics Platform

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, commercial-grade enterprise SaaS analytics platform engineered with modern React, TypeScript, TanStack Query, Redux Toolkit, Zustand, Recharts, and TanStack Table.

---

## 🚀 Quick Start (Windows / PowerShell)

```powershell
# Clone or navigate to the repository
cd E:\Nexus

# Install dependencies
npm install

# Start local development server
npm run dev

# Run production build and typecheck
npm run build
```

---

## 🏛️ Architecture & State Boundaries

- **Server State**: Managed strictly with `@tanstack/react-query` (remote caching, pagination, deduplication, background sync).
- **Global Business State**: Managed via `@reduxjs/toolkit` (user authentication, session tokens, permissions, global notification queue).
- **UI & Layout Preferences**: Managed via `zustand` (dashboard widget placement, sidebar docking, density preferences).
- **Styling**: Tailwind CSS v4 with custom enterprise tokens and CSS variables.

---

## 📁 Project Structure

```text
src/
├── app/                  # Application bootstrap & provider wrappers
├── assets/               # Brand assets and graphics
├── components/           # Shared atomic UI components (Button, Input, Card, Modal, Table)
│   ├── feedback/
│   ├── forms/
│   ├── navigation/
│   ├── tables/
│   └── ui/
├── config/               # App configuration & route paths
├── features/             # Domain modules
│   ├── analytics/
│   ├── auth/
│   ├── dashboard/
│   ├── data-management/
│   ├── real-time/
│   ├── settings/
│   └── users/
├── hooks/                # Reusable custom React hooks
├── layouts/              # Shell layouts (RootLayout, AuthLayout)
├── locales/              # i18n localization resources (EN, AR)
├── routes/               # React Router navigation tree
├── services/             # Axios HTTP client, API contracts & mock data
├── store/                # Redux Toolkit & Zustand stores
├── types/                # Global TypeScript models & DTOs
└── utils/                # Utility helpers (cn, date, formatting)
```

---

## 📜 Development Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Vite HMR local dev server |
| `npm run build` | Compiles TypeScript (`tsc -b`) and bundles production assets via Vite |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs fast linter checks |
