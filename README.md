# Pawdopt Client

## Project Purpose
This repository contains the frontend application for Pawdopt, a dynamic web platform designed to connect pets in need of loving homes with individuals looking to adopt. It provides a user-friendly interface for browsing pets, managing adoption requests, contributing to donation campaigns, and accessing personalized dashboards.

## Live URL
- **Client Live Site:** https://pawdopt1.netlify.app/

## Key Features
- **Responsive User Interface:** Fully responsive design ensuring optimal viewing and interaction across mobile, tablet, and desktop devices.
- **Authentication & Authorization:** Secure user login/registration with email/password, Google, and other social providers. Implements JWT for protected routes and role-based access control (User/Admin).
- **Pet Management:** Browse detailed pet listings, filter by category and search by name. Users can add new pets for adoption, manage their added pets, and track adoption requests.
- **Donation Campaigns:** Explore various donation campaigns, view progress, and securely contribute via Stripe integration.
- **Interactive Dashboards:** Dedicated dashboards for both regular users and administrators, offering tailored functionalities for managing pets, donations, and user accounts.
- **Modern UI Components:** Built with `shadcn-ui` for a clean, accessible, and visually appealing user experience.
- **Efficient Data Fetching:** Leverages Tanstack Query for robust data management, caching, and real-time updates, enhancing application performance.
- **Rich Text Editing:** Incorporates React-Quill for rich text input in long descriptions, providing a better content creation experience.
- **Payment Integration:** Secure donation processing via Stripe.
- **Infinite Scrolling & Skeletons:** Enhanced user experience with infinite scrolling for listings, skeleton loaders for improved perceived performance, and a dark/light mode toggle.

## Technologies Used

### Core Technologies:
- **React.js:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool for modern web projects.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Shadcn UI:** Reusable UI components built with Radix UI and Tailwind CSS.

### Key Libraries & Packages:
- `@radix-ui/react-*` (various components for `shadcn-ui`)
- `@splidejs/react-splide` (for carousels/sliders)
- `@stripe/react-stripe-js`, `@stripe/stripe-js` (Stripe integration for payments)
- `@tanstack/react-query`, `@tanstack/react-table` (data fetching, state management, and table functionalities)
- `aos` (Animate On Scroll library)
- `axios` (HTTP client for API requests)
- `firebase` (Authentication and potentially other services)
- `formik` (Form management and validation)
- `framer-motion` (Animation library)
- `gsap` (Advanced JavaScript animation library)
- `lottie-react` (for Lottie animations)
- `lucide-react` (Icon library)
- `react-day-picker` (Date picker component)
- `react-icons` (Popular icon sets)
- `react-intersection-observer` (for infinite scrolling)
- `react-loading-skeleton` (for skeleton loading states)
- `react-quill` (WYSIWYG text editor)
- `react-router-dom` (for declarative routing)
- `react-select` (Customizable select input)
- `sonner` (Toast notifications)
- `tailwind-merge` (Debouncing hook)
- `tailwindcss`
- `use-debounce` (Debouncing hook)

## Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <your-client-repo-url>
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   # or yarn install
   ```

### Environment Variables
Create a `.env.local` file in the `client/` directory and add your Firebase configuration keys:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_SERVER_BASE_URL=https://pawdopt-pearl.vercel.app
```

### Running the Application
To start the development server:
```bash
npm run dev
# or yarn dev
```
The application will typically run on `http://localhost:5173`.

### Build for Production
```bash
npm run build
# or yarn build
```

### Linting
```bash
npm run lint
# or yarn lint
```
