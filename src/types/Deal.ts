type TDeal= {
  _id: string;
  deviceCondition: string;
  deviceStorage: string;
  listingLocation: string;
  listingDate: string;
  name: string;
  isOtherVendor: 'Y' | 'N';
  marketingName: string;
  listingId: string;
  verified: boolean;
  imagePath: string; // needs clarification
  listingPrice: number;
}

export default TDeal;