'use client';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Play, Pause, RotateCcw } from 'react-feather';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  useEffect(() => {
    if (isPlaying) {
      const interval = window.setInterval(() => {
        setTimeElapsed((currentTimeElapsed) => currentTimeElapsed + 1);
        setSelectedColor(COLORS[timeElapsed % COLORS.length]);
      }, 1000);

      return () => {
        window.clearInterval(interval);
      };
    }
  }, [isPlaying, timeElapsed]);

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layout={true}
                  layoutId="XDC"
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(styles.colorBox, isSelected && styles.selectedColorBox)}
                style={{
                  backgroundColor: color.value,
                }}>
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button
            onClick={() => {
              setIsPlaying(!isPlaying);
            }}>
            {isPlaying ? <Pause /> : <Play />}

            <VisuallyHidden>{isPlaying ? 'Pause' : 'Play'}</VisuallyHidden>
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setTimeElapsed(0);
            }}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
