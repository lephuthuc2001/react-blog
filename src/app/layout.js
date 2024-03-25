import React from "react";
import { Work_Sans, Spline_Sans_Mono } from "next/font/google";
import clsx from "clsx";
import { cookies, headers } from "next/headers";

import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./styles.css";
import RespectMotionPreference from "@/components/RespectMotionPreference";
import ThemeProvider from "@/components/ThemeProvider";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});

const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

function RootLayout({ children }) {
  // TODO: Dynamic theme depending on user preference
  const initialTheme = cookies().get("theme")?.value || "light";

  const headerList = headers();

  const host = headerList.get("host");

  return (
    <ThemeProvider>
      <html
        lang="en"
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={initialTheme}
        style={initialTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
      >
        <body>
          <Header host={host} />
          <RespectMotionPreference>
            <main>{children}</main>
          </RespectMotionPreference>
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}

export default RootLayout;
