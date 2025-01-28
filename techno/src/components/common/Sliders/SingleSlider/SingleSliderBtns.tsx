import styles from './SingleSlider.module.scss';
import {useSwiper} from "swiper/react";
import Image from "next/image";
import arrow from '@/assets/svg/arrowWhiteLeft.svg';

export const SingleSliderBtns = () => {

    const swiper = useSwiper();

    return (
        <div className={styles.buttons}>
            <div className={styles.btnLeft} onClick={() => {swiper.slidePrev()}}>
                <Image src={arrow} alt="Стрелка" />
            </div>
            <div className={styles.btnRight} onClick={() => {swiper.slideNext()}}>
                <Image src={arrow} alt="Стрелка" />
            </div>
        </div>
    );
};