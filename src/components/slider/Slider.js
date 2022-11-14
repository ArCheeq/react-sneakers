import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/css';
import './swiper.scss';

const Slider = () => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={1}
            modules={[Navigation]}
            navigation
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}>
            <SwiperSlide width="100%">
                <img src="/resources/img/sliderImg.png" alt="Promo image"/>
            </SwiperSlide>
            <SwiperSlide width="100%">
                <img src="/resources/img/sliderImg.png" alt="Promo image"/>
            </SwiperSlide>
            <SwiperSlide width="100%">
                <img src="/resources/img/sliderImg.png" alt="Promo image"/>
            </SwiperSlide>
            <SwiperSlide width="100%">
                <img src="/resources/img/sliderImg.png" alt="Promo image"/>
            </SwiperSlide>
        </Swiper>
    )
}

export default Slider;