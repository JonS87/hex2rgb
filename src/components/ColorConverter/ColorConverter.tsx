import React, { useState, useEffect, useRef } from 'react';
import { ColorFormat } from '../../types/colorTypes';
import { OutputDisplay } from '../OutputDisplay';
import styles from './ColorConverter.module.css';

export const ColorConverter: React.FC = () => {
  const [color, setColor] = useState<ColorFormat>({
    hex: '',
    rgb: '',
    error: false
  });

  const [backgroundColor, setBackgroundColor] = useState<string>('white');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor({ ...color, hex: e.target.value });
  };

  useEffect(() => {
    if (color.hex.length === 7) {
      if (/^#[0-9A-F]{6}$/i.test(color.hex)) {
        const rgb = hexToRgb(color.hex);
        setColor({ hex: color.hex, rgb, error: false });
      } else {
        setColor({ hex: color.hex, rgb: '255, 0, 0', error: true });
      }
    } else {
      setColor({ hex: color.hex, rgb: color.rgb, error: false });
    }
  }, [color.hex]);

  useEffect(() => {
    if (color.error) {
      setBackgroundColor(`rgb(${color.rgb})`)
    } else {
      setBackgroundColor(color.hex || 'white')
    }
  }, [color]);
  
  const hexToRgb = (hex: string): string => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className={styles['background']} style={{ backgroundColor }} >
      <form className={styles['user-from']}>
        <input 
          className={styles['input-row']}
          ref={inputRef}
          type="text"
          value={color.hex}
          onChange={handleChange}
          placeholder="Введите HEX цвет"
        />
        <OutputDisplay color={color} />
      </form>
    </div>
  );
};