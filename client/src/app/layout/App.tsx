import { useEffect, useState } from "react";
import { Header } from "./Header";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { getCookie } from "../../utils/utils";
import agent from "../../api/agent";
import { LoadingComponent } from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App(): React.ReactNode {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');

    //fetch basket only if cookie exist
    //as this proves the existence of basket itself
    if(buyerId){
      void agent.Basket.basket()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
    }
    setLoading(false)
  }, [dispatch])


  const [darkMode, setDarkMode] = useState<boolean>(false);

  const handleDarkMode = (): void => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#eaeaea",
      },
    },
  });

  if (loading) return <LoadingComponent message="initialising app..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header handleDarkMode={handleDarkMode} switchState={darkMode} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
