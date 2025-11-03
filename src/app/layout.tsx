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
import NonRendableComponent from "@/components/helper/NonRendableComponent";

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "3D Part: 3D printeri, širok spektar filamenata i kvalitetne dijelove po najpovoljnijim cijenama",
    template: "%s | 3D Part",
  },
  description:
    "Pružamo najveci izbor 3D printera, širok spektar filamenata i kvalitetne dijelove po najpovoljnijim cijenama. Olakšajte svoje 3D printanje s našim proizvodima i uslugama.",
  keywords: [
    "3d printer, 3d printeri, 3d filamenti, 3d filament, pla filamenti, filamenti za 3d printer, dijelovi za 3d printere, creality, creality printeri, creality filamenti, creality pla, pla filament, petg filament, abs filament, carbon filamenti, asa filamenti, 3d stampa, 3d dijelovi od plastike, 3d stampanje, grijaci, extruderi, ventilatori, sve kategorije sa sajta se mogu uzeti, prusa, prusa printeri, mk4s printer, prusa mk4 kit, flashforge, profesionalni 3d printeri, resin printer, resini, smole , uv smola za 3d printer",
  ],
  verification: {
    google: "google-site-verification: google12063707349698d2.html",
  },

  openGraph: {
    type: "website",
    url: "https://3dpartshop.com",
    title: "3D Part",
    description:
      "Pružamo najnovije modele 3D printera, širok spektar filamenata i kvalitetne dijelove po najpovoljnijim cijenama. Olakšajte svoje 3D printanje s našim proizvodima i uslugama.",
    siteName:
      "3D Part: 3D printeri, širok spektar filamenata i kvalitetne dijelove po najpovoljnijim cijenama",
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
            <NonRendableComponent />
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
            })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");`,
          }}
        />
      </body>
    </html>
  );
}
