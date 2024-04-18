import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import MyAppTextField from "../my_app_text_field/MyAppTextField";
import { Close } from "@mui/icons-material";
import PrioritySection from "./PrioritySection";
import DueDateSection from "./DueDateSection";
import StatusSection from "./StatusSection";
import { useForm } from "react-hook-form";
import { createTaskRepository } from "../../../services/create_task_repository";
import { toast } from "react-toastify";

export interface CreateTaskFormData {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  status: string;
}

function CustomDialog({
  onClosePressed,
  isOpen,
}: {
  onClosePressed: () => void;
  isOpen: boolean;
}) {
  const form = useForm<CreateTaskFormData>({
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      dueDate: "",
      status: "",
    },
  });
  const { control, handleSubmit, reset, formState } = form;

  const { errors } = formState;

  const onSubmit = async (data: CreateTaskFormData) => {
    console.log(data);
    try {
      const resp = await createTaskRepository(data);
      if (resp.status) {
        toast.success(resp.message);
        reset();
      } else {
        toast.error(resp.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Dialog fullWidth={true} open={isOpen}>
      <DialogTitle>
        {/* Title with close button */}
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          Create Task
          <IconButton onClick={onClosePressed}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box>
            {/* Title label */}
            <MyAppTextField
              label="Title"
              name="title"
              control={control}
              error={errors.title}
              rules={{
                required: "This field is required",
              }}
              inputProps={{ style: { padding: "8px" } }}
              sx={{ pb: "1.5rem" }}
            />

            {/* Description label */}
            <MyAppTextField
              label="Description"
              name="description"
              control={control}
              error={errors.description}
              rules={{
                required: "This field is required",
              }}
              inputProps={{ style: { padding: "0px" } }}
              isMultiLine={true}
              sx={{ pb: "1.5rem" }}
            />

            {/* Priority section */}
            <PrioritySection
              name="priority"
              control={control}
              error={errors.priority}
              rules={{
                required: "This field is required",
              }}
            />

            {/* Due date section */}

            <DueDateSection
              name="dueDate"
              control={control}
              error={errors.dueDate}
              rules={{
                required: "This field is required",
              }}
            />

            {/* Status section */}
            <StatusSection
              name="status"
              control={control}
              error={errors.status}
              rules={{
                required: "This field is required",
              }}
            />

            {/* ACTION buttons */}
            <Box display={"flex"} justifyContent={"end"}>
              <Button onClick={onClosePressed}>Cancel</Button>
              <Button type="submit">Create</Button>
            </Box>
          </Box>
        </DialogContent>
        {/* <DialogActions>
          
        </DialogActions> */}
      </form>
    </Dialog>
  );
}

export default CustomDialog;
