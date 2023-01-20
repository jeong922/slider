import React, { useEffect, useRef, useState } from 'react';
import SlideButton from './SlideButton';
import styles from './Slide1.module.css';
import Pagination from './Pagination';

function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Slide1() {
  // const items = ['#845EC2', '#D65DB1', '#FF6F91', '#FF9671', '#FFC75F'];
  const items = [
    { data: './img/1.jpg', id: 1 },
    { data: './img/2.jpg', id: 2 },
    { data: './img/3.jpg', id: 3 },
    { data: './img/4.jpg', id: 4 },
    { data: './img/5.jpg', id: 5 },
    { data: './img/6.jpg', id: 6 },
    { data: './img/1.jpg', id: 7 },
    { data: './img/2.jpg', id: 8 },
    { data: './img/3.jpg', id: 9 },
    { data: './img/4.jpg', id: 10 },
    { data: './img/5.jpg', id: 11 },
    { data: './img/6.jpg', id: 12 },
  ];
  const SLIDE_PADDING = 40;
  const sliderPaddingStyle = `0 ${SLIDE_PADDING}px`;
  const DATA_COUNT = 2;
  const transitionTime = 300;
  const itemSize = items.length;
  const transitionStyle = `transform ${transitionTime}ms ease 0s`;
  const [slideIndex, setSlideIndex] = useState(DATA_COUNT); // 현재 슬라이드 index 저장
  const [size, setSize] = useState([0, 0]);
  const [slideTransition, setTransition] = useState(transitionStyle);

  const replaceSlide = (index) => {
    console.log('replace', index);
    setTimeout(() => {
      setTransition('');
      setSlideIndex(index);
    }, transitionTime);
  };

  // 슬라이드 이동
  const slideHandler = (direction) => {
    let index = slideIndex + direction;
    console.log(index);
    setSlideIndex(index);
    if (index - DATA_COUNT < 0) {
      index += itemSize;
      replaceSlide(index);
    } else if (index - DATA_COUNT >= itemSize) {
      index -= itemSize;
      replaceSlide(index);
    }
    setTransition(transitionStyle);
  };

  const getWindowSize = () => {
    setSize([window.innerWidth, window.innerHeight]);
  };

  const getItemWidth = () => {
    let itemWidth = size[0] * 0.9 - SLIDE_PADDING * 2;
    // itemWidth = itemWidth > 1060 ? 1060 : itemWidth;
    return itemWidth;
  };

  //TODO: 무한 슬라이드로 수정
  const cloneSlide = () => {
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

  const getItemIndex = (index) => {
    index -= DATA_COUNT;
    if (index < 0) {
      index += itemSize;
    } else if (index >= itemSize) {
      index -= itemSize;
    }
    return index;
  };

  useEffect(() => {
    window.addEventListener('resize', getWindowSize);
    return () => window.removeEventListener('resize', getWindowSize);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  useInterval(() => {
    slideHandler(1);
  }, 2000);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.slider}>
          <SlideButton direction='left' onClick={() => slideHandler(-1)} />
          <SlideButton direction='right' onClick={() => slideHandler(1)} />
          <div className={styles.list} style={{ padding: sliderPaddingStyle }}>
            <div
              className={styles.track}
              style={{
                // width: `${100 * items.length}vw`,
                // translateX(${-1 * ((100 / items.length * 0.5) + (100 / items.length * slideIndex))%)
                // -1 * (슬라이드 한 개 너비 반) + (슬라이드 한개 너미 * 현재 슬라이드 index)%
                // -1 : 트랙의 기본 위치에서 왼쪽으로 이동하기 위해서는 음수 값 필요
                // 100 / items.length * 0.5 : 슬라이드 트랙은 슬라이드 수 만큼 width를 가짐. 슬라이드 1개 width = 트랙너비 / 슬라이드 수
                // 100 / items.length * slideIndex : 슬라이드가 중앙에 오도록 트랙을 이동 시키기 위해 슬라이드 한개의 너비 만큼 이동
                // transition: 'all 300ms ease-in-out',
                transform: `translateX(${
                  (-100 / cloneSlide().length) * (0.5 + slideIndex)
                }%)`,
                transition: slideTransition,
              }}
            >
              {cloneSlide().map((item, index) => {
                const itemIndex = getItemIndex(index);
                return (
                  <div
                    key={index}
                    className={`${styles.item} ${
                      slideIndex === index ? styles.currentSlide : ''
                    }`}
                    style={{ width: getItemWidth() || 'auto' }}
                  >
                    <img
                      className={styles.img}
                      src={items[itemIndex].data}
                      alt=''
                    />
                    <span className={styles.number}>{items[itemIndex].id}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Pagination
          itemSize={itemSize}
          setSlideIndex={setSlideIndex}
          slideIndex={slideIndex}
        />
      </div>
    </div>
  );
}
