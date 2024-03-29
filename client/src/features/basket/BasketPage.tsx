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
import { LoadingButton } from "@mui/lab";
import { BasketSummary } from "./BaketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export const BasketPage = (): React.ReactNode => {
  const {basket, status} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

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
                    loading={status === `pendingRemoveItem ${item.productId}rem`}
                    onClick={(): void =>
                      void dispatch(removeBasketItemAsync({productId: item.productId, quantity: 1, type: 'rem'}))
                    }
                    color="error"
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={status === `pendingAddItem ${item.productId}`}
                    onClick={(): void => void dispatch(addBasketItemAsync({productId: item.productId}))}
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
                    loading={status === `pendingRemoveItem ${item.productId}del`}
                    onClick={(): void =>
                      void dispatch(removeBasketItemAsync({productId: item.productId, quantity: item.quantity, type: 'del'}))
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
