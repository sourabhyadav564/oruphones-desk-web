function Input({
	name,
	className,
	inputClass,
	prefix,
	children,
	errorClass,
	...rest
}) {
	return (
		<div
			className={`outline outline-none relative w-full focus:outline-none ${
				className || ''
			}`}
		>
			<div
				className={`flex items-center px-2  rounded border  ${
					errorClass || ''
				}`}
			>
				<span className="block mr-0.5 font-Roboto-Medium">{prefix}</span>
				<input
					name={name}
					className={`py-3 px-0 border-none block h-full w-full appearance-none ring-0 focus:ring-0 bg-transparent font-Roboto-Regular text-mediumFontSize ${inputClass}`}
					{...rest}
				/>
			</div>

			<label
				htmlFor={name}
				className="absolute top-1 font-normal left-0 text-regularFontSize font-Roboto-Bold bg-white p-1 z-1 duration-300 origin-0"
				style={{ color: 'rgba(0, 0, 0, 0.6)' }}
			>
				{children}
			</label>
		</div>
	);
}

export default Input;
