"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image, { StaticImageData } from "next/image";
import styles from "./SliderMobile.module.scss";
import { FC } from "react";

interface SliderMobileProps {
  images: StaticImageData[];
}

export const SliderMobile: FC<SliderMobileProps> = ({ images }) => {
  return (
    <Swiper
      direction={"horizontal"}
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className={styles.swiper}
    >
      {images.map((img, index) => (
        <SwiperSlide className={styles.swiperSlide} key={index}>
          <Image src={img} className={styles.swiperSlideImage} alt={`Image ${index}`} fill />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
