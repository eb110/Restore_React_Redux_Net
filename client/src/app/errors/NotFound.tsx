import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFound = (): React.ReactNode => {
  return (
    <>
      <Container component={Paper} sx={{ height: 180 }}>
        <Typography gutterBottom variant="h3">Not Found 404</Typography>
        <Divider />
        <Button fullWidth component={Link} to='/catalog'>Home</Button>
      </Container>
    </>
  );
};
