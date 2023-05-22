# \_app.tsx

- Added Jotai provider, evenually to replace contextProvider.
- Added RTK Query provider, global state management for fetches that share the same key.
- Added Hydrate, for RTK query to come preloaded with data from the server. (SSR support)

# index.tsx

- ShowBy component modified to use only /product/buy-old-refurbished-used-mobiles/bestdealnearyou with query params for filters.
- SSR preloads the data based on location cookie.
- Uses V2 endpoints in `getHomeListings.ts`.

# Expected behaviour

## Location

- Location should be consistent between refreshes.
- Location should be consistent between pages.
- Location should be 'India' if
  - No cookie is present.
  - Cookie is present but location is not found in the list of locations.
  - No location permission is given by the user.
- Location should be hydrated on the client by SSR.

## ShowBy component

- Should apply the right filters based on context.
