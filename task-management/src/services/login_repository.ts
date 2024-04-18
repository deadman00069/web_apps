import { ResponseModel } from "../models/ResponseModel";
import { UserModel } from "../models/UserModel";
import { LoginFormValue } from "../presentation/screens/login/LoginScreen";
import axiosInstance from "./api_service";

export async function loginRepository(
  data: LoginFormValue
): Promise<ResponseModel<UserModel | null>> {
  try {
    const url: string = "auth/login";
    const response = await axiosInstance.post(url, data);
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
