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
    get: ({get}) => {
        const data = get(otherVendorDataState)
        return data
    },
})

// export const otherVandorListingIdState = atom({
//     key: "otherVandorListingId",
//     default: "",
// })

// export const otherVandorListingIdSelector = selector({
//     key: "otherVandorListingIdSelector",
//     get: ({get}) => {
//         const data = get(otherVandorListingIdState)
//         return data
//     }
// })