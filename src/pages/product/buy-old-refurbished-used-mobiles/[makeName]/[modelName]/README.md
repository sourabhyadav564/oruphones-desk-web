# /product/[makeName]/[modelName].tsx

## [modelName] Page:

### Changes

- Changed and cleaned up Carousel behavior.
- Added SSR to hydrate location, filters and products.
- Added infinite scroll to load more products. (using useInView and RTK Query)
- Uses V2 endpoints in `filteredFetch.ts`.

### Expected behaviour

- Location should be consistent between refreshes.
- Query param based filters should prepopulate the data.
- Infinite scroll should work.
- No products, on URL query itself should show neither products nor carousel.
- No products, on clientside filter should show no products, but carousel should remain.
- Missing data from the server shouldn't break the page.
- No fetches should be session-bound.
- All data(and images) in every filter should be cached locally.
- Fetching should happen after debouncing for 500ms. (useDebounce hook).

## [productID] Page:

### Changes

- Changed and cleaned up Carousel behavior.
- Added SSR to hydrate location, filters and products.
- Added Client side fetch to get similar products.
- Uses V2 endpoints in `filteredFetch.ts`.

### Expected behaviour

- Location should be consistent between refreshes.
- Should redirect to bestDealsNearYou on clicking `Show More`.
- Session-bound logig (work in progress).
- No double fetches.
