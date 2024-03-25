"use client";

import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion } from "framer-motion";
import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  const [selectedColorIndex, setSelectedColorIndex] = React.useState(0);

  const randomId = React.useId();

  React.useEffect(
    function () {
      if (isRunning) {
        const intervalId = setInterval(() => {
          setTimeElapsed((currentTimeElapsed) => currentTimeElapsed + 1);
          setSelectedColorIndex(timeElapsed % COLORS.length);
        }, 1000);

        return () => {
          clearInterval(intervalId);
        };
      }
    },
    [isRunning]
  );

  React.useEffect(
    function () {
      setSelectedColorIndex(timeElapsed % COLORS.length);
    },
    [timeElapsed]
  );

  function start() {
    setIsRunning(true);
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    stop();
    setSelectedColorIndex(0);
    setTimeElapsed(0);
  }
  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[selectedColorIndex];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layout="position"
                  layoutId={randomId}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
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
          {isRunning ? (
            <button onClick={stop}>
              <Pause />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          ) : (
            <button onClick={start}>
              <Play />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          )}

          <button onClick={reset}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
