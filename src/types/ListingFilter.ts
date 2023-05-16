type TListingFilter = {
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
};

export type TListingReturnFilter = {
	_id?: string;
	deviceCondition?: string;
	defaultImage?: string;
	listingLocation?: string;
	listingPrice?: number;
	marketingName?: string;
	model?: string;
	listingDate?: string;
	listedBy?: string;
};

export type Tmodel = {
	model: string;
	image: string;
};

export default TListingFilter;
