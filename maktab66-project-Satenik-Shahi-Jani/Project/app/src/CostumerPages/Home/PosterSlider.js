import { Swiper, SwiperSlide } from "swiper/react";
import Poster from "./Poster";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
// import required modules
import { Pagination, Navigation, Autoplay, EffectCoverflow } from "swiper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function PosterSlider() {

  const [posts,setPosts]=useState([])

  const favProducts = useSelector((state) => state.favProducts.favProducts);
  // const loadingRedux = useSelector((state) => state.favProducts.loading);
  console.log(favProducts)

useEffect(()=>{
  const shuffled = [...favProducts].sort(() => 0.5 - Math.random());

  const newData= shuffled.slice(0, 5);
setPosts(newData)
},[favProducts])
  
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={true}
        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
      >
        {posts.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => <Poster post={item} index={index} isActive={isActive} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
