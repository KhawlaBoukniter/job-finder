# JobFinder

JobFinder is a modern job board application built with Angular 17+ and Tailwind CSS. It allows users to browse jobs, save favorites, and apply for positions.

## Tech Stack

- **Framework:** Angular 17+ (Standalone Components)
- **Styling:** Tailwind CSS
- **State Management:** LocalStorage (Session)
- **Backend (Mock):** JSON Server
- **External API:** Arbeitnow Job Board API

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

- `core/`: Global singleton services, guards, interceptors.
- `features/`: Business logic modules (Auth, Jobs, Favorites, Applications).
- `shared/`: Reusable UI components and pipes.
