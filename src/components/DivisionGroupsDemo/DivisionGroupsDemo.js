"use client";
import React from "react";
import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";

import { range } from "@/utils";
import Card from "@/components/Card";
import SliderControl from "@/components/SliderControl";

import Equation from "./Equation";
import styles from "./DivisionGroupsDemo.module.css";

function DivisionGroupsDemo({
  numOfItems = 12,
  initialNumOfGroups = 1,
  includeRemainderArea,
}) {
  const [numOfGroups, setNumOfGroups] = React.useState(initialNumOfGroups);

  const numOfItemsPerGroup = Math.floor(numOfItems / numOfGroups);

  const remainder = includeRemainderArea ? numOfItems % numOfGroups : null;

  const randomId = React.useId();
  // When we're splitting into 1-3 groups, display side-by-side
  // columns. When we get to 4, it should switch to a 2x2 grid.
  const gridStructure =
    numOfGroups < 4
      ? {
          gridTemplateColumns: `repeat(${numOfGroups}, 1fr)`,
        }
      : {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
        };

  const items = React.useMemo(
    () =>
      range(numOfItems).map((itemIndex) => (
        <motion.div
          layoutId={`${randomId}-${itemIndex}`}
          layout="position"
          key={itemIndex}
          className={styles.item}
        >
          {" "}
          {itemIndex}
        </motion.div>
      )),
    [numOfItems, randomId]
  );

  return (
    <LayoutGroup>
      <Card as="section" className={styles.wrapper}>
        <header className={styles.header}>
          <SliderControl
            label="Number of Groups"
            className={styles.slider}
            step={1}
            min={1}
            max={4}
            value={numOfGroups}
            onChange={(ev) => setNumOfGroups(Number(ev.target.value))}
          />
        </header>

        <div className={styles.demoWrapper}>
          <div className={clsx(styles.demoArea)} style={gridStructure}>
            {range(numOfGroups).map((groupIndex) => (
              <div key={groupIndex} className={styles.group}>
                {range(numOfItemsPerGroup).map((index) => {
                  const itemIndex = numOfItemsPerGroup * groupIndex + index;

                  return items[itemIndex];
                })}
              </div>
            ))}
          </div>
        </div>

        {includeRemainderArea && (
          <div className={styles.remainderArea}>
            <p className={styles.remainderHeading}>Remainder Area</p>

            {range(remainder).map((index) => {
              const remainderIndex = numOfItems - 1 - index;
              return items[remainderIndex];
            })}
          </div>
        )}

        <Equation
          dividend={numOfItems}
          divisor={numOfGroups}
          remainder={remainder}
        />
      </Card>
    </LayoutGroup>
  );
}

export default DivisionGroupsDemo;
