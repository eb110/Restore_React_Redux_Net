import { TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";
import { ChangeEvent, useMemo, useState } from "react";

export const ProductSearch = (): React.ReactNode => {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState<string | undefined>(
    productParams.searchTerm
  );
  const dispatch = useAppDispatch();

  const debouncedSearch = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(
          setProductParams({ ...productParams, searchTerm: event.target.value })
        );
      }, 1000),
    [dispatch, productParams]
  );

  return (
    <>
      <TextField
        fullWidth
        label="Search products"
        variant="outlined"
        value={searchTerm || ""}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>): void => {
          setSearchTerm(event.target.value);
          debouncedSearch(event);
        }}
      />
    </>
  );
};
