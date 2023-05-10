import React from 'react';
import { useState, useEffect, useContext } from 'react';
import Select from '@/components/Form/Select';
import { useRecoilValue } from 'recoil';
import { addListingBrandSelector } from '@/atoms/globalState';
import Cookies from 'js-cookie';
// import { Axios } from 'axios';
import * as Axios from '@/api/axios';
import { numberWithCommas } from '@/utils/util';
import AppDownloadPopup from '@/components/Popup/AppDownloadPopup';
import { useRouter } from 'next/router';
import ProductCard from '@/components/Cards/ProductCard';
import ProductSkeletonCard from '@/components/Cards/ProductSkeletonCard';
import Image from 'next/image';

function Index({ isFromEdit, brandsList }) {
	const router = useRouter();

	const initialState = [
		{ name: 'image-1' },
		{ name: 'image-2' },
		{ name: 'image-3' },
		{ name: 'image-4' },
	];
	const [searchModel, setSearchModel] = useState('');
	const [showpage, setShowpage] = useState(0);
	const [makeRequired, setMakeRequired] = useState('');
	const [makeRequired2, setMakeRequired2] = useState('');
	const brandName = useRecoilValue(addListingBrandSelector);
	const [makeOptions, setMakeOptions] = useState(brandsList);
	const [makeOptions2, setMakeOptions2] = useState(brandsList);
	const [modelOptions, setModelOptions] = useState([]);
	const [modelOptions2, setModelOptions2] = useState([]);
	const [colorAndStorageOption, setColorAndStorageOption] = useState([]);
	const [colorAndStorageOption2, setColorAndStorageOption2] = useState([]);
	const [make, setMake] = useState(null);
	const [make2, setMake2] = useState(null);
	const [marketingName, setmarketingName] = useState(null);
	const [marketingName2, setmarketingName2] = useState(null);
	const [storage, setStorage] = useState(null);
	const [storage2, setStorage2] = useState(null);
	const [deviceCondition, setDeviceCondition] = useState(null);
	const [charger, setCharger] = useState('N');
	const [headphone1, setHeadphone1] = useState('N');
	const [originalBox1, setOriginalBox1] = useState('N');
	const [leastSellingprice, setLeastSellingprice] = useState('');
	const [maxsellingprice, setMaxsellingprice] = useState('');
	const [marketingNameRequired, setMarketingNameRequired] = useState('');
	const [marketingNameRequired2, setMarketingNameRequired2] = useState('');
	const [storageRequired, setStorageRequired] = useState('');
	const [storageRequired2, setStorageRequired2] = useState('');
	const [getExternalSellerData, setGetExternalSellerData] = useState([]);
	const [showAppDownloadPopup, setShowAppDownloadPopup] = useState(false);
	const conditionOption = ['Fair', 'Good', 'Excellent', 'Like New'];
	const [active, setactive] = useState(false);
	const [Index, setIndex] = useState(0);
	const [products, setProducts] = useState([]);
	const [bestDeal, setBestDeal] = useState([]);
	const [PriceShow, setPriceShow] = useState(false);
	const [PriceProduct, setPriceProduct] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setModelOptions([]);
		setModelOptions2([]);
		setStorage(null);
		setStorage2(null);
		setmarketingName(null);
		setmarketingName2(null);
		setColorAndStorageOption([]);
		setColorAndStorageOption2([]);
	}, [make, make2]);

	useEffect(() => {
		modelOptions?.map((item) => {
			if (item['marketingname'] == marketingName) {
				setColorAndStorageOption(item);
			}
		});
	}, [marketingName, modelOptions]);

	useEffect(() => {
		modelOptions2?.map((item) => {
			if (item['marketingname'] == marketingName2) {
				setColorAndStorageOption2(item);
			}
		});
	}, [marketingName2, modelOptions2]);

	useEffect(() => {
		(async () => {
			const data = await Axios.fetchModelList(
				Cookies.get('userUniqueId') || 'Guest',
				Cookies.get('sessionId') != undefined
					? Cookies.get('sessionId')
					: localStorage.getItem('sessionId') || '',
				'',
				''
			);
			let makeModelLists = data?.dataObject;
			if (makeModelLists) {
				makeModelLists.sort((a, b) => {
					return a.make.localeCompare(b.make);
				});
				setMakeOptions(makeModelLists);
				setMakeOptions2(makeModelLists);
			}
		})();
	}, []);

	useEffect(() => {
		let payload = {
			deviceStorage: storage2?.split('/')[0],
			deviceRam: storage2
				?.toString()
				.split('/')[1]
				.toString()
				.replace(/GB/g, ' GB')
				.replace(/RAM/, '')
				.trim(),
			make: make2,
			marketingName: marketingName2,
			deviceCondition: 'Like New',
			warrantyPeriod: 'zero',
			hasCharger: charger === 'Y',
			hasEarphone: headphone1 === 'Y',
			hasOriginalBox: originalBox1 === 'Y',
		};
		if (make2 !== null && marketingName2 !== null && storage2 !== null) {
			Axios.getExternalSellSourceData(payload).then((response) => {
				setGetExternalSellerData(response?.dataObject);
			});
		}
	}, [make2, marketingName2, storage2, charger, headphone1, originalBox1]);

	const setSearchModelList2 = async (e) => {
		const models = await Axios.fetchModelList(
			Cookies.get('userUniqueId'),
			Cookies.get('sessionId'),
			make2,
			e
		);
		if (models?.dataObject[0]?.models) {
			const sortedModels = models.dataObject[0].models.sort((a, b) => {
				return a.marketingname.localeCompare(b.marketingname);
			});
			setModelOptions2(sortedModels);
		}
	};

	const setSearchModelList = async (e) => {
		const models = await Axios.fetchModelList(
			Cookies.get('userUniqueId'),
			Cookies.get('sessionId'),
			make,
			e
		);
		if (models?.dataObject[0]?.models) {
			const sortedModels = models.dataObject[0].models.sort((a, b) => {
				return a.marketingname.localeCompare(b.marketingname);
			});
			setModelOptions(sortedModels);
		}
	};

	useEffect(() => {
		let payload = {
			charger: 'Y',
			deviceCondition: 'Like New',
			devicestorage: storage2?.split('/')[0],
			deviceRam: storage2
				?.toString()
				.split('/')[1]
				.toString()
				.replace(/GB/g, ' GB')
				.replace(/RAM/, '')
				.trim(),
			earPhones: 'Y',
			make: make2,
			marketingName: marketingName2,
			originalBox: 'Y',
			warrantyPeriod: 'zero',
			verified: 'no',
		};
		const fetchData = async () => {
			const getRecommandedPrice = await Axios.getRecommandedPrice(payload);
			setLeastSellingprice(getRecommandedPrice?.dataObject.leastSellingprice);
			setMaxsellingprice(getRecommandedPrice?.dataObject.maxsellingprice);
		};

		if (make2 != null && marketingName2 != null && storage2 != null) {
			fetchData();
		}
	}, [make2, marketingName2, storage2]);

	const handleClick = () => {
		setShowAppDownloadPopup(true);
	};

	useEffect(() => {
		if (make && marketingName && storage && deviceCondition) {
			if (make === 'oneplus') {
				setMake('OnePlus');
			} else {
				setMake(make.charAt(0).toUpperCase() + make.slice(1));
			}
			let payLoad = {
				listingLocation: 'India',
				make: [make],
				marketingName: [marketingName.replace('+', '%2B')],
				reqPage: 'BBNM',
				color: [],
				deviceCondition: [deviceCondition],
				deviceStorage: [storage.toString().split('/')[0]],
				deviceRam: [],
				maxsellingPrice: 200000,
				minsellingPrice: 0,
				verified: '',
				warenty: [],
				pageNumber: 0,
			};
			setLoading(true);
			Axios.searchFilter(payLoad, 0, 0, 'Featured').then((response) => {
				setProducts(response?.dataObject?.bestDeals);
				setProducts((products) => [
					...products,
					...response?.dataObject?.otherListings,
				]);
				setLoading(false);
			});
		}
	}, [storage, deviceCondition, marketingName, make]);

	useEffect(() => {
		if (make2 != null && marketingName2 != null && storage2 != null) {
			setPriceShow(true);
		} else {
			setPriceShow(false);
		}
	}, [make2, marketingName2, storage2]);

	useEffect(() => {
		if (
			make != null &&
			marketingName != null &&
			storage != null &&
			deviceCondition != null
		) {
			setPriceProduct(true);
		} else {
			setPriceProduct(false);
			setLoading(false);
		}

		if (make == null || marketingName == null || storage == null) {
			setactive(false);
		}
	}, [make, marketingName, storage, deviceCondition]);

	return (
		<div className="lg:px-36 ">
			<div className=" grid lg:grid-cols-4 grid-cols-3  lg:my-0 lg:mx-0 my-16 mx-8">
				<div className="lg:col-span-1 col-span-3 lg:border-r  text-m-green text-center lg:py-[16vh]">
					<p className="text-[20px] font-Roboto-Semibold">Sell / Buy Mobiles</p>
					<p className="text-[16px] font-Roboto-Regular">
						Are you a seller or buyer of ORUphones
					</p>
					<div className="lg:grid  flex lg:gap-0  lg:pl-0 pl-10 pr-8 gap-4 lg:space-y-4 my-4 cursor-pointer">
						<div
							className={
								showpage == 2
									? ' text-[18px]  font-Roboto-Semibold py-2 border m-auto justify-center  rounded-md w-8/12 '
									: 'text-[18px] bg-m-green text-yellow-300 font-Roboto-Semibold py-2 border m-auto justify-center  rounded-md w-8/12 '
							}
							onClick={() => {
								setShowpage(1);
								setMake(null);
								setmarketingName(null);
								setStorage(null);
								setLeastSellingprice('');
								setMaxsellingprice('');
								setGetExternalSellerData([]);
							}}
						>
							Sell
						</div>
						<div
							className={
								showpage == 2
									? 'text-[18px] bg-m-green text-yellow-300 font-Roboto-Semibold py-2 border m-auto justify-center  rounded-md w-8/12 '
									: 'text-[18px]  font-Roboto-Semibold py-2 border m-auto justify-center  rounded-md w-8/12 '
							}
							onClick={() => {
								setShowpage(2);
								setMake2(null);
								setmarketingName2(null);
								setStorage2(null);
								setactive(false);
								setProducts([]);
							}}
						>
							Buy
						</div>
					</div>
				</div>
				<div className="col-span-3 lg:border-l ">
					{showpage == 2 ? (
						<div>
							<div className="px-8 gap-8 py-4">
								<div>
									<span className="px-4 py-4">
										<Select
											star="*"
											labelName="Brand"
											className={`${makeRequired} py-2`}
											onFocus={(e) => {
												setMakeRequired('');
											}}
											required
											value={
												make === null
													? 'Select...'
													: { label: make, value: make }
											}
											disabled={isFromEdit}
											onChange={(e) => {
												setMake(e.value);
											}}
											options={makeOptions?.map((item) => {
												return { label: item.make, value: item.make };
											})}
										></Select>
										{makeRequired && (
											<p className="text-sm whitespace-nowrap cursor-pointer text-red">
												Please select this field
											</p>
										)}
									</span>
									<span className="px-4 py-4">
										<Select
											value={
												marketingName === null
													? 'Select..'
													: { label: marketingName, value: marketingName }
											}
											star="*"
											labelName="Model"
											disabled={isFromEdit}
											className={`${marketingNameRequired} py-2`}
											onFocus={(e) => {
												setMarketingNameRequired('');
												setSearchModelList2('');
											}}
											onChange={(e) => {
												setmarketingName(e.value);
											}}
											options={modelOptions?.map((item) => {
												return {
													label: item.marketingname,
													value: item.marketingname,
												};
											})}
											onInputChange={(e) => {
												setSearchModelList(e);
											}}
										></Select>
										{marketingNameRequired && (
											<p className="text-sm whitespace-nowrap cursor-pointer text-red">
												Please select this field
											</p>
										)}
									</span>
									<span className="px-4 ">
										<Select
											value={
												storage === null
													? 'Select..'
													: { label: storage, value: storage }
											}
											star="*"
											labelName="Storage"
											disabled={isFromEdit}
											className={`${storageRequired} py-2`}
											onFocus={(e) => {
												setStorageRequired('');
											}}
											onChange={(e) => {
												setStorage(e.value);
											}}
											options={colorAndStorageOption?.storage?.map((item) => {
												return { label: item, value: item };
											})}
										></Select>
										{storageRequired && (
											<p className="text-sm whitespace-nowrap cursor-pointer text-red">
												Please select this field
											</p>
										)}
									</span>
									<div>
										<p className="text-[14px] font-medium pb-4 px-2">
											Condition <span className="text-red-400">*</span>
										</p>
										<div className="flex flex-wrap gap-2">
											{conditionOption.map((items, index) => (
												<div
													key={index}
													className={`w-28 text-center cursor-pointer py-2 px-4 border inline mx-2 rounded-md ${
														active && Index == index
															? 'bg-m-green text-white'
															: ''
													}`}
													onClick={() => {
														setactive(true);
														setIndex(index);
														setDeviceCondition(items);
													}}
												>
													{items}
												</div>
											))}
										</div>
									</div>

									{PriceProduct ? (
										<div>
											<div className="pt-8 text-[18px] font-semibold">
												Best Deals
											</div>
											<div className="grid md:grid-cols-3 grid-cols-2  gap-4 mt-4">
												{loading ? (
													Array(3)
														.fill()
														.map((_, index) => (
															<ProductSkeletonCard
																key={index}
																isTopSelling={true}
															/>
														))
												) : !loading && products && products?.length > 0 ? (
													products?.map((product, index) => (
														<ProductCard
															key={index}
															data={product}
															prodLink
															setProducts={setProducts}
														/>
													))
												) : (
													<div>
														{loading ? <div>Loading...</div> : <div></div>}{' '}
													</div>
												)}
												{products?.length == 0 && !loading ? (
													<div className="w-[40vh]">No products available</div>
												) : (
													<div></div>
												)}
											</div>
										</div>
									) : (
										<div className="pt-16 font-normal opacity-80 text-center ">
											Please select all fields
										</div>
									)}
								</div>
							</div>
						</div>
					) : (
						<div>
							<div className="px-8 gap-8 py-4">
								<div>
									<span className="px-4 py-4">
										<Select
											star="*"
											labelName="Brand"
											className={`${makeRequired2} py-2`}
											onFocus={(e) => {
												setMakeRequired2('');
											}}
											required
											value={
												make2 === null
													? 'Select...'
													: { label: make2, value: make2 }
											}
											disabled={isFromEdit}
											onChange={(e) => {
												setMake2(e.value);
											}}
											options={makeOptions2?.map((item) => {
												return { label: item.make, value: item.make };
											})}
										></Select>
										{makeRequired2 && (
											<p className="text-sm whitespace-nowrap cursor-pointer text-red">
												Please select this field
											</p>
										)}
									</span>
									<span className="px-4 py-4">
										<Select
											star="*"
											value={
												marketingName2 === null
													? 'Select..'
													: { label: marketingName2, value: marketingName2 }
											}
											labelName="Model"
											disabled={isFromEdit}
											className={`${marketingNameRequired2} py-2`}
											onFocus={(e) => {
												setMarketingNameRequired2('');
												setSearchModelList2('');
											}}
											onChange={(e) => {
												setmarketingName2(e.value);
											}}
											options={modelOptions2?.map((item) => {
												return {
													label: item.marketingname,
													value: item.marketingname,
												};
											})}
											onInputChange={(e) => {
												setSearchModelList2(e);
											}}
										></Select>
										{marketingNameRequired2 && (
											<p className="text-sm whitespace-nowrap cursor-pointer text-red">
												Please select this field
											</p>
										)}
									</span>
									<span className="px-4 ">
										<Select
											star="*"
											value={
												storage2 === null
													? 'Select..'
													: { label: storage2, value: storage2 }
											}
											labelName="Storage Variant"
											disabled={isFromEdit}
											className={`${storageRequired2} py-2`}
											onFocus={(e) => {
												setStorageRequired2('');
											}}
											onChange={(e) => {
												setStorage2(e.value);
											}}
											options={colorAndStorageOption2?.storage?.map((item) => {
												return { label: item, value: item };
											})}
										></Select>
										{storageRequired2 && (
											<p className="text-sm whitespace-nowrap cursor-pointer text-red">
												Please select this field
											</p>
										)}
									</span>
								</div>

								{PriceShow ? (
									<div>
										<div className="text-sm border-2 text-m-grey-1 py-2 justify-evenly items-center flex  w-full rounded-[5px] px-8">
											<div className="flex-1 ">
												<span>ORU Price</span>
												{(leastSellingprice && (
													<p className="font-bold text-base">
														{'₹ ' + numberWithCommas(leastSellingprice)} -{' '}
														{numberWithCommas(maxsellingprice)}
													</p>
												)) || <p>--</p>}
											</div>

											<div
												className="border bg-m-green text-white px-4 py-2 rounded-[5px] cursor-pointer"
												onClick={() => {
													handleClick();
												}}
											>
												Sell Now
											</div>
										</div>

										<div className="w-full ">
											<div>
												{getExternalSellerData &&
													getExternalSellerData.length > 0 && (
														<p
															className="mt-6 mb-4 ml-0.5 font-semibold"
															style={{ color: '#707070' }}
														>
															Check prices from other buyers:
														</p>
													)}
											</div>

											<div>
												{getExternalSellerData &&
													getExternalSellerData.length > 0 && (
														<div className="grid border rounded max-w-sm">
															<div className="flex px-8">
																<span className="flex flex-1">
																	You will get
																</span>
																<span className=" ">Buyer</span>
															</div>
															{getExternalSellerData?.map((items, index) => (
																<div
																	className="flex  px-4 py-2 gap-4 text-xs text-m-grey-2"
																	key={index}
																>
																	<div className="flex flex-col space-1 flex-1">
																		<p className="font-semibold text-2xl text-m-grey-1 h-9">
																			{'₹' +
																				numberWithCommas(
																					items.externalSourcePrice
																				)}
																		</p>
																	</div>
																	<div className="flex flex-col space-y-1">
																		<div className="w-full h-full">
																			<Image
																				src={items.externalSourceImage}
																				alt={items.externalSourceName}
																				style={{ height: 35, width: 70 }}
																				className="object-contain"
																			/>
																		</div>
																	</div>
																</div>
															))}
														</div>
													)}
											</div>
										</div>
									</div>
								) : (
									<div></div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
			<AppDownloadPopup
				open={showAppDownloadPopup}
				setOpen={setShowAppDownloadPopup}
			/>
		</div>
	);
}

export default Index;
