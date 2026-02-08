# KangJessy Admin Dashboard

Admin dashboard untuk mengelola orders, leads, blog, portfolio, dan finance.

## 🎨 Design System

### Philosophy

> "Form follows function. Dashboard is for work, not wow."

### Layout

- **Top Navigation** - Fixed header dengan menu horizontal
- **Light Mode** - Optimized untuk data reading
- **Data-Driven** - Fokus pada readability dan scannability

### Color Palette

- **Primary**: Blue (#2563eb) - Actions, links
- **Success**: Green (#10b981) - Success states
- **Warning**: Amber (#f59e0b) - Warnings
- **Danger**: Red (#ef4444) - Errors, delete
- **Neutrals**: Gray scale untuk text & backgrounds

### Typography

- **Font**: Inter (Google Fonts)
- **Sizes**: 12px - 24px range
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── TopNav.vue
│   │   └── DashboardLayout.vue
│   ├── ui/
│   │   ├── BaseButton.vue
│   │   ├── BaseInput.vue
│   │   ├── BaseTable.vue
│   │   ├── BaseBadge.vue
│   │   └── StatsCard.vue
│   └── features/
│       ├── orders/
│       ├── leads/
│       ├── blog/
│       ├── portfolio/
│       └── finance/
├── views/
│   ├── Dashboard.vue
│   ├── Orders.vue
│   ├── Leads.vue
│   ├── Blog.vue
│   ├── Portfolio.vue
│   └── Finance.vue
├── router/
│   └── index.ts
├── services/
│   └── supabase.ts
├── types/
│   └── index.ts
└── utils/
    └── helpers.ts
```

## 🚀 Tech Stack

- **Framework**: Vue 3 + TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS
- **Routing**: Vue Router 4
- **Database**: Supabase
- **Icons**: Lucide Vue Next

## 📦 Installation

```bash
npm install
```

## 🏃 Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 🎯 Features

### Dashboard

- Overview stats (orders, revenue, leads)
- Recent activity
- Quick actions

### Orders

- List all orders with filtering & sorting
- Create/edit orders
- Status management
- Invoice generation

### Leads

- Inbox for new leads
- Qualification workflow
- Archive management

### Blog

- CRUD for blog posts (Sanity CMS)
- Category management
- Draft/publish workflow

### Portfolio

- CRUD for portfolio projects (Sanity CMS)
- Category management
- Featured projects

### Finance

- Revenue overview
- Invoice management
- Transaction history

## 🔐 Authentication

Using Supabase Auth with email/password.

## 📝 Notes

- Desktop-first design (responsive for mobile)
- Light mode only (better for data reading)
- Top navigation (maximize content width)
- Minimal colors (focus on data)
