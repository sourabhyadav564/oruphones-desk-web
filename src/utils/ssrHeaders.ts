import SSRreq from '@/types/SSRreq';

export default function SSRHeaders(req?: SSRreq) {
	return typeof window === 'undefined'
		? {
				headers: {
					'X-SSR': '1',
					'Content-Type': 'application/json',
					...(req?.headers?.cookie && {
						cookie: req?.headers?.cookie,
					}),
				},
		  }
		: {
				headers: {
					'Content-Type': 'application/json',
				},
		  };
}
