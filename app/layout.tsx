import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/_styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "Каталог лендингов",
    template: "%s — каталог лендингов",
  },
  description: "Подбор демонстрационных лендингов по нише, сроку и бюджету.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-primary-50 font-sans">
        {children}
      </body>
    </html>
  );
}
