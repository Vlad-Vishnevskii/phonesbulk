import { ProductData } from "@/types/product";

import { Product } from "./Product";

export const Products = ({ products }: { products: ProductData[] }) => {
  return (
    <div className="table w-full border-separate border-spacing-y-px">
      <div className="table-row-group">
        {products.map(product => (
          <Product
            product={product}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};
