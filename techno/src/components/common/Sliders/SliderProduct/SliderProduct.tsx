'use client'

import Image, { StaticImageData } from "next/image";
import {Swiper, SwiperClass, SwiperSlide} from 'swiper/react';
import { SliderProductBtns } from "./SliderProductBtns";
import styles from './SliderProduct.module.scss';
import 'swiper/scss';
import { useRef } from "react";
import clsx from "clsx";

interface ProductSlide {
	image: StaticImageData;
	title: string;
	value?: number;
}
type ProductSliderProps = {
    slides: ProductSlide[];
	onColorSelect: (id: number) => void;
	activeIndex: number;
}

export const SliderProduct = ({slides, onColorSelect, activeIndex}: ProductSliderProps) => {
	const swiperRef = useRef<SwiperClass | null>(null);

    return (
        <Swiper
			onSwiper={(s) => swiperRef.current = s}
            direction={"horizontal"}
			spaceBetween={20}
			slidesPerView={'auto'}
            draggable
			className={styles.swiper}
        >
            {slides.map((slide, index) => {
                return (
					<SwiperSlide key={index} className={styles.slideContent}  onClick={() => onColorSelect(index)}>
						<div className={styles.slide}>
							<div className={clsx(styles.imageWrapper, {
								[styles.activeSlide]: activeIndex === index
							})}>
								<Image
									className={styles.slide}
									src={slide.image}
									alt={slide.title}
								/>
							</div>
							<div className={styles.textWrapper}>
								<div className={styles.title}>{slide.title}</div>
							</div>
						</div>
					</SwiperSlide >
                )
            })}
            <SliderProductBtns />
        </Swiper>
    );
};