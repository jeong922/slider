import React, { useEffect, useState } from 'react';
import SlideButton from './SlideButton';
import styles from './Slider1.module.css';

export default function Slider1() {
  // const items = ['#845EC2', '#D65DB1', '#FF6F91', '#FF9671', '#FFC75F'];
  const items = [
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
  ];
  const [slideIndex, setSlideIndex] = useState(0);
  const [size, setSize] = useState([0, 0]);
  const SLIDE_PADDING = 20;
  const slideHandler = (derection) => {
    console.log(slideIndex + derection);
    if (slideIndex + derection <= 0) {
      setSlideIndex(5);
      return;
    }
    if (slideIndex + derection >= 6) {
      setSlideIndex(0);
      return;
    }
    setSlideIndex(slideIndex + derection);
  };

  const getWindowSize = () => {
    setSize([window.innerWidth, window.innerHeight]);
  };

  useEffect(() => {
    window.addEventListener('resize', getWindowSize);
    return () => window.removeEventListener('resize', getWindowSize);
  }, []);

  const getItemWidth = () => {
    let itemWidth = size[0] * 0.8 - SLIDE_PADDING * 2;
    // itemWidth = itemWidth > 1440 ? 1440 : itemWidth;
    return itemWidth;
  };

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <SlideButton direction='left' onClick={() => slideHandler(-1)} />
        <SlideButton direction='right' onClick={() => slideHandler(1)} />
        {/* 원래는 index를 key 값으로 줘서는 안된다. */}
        <div className={styles.list}>
          <div
            className={styles.track}
            style={{
              // width: `${100 * items.length}vw`,
              transition: 'all 300ms ease-in-out',
              // -1 * (슬라이드 한 개 너비 반) + (슬라이드 한개 너미 * 현재 슬라이드 index)%
              transform: `translateX(${
                (-100 / items.length) * (0.5 + slideIndex)
              }%)`,
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className={styles.item}
                style={{ width: getItemWidth() || 'auto' }}
              >
                <img className={styles.img} src={item} alt='' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
