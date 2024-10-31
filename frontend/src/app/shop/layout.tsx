import { getMeta } from "../actions";

export async function generateMetadata() {
  const meta = await getMeta(1);

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
