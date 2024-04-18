import { ResponseModel } from "../models/ResponseModel";
import { UserModel } from "../models/UserModel";
import { SignupFormValues } from "../presentation/screens/signup/SignupScreen";
import axiosInstance from "./api_service";

export async function signupRepository(
  data: SignupFormValues
): Promise<ResponseModel<UserModel | null>> {
  try {
    const url: string = "auth/signup";
    const response = await axiosInstance.post(url, {
      email: data.email,
      user_name: data.userName,
      password: data.password,
      confirm_password: data.confirmPassword,
    });
    return response.data as ResponseModel<UserModel>;
  } catch (error: any) {
    if (error.response) {
      if (error.response.data["message"]) {
        const errorResponse: ResponseModel<null> = {
          status: false,
          message: error.response.data["message"],
          data: null,
        };
        return errorResponse;
      } else {
        throw new Error("An error occurred during login.");
      }
    } else {
      throw new Error("An error occurred during login.");
    }
  }
}
