"use client";

import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { SimpleSliderBtns } from "@/components/common/Sliders/SimpleSlider/SimpleSliderBtns";
import styles from "./SimpleSlider.module.scss";
import "swiper/scss";
import Link from "next/link";
import { SwiperOptions } from "swiper/types";
import { ButtonBlur } from "../../Buttons/ButtonBlur/ButtonBlur";

interface SimpleSlide {
  img: StaticImageData;
  title: string;
  description: string;
  url?: string;
}
type TSimpleSliderProps = {
  slides: SimpleSlide[];
};

const breakpoints: SwiperOptions["breakpoints"] = {
  0: {
    slidesPerView: 1,
  },
  550: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 3,
  },
};

export const SimpleSlider = ({ slides }: TSimpleSliderProps) => {
  return (
    <Swiper
      direction={"horizontal"}
      spaceBetween={20}
      slidesPerView={3}
      breakpoints={breakpoints}
      loop
      draggable
    >
      {slides.map((slide, index) => {
        return (
          <SwiperSlide key={index}>
            <Link href={slide.url ?? ""}>
              <div className={styles.slide}>
                <div className={styles.imageWrapper}>
                  <Image
                    className={styles.image}
                    src={slide.img}
                    alt={slide.title}
                  />
                  <ButtonBlur />
                </div>
                <div className={styles.textWrapper}>
                  <div className={styles.title}>{slide.title}</div>
                  <div className={styles.description}>{slide.description}</div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
      <SimpleSliderBtns />
    </Swiper>
  );
};
