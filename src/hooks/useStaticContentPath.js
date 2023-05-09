import * as Axios from '../../api/axios';
import { useState } from 'react';

const fetchApi = () => {
	let data;
	Axios.infoTemplates().then(
		(res) => {
			sessionStorage.setItem('staticContentPath', JSON.stringify(res));
			data = res;
		},
		(err) => console.error(err)
	);
	return data;
};

function useStaticContentPath() {
	const [dataObject, setDataObject] = useState();

	useEffect(() => {
		let data = sessionStorage.getItem('staticContentPath');
		if (data && JSON.parse(data)) {
			setDataObject(JSON.parse(data));
		} else {
			data = fetchApi();
			setDataObject(data);
		}
	}, []);

	return { loading, filterOptions };
}
export default useStaticContentPath;
