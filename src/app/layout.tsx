import Container from "@/components/Container/container";

import { getMeta } from "./actions";
import "./globals.css";
import { inter } from "@/lib/fonts";
import { MetaEnum } from "./types";

export async function generateMetadata() {
  const meta = await getMeta(MetaEnum.mainPage);
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
