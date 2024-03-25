"use client";
import React from "react";
import clsx from "clsx";
import { Rss, Sun, Moon } from "react-feather";

import Logo from "@/components/Logo";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./Header.module.css";
import { useTheme } from "../ThemeProvider";
import Spinner from "../Spinner";

function Header({ className, host, ...delegated }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <a href={`${host}/rss.xml`} className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: "translate(2px, -2px)",
            }}
          />
          <VisuallyHidden>View RSS feed</VisuallyHidden>
        </a>
        <button className={styles.action} onClick={toggleTheme}>
          {typeof theme !== "undefined" ? (
            theme === "light" ? (
              <Moon size="1.5rem" />
            ) : (
              <Sun size="1.5rem" />
            )
          ) : (
            <Spinner />
          )}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
