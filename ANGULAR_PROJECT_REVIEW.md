# Angular Project Review — Movie App

---

## Overall Summary

This is a TMDB-powered movie browsing application built with Angular 21, standalone components, Tailwind CSS 4, and Vitest. It features a landing page, a home section with genre browsing (horizontal scroll carousels), trending movies with pagination, a movie detail page with cast/trailer, a search bar with debounced results, and a localStorage-backed watchlist. The project demonstrates a solid transition from React/Next.js to Angular, using modern Angular APIs (signals, functional interceptors, `input()`, `effect()`, `toObservable`). However, it carries several beginner-level issues that should be addressed before using it as a portfolio piece.

---

## Strengths

1. **Standalone Components throughout** — No `NgModule` usage. Every component is standalone, which is the modern Angular convention.

2. **Modern Angular APIs** — Signals (`signal()`, `computed()`), signal-based inputs (`input()`, `input.required()`), `effect()`, `toObservable()`, and functional interceptors show you are learning current Angular, not legacy patterns.

3. **Functional HTTP interceptor** — `apiKeyInterceptor` uses the modern `HttpInterceptorFn` pattern instead of the deprecated class-based approach.

4. **Clean service abstraction** — The `Movies` service centralizes all API calls, and the `Watchlist` service encapsulates localStorage logic with a signal-based state.

5. **Reactive search with proper RxJS** — The navbar search uses `debounceTime`, `distinctUntilChanged`, and `switchMap` correctly, with `takeUntilDestroyed` for cleanup.

6. **Child component decomposition** — Movie details delegates cast and trailer to dedicated child components (`MovieCredits`, `VideoCard`) that fetch their own data via signal-based inputs and effects.

7. **Consistent Tailwind usage** — All styling is done through Tailwind utility classes with a dark-themed design system.

8. **Strict TypeScript configuration** — `strict: true`, `strictTemplates: true`, and `strictInjectionParameters: true` are all enabled.

9. **Prettier configured** — With Angular HTML parser support.

10. **Routing with nested children** — The route structure demonstrates understanding of Angular's child routes and `<router-outlet>` composition.

11. **`track` usage in `@for` loops** — All `@for` blocks use `track` correctly.

12. **`takeUntilDestroyed` pattern** — Used correctly in navbar and movie-details to prevent memory leaks.

---

## Weaknesses

### Critical

| # | Issue | Location |
|---|-------|----------|
| 1 | **Hardcoded TMDB API key in source code** | `src/app/interceptors/api-key-interceptor.ts:8` |
| 2 | **No environment files** — API key and base URL should come from `environment.ts` | Missing entirely |
| 3 | **API key committed to git** — Even if revoked now, this is a security anti-pattern that recruiters will notice | `api-key-interceptor.ts` |

### High

| # | Issue | Location |
|---|-------|----------|
| 4 | **Dead code in root component** — `App` injects `Movies`, calls `getMovies()` on init, but `getMovies()` is empty. Unused imports: `resourceFromSnapshots`, `Landingpage`, `signal` (for `title`) | `src/app/app.ts` |
| 5 | **Duplicate/near-identical interfaces** — `Movie`, `movieGenre`, and `Result` (trending) are 90%+ identical. This signals a lack of DRY thinking in models | `src/app/models/` |
| 6 | **Watchlist doesn't re-fetch on revisit** — `moviesList` is snapshot-read once via `this.watchlist.watchlist()`. Navigating away and back shows stale data | `src/app/components/watchlist/watchlist.ts:17` |
| 7 | **Zero error UX** — Every HTTP error handler is `console.log(err)`. No user-facing error messages, retry buttons, or toast notifications | All components |
| 8 | **No loading states** — No spinners, skeletons, or loading indicators anywhere. First paint shows empty content until API responds | All data-fetching components |

### Medium

