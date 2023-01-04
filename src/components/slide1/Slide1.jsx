import React, { useEffect, useState } from 'react';
import SlideButton from './SlideButton';
import styles from './Slide1.module.css';

export default function Slide1() {
  // const items = ['#845EC2', '#D65DB1', '#FF6F91', '#FF9671', '#FFC75F'];
  const items = [
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
  ];
  const [slideIndex, setSlideIndex] = useState(0); // currnetIndex
  const [size, setSize] = useState([0, 0]);
  const SLIDE_PADDING = 40;
  const slideHandler = (direction) => {
    // setSlideIndex((slideIndex) => slideIndex + direction);
    // console.log(slideIndex + direction);
    if (slideIndex + direction <= 0) {
      setSlideIndex(5);
      return;
    }
    if (slideIndex + direction >= 6) {
      setSlideIndex(0);
      return;
    }
    setSlideIndex(slideIndex + direction);
  };

  const getWindowSize = () => {
    setSize([window.innerWidth, window.innerHeight]);
  };

  const getItemWidth = () => {
    let itemWidth = size[0] * 0.8 - SLIDE_PADDING * 2;
    // itemWidth = itemWidth > 1440 ? 1440 : itemWidth;
    return itemWidth;
  };

  const DATA_COUNT = 2;
  //TODO: 무한 슬라이드로 수정
  const addSlide = () => {
    const front = [];
    const back = [];
    let index = 0;

    while (index < DATA_COUNT) {
      back.push(items[index % items.length]);
      front.push(items[items.length - 1 - (index % items.length)]);
      index++;
    }
    return [...front, ...items, ...back];
  };

  useEffect(() => {
    window.addEventListener('resize', getWindowSize);
    return () => window.removeEventListener('resize', getWindowSize);
  }, []);

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
            {/* {addSlide().map((item, index) => (
              <div
                key={index}
                className={styles.item}
                style={{ width: getItemWidth() || 'auto' }}
              >
                <img className={styles.img} src={item} alt='' />
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
