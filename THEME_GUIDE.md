# Game Masters Collective Retro D&D Theme Guide

## Overview
Game Masters Collective now features a fully integrated retro D&D-inspired theme with both light and dark modes, defaulting to dark mode for that classic dungeon atmosphere.

## Theme Features

### 🎨 Color Schemes

#### Dark Mode (Default) - "Dungeon Theme"
- **Background**: Deep purple-black (#0f0a1a) - evokes dungeon depths
- **Primary**: Gold (#d4af37) - classic D&D treasure/dice color
- **Accent**: Mystic purple (#6d3d8f) - magical elements
- **Text**: Aged parchment (#e8dcc4) - easy on the eyes, fantasy feel

#### Light Mode - "Parchment Theme"
- **Background**: Aged parchment (#f5f0e6) - old game manual aesthetic
- **Primary**: Saddle brown (#8b4513) - leather-bound books
- **Accent**: Tan (#c19a6b) - worn paper edges
- **Text**: Dark brown (#2d1810) - ink on parchment

### 🎲 Typography

#### Fantasy Fonts
- **Headings**: Cinzel - Medieval serif font for that classic RPG feel
- **Body Text**: Crimson Text - Readable serif for long-form content
- **Special Elements**: MedievalSharp - Extra retro D&D flair

#### Font Usage
```tsx
// Automatically applied to headings
<h1>Automatically uses Cinzel</h1>

// For extra medieval styling
<h1 className="medieval-heading">Enhanced medieval style with text shadow</h1>
```

### ✨ Visual Effects

#### Decorative Patterns
- **dice-pattern**: Subtle dice dots pattern for backgrounds
- **Card textures**: Grid patterns on cards for aged paper feel
- **Shadows**: Enhanced shadows for depth and tactile feel

#### Usage Examples
```tsx
// Dice pattern background
<div className="dice-pattern">Content</div>

// Cards automatically have texture
<Card>Automatically styled</Card>

// Medieval heading style
<h1 className="medieval-heading">Game Masters Collective</h1>
```

### 🎯 Component Enhancements

All shadcn/ui components have been enhanced with D&D styling:

#### Buttons
- Gold primary buttons with subtle glow
- Enhanced shadows and borders
- Smooth transitions

#### Cards
- Textured backgrounds
- Hover shadows
- Border effects

#### Badges
- Metallic appearance
- Shadow effects
- Smooth hover states

#### Inputs
- Border focus effects
- Enhanced shadows
- Parchment backgrounds

### 🌓 Theme Toggle

A theme toggle has been added to the header allowing users to switch between:
- **Dark Mode** (Dungeon): Default atmospheric setting
- **Light Mode** (Parchment): Easier reading in bright environments

Location: Top right of header, next to user avatar

### 🎮 Branding

- **Logo**: Sword icon with golden accent
- **Name**: "Game Masters Collective" with medieval-heading class
- **Style**: Consistent D&D aesthetic throughout

## Using the Theme

### Default Dark Mode
The app automatically loads in dark mode. This is configured in:
```tsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
```

### Custom Color Usage
CSS variables are available throughout:
```css
background: var(--background);
color: var(--foreground);
border: var(--border);
```

### Special Classes
```tsx
// Medieval heading with shadow
className="medieval-heading"

// Dice pattern background
className="dice-pattern"

// Gradient hero sections
className="bg-gradient-to-br from-primary/10 via-accent/5 to-background"
```

## Chart Colors
D&D dice-inspired colors for data visualization:
- Chart 1: Gold (d20)
- Chart 2: Purple (d12)
- Chart 3: Red (d10)
- Chart 4: Blue (d8)
- Chart 5: Green (d6)

## Best Practices

1. **Use semantic color variables** instead of hardcoded colors
2. **Apply medieval-heading** to important titles and headers
3. **Use Card components** to get automatic texture effects
4. **Leverage Badge variants** for game systems and status indicators
5. **Add dice-pattern** to large backgrounds for subtle D&D flavor

## Files Modified

- `/src/styles/fonts.css` - Added fantasy fonts
- `/src/styles/theme.css` - Complete D&D theme with light/dark modes
- `/src/app/App.tsx` - Added ThemeProvider with dark default
- `/src/app/components/ThemeToggle.tsx` - NEW: Theme switcher component
- `/src/app/components/Header.tsx` - Added theme toggle and Game Masters Collective branding
- `/src/app/components/ui/button.tsx` - Enhanced with D&D styling
- `/src/app/components/ui/card.tsx` - Added hover effects and shadows
- `/src/app/components/ui/badge.tsx` - Enhanced with better transitions
- `/src/app/components/ui/input.tsx` - Improved focus states
- `/src/app/components/HomePage.tsx` - Added decorative hero section
- `/src/app/components/Dashboard.tsx` - Enhanced welcome banner

## Future Enhancements

Consider adding:
- Dice roll animations on button clicks
- Parchment tear effects on card edges
- Custom loading spinners with d20 dice
- Sound effects for interactions (optional)
- More medieval iconography