| # | Issue | Location |
|---|-------|----------|
| 9 | **Naming conflicts** — `Movies` is both the service name and a component name. The component aliases it as `MoviesService`, but this indicates poor naming | `services/movies.ts` + `components/movies/movies.ts` |
| 10 | **Inconsistent class naming** — `movieGenre` interface should be `MovieGenre` (PascalCase). `Watchlist` service name is fine, but it's aliased as `watchlistService` when imported in components | `src/app/models/movies-by-genre.ts` |
| 11 | **Hardcoded image base URL** — `'https://image.tmdb.org/t/p/w500'` is repeated in 7+ template locations across components | Multiple HTML files |
| 12 | **Commented-out code left in templates** — Large blocks of commented-out HTML in `navbar.html` and `movie-details.html` | `navbar.html:1-44`, `movie-details.html:1-61` |
| 13 | **No global error interceptor** — No HTTP interceptor for 401/403/500 responses | Missing |
| 14 | **Watchlist grid is not responsive** — Uses `grid-cols-8` with `col-span-2`, meaning exactly 4 columns always. Breaks on mobile | `watchlist.html:2` |
| 15 | **No empty state for watchlist** — Empty watchlist shows a blank page with no guidance | `watchlist.html` |
| 16 | **Unused signal** — `translateX` in `MoviesGenre` is declared but never read or written | `movies-genre.ts:17` |
| 17 | **Unused method** — `getPopularMovies()` in the service (note the plural 's') returns untyped response and is never called anywhere | `services/movies.ts:22-24` |
| 18 | **Type mismatch for `id`** — `movie-details.ts` stores `id` as `string|null`, passes it to child components that accept `string|null`, but it's always used as a number (`+id`) | `movie-details.ts:22`, `movie-credits.ts:15`, `video-card.ts:14` |

### Low

| # | Issue | Location |
|---|-------|----------|
| 19 | **Typo in variable name** — `movieCrediates` should be `movieCredits` | `movie-credits.ts:14` |
| 20 | **Typo in method name** — `getGeners` should be `getGenres`, `getMovesByGenre` should be `getMoviesByGenre` | `movies.ts:18`, `movies-genre.ts:21` |
| 21 | **Typo on landing page button** — "Tranding Movies" should be "Trending Movies" | `landingpage.html:14` |
| 22 | **Empty `.css` files** — Most component CSS files are empty. If no custom styles are needed, consider removing them | Multiple |
| 23 | **Default `README.md`** — Still the auto-generated Angular CLI README with no project description | `README.md` |
| 24 | **`dist/` committed to git** — Build artifacts should be in `.gitignore` | `dist/` folder |
| 25 | **No `alt` text quality** — Several `alt=""` attributes are empty on meaningful images | `hero.html:4`, `movie-details.html:68` |
| 26 | **Landing page has unused button** — "Trending Movies" button has no `(click)` handler or `routerLink` | `landingpage.html:14` |

---

## Recommended Improvements

### High Priority

1. **Move API key to environment files** — Create `src/environments/environment.ts` and `environment.prod.ts`. Reference via `import { environment } from '../../environments/environment'`. Never commit real keys.

2. **Fix the Watchlist reactivity** — Change `moviesList` to a `computed()` signal or use `toObservable(this.watchlist.watchlist)` with `switchMap` to re-fetch when the watchlist signal changes.

3. **Add loading states** — Use `@if` with a `loading` signal, or use the `async` pipe with a `tap` operator to track loading. At minimum, show a skeleton or spinner.

4. **Add error handling** — Create a toast/snackbar service, or at minimum display an error message in the template. An HTTP error interceptor would be even better.

5. **Clean up dead code in `App`** — Remove the unused `moviesService` injection, the empty `getMovies()`, the unused `title` signal, and unused imports.

6. **Extract shared interfaces** — Create a single `MovieResult` interface and use it across `Movie`, `movieGenre`, and `Result`.

### Medium Priority

7. **Rename to avoid conflicts** — Rename the service to `MovieService` and the component to `MoviesPage` or `MoviesList`.

8. **Extract image base URL constant** — Create `src/app/constants/api.ts` with `TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'`.

9. **Remove commented-out code** — It's visible in git history. If you want to show evolution, use branches or commits instead.

10. **Make watchlist responsive** — Replace `grid-cols-8` with responsive grid classes like the trending component uses.

