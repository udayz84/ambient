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
  src: "../../../public/fonts/gilroy/Gilroy-Regular.ttf",
  weight: "400",
  display: "swap",
  variable: "--font-gilroy",
});

export const gilroyMedium = localFont({
  src: "../../../public/fonts/gilroy/Gilroy-Medium.ttf",
  weight: "500",
  display: "swap",
  variable: "--font-gilroy",
});

export const gilroySemiBold = localFont({
  src: "../../../public/fonts/gilroy/Gilroy-SemiBold.ttf",
  weight: "600",
  display: "swap",
  variable: "--font-gilroy",
});

export const gilroyBold = localFont({
  src: "../../../public/fonts/gilroy/Gilroy-Bold.ttf",
  weight: "700",
  display: "swap",
  variable: "--font-gilroy",
});

export const gilroyExtraBold = localFont({
  src: "../../../public/fonts/gilroy/Gilroy-ExtraBold.ttf",
  weight: "800",
  display: "swap",
  variable: "--font-gilroy",
});

export const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
