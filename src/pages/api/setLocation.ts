import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	//get the location from the request
	const { location } = req.body;
	// validate the location
	if (typeof location !== 'string') {
		return res.status(400).json({ error: 'Invalid location' });
	}
	// set the location in the cookie
	setCookie('location', location, {
		req,
		res,
		maxAge: 60 * 60 * 24 * 30, // 30 days
	});
	// send a response
	res.status(200).json({ message: 'Location set' });
}
