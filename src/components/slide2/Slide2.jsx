import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Container = styled.div`
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 3rem;
`;

const Progress = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.2rem;
`;

const ProgressItem = styled.div`
  min-width: 0.6rem;
  height: 0.1rem;
  background-color: ${(props) =>
    props.position ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)'};
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  flex-grow: 0;
  border: none;
  z-index: 1;
  cursor: pointer;
  transition: 300ms ease-in;
  &:hover {
    background-color: rgba(70, 70, 70, 0.5);
    svg {
      transform: scale(1.1);
      opacity: 1;
    }
  }
  svg {
    transition: 300ms ease-in;
    opacity: 0;
    height: 2rem;
    fill: white;
  }
`;

const Slider = styled.div`
  display: flex;
  width: calc(100% - 2 * 5rem);
  margin: 0 0.25rem;
  flex-grow: 1;
  transform: translateX(calc(${(props) => props.sliderIndex} * -100%));
  transition: transform 500ms ease-in-out;
`;

const Box = styled.div`
  flex: 0 0 calc(100% / ${(props) => props.itemperscreen});
  width: calc(100% / ${(props) => props.itemperscreen});
  aspect-ratio: 16 / 9;
  img {
    width: 96%;
    height: 100%;
    border-radius: 4px;
    object-fit: cover;
    user-select: none;
    padding: 0 0.25rem;
  }
`;

export default function Slide2() {
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
  const ITEM_LENGTH = 12;
  const [sliderIndex, setSliderIndex] = useState(0);
  const [position, setPostion] = useState(0);
  const [itemPerScreen, setItemPerScreen] = useState(6);
  const progressBarItemCount = Math.ceil(ITEM_LENGTH / itemPerScreen);
  const onClickLeft = () => {
    if (sliderIndex - 1 < 0) {
      return;
    } else {
      setSliderIndex(sliderIndex - 1);
      setPostion(position - 1);
    }
  };

  const onClickRight = () => {
    if (sliderIndex + 1 >= progressBarItemCount) {
      return;
    } else {
      setSliderIndex(sliderIndex + 1);
      setPostion(position + 1);
    }
  };

  //FIXME: 슬라이드를 제일 마지막으로 이동 시킨 후 화면 크기를 크게 늘리거나 하면 슬라이드 내용이 사라지는 버그 수정
  // innderWidth가 변경되면서 sliderIndex 값이 적절하게 변경되지 않아서 발생하는 문제로 추정 됨
  // try 1 : 나름 수정했으나 첫번째 슬라이드로 돌아가는 현상 발생
  const checkWindowSize = useCallback(() => {
    if (window.innerWidth > 1440) {
      setItemPerScreen(6);
      if (sliderIndex !== 0 && progressBarItemCount >= sliderIndex) {
        setSliderIndex(Math.floor(sliderIndex / itemPerScreen));
        setPostion(sliderIndex - 1);
      }
      return;
    }

    if (window.innerWidth > 768) {
      setItemPerScreen(4);
      if (sliderIndex !== 0 && progressBarItemCount >= sliderIndex) {
        setSliderIndex(Math.floor(sliderIndex / itemPerScreen));
        setPostion(sliderIndex - 1);
      }
      return;
    }

    if (window.innerWidth > 0) {
      setItemPerScreen(2);
      if (sliderIndex !== 0 && progressBarItemCount >= sliderIndex) {
        setSliderIndex(Math.floor(sliderIndex / itemPerScreen));
        setPostion(sliderIndex - 1);
      }
      return;
    }
  }, [itemPerScreen, progressBarItemCount, sliderIndex]);

  useEffect(() => {
    window.addEventListener('resize', checkWindowSize);
    return () => {
      window.removeEventListener('resize', checkWindowSize);
    };
  }, [checkWindowSize]);

  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (
    <>
      <Container>
        <Wrapper>
          <Progress>
            {Array.from({ length: progressBarItemCount }, (_, i) => i).map(
              (item) => (
                <ProgressItem key={item} position={item === position} />
              )
            )}
          </Progress>
        </Wrapper>
        <Row>
          <Button onClick={onClickLeft}>
            <svg viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'>
              <path d='M22.324 28.008c.537.577.355 1.433-.326 1.809a1.44 1.44 0 0 1-.72.183c-.398 0-.786-.151-1.048-.438L10.06 18.588a1.126 1.126 0 0 1 0-1.555L20.233 6.09c.438-.468 1.198-.564 1.767-.25.681.377.863 1.23.325 1.808l-9.446 10.164 9.446 10.196zM11.112 17.615a.31.31 0 0 1 0 .391l.182-.195-.182-.196zM21.308 7.094c-.01-.006-.053 0-.029-.027a.07.07 0 0 0 .029.027zm-.025 21.499a.95.95 0 0 1-.006-.008l.006.008z'></path>
            </svg>
          </Button>
          <Slider sliderIndex={sliderIndex}>
            {console.log(
              'Math.floor(sliderIndex / itemPerScreen)',
              Math.floor(sliderIndex / itemPerScreen)
            )}
            {console.log('sliderIndex', sliderIndex)}
            {items.map((item, index) => (
              <Box key={index} itemperscreen={itemPerScreen}>
                <img src={item} alt={index} loading='lazy' />
              </Box>
            ))}
          </Slider>
          <Button onClick={onClickRight}>
            <svg viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'>
              <path d='M13.065 7.65c-.538-.578-.355-1.433.325-1.81a1.44 1.44 0 0 1 .72-.182c.398 0 .786.15 1.048.437L25.327 17.07a1.126 1.126 0 0 1 0 1.555L15.155 29.568c-.438.468-1.198.563-1.767.25-.681-.377-.863-1.23-.325-1.809l9.446-10.164L13.065 7.65zm11.211 10.393a.31.31 0 0 1 0-.391l-.181.194.181.197zM14.081 28.564c.01.006.053 0 .028.027a.07.07 0 0 0-.028-.027zm.024-21.5a.95.95 0 0 1 .007.008l-.007-.007z'></path>
            </svg>
          </Button>
        </Row>
      </Container>
    </>
  );
}
