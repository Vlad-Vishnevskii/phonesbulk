import Image from "next/image";

export const PreviewProduct = ({ product }: { product: any }) => {
  return (
    <div className="delay-70  table-row w-full sm:text-[7px]">
      <div className=" group flex w-full justify-between rounded-xl bg-ligth_grey hover:bg-dark_green sm:rounded-md">
        <div className="flex w-full items-center">
          <div className="table-cell max-w-[550px] p-1 group-hover:text-white sm:w-[160px] sm:text-[7px] ">
            {product.model}
          </div>
        </div>
        <div className="flex items-center">
          <div className="table-cell w-20 border-separate border-none sm:max-w-6">
            <div className="flex w-12 justify-center gap-2 sm:w-8">
              {product.bestprice ? (
                <Image
                  src="/assets/icons/bestprice.svg"
                  width={15}
                  height={15}
                  alt="bestprice"
                />
              ) : (
                ""
              )}
              {product.bestseller ? (
                <Image
                  src="/assets/icons/bestseller.svg"
                  width={15}
                  height={15}
                  alt="bestseller"
                />
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="table-cell w-20 text-center font-black group-hover:text-white sm:max-w-10 sm:text-[8px]">
            ${product.price.toLocaleString("en-US")}
          </div>
          <div className="table-cell w-20 text-center font-black group-hover:text-white sm:max-w-10 sm:text-[8px]">
            Qty {product.qty}
          </div>
        </div>
      </div>
    </div>
  );
};
