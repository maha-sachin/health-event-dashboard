# Frontend - AWS Health Events Dashboard

This directory contains the React-based frontend application for the AWS Health Events Dashboard.

## Technology Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS + Radix UI components
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Package Manager**: npm

## Project Structure

```
frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (buttons, inputs, etc.)
│   │   └── dashboard/     # Dashboard-specific components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and configurations
│   ├── api/               # API client and data fetching
│   └── assets/            # Static assets
├── public/                # Public assets
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── .env                   # Environment variables
```

## Key Features

- Real-time AWS health events monitoring
- Interactive dashboard with filtering and search
- Responsive design for desktop and mobile
- Event detail views with affected resources
- Multi-account support
- Cost impact analysis for FinOps teams

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## API Integration

The frontend calls the serverless backend APIs:

- `GET /api/health-events` - Fetch health events
- `POST /api/event-details` - Get event details
- `GET /api/affected-entities/{eventArn}` - Get affected resources

## Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_AWS_REGION` - Default AWS region
- `VITE_ENVIRONMENT` - Environment (dev/staging/prod)
