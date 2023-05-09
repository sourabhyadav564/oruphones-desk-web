import React from 'react';
import InfoCircle from '@/assets/infocircle2.svg';
import Image from 'next/image';

const ConditionOptionLarge2 = ({
	title,
	options,
	conditionResults,
	questionIndex,
}) => {
	var option2 = [[]];

	options &&
		options?.map((option, index) => {
			if (option.title == conditionResults[questionIndex]) {
				option.options.map((optionIn, index2) => {
					option2[index2] = optionIn;
				});
			}
		});
	return (
		<div
			className={`${
				conditionResults?.[questionIndex] == title && 'bg-gray-200 lg:h-72'
			} my-4 hover:cursor-pointer p-2 rounded-md border-2 border-gray-200 active:opacity-50 duration-300 hover:bg-gray-200 font-Roboto-Light text-mediumFontSize`}
		>
			<span className="flex items-center space-x-3">
				<div className="w-[20px]">
					<Image src={InfoCircle} width={16} height={16} />
				</div>
				<p className="font-semibold">{title}</p>
			</span>
			{options &&
				option2 &&
				options.length > 0 &&
				conditionResults?.[questionIndex] == title &&
				option2.map((option, index) => (
					<div className="flex items-center space-x-3 p-1 ml-5" key={index}>
						<div className="border border-black p-0.5  rounded-full ">
							{/* <GoPrimitiveDot className="text-nx " /> */}
							<div className="border border-black  rounded-full "></div>
						</div>
						<p className="items-center">{option}</p>
					</div>
				))}
		</div>
	);
};

export default ConditionOptionLarge2;
