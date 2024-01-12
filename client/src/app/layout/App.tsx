import { useState } from "react";
import { Catalog } from "../../features/catalog/Catalog";
import { Header } from "./Header";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Outlet } from "react-router-dom";

function App(): React.ReactNode {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header handleDarkMode={handleDarkMode} switchState={darkMode} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
