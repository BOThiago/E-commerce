import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Grid,
  Link,
  CssBaseline,
  FormHelperText,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

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
  name: z
    .string()
    .nonempty("O Nome é obrigatório")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
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
      await axios.post("http://localhost:5500/signup", data);
      router.push("/login");
    } catch (error) {
      setApiError(
        "Ocorreu um erro ao criar a conta. Tente novamente mais tarde"
      );
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
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(createUser)}
            noValidate
            sx={{ width: "inherit" }}
          >
            <TextField
              variant="outlined"
              label="Name"
              type="text"
              margin="normal"
              fullWidth
              required
              autoFocus
              {...register("name")}
            />
            {errors.name && (
              <FormHelperText error>
                {errors.name.message as React.ReactNode}
              </FormHelperText>
            )}
            <TextField
              variant="outlined"
              label="Email"
              type="mail"
              margin="normal"
              fullWidth
              required
              {...register("email")}
            />
            {errors.email && (
              <FormHelperText error>
                {errors.email.message as React.ReactNode}
              </FormHelperText>
            )}
            <TextField
              variant="outlined"
              label="Password"
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
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"have an account? Sign in"}
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
