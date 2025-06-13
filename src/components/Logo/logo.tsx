import Image from "next/image";
import Link from "next/link";

export default function Logo({ style }: { style?: string }) {
  return (
    <Link
      href="/"
      className="z-50"
    >
      <Image
        src="/assets/images/logo.svg"
        alt="phonesbulk Logo"
        className={`z-50 h-7 sm:w-[150px] ${style}`}
        width={200}
        height={200}
        priority
      />
    </Link>
  );
}
