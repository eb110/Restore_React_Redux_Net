import { Grid } from "@mui/material";
import { Product, Products } from "../../app/models/types";
import { ProductCard } from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import { ProductCardSkeleton } from "./ProductCardSkeleton";

interface ProductListProps {
  products: Products;
}

export const ProductList = ({products}: ProductListProps): React.ReactNode => {

const {productsLoaded} = useAppSelector(state => state.catalog);

  return (
    <>
      <Grid container spacing={4}>
        {products.map((product: Product) => (
          <Grid item xs={4} key={product.id}>
            {!productsLoaded ? (
              <ProductCardSkeleton />
            ) : (
              <ProductCard product={product} />
            )}     
          </Grid>
        ))}
      </Grid>
    </>
  );
};
