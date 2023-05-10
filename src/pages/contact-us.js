import Input from '@/components/Form/Input';
import TextArea from '@/components/Form/TextArea';
import { useState } from 'react';
import { contactUs } from '@/api/axios';
import { toast } from 'react-toastify';
import { metaTags } from '@/utils/constant';
import Head from 'next/head';

function contactUS() {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [mobile, setMobile] = useState();
	const [message, setMessage] = useState();

	const validateEmail = (email) => {
		if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
			setEmail(email);
			return true;
		} else {
			toast.warning(`Please enter valid email address`, { toastId: '018' });
			return false;
		}
	};

	function handleSubmit(e) {
		e.preventDefault();
		let payload = {
			name,
			email,
			mobile,
			message,
		};
		if (
			name != '' &&
			name != undefined &&
			email != '' &&
			email != undefined &&
			message != '' &&
			message != undefined &&
			mobile != '' &&
			mobile != undefined
		) {
			if (validateEmail(email)) {
				contactUs(payload).then((response) => {
					toast.info(response?.reason, {
						position: toast.POSITION.TOP_CENTER,
					});
					window.location.reload();
				});
			}
		} else {
			if (name == undefined) {
				setName('');
			}
			if (email == undefined) {
				setEmail('');
			}
			if (message == undefined) {
				setMessage('');
			}
			if (mobile == undefined) {
				setMobile('');
			}
		}
	}

	return (
		<>
			<Head>
				<title>{metaTags.CONTACT_US.title}</title>
				<meta name="description" content={metaTags.CONTACT_US.description} />
				<meta property="og:title" content={metaTags.CONTACT_US.title} />
				<meta
					property="og:description"
					content={metaTags.CONTACT_US.description}
				/>
			</Head>
			<main className="container my-4">
				<section className="bg-m-green h-52 p-8 flex items-center rounded-md">
					<h1 className="text-6xl font-light text-m-grey-5"> Contact Us </h1>
				</section>
				<section className="my-6 grid grid-cols-3 gap-4 ">
					<div className="bg-white rounded p-4 border">
						<h2 className="text-black-20 font-bold my-2">Connect with us</h2>
						<span className="text-black-60">Send us an email</span>
						<p className="text-xl text-black-20 mb-4">contact@oruphones.com</p>
					</div>
					<div className="col-span-2 bg-white rounded border grid grid-cols-2 gap-6 px-8 pt-12 pb-6">
						<div className="flex flex-col">
							<Input
								type="text"
								onChange={(e) => {
									setName(e.target.value);
								}}
								required
							>
								{' '}
								Name<span className="text-red opacity-60">*</span>
							</Input>
							{name == '' && (
								<p className="text-sm whitespace-nowrap cursor-pointer text-red">
									Please select this field
								</p>
							)}
						</div>
						<div className="flex flex-col">
							<Input
								type="email"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								required
							>
								{' '}
								Email ID<span className="text-red opacity-60">*</span>
							</Input>
							{email == '' && (
								<p className="text-sm whitespace-nowrap cursor-pointer text-red">
									Please select this field
								</p>
							)}
						</div>
						<div className="flex flex-col">
							<Input
								type="number"
								onChange={(e) => {
									setMobile(e.target.value);
								}}
								required
							>
								{' '}
								Mobile No<span className="text-red opacity-60">*</span>
							</Input>
							{mobile == '' && (
								<p className="text-sm whitespace-nowrap cursor-pointer text-red">
									Please select this field
								</p>
							)}
						</div>
						<span />
						<div className="col-span-2 flex flex-col">
							<TextArea
								type="text"
								name="message"
								onChange={(e) => {
									setMessage(e.target.value);
								}}
								required
							>
								Message<span className="text-red opacity-60">*</span>
							</TextArea>
							{message == '' && (
								<p className="text-sm whitespace-nowrap cursor-pointer text-red">
									Please select this field
								</p>
							)}
						</div>
						<div className="col-span-2 flex justify-end" onClick={handleSubmit}>
							<button className="bg-m-green w-52 px-4 py-2 rounded text-white">
								{' '}
								Submit{' '}
							</button>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}

export default contactUS;
