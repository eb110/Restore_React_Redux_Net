import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { convertPriceToPounds } from "../../utils/utils";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButtonState } from "../../app/models/types";
import { useState } from "react";
import agent from "../../api/agent";
import { LoadingButton } from "@mui/lab";
import { BasketSummary } from "./BaketSummary";
import { Link } from "react-router-dom";

export const BasketPage = (): React.ReactNode => {
  const basket = useStoreContext()!.basket;
  const setBasket = useStoreContext()!.setBasket;
  const removeItem = useStoreContext()!.removeItem;

  const [loading, setLoading] = useState<LoadingButtonState>({
    state: false,
    id: -1,
    type: "",
  });

  const handleAddItem = (productId: number): void => {
    setLoading({ state: true, id: productId, type: "add" });
    void agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading({ state: false, id: -1, type: "" }));
  };

  const handleRemoveItem = (
    productId: number,
    type: string,
    quantity = 1
  ): void => {
    setLoading({ state: true, id: productId, type: type });
    void agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setLoading({ state: false, id: -1, type: "" }));
  };

  if (!basket) return <Typography variant="h3">Empty Basket</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {convertPriceToPounds(item.price)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      loading.state &&
                      loading.id === item.productId &&
                      loading.type === "rem"
                    }
                    onClick={(): void =>
                      handleRemoveItem(item.productId, "rem")
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={
                      loading.state &&
                      loading.id === item.productId &&
                      loading.type === "add"
                    }
                    onClick={(): void => handleAddItem(item.productId)}
                    color="secondary"
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {convertPriceToPounds(item.price * item.quantity)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={
                      loading.state &&
                      loading.id === item.productId &&
                      loading.type === "del"
                    }
                    onClick={(): void =>
                      handleRemoveItem(item.productId, "del", item.quantity)
                    }
                    color="error"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary />
          <Button component={Link} to='/checkout' variant='contained' fullWidth size="large">Checkout</Button>
        </Grid>
      </Grid>
    </>
  );
};
