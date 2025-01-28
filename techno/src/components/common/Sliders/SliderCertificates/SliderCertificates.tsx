"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image, { StaticImageData } from "next/image";
import styles from "./SliderCertificates.module.scss";
import { FC } from "react";
import { ButtonBlur } from "../../Buttons/ButtonBlur/ButtonBlur";

interface SliderCertificatesProps {
  certificates: StaticImageData[];
}

export const SliderCertificates: FC<SliderCertificatesProps> = ({
  certificates
}) => {
  return (
    <Swiper
      direction={"horizontal"}
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className={styles.swiper}
    >
      {certificates.map((img, index) => (
        <SwiperSlide className={styles.swiperSlide} key={index}>
          <Image
            src={img}
            className={styles.swiperSlideImage}
            alt={`Image ${index}`}
            width={300}
            height={500}
          />
          <ButtonBlur bottom={true} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
