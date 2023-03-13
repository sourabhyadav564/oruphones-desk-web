import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const otherVendorDataState = atom({
    key: "otherVendorDataState",
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const otherVandorDataSelector = selector({
    key: "otherVandorDataSelector",
    get: ({ get }) => {
        const data = get(otherVendorDataState)
        return data
    },
})

export const makeState = atom({
    key: "makeState",
    default: "",
    effects_UNSTABLE: [persistAtom],
  });

  

export const addListingBrandState = atom({
    key: "addListingBrandState",
    default: "Select...",
    effects_UNSTABLE: [persistAtom],
});

export const addListingBrandSelector = selector({
    key: "addListingBrandSelector",
    get: ({ get }) => {
        const data = get(addListingBrandState);
        return data;
    },
});

export const topLoadingBarState = atom({
    key: "topLoadingBarState",
    default: 0,
    // effects_UNSTABLE: [persistAtom],
})

export const topLoadingBarSelector = selector({
    key: "topLoadingBarSelector",
    get: ({ get }) => {
        const data = get(topLoadingBarState)
        return data
    },
})