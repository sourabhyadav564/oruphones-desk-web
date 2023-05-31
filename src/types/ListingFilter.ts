type TListingFilter = {
	Ram: string[];
	listingLocation?: string;
	page?: number;
	make?: string[];
	model?: string[];
	condition?: string[];
	storage?: string[];
	warranty?: string[];
	verified?: boolean;
	priceRange?: number[];
	limit?: number;
	sort?: {
		price?: number;
		date?: number;
	};
	includeSelf?: boolean;
};

export type TListingFilterWithID = {
	listingId: string;
	listingLocation?: string;
	page?: number;
	make?: string[];
	model?: string[];
	condition?: string[];
	storage?: string[];
	warranty?: string[];
	verified?: boolean;
	priceRange?: number[];
	limit?: number;
	sort?: {
		price?: number;
		date?: number;
	};
	includeSelf?: boolean;
};

export type TListingReturnFilter = {
	listingId?: string;
	deviceCondition?: string;
	// defaultImage?: string;
	listingLocation?: string;
	listingPrice?: number;
	marketingName?: string;
	model?: string;
	make?: string;
	status?: string;
	listingDate?: string;
	listedBy?: string;
	images?: {
		thumbImage: string;
		fullImage: string;
		isVarified: string;
	}[];
	defaultImage: {
		fullImage: string;
	};
	isOtherVendor?: boolean;
	imagePath: string;
	deviceStorage?: string;
	charger?: string;
	earphone?: string;
	originalbox?: string;
	deviceRam?: string;
	functionalTestResults?: {
		commandName: string;
		startDateTime: string;
		displayName: string;
		testStatus: string;
		endDateTime: string;
	}[];
	notionalPercentage?: number;
	warranty?: string;
	cosmetic?: {
		0: string;
		1: string;
		2: string;
	};
	verified?: boolean;
	count?: number;
	vendorName?: string;
	vendorImage?: string;
	vendorLink?: string;
};

export type Tmodel = {
	model: string;
	image: string;
};

export default TListingFilter;
