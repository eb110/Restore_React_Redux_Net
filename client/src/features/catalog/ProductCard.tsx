/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { LoadingButton } from "@mui/lab";
import { Product } from "../../app/models/types";
import { convertPriceToPounds } from "../../utils/utils";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps): React.ReactNode => {
  const status = useAppSelector((state) => state.basket.status);
  const dispatch = useAppDispatch();

  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ backgroundColor: "secondary.main" }}>
              {product.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={product.name}
          titleTypographyProps={{
            sx: { fontWeight: "bold", color: "primary.main" },
          }}
        />
        <CardMedia
          sx={{
            height: 140,
            backgroundSize: "contain",
            backgroundColor: "grey.300",
          }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" color="secondary">
            {convertPriceToPounds(product.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.brand}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton loading={status === `pendingAddItem ${product.id}`} size="small" onClick={(): void => void dispatch(addBasketItemAsync({productId: product.id}))}>
            Add to cart
          </LoadingButton>
          <Button size="small" component={Link} to={`/catalog/${product.id}`}>
            View
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
