import Carousel from '@/Carousel';
import TopSellingCard from '@/components/Cards/TopSellingCard';
import Title from '@/components/Title';

const settings = {
	dots: false,
	loop: false,
	speed: 500,
	slidesToShow: 5.2,
	slidesToScroll: 1,
};

function TopSellingModels({ fetchTopsellingmodels }) {
	fetchTopsellingmodels = fetchTopsellingmodels?.sort(
		(list1, list2) =>
			parseInt(list1.displayOrder) - parseInt(list2.displayOrder)
	);
	var _fetchTopsellingmodels =
		fetchTopsellingmodels && fetchTopsellingmodels.slice(0, 8);
	return (
		<section className="container top_selling">
			<Title text="Top Selling Mobiles" />
			<Carousel {...settings}>
				{_fetchTopsellingmodels &&
					_fetchTopsellingmodels.map((item, index) => (
						<TopSellingCard key={index} data={item} />
					))}
				<TopSellingCard data={{ name: 'all' }} />
			</Carousel>
		</section>
	);
}

export default TopSellingModels;
