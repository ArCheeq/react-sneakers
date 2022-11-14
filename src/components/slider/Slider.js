import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/css';
import './swiper.scss';

import sliderImg from "../../resources/img/sliderImg.png";

const Slider = () => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            modules={[Navigation]}
            navigation>
            <SwiperSlide width="100%">
                <img src={sliderImg} alt="Promo image"/>
            </SwiperSlide>
            <SwiperSlide width="100%">
                <img src={sliderImg} alt="Promo image"/>
            </SwiperSlide>
            <SwiperSlide width="100%">
                <img src={sliderImg} alt="Promo image"/>
            </SwiperSlide>
            <SwiperSlide width="100%">
                <img src={sliderImg} alt="Promo image"/>
            </SwiperSlide>
        </Swiper>
    )
}

export default Slider;