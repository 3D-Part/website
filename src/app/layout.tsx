import Header from "@/components/layout/header/Header";
import "./globals.css";
import { Exo_2 } from "next/font/google";
import Footer from "@/components/layout/footer/Footer";
import Lights from "@/components/layout/header/lights/Lights";
import { Metadata } from "next";
import { Providers } from "@/redux/provider";
import Modals from "@/components/layout/modals/Modals";
import "react-toastify/dist/ReactToastify.css";
import Toastify from "@/components/common/toast/Toastify";
import { NextAuthProvider } from "@/app/providers";
import GoogleAnalytics from "./GoogleAnalytics";
import Script from "next/script";

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
  verification: {
    google: "google-site-verification: google12063707349698d2.html",
  },
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
        <NextAuthProvider>
          <Providers>
            <Header />
            <Lights />
            <GoogleAnalytics />

            <div className="static">{children}</div>
            <Footer />
            <Modals />
          </Providers>
          <Toastify />
        </NextAuthProvider>
        <Script
          id="show-banner"
          dangerouslySetInnerHTML={{
            __html: `(function (h, o, t, j, a, r) {
              h.hj =
                h.hj ||
                function () {
                  (h.hj.q = h.hj.q || []).push(arguments);
                };
              h._hjSettings = { hjid: ${process.env.NEXT_HOTJAR_ID}, hjsv: 6 };
              a = o.getElementsByTagName("head")[0];
              r = o.createElement("script");
              r.async = 1;
              r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
              a.appendChild(r);
              console.error("op op");
            })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");`,
          }}
        />
      </body>
    </html>
  );
}
