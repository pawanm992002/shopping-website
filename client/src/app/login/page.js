"use client";
import {
  Button,
  Avatar,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  Tabs,
  Tab,
  Stack,
} from "@mui/material";
import Link from "next/link";

import { LockOutlined } from "@mui/icons-material";
import { useContext, useState } from "react";
import axios from "axios";
import MyToast from "@/components/MyToast";
import { useRouter } from "next/navigation";
import { UserConsumer } from "@/store/userContext";

export default function Login() {
  const { userData, setUserData } = UserConsumer();
  const router = useRouter();
  const [receiveEmail, setReceiveEmail] = useState(true);
  const [isCustomer, setIsCustomer] = useState(1);

  const [toast, showToast] = useState(false);
  const [response, setResponse] = useState({});

  const logIn = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const userData = {
      email: form.get("email"),
      password: form.get("password"),
      receiveEmail,
      receiveEmail: receiveEmail,
      isCustomer: Boolean(isCustomer),
    };

    const { data } = await axios.post("/api/user/login", userData);
    showToast(true);
    setResponse(data);
    if (data.status === true) {
      setUserData({ ...data.data, loggedIn: true });
      localStorage.setItem("_id", data.data._id);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("isCustomer", Boolean(isCustomer));
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <MyToast
        toast={toast}
        showToast={showToast}
        status={response.status}
        msg={response.msg}
      />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            LOG IN
          </Typography>
        </Stack>
        <Box component="form" onSubmit={logIn} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              item
              xs={12}
            >
              <Tabs
                value={isCustomer}
                onChange={(e, newValue) => setIsCustomer(newValue)}
              >
                <Tab label="As Shopkeeper" />
                <Tab label="As Customer" />
              </Tabs>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={receiveEmail}
                    onChange={() => setReceiveEmail(!receiveEmail)}
                    color="primary"
                  />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            // onClick={logIn}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "blue !important" }}
          >
            LOG IN
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item mb={5}>
              <Link href="/register" style={{ color: "blue" }}>
                Don't have Account ? Register yourself
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
