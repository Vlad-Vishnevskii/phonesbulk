"use client";

import Papa from "papaparse";
import { useRef, useState } from "react";

import { Button } from "@/ui/Button/Button";
import { Loader } from "@/ui/Loader/Loader";

import { ProductAttributes } from "@/types/product";

import { PreviewProduct } from "./PreviewProduct";
import { createProducts, deleteAllProducts } from "@/app/actions";

const acceptCsvFilesType = ".csv";

export const UploadPrice = () => {
  const [priceData, setPriceData] = useState([]);
  const [promisesDone, setPromisesDone] = useState(false);
  const [iseLoading, setIsLoading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const csvFile = e.target.files?.[0];

    if (csvFile) {
      Papa.parse(csvFile, {
        skipEmptyLines: true,
        header: true,
        complete: function (results: any) {
          setPriceData(results.data);
        },
      });
    }
  };

  const addAllProducts = async (data: ProductAttributes[]) => {
    try {
      setIsLoading(true);
      await deleteAllProducts();
      const promises = data.map(item => createProducts(item));
      await Promise.all(promises);
      setIsLoading(false);
      setPromisesDone(true);
      alert("Products have been added to the database");
      setPriceData([]);
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-16 pt-7 xl:mx-8 md:pt-16 sm:mx-1 sm:pt-8">
      <h2 className="mb-6 text-[30px] font-black text-dark_green lg:text-2xl sm:mb-1 sm:mt-2 sm:text-center sm:text-[20px]">
        Upload products
      </h2>
      <div className="py-4">
        <div className="mt-5 flex justify-start sm:justify-center">
          <input
            type="file"
            name="csvFileSelector"
            id="csvFileSelector"
            className="text-sm text-medium_grey
          file:mr-4 file:rounded-lg file:border-0
          file:bg-base_green file:px-4
          file:py-1 file:text-sm
          file:font-semibold file:text-white
          hover:file:bg-dark_green"
            accept={acceptCsvFilesType}
            onChange={handleInputFile}
            ref={inputFileRef}
          />
        </div>
        <div className="my-5">
          {priceData.length < 5 ? (
            <div className="table w-full border-separate border-spacing-y-px">
              <div className="table-row-group">
                {priceData.map((priceItem: ProductAttributes, i) => (
                  <PreviewProduct
                    product={priceItem}
                    key={i}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="table w-full border-separate border-spacing-y-px">
              <div className="table-row-group">
                {priceData
                  .slice(0, 5)
                  .map((priceItem: ProductAttributes, i) => (
                    <PreviewProduct
                      product={priceItem}
                      key={i}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
        {priceData.length > 0 && (
          <>
            <div className="flex justify-center font-black">...</div>
            <div className="mb-4 flex justify-center ">
              {`Displayed ${
                priceData.length < 5 ? priceData.length : 5
              } rows out of ${priceData.length}, click "Add to database" to add to the database`}
            </div>
            <div className="flex justify-center">
              {!promisesDone && (
                <Button
                  style="bg-base_green px-4 py-1 text-white"
                  onClick={() => addAllProducts(priceData)}
                >
                  {iseLoading ? <Loader style="h-5" /> : "Add to database"}
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
