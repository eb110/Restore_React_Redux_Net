/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { convertPriceToPounds } from "../../utils/utils";
import { NotFound } from "../../app/errors/NotFound";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export const ProductDetails = (): React.ReactNode => {
  const status = useAppSelector(state => state.basket.status);
  const catalogProductFetchStatus = useAppSelector(state => state.catalog.status);
  const basket = useAppSelector(state => state.basket.basket);
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const product = useAppSelector(state => productSelectors.selectById(state, +id!))

  const [quantity, setQuantity] = useState<number>(0);

  const item = basket?.items.find(item => item.productId === product?.id);

  useEffect(() => {
    if(item)
    setQuantity(item.quantity);

    if(!product)
      dispatch(fetchProductAsync(+id!));
  }, [dispatch, id, item, product]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    if(+event.target.value >= 0)
      setQuantity(+event.target.value);
  }

  const handleUpdateCart = (): void => {
    if(!item || quantity > item.quantity)
      dispatch(addBasketItemAsync({productId: product.id, quantity: !item ? quantity : quantity - item.quantity}))
    else
      dispatch(removeBasketItemAsync({productId: product.id, quantity: item.quantity - quantity}))
  }

  if (catalogProductFetchStatus === 'pendingFetchProduct') return <LoadingComponent message="Loading Item..."/>;

  if (!product) return <NotFound />

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}}/>
        </Grid>
        
        <Grid item xs={6}>
          <Typography variant="h3">{product.name}</Typography>
          <Divider sx={{mb: 2}}/>
          <Typography variant="h4"color='secondary'>{convertPriceToPounds(product.price)}</Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{product.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{product.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Brand</TableCell>
                  <TableCell>{product.brand}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quantity</TableCell>
                  <TableCell>{product.quantityInStock}</TableCell>
                </TableRow>
              </TableBody>
            </Table>     
          </TableContainer>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField variant="outlined" type='number' label='Quantity in cart' fullWidth value={quantity} onChange={handleInputChange}/>
            </Grid>
            <Grid item xs={6}>
              <LoadingButton 
                disabled={((!item && quantity === 0) || (item && quantity === item.quantity)) ? true : false} 
                loading={status.includes('pending')} 
                fullWidth 
                sx={{height: '100%'}} 
                variant="contained" 
                size='large' 
                color='primary' 
                onClick={handleUpdateCart}
              >
                {item ? 'Update Quantity' : 'Add to Cart'}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </>
  );
};
