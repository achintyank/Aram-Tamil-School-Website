import type { Metadata } from "next";
import { Anek_Tamil, Anton, Mona_Sans, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./_components/SmoothScroll";

const mona = Mona_Sans({ variable: "--font-mona", subsets: ["latin"] });

const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });

const anekTamil = Anek_Tamil({
  variable: "--font-anek-tamil",
  subsets: ["tamil", "latin"],
  weight: ["400", "600", "800"],
});

const notoTamil = Noto_Sans_Tamil({
  variable: "--font-noto-tamil",
  subsets: ["tamil"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Aram Tamil School — அறம் தமிழ்ப் பள்ளி",
  description:
    "Aram Tamil School, a volunteer-run branch of the International Tamil Academy in Mountain House, CA. Tamil classes TK–8, HSCP world-language credit, announcements, calendar and contacts.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${mona.variable} ${anton.variable} ${anekTamil.variable} ${notoTamil.variable} antialiased`}
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
