import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./style.css";
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function ImageGallery(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide key={props.thumbnail + "--1"}>
          <img
            key={props.thumbnail + "--1"}
            alt={"img"}
            src={`http://localhost:3002/files/${props.thumbnail}`}
          />
        </SwiperSlide>
        {props.images.map((item, index) => (
          <SwiperSlide key={item + `${index}`}>
            <img
              key={item + `${index}`}
              alt={"img"}
              src={`http://localhost:3002/files/${item}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide key={props.thumbnail + "--1"}>
          <img
            key={props.thumbnail + "--1"}
            alt={"img"}
            src={`http://localhost:3002/files/${props.thumbnail}`}
          />
        </SwiperSlide>
        {props.images.map((item, index) => (
          <SwiperSlide key={item + `${index}`}>
            <img
              key={item + `${index}`}
              alt={"img"}
              src={`http://localhost:3002/files/${item}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
