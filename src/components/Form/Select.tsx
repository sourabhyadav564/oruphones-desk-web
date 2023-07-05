import React, { forwardRef } from 'react';
import Select, { Props as SelectProps } from 'react-select';

interface MySelectProps extends SelectProps {
	name: string;
	labelName?: string;
	className?: string;
	placeholder?: string;
	[key: string]: any;
}

const customStyles = {
	control: (base: any) => ({
		...base,
		height: 35,
		minHeight: 35,
		outline: 'none !important',
		border: '0 !important',
		color: '#00000099',
		boxShadow: '0 !important',
	}),
};

const MySelect = forwardRef(function Component(
	{ name, labelName, className, placeholder, ...rest }: MySelectProps,
	ref
) {
	return (
		<div
			className={`outline px-1 relative w-full focus:outline-none focus:ring-0 rounded border ${
				className || ' border-gray-1f '
			}`}
		>
			<Select
				name={name}
				styles={customStyles}
				{...rest}
				instanceId={labelName || name}
				classNamePrefix="react-select"
				placeholder={placeholder || 'Select'}
				ref={ref as any}
			/>
			<label
				htmlFor={labelName || name}
				className="absolute top-0 left-0 text-sm bg-white p-1 z-1 duration-300 origin-0"
				style={{ color: 'rgba(0, 0, 0, 0.6)' }}
			>
				{labelName}
			</label>
		</div>
	);
});

export default MySelect;