import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material"; // Importing necessary components from Material-UI library
import "./LoginScreen.css"; // Importing CSS styles for SignupScreen component
import signupImage from "../../../assets/sign_up_right.svg"; // Importing image asset for the right section
import MyAppTextField from "../../components/my_app_text_field/MyAppTextField"; // Importing custom text field component
import AlreadyHaveAccountSection from "../../components/AlreadyHaveAccountSection"; // Importing component for already have account section
import { useMyAppColor } from "../../theme/colors"; // Importing custom hook for app colors
import MyAppElevatedButton from "../../components/my_app_elevated_button/MyAppElevatedButton"; // Importing custom elevated button component
import { useForm } from "react-hook-form";
import { loginRepository } from "../../../services/login_repository";
import { toast } from "react-toastify";
import { timeout } from "../../../utils/Utils";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import AppConfig from "../../../config/AppConfig";

export interface LoginFormValue {
  email: string;
  password: string;
}

export function LoginScreen() {
  const myAppColors = useMyAppColor();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const form = useForm<LoginFormValue>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit, formState } = form;

  const { errors } = formState;

  const [loading, setloading] = useState(false);

  const onSubmit = async (data: LoginFormValue) => {
    console.log(data);
    setloading(true);
    await timeout(AppConfig().apiDelay); //for 1 sec delay
    try {
      var resp = await loginRepository(data);
      if (resp.status) {
        toast.success("Login success");
        navigate("/layout/dashboard");
        authContext?.setisAuthenticated(true);
      } else {
        toast.error(resp.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    // Container to wrap whole signup screen
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
        }}
      >
        {/* Left section with form data */}
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            marginLeft: {
              xs: 0,
              lg: "88px",
            },
            marginRight: {
              xs: 0,
              lg: "90px",
            },
            marginTop: "88px",
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            {/* Title */}
            <Typography
              variant="h4"
              fontWeight={"500"}
              color={myAppColors.onPrimaryColor}
            >
              Welcome to My Task Management
            </Typography>

            {/* Signup form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <MyAppTextField
                label="Email"
                name="email"
                control={control}
                error={errors.email}
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                }}
                sx={{ pt: "1.5rem", pb: "1.5rem" }}
              />

              {/* Password */}
              <MyAppTextField
                label="Password"
                name="password"
                control={control}
                error={errors.password}
                rules={{
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Please enter a minimum of 6 characters",
                  },
                }}
                sx={{ pb: "2rem" }}
              />

              {/* Button   */}
              <Box
                display={"flex"}
                justifyContent={{
                  xs: "center",
                  lg: "left",
                }}
              >
                <MyAppElevatedButton label="Sign in" />
              </Box>
            </form>

            {/* Already have account section */}
            <Box
              display={"flex"}
              justifyContent={{
                xs: "center",
                lg: "left",
              }}
            >
              <AlreadyHaveAccountSection isSignup={true} />
            </Box>
          </Box>
        </Container>

        {/* Right section with Image */}
        <Box
          display={{
            xs: "none",
            lg: "inline",
          }}
        >
          <img src={signupImage} alt="Signup" />
        </Box>
      </Box>
    </>
  );
}
