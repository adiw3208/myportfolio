# Adi Wahyudi — Portfolio Website

<div align="center">
  <p>Fullstack Developer Portfolio built with Next.js, GSAP & Three.js</p>
  <p>
    <a href="https://adiw3208.github.io/">🌐 Live Demo</a> •
    <a href="https://linkedin.com/in/adiwhydi">💼 LinkedIn</a> •
    <a href="mailto:adiw3208@gmail.com"> Email</a>
  </p>
</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Contact](#-contact)

---

## 👤 About

Fullstack Developer dengan latar belakang pendidikan Teknik Komputer Jaringan yang kuat. Memiliki keahlian teknis dalam ekosistem JavaScript modern (React, Node.js, Next.js) dan pengalaman dalam pengembangan perangkat lunak forensik digital.

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript, JavaScript |
| **Styling** | Tailwind CSS v4 |
| **Animations** | GSAP, ScrollTrigger |
| **3D Graphics** | Three.js, React Three Fiber, Drei |
| **Icons** | Lucide React, React Icons |
| **Build** | Turbopack |

---

## ✨ Features

- **Three.js 3D Background** — Particle field, floating orbs, connection lines
- **GSAP Animations** — Scroll-triggered reveals, staggered entrances, counter animations
- **Responsive Design** — Mobile-first approach with Tailwind CSS
- **Dark Theme** — Elegant dark UI with lime accent colors
- **Smooth Scrolling** — Section-based navigation with active state tracking
- **Interactive Components** — Hover effects, transitions, micro-interactions
- **Contact Form** — Integrated with FormCarry API
- **Performance** — Static generation, optimized assets, code splitting

---

## 📁 Project Structure

```
myportofolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts & metadata
│   │   ├── page.tsx            # Home page (all sections)
│   │   └── globals.css         # Global styles & theme
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Navbar.tsx      # Navigation bar
│   │   │   ├── Hero.tsx        # Hero section with 3D background
│   │   │   ├── About.tsx       # About section with stats
│   │   │   ├── Skills.tsx      # Skills with category filter
│   │   │   ├── Experience.tsx  # Experience & Education timeline
│   │   │   ├── Projects.tsx    # Projects showcase
│   │   │   ├── Services.tsx    # Services & Certifications
│   │   │   ├── Contact.tsx     # Contact form
│   │   │   └── Footer.tsx      # Footer
│   │   └── ui/
│   │       └── ThreeBackground.tsx  # Three.js 3D scene
│   ├── data/
│   │   ├── navigation.ts       # Personal info & nav links
│   │   ├── skills.ts           # Skills data
│   │   ├── experience.ts       # Experience & education
│   │   ├── projects.ts         # Projects data
│   │   └── services.ts         # Services & certifications
│   └── lib/
│       ├── gsap.ts             # GSAP animation hooks
│       └── utils.ts            # Utility functions
├── public/                     # Static assets
├── package.json
└── next.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/adiw3208/myportfolio.git
cd myportofolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

---

## 📦 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### GitHub Pages

1. Build the project: `npm run build`
2. Deploy the `.next` output to GitHub Pages
3. Or use Vercel for automatic deployments

---

## 📧 Contact

| | |
|---|---|
| **Name** | Adi Wahyudi |
| **Email** | adiw3208@gmail.com |
| **Phone** | +6281229514521 |
| **Location** | Purbalingga, Jawa Tengah |
| **LinkedIn** | [linkedin.com/in/adiwhydi](https://linkedin.com/in/adiwhydi) |
| **GitHub** | [github.com/adiw3208](https://github.com/adiw3208) |

---

<div align="center">
  <p>Made with ❤️ using Next.js + GSAP + Three.js</p>
  <p>© 2026 Adi Wahyudi. All rights reserved.</p>
</div>