11. **Add empty state for watchlist** — Show a message like "Your watchlist is empty. Start adding movies!" with a link to home.

12. **Add global HTTP error interceptor** — Handle common status codes (401, 403, 404, 500) centrally.

### Low Priority

13. **Fix all typos** — `movieCrediates`, `getGeners`, `getMovesByGenre`, "Tranding".

14. **Delete empty CSS files** or add meaningful styles.

15. **Write meaningful tests** — Current tests are all just "should create" / "should be created". Add tests for the watchlist service (add, remove, toggle, localStorage persistence), and component rendering tests.

16. **Update README** — Add project description, screenshots, tech stack, and setup instructions.

17. **Add `.gitignore` entry for `dist/`** — Build artifacts should not be committed.

---

## Angular Concepts Demonstrated

The following Angular concepts are actively used in this project:

| Concept | Where |
|---------|-------|
| Standalone Components | All components (no NgModules) |
| Template Syntax (`@if`, `@for`) | All templates |
| Component Communication (`input()`) | `MovieCard`, `MoviesGenre`, `MovieCredits`, `VideoCard` |
| Dependency Injection (`inject()`) | All components and services |
| Services (`@Injectable`) | `Movies`, `Watchlist` |
| HttpClient | `Movies` service |
| Functional HTTP Interceptor | `apiKeyInterceptor` |
| Observables / RxJS | `subscribe`, `switchMap`, `debounceTime`, `distinctUntilChanged`, `forkJoin`, `map` |
| Signals | `signal()`, `computed()` across all components |
| Signal Inputs | `input()`, `input.required()` |
| Effects | `effect()` in `MovieCredits`, `VideoCard` |
| `toObservable` (RxJS interop) | `Trending` component |
| Routing (nested children) | `app.routes.ts` |
| `RouterOutlet` | `app.html`, `home.html` |
| `RouterLink` / `RouterLinkActive` | `navbar.html`, `landingpage.html`, `movie-card.html` |
| `ActivatedRoute` (paramMap) | `MovieDetails` component |
| `DomSanitizer` (safe URLs) | `VideoCard` component |
| `DestroyRef` + `takeUntilDestroyed` | `Navbar`, `MovieDetails` |
| `@ViewChild` + `ElementRef` | `MoviesGenre` (scroll control) |
| Reactive Forms (`FormControl`) | `Navbar` search input |
| `localStorage` (persistence) | `Watchlist` service |
| Lifecycle Hooks (`ngOnInit`) | Most components |
| TypeScript Strict Mode | `tsconfig.json` |

---

## Recruiter Perspective

"If you were reviewing this GitHub repository for a Junior Frontend Developer position using Angular, what impression would it would give?"

**Positive impressions:**
- You chose a non-trivial project (multiple pages, API integration, state management, search, pagination)
- You use modern Angular patterns (standalone, signals, functional interceptors) — not outdated NgModule code
- You understand RxJS operators and when to use them (`switchMap` for search, `forkJoin` for parallel calls)
- You know how to structure a project (components, services, models, interceptors)
- You use strict TypeScript — shows you care about type safety
- Tailwind CSS integration shows awareness of modern styling approaches

**Negative impressions:**
- The hardcoded API key is a red flag — it shows unfamiliarity with environment management and security basics
- The dead code in the root component (`app.ts`) looks sloppy — it suggests code was left unfinished
- Commented-out code blocks in templates look unprofessional
- The duplicate interfaces suggest you copied types without thinking about shared models
- No loading or error states in a data-heavy app is a significant UX gap
- The tests are all boilerplate "should create" — a recruiter who clicks "test" will see green but learn nothing about your testing ability
- Typos in code (`movieCrediates`, `getGeners`, "Tranding") suggest lack of attention to detail
- The default README shows low effort on presentation

**Verdict:** This project demonstrates that you understand Angular fundamentals and can build a working application. However, the code-level rough edges could raise concerns about production-readiness and attention to detail. With the fixes listed above, this would be a strong junior portfolio piece. As-is, it's a decent talking point in an interview but may not survive a code review by a senior engineer.

---

