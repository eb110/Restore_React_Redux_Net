import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { ReactNode } from "react";
import { convertPriceToPounds } from "../../utils/utils";
import { useAppSelector } from "../../app/store/configureStore";

export const BasketSummary = (): ReactNode => {
  const basket = useAppSelector(state => state.basket.basket);
  const basketTotalValue = basket ? basket.items.reduce((sum, item) => sum += item.quantity * item.price, 0) : 0;
  const subtotal = basketTotalValue;
  const deliveryFee = subtotal > 100000 ? 0 : 500;
  const total = subtotal + deliveryFee;

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">{convertPriceToPounds(subtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery Fee*</TableCell>
              <TableCell align="right">{convertPriceToPounds(deliveryFee)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">{convertPriceToPounds(total)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "italic" }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
