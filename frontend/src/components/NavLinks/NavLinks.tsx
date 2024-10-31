import Link from "next/link";

import { Links } from "@/types/links";

export default function NavLinks({ links }: { links: Links[] }) {
  return (
    <ul className="flex gap-10 lg:hidden">
      {links.map(link => (
        <li key={String(link.id)}>
          <Link
            href={link.link}
            className="text-base font-bold text-white hover:text-acsent_orange hover:underline hover:underline-offset-4"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
