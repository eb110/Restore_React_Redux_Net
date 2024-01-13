import agent from "../../api/agent";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Products } from "../../app/models/types";
import { ProductList } from "./ProductList";
import { useEffect, useState } from "react";

export const Catalog = (): React.ReactNode => {

  const [products, setProducts] = useState<Products>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    void agent.Catalog.list()
    .then(products => setProducts(products))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading Items to Sell"/>;

  return (
    <>
      <ProductList products={products} />
    </>
  );
};
