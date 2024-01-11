import {
  AppBar,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";

interface HeaderProps {
  handleDarkMode: () => void;
  switchState: boolean;
}

export const Header = ({ handleDarkMode, switchState }: HeaderProps): React.ReactNode => {
  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6">Re-Store</Typography>
          <Switch checked={switchState} onChange={handleDarkMode} />
        </Toolbar>
      </AppBar>
    </>
  );
};
