import ArticleCard from '../Cards/ArticleCard';
import Carousel from '../Carousel';
import Title from '../Title';

const data = [1, 2, 3, 4, 5, 6];

const settings = {
	dots: false,
	loop: false,
	speed: 500,
	slidesToShow: 4,
	slidesToScroll: 1,
};

export default function TopArticles({ articles }) {
	return (
		<section className="container top_articles mb-6">
			<Title text="Top Articles" />
			<Carousel {...settings}>
				{articles?.map((item) => (
					<ArticleCard
						key={item}
						title={item.post_title}
						src={item.post_image}
						href={item.guid}
					/>
				))}
				<ArticleCard viewAll />
			</Carousel>
		</section>
	);
}
