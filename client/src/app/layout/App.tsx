import { useState } from "react";
import { Catalog } from "../../features/catalog/Catalog";
import { Header } from "./Header";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

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
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
