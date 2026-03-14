# Alex & Sarah Wedding Website

A beautiful, animated wedding invitation website built with React, TypeScript, Tailwind CSS, and GSAP. Features dark theme toggle and RSVP with email/Telegram notifications.

## 🌟 Features

- **Hero Section** - Cinematic entrance with couple names, wedding date, and animated floating hearts
- **Our Story Timeline** - Journey showcasing your love story
- **Wedding Details** - Bento grid layout with all event information
- **Photo Gallery** - Masonry waterfall layout with lightbox viewer
- **RSVP Form** - Elegant form with validation, data storage, and notifications
- **Dark Theme Toggle** - Switch between light and dark modes
- **Smooth Animations** - GSAP-powered scroll animations and transitions

## 🎨 Design

- **Color Palette**: Gold (#d8af72), Black (#15151a), White (#ffffff)
- **Typography**: Playfair Display (headings), Forum (body)
- **Style**: Elegant, romantic, modern with glassmorphism effects

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 💾 RSVP Data Storage & Notifications Setup

The website includes a complete RSVP system with data storage and notifications.

### Telegram Bot (Telegram Notifications) - FREE

1. Message **@BotFather** on Telegram
2. Create a new bot and get your **Bot Token**
3. Get your **Chat ID** from `https://api.telegram.org/bot<TOKEN>/getUpdates`
4. Update `src/services/rsvpService.ts`

## 🌙 Dark Theme

The website includes a dark theme toggle that:
- Persists in localStorage
- Respects system preference on first visit
- Smoothly transitions between light and dark modes

## 🎭 Animation Customization

Animations are powered by GSAP. To customize:

1. Edit animation values in each section component
2. Adjust timing in the `useEffect` hooks
3. Modify easing functions (`power3.out`, `back.out`, etc.)

## 📱 Responsive Design

The website is fully responsive:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔧 Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui
- **Animations**: GSAP + ScrollTrigger
- **Icons**: Lucide React
- **Notifications**: Telegram Bot API
- **Data Storage**: JSONBin.io (or localStorage fallback)

## 📄 License

This project is created for personal use. Feel free to customize it for your wedding!

---

**Happy Wedding Planning!** 🎉💍
