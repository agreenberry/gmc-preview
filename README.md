# Game Masters Collective

A D&D-based platform for finding and booking Game Masters, similar to how Rover works for pet services.

## Features

- **Browse DMs**: Search and filter Game Masters by experience, game systems, style, and location
- **DM Profiles**: Comprehensive profiles with ratings, reviews, availability, and pricing
- **Booking System**: Request and manage game sessions with integrated calendar
- **Events**: Special one-time events and campaigns hosted by DMs
- **DM Dashboard**: Manage availability, bookings, and profile settings
- **Stripe Integration**: Secure payment processing
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: WCAG AAA compliant with comprehensive keyboard navigation and screen reader support

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **Tailwind CSS v4** for styling
- **Radix UI** for accessible components
- **Stripe** for payments
- **Motion** (Framer Motion) for animations
- **Recharts** for data visualization

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
# or
npm install
```

### Development

Run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build

Build for production:

```bash
pnpm build
# or
npm run build
```

### Preview Production Build

```bash
pnpm preview
# or
npm run preview
```

## Project Structure

```
/
├── src/
│   ├── app/
│   │   ├── components/     # React components
│   │   │   ├── ui/        # Reusable UI components
│   │   │   └── ...        # Page components
│   │   ├── App.tsx        # Root component
│   │   └── routes.tsx     # Route configuration
│   ├── data/
│   │   └── mockData.ts    # Mock data for development
│   ├── types/
│   │   └── index.ts       # TypeScript type definitions
│   └── styles/
│       ├── index.css      # Main stylesheet
│       ├── theme.css      # Theme variables
│       ├── tailwind.css   # Tailwind directives
│       └── fonts.css      # Font imports
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Path Aliases

This project uses `@/` as an alias for the `src/` directory:

```typescript
// Instead of:
import { Button } from '../../../components/ui/button'

// You can use:
import { Button } from '@/app/components/ui/button'
```

## Theme

The app uses a retro D&D-inspired black and gold theme with:
- Pure black backgrounds (#000000)
- Gold accents (#d4af37)
- Medieval-style typography
- High contrast for accessibility

## License

This project is private and proprietary.
