import { DM_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";

export const interRegular = Inter({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-inter",
});

export const interLight = Inter({
  subsets: ["latin"],
  weight: "300",
  display: "swap",
  variable: "--font-inter",
});

export const interMedium = Inter({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  variable: "--font-inter",
});

export const interSemiBold = Inter({
  subsets: ["latin"],
  weight: "600",
  display: "swap",
  variable: "--font-inter",
});

export const interBold = Inter({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-inter",
});

export const gilroyRegular = localFont({
  src: "../../../public/fonts/gilroy/Gilroy-Regular.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-gilroy",
});

export const gilroyMedium = localFont({
  src: "../../../public/fonts/gilroy/Gilroy-Medium.woff2",
  weight: "500",
  display: "swap",
  variable: "--font-gilroy",
});

export const gilroySemiBold = localFont({
  src: "../../../public/fonts/gilroy/Gilroy-SemiBold.woff2",
  weight: "600",
  display: "swap",
  variable: "--font-gilroy",
});

export const gilroyBold = localFont({
  src: "../../../public/fonts/gilroy/Gilroy-Bold.woff2",
  weight: "700",
  display: "swap",
  variable: "--font-gilroy",
});

export const gilroyExtraBold = localFont({
  src: "../../../public/fonts/gilroy/Gilroy-ExtraBold.woff2",
  weight: "800",
  display: "swap",
  variable: "--font-gilroy",
});

export const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
