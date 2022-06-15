import ArticleCard from "../Cards/ArticleCard";
import Carousel from "../Carousel";
import Title from "../Title";
import image from "@/assets/demo_blog.jpg"

const data = [1, 2, 3, 4, 5, 6];

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
};

export default function TopArticles() {
  return (
    <section className="container top_articles mb-6">
      <Title text="Top Articles" />
      <Carousel {...settings}>
        {data.map((item) => (
          <ArticleCard
            key={item}
            title="Refurbished iPhone 11 Tips and Tricks for Scoring the Best Deal"
            // src="https://www.mobiruindia.com/blog/wp-content/uploads/2021/03/1.jpg"
            src={image}
          />
        ))}
        <ArticleCard viewAll />
      </Carousel>
    </section>
  );
}
