import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://waza.agency"),
  title: {
    default: "WAZA - Technology That Grows Stronger Through Use",
    template: "%s | WAZA",
  },
  description:
    "WAZA creates AI-native systems that continuously evolve, adapt, and improve themselves over time, transforming static products into living ecosystems.",
  openGraph: {
    type: "website",
    siteName: "WAZA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WAZA - Technology That Grows Stronger Through Use",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@waboratory",
  },
  alternates: {
    types: {
      "text/markdown": "/llms.txt",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
