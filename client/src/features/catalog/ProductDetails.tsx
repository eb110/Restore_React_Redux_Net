import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/types";
import { convertPriceToPounds } from "../../utils/utils";
import agent from "../../api/agent";
import { NotFound } from "../../app/errors/NotFound";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";

export const ProductDetails = (): React.ReactNode => {
  const basket = useStoreContext()!.basket;
  const setBasket = useStoreContext()!.setBasket;
  const removeItem = useStoreContext()!.removeItem;

  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [quantity, setQuantity] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const item = basket?.items.find(item => item.productId === product?.id);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    if(+event.target.value >= 0)
      setQuantity(+event.target.value);
  }

  const handleUpdateCart = (): void => {
    setSubmitting(true);
    if(!item || quantity > item.quantity) {
      void agent.Basket.addItem(product!.id, !item ? quantity : quantity - item.quantity)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setSubmitting(false))
    }
    else{
      void agent.Basket.removeItem(product!.id, item.quantity - quantity)
      .then(() => removeItem(product!.id, item.quantity - quantity))
      .catch(error => console.log(error))
      .finally(() => setSubmitting(false))
    }

  }

  useEffect(() => {
    if(item)
    setQuantity(item.quantity);

    void agent.Catalog.details(+id!)
    .then(product => setProduct(product))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }, [id, item]);

  if (loading) return <LoadingComponent message="Loading Item..."/>;

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
              <LoadingButton disabled={((!item && quantity === 0) || (item && quantity === item.quantity)) ? true : false} loading={submitting} fullWidth sx={{height: '100%'}} variant="contained" size='large' color='primary' onClick={handleUpdateCart}>
                {item ? 'Update Quantity' : 'Add to Cart'}
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </>
  );
};
