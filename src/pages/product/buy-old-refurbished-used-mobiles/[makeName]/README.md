# /product/[makeName].tsx

## Changes

- Changed and cleaned up Carousel behavior.
- Added SSR to hydrate location, filters, models under make(sorted) and products.
- Added infinite scroll to load more products. (using useInView and RTK Query)
- Uses V2 endpoints in `filteredFetch.ts` and `getModels.ts`.

## Expected behaviour

- Location should be consistent between refreshes.
- Query param based filters should prepopulate the data.
- Infinite scroll should work.
- No products, on URL query itself should show neither products nor carousel.
- No products, on clientside filter should show no products, but carousel should remain.
- Missing data from the server shouldn't break the page.
- No fetches should be session-bound.
- All data(and images) in every filter should be cached locally.
- Fetching should happen after debouncing for 500ms. (useDebounce hook).
