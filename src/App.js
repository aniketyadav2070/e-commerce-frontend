import React, { useContext, useEffect } from "react";
import { ThemeProvider, adaptV4Theme } from "@mui/material/styles";
import { createBrowserHistory } from "history";
import SettingsContext from "src/context/SettingsContext";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import AppRouter from "./AppRouter";
import { createTheme } from "src/theme";
import { Toaster } from "react-hot-toast";

const history = createBrowserHistory();

export default function App() {
  const themeSeeting = useContext(SettingsContext);
  const theme = createTheme(
    adaptV4Theme({
      theme: themeSeeting.settings.theme,
    })
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <Toaster position="top-right" />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};