## Interview Questions

### 1. Why did you choose standalone components over NgModules?
**Answer:** Standalone components are the modern Angular convention (default since Angular 19). They simplify the architecture by eliminating boilerplate module files, making imports explicit per-component, and enabling better tree-shaking. Since this is a new project, there was no reason to use the legacy NgModule pattern.

### 2. How does the search in your navbar work, and why did you choose those RxJS operators?
**Answer:** The search input uses a `FormControl` whose `valueChanges` observable is piped through `debounceTime(900)` to wait for the user to stop typing, `distinctUntilChanged()` to avoid duplicate requests for the same query, and `switchMap()` to cancel any in-flight request when a new search term arrives. This prevents unnecessary API calls and ensures only the latest result is displayed. `takeUntilDestroyed` handles subscription cleanup.

### 3. What is the difference between `signal()` and `computed()`?
**Answer:** A `signal()` holds a mutable value that can be read and updated. A `computed()` derives a value from other signals and is read-only — it automatically recalculates when its dependencies change. In this project, `visiblePages()` in the `Trending` component is a `computed()` that derives pagination from `pageNumber` and the total pages from the API response.

### 4. How does your HTTP interceptor work?
**Answer:** The `apiKeyInterceptor` is a functional interceptor (`HttpInterceptorFn`) that intercepts every outgoing HTTP request. It clones the request to prepend the TMDB base URL to relative paths and appends the API key as a query parameter. This avoids repeating the base URL and API key in every service method call.

### 5. How is state managed for the watchlist?
**Answer:** The `Watchlist` service uses a `signal<number[]>` to hold movie IDs. On construction, it reads from `localStorage` to persist data across sessions. The `add`, `delete`, and `toggle` methods update the signal and save to `localStorage`. Components inject the service and read the signal directly.

### 6. What problem does `takeUntilDestroyed` solve?
**Answer:** It automatically unsubscribes from an observable when the component is destroyed, preventing memory leaks. It works with Angular's `DestroyRef` to tie subscription lifecycle to component lifecycle. Without it, subscriptions created in `ngOnInit` or constructors would continue running after the component is destroyed.

### 7. Why did you use `toObservable` in the Trending component?
**Answer:** The trending component needs to reactively fetch new data whenever the page number changes. `toObservable` converts the `pageNumber` signal into an observable, which can then be piped through `switchMap` to make API calls. This bridges the signal world with the RxJS world where operators like `switchMap` are available.

### 8. What is `effect()` and when did you use it?
**Answer:** An `effect()` is a function that runs whenever the signals it reads change. I used it in `MovieCredits` and `VideoCard` to automatically fetch data when the `id` input changes. When the parent passes a new movie ID, the effect detects the signal change and triggers a new API call.

### 9. Why did you use `forkJoin` in the Watchlist component?
**Answer:** `forkJoin` takes multiple observables and emits a single result when all of them complete. Since the watchlist stores movie IDs and we need to fetch each movie's details individually, `forkJoin` fires all requests in parallel and waits for all to finish before rendering the results.

### 10. How does your routing structure work?
**Answer:** The root path renders the `Landingpage`. The `/home` path renders the `Home` component (which includes the navbar and a child `<router-outlet>`). Under `/home`, the default child is `Movies` (genre browsing), with additional children for `Trending`, `Watchlist`, and movie details at `/home/movies/:id`. This nested structure allows the navbar to persist across all home sub-pages.

### 11. What is the difference between `input()` and `@Input()`?
**Answer:** `input()` is the new signal-based input API (Angular 16+). It creates a signal that reflects the input value, which can be read with `()` and works naturally with `effect()` and `computed()`. The older `@Input()` decorator creates a plain property. Signal inputs are preferred in modern Angular because they integrate with the reactivity system.

### 12. How would you handle HTTP errors globally in this project?
**Answer:** I would create a functional HTTP interceptor that catches errors from API responses. It could display a toast notification, redirect to an error page, or show an inline message. For specific status codes: 401/403 could redirect to login, 404 could show a not-found message, and 500 could show a retry option.

