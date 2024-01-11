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
import { Product } from "../../app/models/types";
import { convertPriceToPounds } from "../../utils/utils";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps): React.ReactNode => {
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
          <Button size="small">Add to cart</Button>
          <Button size="small">View</Button>
        </CardActions>
      </Card>
    </>
  );
};
