"use client";

import { Suspense } from "react";

import RecoveryPass from "@/components/Auth/RecoveryPass/RecoveryPass";
import { Navbar } from "@/components/Navbar/Navbar";

export default async function RestorePassPage() {
  const page = await getData();
  const data = page.data;
  const content = data.attributes.content;

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <Navbar linksall={content[0].menuitem} />
      <p className="mb-6 mt-16">Recovery password</p>
      <Suspense>
        <RecoveryPass />
      </Suspense>
    </div>
  );
}

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/mainpage?populate[content][populate]=*`,
  );

  return res.json();
}
