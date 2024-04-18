import { Status } from "../consts/enums";
import { ResponseModel } from "../models/ResponseModel";
import { TaskModel } from "../models/TaskModel";
import axiosInstance from "./api_service";

export async function taskListRepository(
  status: Status
): Promise<ResponseModel<Array<TaskModel> | null>> {
  try {
    console.log("sdfsdffsd");
    let url: string;
    switch (status) {
      case Status.Ongoing: {
        url = "task?status=ongoing";
        break;
      }
      case Status.InProgress: {
        url = "task?status=in_progress";
        break;
      }
      case Status.Completed: {
        url = "task?status=completed";
        break;
      }
      default: {
        url = "task?status=ongoing";

        break;
      }
    }
    const response = await axiosInstance.get(url);
    console.log("response");
    console.log(response);
    const l = { ...response.data, data: response.data["data"]["tasks"] };
    console.log("fwr3242342342");
    console.log(l);
    return l;
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
