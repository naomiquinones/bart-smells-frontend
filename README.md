# bart-smells-frontend

Capstone project for Ada Developers Academy C15A program. This MVP allows users to register, log in, make reports of issues on Bay Area Transit Systems trains, and see a list of recent issues. It uses the BART legacy API key to pull data on current lines operating in the BART system and display them in the report form.

The app features a mobile-friendly responsive design. In particular, the Reports table is designed to change its layout for small screens and expands to a regular table layout when the viewport is big enough to allow the columns to sit side by side.

## Setup

After cloning the repository, install dependencies

```sh
npm install
```

## Running the project

```sh
npm run start
```

**2025 Updates**
This project previously used the react-scripts library installed by create-react-app and was converted to use Vite. Other dependencies were updated as well, which required updating the code to get it to work again. This README was updated with instructions and description of the project.

Custom CSS features include mobile-friendly tables and animations of background images. A media query checks the `prefers-reduced-motion`, and some browsers may block these. If you are unable to see the animations, please comment out the media query in the App.css file that starts with `@media (prefers-reduced-motion: no-preference) {` and its corresponding closing brace `}`.
