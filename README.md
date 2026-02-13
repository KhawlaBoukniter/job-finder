# JobFinder

JobFinder is a modern job board application built with Angular 17+ and Tailwind CSS. It allows users to browse jobs, saves favorites, and apply for positions.

### Day 2: Authentication (Completed)
- **Login/Register**: Forms with validation.
- **Profile**: View and edit user details.
- **Auth Guard**: Protects routes.
- **State Management**: Using specific services and signals.

### Day 3: Job Search (Completed)
- **API Integration**: Fetches real job data from [Arbeitnow API](https://www.arbeitnow.com/api/job-board-api).
- **Search**: Keyword and Location filtering.
- **Pagination**: Client-side pagination (10 items/page).
- **Sorting**: Most recent jobs first.
- **Auth Integration**: "Apply" and "Favorites" buttons visible only to logged-in users.
- **UI**: Responsive cards, loading spinners, and error handling.

### Day 4: Favorites (New)
- **State Management**: Implemented with **NgRx** (Store, Effects, Actions, Reducers).
- **Features**: 
  - Add jobs to favorites (preventing duplicates).
  - View list of favorite jobs.
  - Remove jobs from favorites.
  - Persisted to `mock-api` via Effects.

## Tech Stack

- **Framework:** Angular 17+ (Standalone Components)
- **Styling:** Tailwind CSS
- **State Management:** LocalStorage (Session) - *Authenticated User*
- **State**: Signals & Services
- **Backend (Auth)**: JSON Server (Mock)
- **Backend (Jobs)**: Arbeitnow Public API - *Authenticated User*
- **Backend (Mock):** JSON Server
- **External API:** Arbeitnow Job Board API

## Authentication (Day 2)

The application uses a simulated authentication system:
- **Register:** Creates a new user in `db.json` (password stored in plain text for demo purposes).
- **Login:** Verifies credentials against `db.json` and stores the user session in `localStorage` (without password).
- **Guards:** `AuthGuard` protects `/favorites`, `/applications`, and `/profile`.
- **Profile:** Users can update their information or delete their account.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd job-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/`.

2. Start the Mock API (JSON Server):
   ```bash
   npm run api
   ```
   The API will run at `http://localhost:3000/`.

## Architecture

- `core/`: Global singleton services (`AuthService`), guards (`AuthGuard`), interceptors.
- `features/`: Business logic modules (Auth, Jobs, Favorites, Applications).
- `shared/`: Reusable UI components (`Header`) and pipes.
