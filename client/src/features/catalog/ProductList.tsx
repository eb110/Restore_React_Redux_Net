import { Grid } from "@mui/material";
import { Product, Products } from "../../app/models/types";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Products;
}

export const ProductList = ({
  products,
}: ProductListProps): React.ReactNode => {
  return (
    <>
      <Grid container spacing={4}>
        {products.map((product: Product) => (
          <Grid item xs={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
