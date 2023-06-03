import React, { Fragment } from 'react';
import Cross from '@/assets/cross.svg';
import Image from 'next/image';

function ImageInput({ name, preview, clearImage, ...rest }) {
	return (
		<Fragment>
			{preview ? (
				<label
					className="p-4 w-full h-28 rounded appearance-none flex items-center justify-center relative"
					style={{ border: '1px solid #0000001F', color: '#00000099' }}
				>
					<Image
						alt="preview"
						src={preview}
						style={{ width: 'auto', height: '100%' }}
					/>
					<Image alt="cross" src={Cross} width={20} height={20} />
				</label>
			) : (
				<label
					htmlFor={name}
					className="p-4 w-full  h-28 rounded appearance-none flex items-center justify-center"
					style={{ border: '1px solid #0000001F', color: '#00000099' }}
				>
					<span> + </span>
					<input name={name} className={`hidden`} id={name} {...rest} />
				</label>
			)}
		</Fragment>
	);
}

export default ImageInput;
