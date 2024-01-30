import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { ProductList } from "./ProductList";
import { useEffect } from "react";
import {
  fetchProductFiltersAsync,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from "./catalogSlice";
import { Grid, Paper } from "@mui/material";
import { ProductSearch } from "./ProductSearch";
import { RadioButtonGroup } from "../../app/components/RadioButtonGroup";
import { CheckboxButtons } from "../../app/components/CheckboxButtons";
import { AppPagination } from "../../app/components/AppPagination";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to Low" },
  { value: "price", label: "Price - Low to High" },
];

export const Catalog = (): React.ReactNode => {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const {
    productsLoaded,
    status,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) void dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) void dispatch(fetchProductFiltersAsync());
  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded)
    return <LoadingComponent message="Loading Items to Sell" />;

  return (
    <>
      <Grid container columnSpacing={4}>
        <Grid item xs={3}>
          <Paper sx={{ mb: 2 }}>
            <ProductSearch />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <RadioButtonGroup
              options={sortOptions}
              onChange={(e): void =>
                void dispatch(
                  setProductParams({
                    ...productParams,
                    orderBy: e.currentTarget.getAttribute("value") ?? "",
                  })
                )
              }
              selectedValue={productParams.orderBy}
            />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <CheckboxButtons
              options={brands}
              formLabel="Brands"
              selectedValues={productParams.brands ?? []}
              onChange={(options: string[]): void =>
                void dispatch(
                  setProductParams({
                    ...productParams,
                    brands: options
                  })
                )
              }
            />
          </Paper>
          <Paper sx={{ mb: 2, p: 2 }}>
            <CheckboxButtons
              options={types}
              formLabel="Types"
              selectedValues={productParams.types ?? []}
              onChange={(options: string[]): void => (
                void dispatch(
                  setProductParams({
                    ...productParams,
                    types: options
                  })
                )
              )}
            />
          </Paper>
        </Grid>

        <Grid item xs={9}>
          <ProductList products={products} />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={9} sx={{mb: 2}}>
          {metaData && 
          <AppPagination
            metaData={metaData}
            onPageChange={(pageNumber: number): void =>
              void dispatch(
                setPageNumber({
                  ...productParams,
                  pageNumber: pageNumber,
                })
              )
            }
          />}
        </Grid>
      </Grid>
    </>
  );
};
