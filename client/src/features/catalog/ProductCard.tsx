import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { Product } from "../../app/models/types";
import { convertPriceToPounds } from "../../utils/utils";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../api/agent";
import { useStoreContext } from "../../app/context/StoreContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps): React.ReactNode => {

  const [loading, setLoading] = useState<boolean>(false);
  const setBasket = useStoreContext()!.setBasket;

  const handleAddItem = (): void => {
    setLoading(true);
    void agent.Basket.addItem(product.id)
    .then(basket => setBasket(basket))
    .catch(error => console.log(error))
    .finally(() => setLoading(false));
  }

  return (
    <>
      <Card>
        <CardHeader
          avatar={<Avatar sx={{backgroundColor: 'secondary.main'}}>{product.name.charAt(0).toUpperCase()}</Avatar>}
          title={product.name}
          titleTypographyProps={{
            sx: {fontWeight: 'bold', color: 'primary.main'}
          }}
        />
        <CardMedia
          sx={{ height: 140, backgroundSize: 'contain', backgroundColor: 'grey.300' }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" color='secondary'>
            {convertPriceToPounds(product.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.brand}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton loading={loading} size="small" onClick={handleAddItem}>Add to cart</LoadingButton>
          <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
        </CardActions>
      </Card>
    </>
  );
};
