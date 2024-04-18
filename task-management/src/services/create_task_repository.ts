import { ResponseModel } from "../models/ResponseModel";
import { CreateTaskFormData } from "../presentation/components/custom_dialog/CustomDialog";
import axiosInstance from "./api_service";

export async function createTaskRepository(
  data: CreateTaskFormData
): Promise<ResponseModel<null>> {
  try {
    const url: string = "task/create";
    const response = await axiosInstance.post(url, data);
    return response.data as ResponseModel<null>;
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
