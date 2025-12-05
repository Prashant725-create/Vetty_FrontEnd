# Mini Jira Board – Angular Assignment

This project is a mini Jira-board-like application built using Angular as part of the frontend assignment for the Vetty internship. 

nws_2879_1764941075_copy

The app allows a user to log in and manage tasks across multiple columns, similar to a kanban/Jira board.

# Features
# 1. Login Page

Dummy credentials:

Email: admin@test.com

Password: admin123

On successful login, the user is redirected to the Jira Board.

# 2. Jira Board

Columns:

To Do

In Progress

Need Review

Completed

Layout inspired by the reference Jira-style board shared in the assignment.

# 3. Task Management

Click on the “+” button in any column to add a task.

Task fields:

Task Title

Task ID

Description

Target Column

Tasks are displayed under the selected column.

# 4. Drag & Drop

Tasks can be dragged and dropped between columns.

Implemented using Angular CDK Drag & Drop.

# 5. (Optional) Persistence

Board data is stored in localStorage (if enabled) so that:

Tasks persist across page refreshes.

Column states are retained.

# Tech Stack

Framework: Angular (10+)

UI / Styling: Angular, CSS

Drag & Drop: Angular CDK

Storage: Browser localStorage (client-side only)

Build Tooling: Standard Angular tooling (with npm scripts)

Note: Only client-side implementation is included; no backend is used, as per the assignment.

# Getting Started (Run Locally)
1. Prerequisites

Node.js (LTS recommended)

npm (comes with Node)

Verify:

node -v
npm -v

2. Install Dependencies

From the project root folder:

npm install

3. Start the Dev Server
npm run dev


Then open your browser and go to:

http://localhost:4200/


(or the port shown in your terminal)

# Login Details

Use the following credentials to log in:

Email: admin@test.com

Password: admin123

After login, you’ll be redirected to the Jira board.

# Project Structure (High-level)
src/
  app/
    auth/          # Login components & auth logic
    board/         # Jira board components (columns, tasks)
    shared/        # Interfaces, models, shared services
    core/          # Core services (storage, auth, etc.)
  assets/          # Static assets (if any)
  styles.css       # Global styles

# Assumptions

Only a single user flow is required (no user registration).

No backend or API is used; all data is stored and managed on the client.

Basic validations are applied to the add-task form where necessary.

