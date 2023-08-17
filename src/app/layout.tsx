import Header from "@/components/layout/header/Header";
import "./globals.css";
import { Exo_2 } from "next/font/google";
import Footer from "@/components/layout/footer/Footer";
import Lights from "@/components/layout/header/lights/Lights";
import { Metadata } from "next";

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "3D Part",
    template: "%s | 3D Part",
  },
  description: "Description for 3d part",
  keywords: ["3d, 3d oprema, 3d masine, filamenti, 3d printer"],
  openGraph: {
    type: "website",
    url: "https://3dpartshop.com",
    title: "3D Part",
    description: "3D Part Description",
    siteName: "3D Part",
    images: [
      {
        url: "/assets/img/logo_social.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${exo2.variable} font-exo2 overflow-x-hidden relative min-w-[368px]`}
      >
        <Header />
        <Lights />

        <div className="static">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
