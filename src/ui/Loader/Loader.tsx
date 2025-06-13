import Image from "next/image";

export function Loader({ style }: { style?: string }) {
  return (
    <div className={`flex w-full items-center justify-center ${style}`}>
      <Image
        src={"/assets/images/loader.svg"}
        width={50}
        height={50}
        alt="loader"
      />
    </div>
  );
}
