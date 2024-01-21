import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { RoutePaths } from "../models/types";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { useAppSelector } from "../store/configureStore";

const midLinks: RoutePaths = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks: RoutePaths = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  typography: "h6",
  "&:hover": { color: "grey.500" },
  "&.active": { color: "text.secondary" },
  textDecoration: "none",
};

interface HeaderProps {
  handleDarkMode: () => void;
  switchState: boolean;
}

export const Header = ({handleDarkMode, switchState,}: HeaderProps): React.ReactNode => {
  const basket = useAppSelector(state => state.basket.basket);
  const itemCount = basket ? basket.items.reduce((sum, item) => sum += item.quantity, 0) : 0;
   
  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center">
            <Typography
              variant="h6"
              component={NavLink}
              to="/"
              color="inherit"
              sx={navStyles}
            >
              RE-STORE
            </Typography>
            <Switch checked={switchState} onChange={handleDarkMode} />
          </Box>

          <Box>
            <List sx={{ display: "flex" }}>
              {midLinks.map((link) => (
                <ListItem
                  key={link.title}
                  component={NavLink}
                  to={link.path}
                  sx={navStyles}
                >
                  {link.title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          </Box>

          <Box display="flex">
            <IconButton
              component={Link}
              to="/basket"
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <List sx={{ display: "flex" }}>
              {rightLinks.map((link) => (
                <ListItem
                  key={link.title}
                  component={NavLink}
                  to={link.path}
                  sx={navStyles}
                >
                  {link.title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
