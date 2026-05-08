## FindIt — Copilot instructions

This file gives actionable, repository-specific guidance to help an AI code assistant be productive immediately.

High-level architecture
- Single-page React app created with Create React App (see `package.json`).
- Routing is handled by `react-router-dom` in `src/App.js`. Key routes:
  - `/` -> `src/Components/Home.jsx` (Hero)
  - `/login` -> `src/Components/LogIn.jsx`
  - `/signup` -> `src/Components/SignUp.jsx`
  - `/browse` -> `src/Components/Browse.jsx`
  - `/post` -> `src/Components/Post.jsx`
  - `/MpesaPayment` -> `src/Components/MpesaPayment.jsx`

Auth & navigation patterns
- Authentication is lightweight: successful login stores `user` in `localStorage` (see `LogIn.jsx`). Signing up posts to an external API and shows success but currently does not redirect automatically.
- The UX expectation: after successful login or signup, navigate to the Browse page (`/browse`). Search for `navigate("/")` in `LogIn.jsx` — this currently navigates to `/` (home). Update to `navigate("/browse")` when implementing redirects.
- `NavBar.jsx` uses `<Link to="/login">`, etc. Keep route paths lowercase and consistent with `App.js` routes.

HTTP & external APIs
- Network calls use `axios` to endpoints at `http://stacykiboko.alwaysdata.net` and `https://stacykiboko.alwaysdata.net`.
- Typical pattern: components create a `FormData`, post to `/api/signup` or `/api/signin`, then inspect `response.data` for `user`, `success`, or `message` fields.

Project-specific conventions
- Inline component-level styles are used via `<style>{`...`}</style>` blocks inside JSX — preserve this pattern for quick UI changes.
- Buttons, badges and layout use Bootstrap classes; keep additions compatible with Bootstrap v5.
- Filenames in `src/Components` are PascalCase and default-export the component.

Developer workflows (commands)
- Install & run locally:
  - npm install
  - npm start (dev server at http://localhost:3000)
- Build:
  - npm run build
- Tests:
  - npm test

Examples and small edits
- Redirect after login: in `src/Components/LogIn.jsx` change `navigate("/")` to `navigate("/browse")` after successful login.
- Redirect after signup: in `src/Components/SignUp.jsx` there is no `navigate` call after success — consider adding `useNavigate()` and `navigate("/browse")` after successful signup (or when `response.data.user` is returned).
- Ensure `NavBar.jsx` links match `App.js` route paths (lowercase used in routes). E.g., `to="/browse"` is correct.

Testing and validation tips for AI edits
- Make small commits per change and run `npm start` to verify UI behavior and redirects.
- Use the browser console to inspect `localStorage['user']` after login to confirm the stored user object.
- When changing network endpoints, prefer making the base URL configurable (not required for small fixes).

Files to reference when making changes
- `src/App.js` — routes and top-level layout
- `src/Components/LogIn.jsx`, `src/Components/SignUp.jsx` — auth flows
- `src/Components/Browse.jsx` — destination for post-login navigation
- `src/Components/NavBar.jsx` — links and navigation

If unsure
- Run the app locally (`npm start`) and test the flow: Sign Up -> check success -> Browse page; Log In -> Browse page. Report back failing responses or token-based flows (none currently).

If you add redirects or change localStorage keys, update this file with the new pattern.
