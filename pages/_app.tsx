import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { Kalnia } from "next/font/google"

const kalnia = Kalnia({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={kalnia.className}>
      <NextUIProvider style={{ height: "100%" }}>
          <Component {...pageProps} />
      </NextUIProvider>
    </main>
  )
}