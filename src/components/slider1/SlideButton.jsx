import React from 'react';
import styles from './SlideButton.module.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

export default function SlideButton({ direction, onClick, width }) {
  return (
    <button
      onClick={onClick}
      className={`${direction === 'right' ? styles.right : styles.left} ${
        styles.button
      }`}
    >
      {direction === 'left' ? (
        <MdKeyboardArrowLeft className={styles.icon} />
      ) : (
        <MdKeyboardArrowRight className={styles.icon} />
      )}
    </button>
  );
}
