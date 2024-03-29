const verificationString = `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Verification</title>
		<link
			href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap"
			rel="stylesheet"
		/>
	</head>
	<body>
		<section class="verification">
			<h1>Device verification</h1>
			<h2>Verified:</h2>
			<p>
				The device has gone through the whole verification process of our latest
				AI tech. All the essential parts of the mobile have been tested
				thoroughly and have been graded accordingly.
			</p>

			<p>
				The overall check-up of the device has been through our ORUphones app
				and thus, has been verified. It is safe from viruses and a good device.
			</p>

			<h2>Unverified:</h2>
			<p>
				This device has not been verified yet. The verification must be done
				using the ORUphones app, which has to be installed in the same device.
			</p>
			<p>
				Our latest tech verifies all the internal components of the device and
				only then claims the device as verified. You can request for the
				verification by selecting the ‘Request verification' option.
			</p>
		</section>
		<style>
			.verification h1,
			.verification h2,
			.verification p {
				text-align: left;
				font: normal normal bold 18px/22px Open Sans;
				letter-spacing: 0px;
				color: #4e4e4e;
				text-transform: initial;
				opacity: 1;
			}
			.verification h1 {
				margin-bottom: 1rem;
			}
			.verification h2 {
				font: normal normal bold 16px/22px Open Sans;
				margin: 0.5rem 0;
			}
			.verification p {
				font: normal normal normal 14px/23px Open Sans;
			}
			.verification {
				padding: 0.5rem 0.8rem;
			}
		</style>
	</body>
</html>`;

export default verificationString;
