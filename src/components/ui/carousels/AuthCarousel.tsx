import { NextPage } from 'next';

import SwiperCore, { Pagination, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
SwiperCore.use([Pagination]);

import styles from './AuthCarousel.module.scss';

import 'swiper/css';

interface Props {}

const AuthCarousel: NextPage<Props> = ({}) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={1}
      initialSlide={1}
      loop={true}
      centeredSlides={true}
      modules={[Pagination, Autoplay]}
      pagination={{
        clickable: true
      }}
      autoplay={{
        delay: 5000
      }}
      className="signUpContainer"
    >
      <SwiperSlide>
        <div className={styles.slideContent}>
          <h4>Easy to use</h4>
          <p>
            Nullam aliquam ante mauris, ut accumsan purus faucibus quis. Sed sed magna tellus. Ut
            vulputate ipsum consequat erat ultrices, id iaculis risus imperdiet
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.slideContent}>
          <h4>Live team collaboration</h4>
          <p>
            Nullam aliquam ante mauris, ut accumsan purus faucibus quis. Sed sed magna tellus. Ut
            vulputate ipsum consequat erat ultrices, id iaculis risus imperdiet
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.slideContent}>
          <h4>Tasks tracking</h4>
          <p>
            Nullam aliquam ante mauris, ut accumsan purus faucibus quis. Sed sed magna tellus. Ut
            vulputate ipsum consequat erat ultrices, id iaculis risus imperdiet
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.slideContent}>
          <h4>Stay tuned to new updates</h4>
          <p>
            Nullam aliquam ante mauris, ut accumsan purus faucibus quis. Sed sed magna tellus. Ut
            vulputate ipsum consequat erat ultrices, id iaculis risus imperdiet
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default AuthCarousel;
