# 🛒 Versiq – A Modern E‑Commerce Experience

Versiq is a high‑end menswear e‑commerce frontend built to deliver a premium, immersive shopping experience.  
It combines a custom design system, fluid animations, and a carefully crafted UX flow from discovery to checkout.

---

## 🔗 Live Demo

[![Live Demo – Vercel](https://img.shields.io/badge/Live_Demo-Vercel-%23111111?style=for-the-badge)](https://versiq-e-commerce-website.vercel.app/)
[![Live Demo – Netlify](https://img.shields.io/badge/Live_Demo-Netlify-%2300b894?style=for-the-badge)](https://versiq-ecommerce-site.netlify.app/)

---

## 🧩 Overview

The goal of Versiq is to feel like a complete brand experience, not just a template store.  
Every section—from the hero animation to the product cards and collections filters—was designed to reflect a premium, modern brand with smooth, intentional motion.  
The application is fully responsive and optimized for a polished first impression on all devices.

---

## ✨ Key Features

### Homepage & Visual Experience

- **Dynamic Hero Section** – Animated headline with custom SVG highlights and an interactive 3D‑style product carousel.
- **“Versiq Standard” Story Section** – Asymmetrical zig‑zag layout with scroll‑triggered animations that communicate brand values.
- **“Most Wanted” Stepped Gallery** – Responsive gallery with descending card heights and a spotlight hover effect that expands the focused product.
- **Featured Split Layout** – 70/30 split‑panel feature section with smooth hover‑driven transitions.
- **“Styled by Versiq” Community Gallery** – Fanned‑out community images with animated call‑to‑action on hover.
- **Professional Preloader** – Lightweight font‑aware preloader to avoid FOIT/FOUT and layout shift.

### Commerce Flow & UX

- **Collections Page with Command Bar Filters**  
  Slide‑in filter panel supporting multi‑facet filtering by **Pattern**, **Color**, **Arrival**, and sorting options. Product grid animates as filters change.
- **Product Detail Page with Related Products**  
  Sticky detail column with scrollable image gallery and a fully functional “You Might Also Like” section.
- **Unified Auth Page**  
  Single AuthPage for Login and Sign Up with a split‑card layout and smooth sliding transition between forms.
- **Persistent Cart**  
  Cart state stored in `localStorage` so items survive page reloads; guest cart can be merged with user state on login.
- **Reusable Components**  
  Themed components for Cart Drawer, Wishlist, Contact Page, and a multi‑step Checkout flow.

---

## 🎨 Design System

Versiq is built on a cohesive design system:

- **Color Palette** – Custom two‑tone primary scheme:
  - Mulberry Wine `#551c25`
  - Frost Mist `#dfe8ed`
- **Typography**
  - Logo: Agfiustur  
  - Headlines: KS Bistra  
  - Body/UI: Nohemi
- **Layout Principles**
  - Strong use of white space
  - Consistent responsive grid
  - Predictable spacing and hierarchy across sections

---

## 🛠 Tech Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/UI
- **Animation:** Framer Motion
- **Routing:** React Router DOM
- **Forms & Validation:** React Hook Form, Zod
- **State & Data:** JSON‑based catalog + React Context (cart, wishlist, auth flow)
- **Deployment:** Vercel, Netlify

---

> Originally built with a Supabase backend; the current public demo uses JSON‑backed data and client‑side logic to keep the experience stable while preserving realistic ecommerce behaviour.
