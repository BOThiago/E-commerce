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
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

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

const craeteUserSchema = z.object({
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
  password: z.string().min(6, "A senha precisa ser maior que 6 caracteres"),
});

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(craeteUserSchema),
  });
  const [apiError, setApiError] = useState("");
  async function createUser(data: any) {
    try {
      const response = await axios.post("http://localhost:5500/signin", data);
      Cookies.set("token", response.data.token, { expires: 1 }); //expira em um dia o cookie
      router.push("/");
    } catch (error) {
      setApiError("Email ou Senha incorretos");
    }
  }
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(createUser)}
            noValidate
            sx={{ width: "inherit" }}
          >
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              margin="normal"
              fullWidth
              required
              autoFocus
              {...register("email")}
            />
            {errors.email && (
              <FormHelperText error>
                {errors.email.message as React.ReactNode}
              </FormHelperText>
            )}
            <TextField
              variant="outlined"
              label="Senha"
              type="password"
              margin="normal"
              fullWidth
              required
              {...register("password")}
            />
            {errors.password && (
              <FormHelperText error>
                {errors.password.message as React.ReactNode}
              </FormHelperText>
            )}
            <FormHelperText error>{apiError}</FormHelperText>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
