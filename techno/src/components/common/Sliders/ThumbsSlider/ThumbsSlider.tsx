"use client";

import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { CircleArrow } from "../../Buttons/CircleArrow/CircleArrow";
import { SwiperOptions } from "swiper/types";
import styles from "./ThumbsSlider.module.scss";
import "swiper/scss";

type ThumbsSliderProps = {
  slides: Slide[] | StaticImageData[];
  arrows?: boolean;
};
interface Slide {
  image: StaticImageData;
  title?: string;
}
interface IThumbsImages {
  prev: number | null;
  next: number | null;
}

export const ThumbsSlider = ({ slides, arrows = true }: ThumbsSliderProps) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [thumbsImages, setThumbsImages] = useState<IThumbsImages>({
    prev: slides.length - 1,
    next: 2,
  });

  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current?.slidePrev();
  }, []);
  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current?.slideNext();
  }, []);
  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current?.slideTo(index);
    }
  };
  const getActiveIndex = (): number => {
    return swiperRef.current ? swiperRef.current.realIndex : 0;
  };
  const getSlidesPerView = (): number => {
    if (swiperRef.current !== null && "params" in swiperRef.current) {
      return typeof swiperRef.current.params.slidesPerView === "number"
        ? swiperRef.current.params.slidesPerView
        : 2;
    }
    return 2;
  };
  const isSlideArray = (
    slides: Slide[] | StaticImageData[]
  ): slides is Slide[] => {
    return (slides as Slide[])[0]?.image !== undefined;
  };

  const computeThumbsIndex = (
    active: number | undefined,
    viewed: number | undefined | "auto",
    slidesLength: number
  ): void => {
    if (active !== undefined && typeof viewed === "number") {
      const prev = active - 1 >= 0 ? active - 1 : slidesLength - 1;
      let next;

      if (active + 2 < slidesLength) {
        next = active + 2;
      } else if (active + 1 == slidesLength) {
        next = 1;
      } else {
        next = 0;
      }

      setThumbsImages({ prev, next });
    }
  };

  useEffect(() => {
    if (
      swiperRef.current !== null &&
      "params" in swiperRef.current &&
      typeof swiperRef.current.params.slidesPerView === "number"
    ) {
      setThumbsImages({
        prev: slides.length - 1,
        next: getActiveIndex() + getSlidesPerView(),
      });
    }
  }, [swiperRef]);

  const breakpoints: SwiperOptions["breakpoints"] = {
    0: {
      slidesPerView: 1,
    },
    550: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2,
    },
  };

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={() =>
          computeThumbsIndex(
            getActiveIndex(),
            getSlidesPerView(),
            slides.length
          )
        }
        direction={"horizontal"}
        breakpoints={breakpoints}
        spaceBetween={20}
        slidesPerView={2}
        loop={true}
        className={styles.swiper}
      >
        {slides.map((slide, index) => {
          return (
            <SwiperSlide key={index} className={styles.slide}>
              <div className={styles.imageWrapper}>
                {isSlideArray(slides) ? (
                  <Image
                    className={styles.image}
                    src={(slide as Slide).image}
                    alt={(slide as Slide).title ?? "Изображение"}
                  />
                ) : (
                  <Image
                    className={styles.image}
                    src={slide as StaticImageData}
                    alt="Изображение"
                  />
                )}
                {arrows && (
                  <CircleArrow
                    blur
                    direction="right-up"
                    className={styles.arrowAtImage}
                    isBig={true}
                  />
                )}
              </div>
              {isSlideArray(slides) && (slide as Slide).title && (
                <div className={styles.textWrapper}>
                  <div className={styles.title}>{(slide as Slide).title}</div>
                  <div className={styles.goToCatalog}>перейти в каталог</div>
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className={styles.thumbs}>
        <div className={styles.thumbLeft} onClick={handlePrev}>
          {thumbsImages.prev !== null && (
            <>
              <Image
                src={
                  isSlideArray(slides)
                    ? slides[thumbsImages.prev].image
                    : slides[thumbsImages.prev]
                }
                alt="Изображение"
                className={styles.thumbImage}
              />
              <CircleArrow blur className={styles.arrow} />
            </>
          )}
        </div>
        <div className={styles.thumbRight} onClick={handleNext}>
          {thumbsImages.next !== null && (
            <>
              <Image
                src={
                  isSlideArray(slides)
                    ? slides[thumbsImages.next].image
                    : slides[thumbsImages.next]
                }
                alt="Изображение"
                className={styles.thumbImage}
              />
              <CircleArrow blur direction="right" className={styles.arrow} />
            </>
          )}
        </div>
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: slides.length - 1 }).map((_, index) => {
          return (
            <span
              key={index}
              className={`
                                ${styles.bullet} 
                                ${
                                  getActiveIndex() === index
                                    ? styles.bulletActive
                                    : ""
                                }`}
              onClick={() => goToSlide(index)}
            ></span>
          );
        })}
      </div>
    </div>
  );
};
