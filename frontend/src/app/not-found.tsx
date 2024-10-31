import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-light_grey flex min-h-screen w-full flex-col items-center justify-center">
      <h2 className="text-7xl font-black text-dark_green">404</h2>
      <p className="mb-4 font-bold text-base_green">Not found</p>
      <Link
        href="/"
        className="hover:text-medium_grey"
      >
        ← Go back
      </Link>
    </div>
  );
}
