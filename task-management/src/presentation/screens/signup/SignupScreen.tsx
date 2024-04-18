import {
  Backdrop,
  Box,
  Checkbox,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material"; // Importing necessary components from Material-UI library
import "./SignupScreen.css"; // Importing CSS styles for SignupScreen component
import signupImage from "../../../assets/sign_up_right.svg"; // Importing image asset for the right section
import MyAppTextField from "../../components/my_app_text_field/MyAppTextField"; // Importing custom text field component
import AlreadyHaveAccountSection from "../../components/AlreadyHaveAccountSection"; // Importing component for already have account section
import { useMyAppColor } from "../../theme/colors"; // Importing custom hook for app colors
import MyAppElevatedButton from "../../components/my_app_elevated_button/MyAppElevatedButton"; // Importing custom elevated button component
import { useForm } from "react-hook-form";
import { timeout } from "../../../utils/Utils";
import { signupRepository } from "../../../services/signup_repository";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AppConfig from "../../../config/AppConfig";

export interface SignupFormValues {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

function SignupScreen() {
  const myAppColors = useMyAppColor(); // Using custom hook to get app colors
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  const form = useForm<SignupFormValues>({
    defaultValues: {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { control, handleSubmit, formState, watch, setError } = form;

  const { errors } = formState;
  const onSubmit = async (data: SignupFormValues) => {
    setloading(true);
    await timeout(AppConfig().apiDelay);
    try {
      var resp = await signupRepository(data);
      if (resp.status) {
        toast.success("Signup success");
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
  const password = watch("password"); // Get the value of the "password" field

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
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
              Welcome to My Task Management.
            </Typography>

            {/* Already have account section */}
            <AlreadyHaveAccountSection />

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
                sx={{ pt: "1.5rem", pb: "1rem" }}
              />

              {/* Username */}
              <MyAppTextField
                label="Username"
                name="userName"
                control={control}
                error={errors.userName}
                rules={{
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Please enter a minimum of 6 characters",
                  },
                }}
                sx={{ pt: "1.5rem", pb: "1rem" }}
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
                sx={{ pt: "1.5rem", pb: "1rem" }}
              />

              {/* Confirm Password */}
              <MyAppTextField
                label="Confirm password"
                name="confirmPassword"
                control={control}
                error={errors.confirmPassword}
                rules={{
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Please enter a minimum of 6 characters",
                  },
                  validate: (value: string) =>
                    value === password || "Passwords do not match",
                }}
                sx={{ pt: "1.5rem", pb: "1rem" }}
              />

              {/* checkbox */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                }}
                className="check-box-with-desc bottom-spacing"
              >
                <Checkbox defaultChecked sx={{ p: 0, pr: 1 }} />
                <Typography variant="body1" color={myAppColors.onPrimaryColor}>
                  I want to receive emails about the product, feature updates,
                  events, and
                  <br /> marketing promotions.
                </Typography>
              </Box>

              {/* Legal info */}
              <Typography
                sx={{
                  pb: "32px",
                }}
                variant="body1"
                color={myAppColors.onPrimaryColor}
              >
                By creating an account, you agree to the Terms of use and
                Privacy Policy.
              </Typography>

              {/* Button   */}
              <Box
                display={"flex"}
                justifyContent={{
                  xs: "center",
                  lg: "left",
                }}
              >
                <MyAppElevatedButton label="Create an account" />
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
              <AlreadyHaveAccountSection />
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

export default SignupScreen;
