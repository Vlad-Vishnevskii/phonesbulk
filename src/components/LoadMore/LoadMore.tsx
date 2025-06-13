"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Loader } from "@/ui/Loader/Loader";

import { ProductData } from "@/types/product";

import { Products } from "../Product/Products";
import { CategoryType } from "@/app/types";

import { fetchProducts } from "@/app/actions";

export const LoadMore = ({
  query,
  sort,
  filter,
  best,
  category,
}: {
  query?: string;
  sort?: string;
  page?: number;
  filter: string;
  best: string;
  category: CategoryType;
}) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);

  const { ref, inView } = useInView();

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const loadMoreProducts = async () => {
    await delay(2000);
    const nextPage = pagesLoaded + 1;
    const newProducts =
      (await fetchProducts(query, sort, nextPage, filter, best, category)) ?? [];
    if (newProducts.length === 0) {
      setHasMoreData(false); // Обновляем состояние, если данных больше нет
    } else {
      setProducts((prevProducts: ProductData[]) => [
        ...prevProducts,
        ...newProducts,
      ]);
      setPagesLoaded(nextPage);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
  }, [inView, hasMoreData]);

  return (
    <>
      <Products products={products} />

      {hasMoreData && ( // Условный рендеринг
        <div ref={ref}>
          <Loader />
        </div>
      )}
    </>
  );
};
