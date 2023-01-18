import React from 'react';

export default function Pagination({ itemSize, setSlideIndex, slideIndex }) {
  const paginationHandler = (index) => {
    setSlideIndex(index + 2);
  };
  return (
    <div className='z-10 flex justify-center w-screen mt-3 bottom-2 group-hover:flex'>
      <ul className='flex'>
        {Array.from({ length: itemSize }, (_, i) => i).map((item) => (
          <li
            key={item}
            className='w-3 h-3 rounded-full bg-[rgba(255,255,255,0.5)] mx-1 hover:bg-[rgba(255,255,255,0.9)] hover:cursor-pointer'
            style={{
              backgroundColor: `${
                slideIndex === item + 2 ? 'rgba(255,255,255,0.9)' : ''
              }`,
            }}
            onClick={() => paginationHandler(item)}
          ></li>
        ))}
      </ul>
    </div>
  );
}
