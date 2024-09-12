import React from 'react';
import { ColorFormat } from '../../types/colorTypes';
import styles from './OutputDisplay.module.css';

interface OutputDisplayProps {
  color: ColorFormat;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ color }) => {
  // const backgroundColor = color.error ? 'red' : color.hex;
  // style={{ backgroundColor }}
  return (
    <div className={styles['background']} > 
      {color.error ? 'Ошибка!' : color.rgb ? `RGB(${color.rgb})` : `${color.rgb}`}
    </div>
  );
};