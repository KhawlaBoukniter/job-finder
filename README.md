# JobFinder

JobFinder is a modern job board application built with Angular 17+ and Tailwind CSS. It allows users to browse jobs, saves favorites, and apply for positions.

## Tech Stack

- **Framework:** Angular 17+ (Standalone Components)
- **Styling:** Tailwind CSS
- **State Management:** LocalStorage (Session) - *Authenticated User*
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
