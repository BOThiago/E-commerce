import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  FormHelperText,
  Grid,
  Link,
  CssBaseline,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const Theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#673ab7",
    },
    secondary: {
      main: "#aa00ff",
    },
  },
});

const Dashboard = () => {
  return (
    <ThemeProvider theme={Theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            DASHBOARD
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
