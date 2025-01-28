'use client'

import { TCustomProducts } from "@/lib/CustomProducts";
import styles from "./SliderTabs.module.scss";
import { TPartitionOfficeProducts } from "@/lib/PartitionsOffice";
import {FC, useCallback, useLayoutEffect, useRef, useState} from "react";
import { Tab } from "./Tab/Tab";
import arrow from "@/assets/svg/arrowBlackHorizontal.svg";
import Image from "next/image";
import { TPartitionShowerProducts } from "@/lib/PartitionsShower";
import {Swiper, SwiperClass, SwiperSlide} from "swiper/react";

interface SliderTabsProps {
  prefix: string;
  list:
    | TPartitionOfficeProducts[]
    | TPartitionShowerProducts[]
    | TCustomProducts[];
}

export const SliderTabs: FC<SliderTabsProps> = ({ list, prefix }) => {
    const containerWidth = useRef<number | null | undefined>(null);
    if (typeof window !== 'undefined' && document !== null && document.querySelector('.container') !== null) {
        containerWidth.current = document.querySelector('.container')?.getBoundingClientRect().width;
    } else {
        containerWidth.current = 0;
    }
    const [showArrows, setShowArrows] = useState<boolean>(false);
    const swiperRef = useRef<SwiperClass | null>(null);

    useLayoutEffect(() => {
        const checkArrowsVisibility = () => {
            if (typeof window !== 'undefined' && document !== null) {
                containerWidth.current = document.querySelector('.container')?.getBoundingClientRect().width;
                const totalSlidesWidth = Array.from(
                    (document.querySelectorAll('.tabSliderItem') as NodeListOf<HTMLElement>)
                ).reduce((sum, slide) => sum + slide.offsetWidth, 0);
                if (containerWidth.current || containerWidth.current === 0) {
                    setShowArrows(totalSlidesWidth > containerWidth.current);
                }
            }
        };
        checkArrowsVisibility();
        window.addEventListener('resize', checkArrowsVisibility);
        return () => window.removeEventListener('resize', checkArrowsVisibility);
    }, []);

    const handlerPrev = useCallback(() => {
        if (!swiperRef.current) return
        swiperRef.current.slidePrev();
    }, []);
    const handlerNext = useCallback(() => {
        if (!swiperRef.current) return
        swiperRef.current.slideNext();
    }, []);
  return (
    <div>
      <Swiper
        slidesPerView={'auto'}
        onSwiper={(s) => {
            swiperRef.current = s;
        }}
      >
          {list.map((item) => (
              <SwiperSlide className={`${styles.sliderSlide} tabSliderItem`} key={item.name}>
                <Tab name={item.name} url={`${prefix}${item.url}`} />
              </SwiperSlide>
          ))}
      </Swiper>
        { showArrows && (
        <div className={styles.sliderControls}>
            <button className={styles.sliderControlsButton} onClick={handlerPrev}>
                <Image
                    src={arrow}
                    alt="arrow"
                    width={18}
                    height={16}
                    className={styles.sliderControlsButtonLeft}
                />
            </button>

            <button className={styles.sliderControlsButton} onClick={handlerNext}>
                <Image
                    src={arrow}
                    alt="arrow"
                    width={18}
                    height={16}
                    className={styles.sliderControlsButtonRight}
                />
            </button>
        </div> )}
    </div>
  );
};
