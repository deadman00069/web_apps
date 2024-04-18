import { ResponseModel } from "../models/ResponseModel";
import { TaskHistoryModel } from "../models/TaskHistoryModel";
import axiosInstance from "./api_service";

export async function taskHistoryRepository(): Promise<
  ResponseModel<TaskHistoryModel | null>
> {
  try {
    const url: string = "task/history";
    const response = await axiosInstance.get(url);
    return response.data as ResponseModel<TaskHistoryModel>;
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
