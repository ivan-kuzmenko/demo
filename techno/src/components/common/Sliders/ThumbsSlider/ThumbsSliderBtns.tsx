import styles from './ThumbsSlider.module.scss';
import {useSwiper} from "swiper/react";
import { CircleArrow } from '../../Buttons/CircleArrow/CircleArrow';
import Image, { StaticImageData } from 'next/image';

export const ThumbsSliderBtns = ({images}: {images: StaticImageData[]}) => {

    const swiper = useSwiper();
    return (
        <div className={styles.thumbs}>
            <div className={styles.thumbLeft} onClick={() => {swiper.slidePrev()}}>
                <Image src={images[0]} alt='Изображение' className={styles.thumbImage} />
                <CircleArrow className={styles.arrow}/>
            </div>
            <div className={styles.thumbRight} onClick={() => {swiper.slideNext()}}>
                <Image src={images[1]} alt='Изображение' className={styles.thumbImage} />
                <CircleArrow direction='right' className={styles.arrow}/>
            </div>
        </div>
    );
};