import Footer from "@/components/Footer/Footer";
import { LoadMore } from "@/components/LoadMore/LoadMore";
import { Navbar } from "@/components/Navbar/Navbar";
import { Products } from "@/components/Product/Products";
import { Search } from "@/components/Search/Search";
import { CategoryType } from "../types";

import { fetchProducts } from "../actions";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/shoppage?populate[content][populate][menuitem][populate]=*&populate[content][populate][information][populate]=*&populate[content][populate][custumerservice][populate]=*&populate[content][populate][contactus][populate]=*`,
    {
      cache: 'no-store',  // Отключение кэширования
    }
  );

  return res.json();
}

export default async function Shop({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    sort?: string;
    page?: number;
    filter: string;
    bestprice: string;
    bestseller: string;
  };
}) {
  const page = await getData();
  const data = page.data;
  const content = data.attributes.content;

  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "";
  const filter = searchParams?.filter || "";
  const best = searchParams?.bestprice || searchParams?.bestseller || "";

  
  const products = (await fetchProducts(query, sort, 1, filter, best, CategoryType.laptop)) ?? [];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header>
        <Navbar linksall={content[0].menuitem} />
      </header>
      <main className="mb-36 flex-grow">
        <Search />

        <Products products={products} />
        <LoadMore
          query={query}
          sort={sort}
          filter={filter}
          best={best}
          category={CategoryType.laptop}
        />
      </main>

      <Footer
        style="fixed"
        content={content[1]}
      />
    </div>
  );
}
