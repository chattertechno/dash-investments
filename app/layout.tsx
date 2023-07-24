import { Inter } from "next/font/google";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Read Investment Data",
  description: "Read Dash Funding Data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="flex h-full">
          <Sidebar />
          <main className="w-[100vw] md:flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
