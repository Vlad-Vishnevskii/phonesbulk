import { getMeta } from "../actions";
import { MetaEnum } from "../types";

export async function generateMetadata() {
  const meta = await getMeta(MetaEnum.latptopShop);

  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
