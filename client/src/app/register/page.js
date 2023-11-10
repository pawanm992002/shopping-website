"use client";
import {
  Avatar,
  Button,
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
import { Country, State, City } from "country-state-city";
import Link from "@mui/material/Link";
import { LockOutlined } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import MyToast from "@/components/MyToast";
import { useRouter, useSearchParams } from "next/navigation";
import { UserConsumer } from "@/store/userContext";

export default function Register() {
  const ctx = UserConsumer();
  const router = useRouter();
  const searchParams = useSearchParams();
  let isEditable = searchParams.get("isEdit") === "true";

  const [userData, setUserData] = useState({
    firstName: "",
    email: "",
    lastName: "",
    mobileNo: "",
    password: "",
    confirmPassword: "",
  });
  let [isCustomer, setIsCustomer] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedState, setSelectedState] = useState({});
  const [selectedCity, setSelectedCity] = useState({});
  let [receiveEmail, setReceiveEmail] = useState(true);

  const handleChange = (e) => {
    setUserData((userData) => ({
      ...userData,
      [e.target.name]: e.target.value,
    }));
  };

  const [toast, showToast] = useState(false);
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (isEditable) {
      if (ctx.userData.loggedIn) {
        setUserData({
          firstName: ctx.userData.firstName,
          lastName: ctx.userData.lastName,
          email: ctx.userData.email,
          mobileNo: ctx.userData.mobileNo,
        });
        setIsCustomer(ctx.userData.isCustomer);
        setSelectedCountry(ctx.userData.country);
        setSelectedState(ctx.userData.state);
        setSelectedCity(ctx.userData.city);
        setReceiveEmail(ctx.userData.receiveEmail);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const registerdData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      mobileNo: userData.mobileNo,
      password: userData.password,
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
      isCustomer: Boolean(isCustomer),
      receiveEmail: receiveEmail,
    };
    if (userData.password !== userData.confirmPassword) {
      setResponse({
        status: false,
        msg: "password and confirm password is different",
      });
      showToast(true);
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/user/register",
        registerdData,
        {
          withCredentials: true,
        }
      );
      setResponse(data);
      showToast(true);
      // delete registerdData.password;
      // ctx.setUserData({ ...registerdData, loggedIn: true });
      router.replace("/login");
    } catch (err) {
      setResponse({
        status: false,
        msg: err.message,
      });
      showToast(true);
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
          marginTop: 8,
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
            Register
          </Typography>
        </Stack>
        <Box
          component="form"
          method="POST"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            {!ctx.userData.loggedIn && (
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
            )}
            <Grid item xs={6} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required={true}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
                value={userData.firstName}
              ></TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="last name"
                onChange={handleChange}
                value={userData.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                value={userData.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                required
                fullWidth
                id="mobileNo"
                label="mobile Number"
                name="mobileNo"
                autoComplete="mobileNo"
                onChange={handleChange}
                value={userData.mobileNo}
              />
            </Grid>
            {!ctx.userData.loggedIn && (
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={userData.password}
                  onChange={handleChange}
                />
              </Grid>
            )}
            {!ctx.userData.loggedIn && (
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <select
                style={{
                  width: "100%",
                  border: "2px solid black",
                  padding: "12px 15px",
                  borderRadius: "5px",
                }}
                onChange={(e) => setSelectedCountry(JSON.parse(e.target.value))}
                name="country"
              >
                {ctx.userData.loggedIn && isEditable ? (
                  <option value={JSON.stringify({ selectedCountry })}>
                    {selectedCountry.name +
                      "  ( " +
                      "+" +
                      selectedCountry.code +
                      " )"}
                  </option>
                ) : (
                  <option value={JSON.stringify({})}>Select Country</option>
                )}
                {Country.getAllCountries().map((val) => (
                  <option
                    value={JSON.stringify({
                      name: val.name,
                      code: val.isoCode,
                    })}
                    key={val.isoCode}
                  >
                    {val.name + "  ( " + "+" + val.isoCode + " )"}
                  </option>
                ))}
              </select>
            </Grid>
            <Grid item xs={12}>
              <select
                name="state"
                style={{
                  width: "100%",
                  border: "2px solid black",
                  padding: "12px 15px",
                  borderRadius: "5px",
                }}
                onChange={(e) => setSelectedState(JSON.parse(e.target.value))}
              >
                {ctx.userData.loggedIn && isEditable ? (
                  <option value={JSON.stringify(selectedState)}>
                    {selectedState.name +
                      "  ( " +
                      "+" +
                      selectedState.isoCode +
                      " )"}
                  </option>
                ) : (
                  <option value={JSON.stringify({})}>Select State</option>
                )}

                {State.getStatesOfCountry(selectedCountry.code).map((val) => (
                  <option
                    value={JSON.stringify({
                      name: val.name,
                      code: val.isoCode,
                    })}
                    key={val.isoCode}
                  >
                    {val.name + "  ( " + "+" + val.isoCode + " )"}
                  </option>
                ))}
              </select>
            </Grid>
            <Grid item xs={12}>
              <select
                name="city"
                style={{
                  width: "100%",
                  border: "2px solid black",
                  padding: "12px 15px",
                  borderRadius: "5px",
                }}
                onChange={(e) => setSelectedCity(JSON.parse(e.target.value))}
              >
                {ctx.userData.loggedIn && isEditable ? (
                  <option value={JSON.stringify(selectedCity)}>
                    {selectedCity.name}
                  </option>
                ) : (
                  <option value={JSON.stringify({})}>Select City</option>
                )}
                {City.getCitiesOfState(
                  selectedCountry.code,
                  selectedState.code
                ).map((val) => (
                  <option
                    value={JSON.stringify({
                      name: val.name,
                    })}
                    key={val.name}
                  >
                    {val.name}
                  </option>
                ))}
              </select>
            </Grid>
            {ctx.userData.loggedIn && isEditable && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="receiveEmail"
                      checked={receiveEmail}
                      onChange={(e) => setReceiveEmail(!receiveEmail)}
                      color="primary"
                    />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "blue !important" }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" style={{ color: "blue" }}>
                Already have an account? LOG IN
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
