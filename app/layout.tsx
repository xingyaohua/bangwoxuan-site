import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "帮我选｜选择困难？让转盘替你决定",
  description: "添加你的选项，让公平又有趣的随机转盘替你做决定。支持网页在线体验和安卓 App 下载。",
  icons: { icon: "/icon.png", shortcut: "/icon.png" },
  openGraph: {
    title: "帮我选｜让转盘替你决定",
    description: "选择困难？添加选项，轻轻一点，让转盘给你一个答案。",
    images: [{ url: "/og.png", width: 1680, height: 945, alt: "帮我选 App" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "帮我选｜让转盘替你决定",
    description: "选择困难？添加选项，轻轻一点，让转盘给你一个答案。",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
