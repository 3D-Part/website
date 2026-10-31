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
import TidioChat from "@/components/helper/TidioChat";
import NonRendableComponent from "@/components/helper/NonRendableComponent";

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.3dpartshop.com"),
  title: {
    default:
      "3D Part: 3D printeri, širok spektar filamenata i kvalitetne dijelove po najpovoljnijim cijenama",
    template: "%s | 3D Part",
  },
  description:
    "Pružamo najveci izbor 3D printera, širok spektar filamenata i kvalitetne dijelove po najpovoljnijim cijenama. Olakšajte svoje 3D printanje s našim proizvodima i uslugama.",
  keywords: [
    "3d printer",
    "3d printeri",
    "3d štampa",
    "3d štampanje",
    "3d filament",
    "filamenti za 3d printer",
    "pla filament",
    "petg filament",
    "abs filament",
    "asa filament",
    "dijelovi za 3d printere",
    "resin printer",
    "uv smola za 3d printer",
    "creality",
    "prusa",
    "flashforge",
    "elegoo",
    "3d printeri bih",
    "filamenti bih",
    "3d printer banja luka",
  ],
  openGraph: {
    type: "website",
    locale: "bs_BA",
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
    <html lang="bs">
      <body
        className={`${exo2.variable} font-exo2 overflow-x-hidden relative min-w-[368px]`}
      >
        <NextAuthProvider>
          <Providers>
            <NonRendableComponent />
            <TidioChat />
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
