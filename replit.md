# CORTE VIP - Barbearia Premium

## Overview

CORTE VIP is a premium barbershop landing page application for a business located in Luanda, Angola at the Outlets Shopping Mall. The application is a single-page marketing website that showcases services, pricing (both regular and promotional), location information, and contact details. The site is designed with a luxury aesthetic featuring gold gradients and dark theme, targeting a premium male grooming clientele.

The application is built as a modern full-stack web application with a React frontend and Express backend, though the current implementation focuses primarily on the frontend presentation layer with minimal backend functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast hot module replacement
- **Wouter** for lightweight client-side routing (simpler alternative to React Router)
- **TanStack Query (React Query)** for server state management and data fetching

**UI Component System:**
- **shadcn/ui** component library based on Radix UI primitives
- Components follow the "New York" style variant as configured in `components.json`
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Framer Motion** for animations and transitions throughout the site

**Design System:**
- Dark theme with gold/luxury color palette (primary: gold/yellow hues)
- Custom CSS variables for theming defined in `client/src/index.css`
- Three font families:
  - `Inter` for body text (--font-sans)
  - `Playfair Display` for serif text (--font-serif)
  - `Cinzel` for headings and display text (--font-display)
- Responsive design with mobile-first approach

**State Management:**
- React Query for async state and caching
- Local component state with React hooks
- No global state management solution (Redux, Zustand) needed for current requirements

**Key Pages & Components:**
- `Home` page: Main landing page composing all sections
- `Hero`: Header section with logo and branding
- `PricingTables`: Regular service pricing display
- `PromotionalPackages`: Special promotional offers for specific days
- `Location`: Google Maps integration and contact information
- `WhatsAppFloat`: Floating WhatsApp contact button
- `Footer`: Site footer with business information

### Backend Architecture

**Server Framework:**
- **Express.js** as the HTTP server framework
- **TypeScript** with ES modules for type-safe server code
- Custom Vite integration for development with HMR support
- Static file serving for production builds

**Current Implementation:**
- Minimal backend with placeholder routes in `server/routes.ts`
- In-memory storage implementation (`MemStorage` class) for user data
- No active API endpoints currently implemented
- Server primarily serves the React SPA and handles static assets

**Session Management:**
- Infrastructure prepared for session handling with `connect-pg-simple`
- Not actively implemented in current codebase

### Data Storage Solutions

**Database Configuration:**
- **PostgreSQL** configured as the target database (via DATABASE_URL environment variable)
- **Drizzle ORM** for database access and migrations
- **@neondatabase/serverless** driver for Neon Database compatibility

**Schema Definition:**
- Single `users` table defined in `shared/schema.ts`:
  - `id`: UUID primary key (auto-generated)
  - `username`: Unique text field
  - `password`: Text field for hashed passwords
- Zod schema integration via `drizzle-zod` for validation

**Current Storage Implementation:**
- In-memory storage (`MemStorage` class) actively used in `server/storage.ts`
- Database schema defined but not actively utilized
- Migration directory configured in `drizzle.config.ts` pointing to `./migrations`

**Architecture Decision Rationale:**
The application currently uses in-memory storage because:
- No user authentication or data persistence is required for the landing page
- The site is primarily informational/marketing focused
- Database infrastructure is prepared for future features (booking system, user accounts)

### External Dependencies

**Third-Party Services:**
- **Google Maps**: Embedded iframe for location display (Outlets Shopping Mall coordinates)
- **WhatsApp Business API**: Direct links to WhatsApp for customer contact (+244 923 542 349, +244 931 054 104, +244 931 161 121)
- **Google Fonts**: Custom fonts loaded from Google Fonts CDN (Playfair Display, Inter, Cinzel)

**Development Tools:**
- **Replit-specific plugins**: Runtime error modal, cartographer, dev banner for Replit environment
- **TSX**: TypeScript execution for development server
- **esbuild**: Production build bundling for server code

**UI Libraries:**
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives (30+ component packages)
- **Lucide React**: Icon library
- **React Icons**: Additional icons (specifically WhatsApp icon via `react-icons/si`)
- **Embla Carousel**: Carousel/slider functionality
- **CMDK**: Command menu component
- **Vaul**: Drawer component

**Utility Libraries:**
- **class-variance-authority**: Utility for managing component variants
- **clsx** & **tailwind-merge**: Class name manipulation
- **date-fns**: Date formatting and manipulation
- **nanoid**: Unique ID generation

**Form Handling:**
- **React Hook Form**: Form state management (via @hookform/resolvers)
- **Zod**: Schema validation

**Build & Development:**
- **PostCSS**: CSS processing with Tailwind and Autoprefixer
- **TypeScript**: Configured with path aliases (`@/*`, `@shared/*`, `@assets/*`)