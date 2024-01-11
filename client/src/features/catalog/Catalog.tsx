import { Products } from "../../app/models/types";
import { ProductList } from "./ProductList";
import { useEffect, useState } from "react";

export const Catalog = (): React.ReactNode => {

  const [products, setProducts] = useState<Products>([]);

  useEffect(() => {
    void fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data as Products));
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
};
