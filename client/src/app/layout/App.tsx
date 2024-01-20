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
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../../utils/utils";
import agent from "../../api/agent";
import { LoadingComponent } from "./LoadingComponent";

function App(): React.ReactNode {
  const setBasket = useStoreContext()?.setBasket;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');

    //fetch basket only if cookie exist
    //as this proves the existendce of basket itself
    if(buyerId){
      void agent.Basket.basket()
      .then(basket => setBasket!(basket))
      .catch(error => console.log(error))
    }
    setLoading(false)
  }, [setBasket])


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
