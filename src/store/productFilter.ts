import { atomWithStorage } from "jotai/utils";
import type  TListingFilter  from "@/types/ListingFilter";

const filterAtom = atomWithStorage<TListingFilter>('productFilters',{
  page: 1,
});

export default filterAtom;