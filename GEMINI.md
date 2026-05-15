# Project: Personal Trainer

This file contains team-shared architecture, conventions, workflows, and repo guidance.

## Architecture
- **Frontend:** Single-page application (SPA) using Vanilla JavaScript, HTML, and CSS.
- **Nutrition Data:** Integration with the **Edamam Food Database API** for real-time food search, caloric, and macronutrient data.
- **Persistence:** Local browser storage (`localStorage`) for daily logs and user settings.

## Conventions
- CSS Variables are used for all theme-related styling.
- Functional decomposition for UI components (e.g., `renderTraining`, `updateDashboard`).

## Workflows
- **Food Logging:** Uses Edamam API. Requires `app_id` and `app_key` configured in the `searchFood` function.
- **Training Plan:** Static data model for the PPL split, rendered dynamically.
