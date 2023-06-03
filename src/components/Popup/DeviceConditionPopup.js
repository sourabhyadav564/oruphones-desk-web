import React, { useEffect, useState } from 'react';
import Model3 from './Model3';
import ConditionOptionLarge from '@/components/Condition/ConditionOptionLarge';
import DeviceConditionCard from '@/components/Condition/DeviceConditionCard';
import { deviceConditionQuestion } from '@/utils/constant';

function DeviceConditionPopup({
	open,
	setOpen,
	setConditionEdit,
	setConditionQuesEdit,
}) {
	const [conditionResults, setConditionResults] = useState({});
	const [deviceCondition, setDeviceCondition] = useState(null);
	const [questionIndex, setQuestionIndex] = useState(0);

	useEffect(() => {
		setConditionEdit(deviceCondition);
		setConditionQuesEdit(deviceConditionQuestion);
	}, [deviceCondition]);

	const calculateDeviceCondition = () => {
		if (conditionResults[0].toString() == 'No') {
			setDeviceCondition('Needs Repair');
			setOpen(false);
		} else if (
			conditionResults[1].toString().includes('Has significant scratches') ||
			conditionResults[2].toString().includes('Has significant scratches')
		) {
			setDeviceCondition('Fair');
		} else if (
			conditionResults[1].toString().includes('Up to 5') ||
			conditionResults[2].toString().includes('Up to 5')
		) {
			setDeviceCondition('Good');
		} else if (
			conditionResults[1].toString().includes('Up to 2') ||
			conditionResults[2].toString().includes('Up to 2')
		) {
			setDeviceCondition('Excellent');
		} else if (
			conditionResults[1].toString().includes('No scratch') ||
			conditionResults[2].toString().includes('No scratch')
		) {
			setDeviceCondition('Like New');
		} else {
			setDeviceCondition('Good');
		}
		setOpen(false);
		setQuestionIndex(0);
		setConditionResults({});
	};

	return (
		<Model3 open={open} setOpen={setOpen}>
			<div className="flex bg-white px-8 py-4 max-w-2xl w-full">
				<div className="col-span-2">
					<div>
						<h3 className="">
							{deviceConditionQuestion[questionIndex]?.title}
						</h3>
						{deviceConditionQuestion[questionIndex]?.options?.map(
							(item, index) => (
								<div
									onClick={() => {
										setConditionResults((prev) => {
											return {
												...prev,
												[questionIndex]: item?.title,
											};
										});
									}}
									key={index}
								>
									<ConditionOptionLarge
										title={item?.title}
										options={item?.options}
										conditionResults={conditionResults}
										questionIndex={questionIndex}
									/>
								</div>
							)
						)}
					</div>
					<div className="flex items-center justify-between">
						<p
							onClick={() =>
								setQuestionIndex(questionIndex > 0 ? questionIndex - 1 : 0)
							}
							className={`${
								questionIndex > 0 && 'hover:cursor-pointer'
							} p-2 flex justify-end items-center ${
								!questionIndex > 0 && 'opacity-50'
							}`}
						>
							<span className="border-2 px-5 py-2 rounded-md bg-m-green text-white font-semibold hover:opacity-80 active:opacity-70 duration-300">
								Back
							</span>
						</p>
						<p
							onClick={() => {
								questionIndex in conditionResults &&
									setQuestionIndex(
										questionIndex < deviceConditionQuestion.length - 1
											? questionIndex + 1
											: deviceConditionQuestion.length - 1
									);
								questionIndex == 0 &&
									conditionResults[0]?.toString() == 'No' &&
									calculateDeviceCondition();
								questionIndex == deviceConditionQuestion.length - 1 &&
									calculateDeviceCondition();
							}}
							className={`${
								!(questionIndex in conditionResults)
									? 'opacity-50'
									: 'hover:cursor-pointer'
							} p-2 flex justify-end items-center`}
						>
							<span className="border-2 px-5 py-2 rounded-md bg-m-green text-white font-semibold hover:opacity-80 active:opacity-70 duration-300">
								{questionIndex == deviceConditionQuestion.length - 1 ||
								conditionResults[0]?.toString() == 'No'
									? 'Done'
									: 'Next'}
							</span>
						</p>
					</div>
				</div>
			</div>
		</Model3>
	);
}

export default DeviceConditionPopup;
