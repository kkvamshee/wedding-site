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

## 📋 Customization Guide

### 1. Update Couple Names

Edit `src/sections/Hero.tsx`:
```tsx
<h1>
  <span>Alex</span>
  <span>&</span>
  <span>Sarah</span>
</h1>
```

### 2. Update Wedding Date

Edit `src/sections/Hero.tsx`:
```tsx
<span>June 15, 2025</span>
```

### 3. Update Wedding Details

Edit `src/sections/WeddingDetails.tsx`:
```tsx
const details = [
  {
    title: 'When',
    content: 'Your Wedding Date',
    subContent: 'Ceremony Time',
  },
  {
    title: 'Where',
    content: 'Your Venue Name',
    subContent: 'Venue Address',
  },
  // ...
];
```

### 4. Update Timeline Story

Edit `src/sections/OurStory.tsx`:
```tsx
const timelineEvents = [
  {
    date: 'Your Date',
    title: 'Your Title',
    description: 'Your story...',
    image: '/images/your-image.jpg',
  },
  // ...
];
```

### 5. Replace Images

Replace images in `public/images/` folder:
- `hero-bg.jpg` - Hero background (16:9)
- `timeline-1.jpg` to `timeline-4.jpg` - Timeline images (3:4)
- `gallery-1.jpg` to `gallery-6.jpg` - Gallery images (various ratios)

### 6. Update Contact Information

Edit `src/sections/WeddingDetails.tsx` and `src/sections/RSVP.tsx`:
```tsx
<a href="mailto:wedding@alexandsarah.com">
  wedding@alexandsarah.com
</a>
```

## 💾 RSVP Data Storage & Notifications Setup

The website includes a complete RSVP system with data storage and notifications.

### Step 1: JSONBin.io (Data Storage) - FREE

1. Go to [JSONBin.io](https://jsonbin.io) and create an account
2. Create a new bin with this structure:
```json
{
  "rsvps": []
}
```
3. Copy your **X-Master-Key** and **Bin ID**
4. Update `src/services/rsvpService.ts`

### Step 2: EmailJS (Email Notifications) - FREE (200 emails/month)

1. Go to [EmailJS](https://www.emailjs.com/) and create an account
2. Create an Email Service and Email Template
3. Copy your **Service ID**, **Template ID**, and **Public Key**
4. Update `src/services/rsvpService.ts`

### Step 3: Telegram Bot (Telegram Notifications) - FREE

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
- **Notifications**: EmailJS + Telegram Bot API
- **Data Storage**: JSONBin.io (or localStorage fallback)

## 📄 License

This project is created for personal use. Feel free to customize it for your wedding!

---

**Happy Wedding Planning!** 🎉💍
