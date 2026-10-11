import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fortnitello — Make Your Own Legend",
  description: "Explore original outfit, pickaxe and wrap concepts from the Fortnitello design lab, then dream up your own.",
  applicationName: "Fortnitello",
  openGraph: {
    title: "Fortnitello — Make Your Own Legend",
    description: "A creative home for original outfit, pickaxe and wrap concepts.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