### 13. What is `bypassSecurityTrustResourceUrl` and why did you use it?
**Answer:** Angular sanitizes URLs by default to prevent XSS attacks. `bypassSecurityTrustResourceUrl` tells Angular to trust a specific URL without sanitization. I used it for YouTube embed iframes because the YouTube embed URL format (`https://www.youtube.com/embed/KEY`) is safe and known, but Angular's sanitizer would block it otherwise.

### 14. How does the movie detail page get its data?
**Answer:** `MovieDetails` subscribes to `ActivatedRoute.paramMap` to get the movie ID from the URL. It then calls `getMovieDetails(id)` to fetch the movie data. Child components (`MovieCredits`, `VideoCard`) receive the ID as a signal-based input and use `effect()` to independently fetch their own data (credits and videos respectively).

### 15. What improvements would you make to this project next?
**Answer:** I would move the API key to environment files, add loading and error states, fix the watchlist reactivity bug (currently it snapshots the watchlist once), merge the duplicate interfaces into a shared model, add a global error interceptor, make the watchlist grid responsive, and write meaningful tests that verify actual behavior beyond "should create".

---

## Final Scores (0–100)

| Category | Score | Notes |
|----------|-------|-------|
| Angular Fundamentals | 72 | Good use of modern APIs (signals, standalone, functional interceptors), but dead code and naming issues hold it back |
| Code Quality | 55 | Duplicate interfaces, dead code, typos, commented-out code, no formatting consistency |
| Architecture | 68 | Clean service/component split and routing, but missing shared models, no environment setup, no global error handling |
| UI/UX | 65 | Polished dark theme with Tailwind, but no loading states, no error states, no empty states, not fully responsive |
| Maintainability | 55 | Hardcoded values, duplicated types, dead code, and typos make maintenance harder |
| TypeScript Usage | 70 | Strict mode enabled, proper interfaces, typed HTTP responses, but type inconsistency for `id` and duplicate types |
| Portfolio Value | 62 | Shows you can build a real app with modern Angular, but code-level rough edges could raise concerns in code review |
| Production Readiness | 35 | Exposed API key, no error handling, no loading states, no tests, no environment config |

**Weighted Average: ~60/100**

---

## Final Questions

### 1. Is this project good enough to include on my CV?

**Yes, with caveats.** It demonstrates real Angular skills and modern patterns. However, before putting it on your CV, spend 1–2 days addressing the high and medium priority issues. The hardcoded API key and dead code are the biggest risks — a recruiter or reviewer who looks at the source will notice them.

### 2. Would it strengthen an application for a Junior Angular Developer role?

**Yes.** Most junior Angular portfolios are either todo apps or extremely basic CRUD apps. This project has real-world complexity (API integration, pagination, search, child components, localStorage state, interceptors). It's significantly stronger than a typical todo app. The key is fixing the rough edges before presenting it.

### 3. What are the top 5 improvements that would have the biggest impact with the least effort?

| Priority | Improvement | Effort | Impact |
|----------|-------------|--------|--------|
| 1 | Move API key to environment files | 15 min | Eliminates the biggest red flag |
| 2 | Clean up dead code in `app.ts` | 10 min | Shows attention to detail |
| 3 | Remove commented-out code blocks | 10 min | Makes code look professional |
| 4 | Add loading spinners to data-fetching views | 30 min | Major UX improvement |
| 5 | Fix watchlist reactivity (use `computed` or `toObservable`) | 20 min | Fixes a real bug |

Total estimated time: ~90 minutes for a transformative improvement.

### 4. What additional feature would make this project significantly stronger without making it overly complex?

**A "Similar Movies" or "Recommendations" section on the movie detail page.** TMDB provides a `/movie/{id}/recommendations` endpoint. Adding this would:
- Show you can compose multiple API calls in a single page
- Demonstrate component reuse (another horizontal scroll section)
- Add visual richness to the detail page
- Require only ~30 lines of new code (service method + small component)
- Be a natural conversation starter in interviews ("How did you decide to fetch and display these?")

This single feature would demonstrate API integration depth, component composition, and UX thinking without overcomplicating the project.
