import {
  Box,
  Card,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import CustomTextCard from "../CustomTextCard";
import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useMyAppColor } from "../../theme/colors";
import { TaskModel } from "../../../models/TaskModel";

function CustomTaskDetailsCard({ task }: { task: TaskModel }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const appColor = useMyAppColor();
  const [priority, setPriority] = useState<string>("Low"); // Initialize priority state
  const [priorityColor, setPriorityColor] = useState({
    backgroundColor: appColor.colorE1F2FC,
  }); // Initialize priority state

  useEffect(() => {
    setPriority(getPriorityLabel(task.priority)); // Set priority label based on task priority
    setPriorityColor(getPriorityColor(task.priority));
  }, [task.priority]); // Re-run effect when task priority changes

  // Function to get priority label based on priority value
  const getPriorityLabel = (p: number): string => {
    switch (p) {
      case 0:
        return "Low";
      case 1:
        return "Medium";
      case 2:
        return "High";
      default:
        return "Low";
    }
  };

  const getPriorityColor = (p: number): { backgroundColor: string } => {
    switch (p) {
      case 0:
        return {
          backgroundColor: appColor.color0052CC,
        };
      case 1:
        return {
          backgroundColor: appColor.colorFF991F,
        };
      case 2:
        return {
          backgroundColor: appColor.colorDE350B,
        };
      default:
        return {
          backgroundColor: appColor.colorE1F2FC,
        };
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        px: "17px",
        pt: "15px",
        pb: "21px",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box display={"flex"}>
          <CustomTextCard
            bgColor={task.projectColor}
            text={task.project}
            sx={{ pr: "8px" }}
          />
          <CustomTextCard
            bgColor={priorityColor.backgroundColor}
            text={priority}
          />{" "}
          {/* Display priority */}
        </Box>
        <IconButton
          aria-label="menu"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem>Delete</MenuItem>
        </Menu>
      </Box>
      <Typography variant="body1" fontWeight={600} pt={"21px"}>
        {task.title}
      </Typography>
      <Typography variant="body2" fontWeight={500} pt={"7px"} color={"#768396"}>
        {task.description}
      </Typography>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography variant="body2" fontWeight={500} pt={"1rem"}>
          Progress
        </Typography>
        <Typography variant="body2" fontWeight={600} pt={"1rem"}>
          {task.progress}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={task.progress}
        sx={{ borderRadius: "10px", height: "10px", mt: "8px" }}
      />
      <CustomTextCard
        bgColor={appColor.colorE8E7E7}
        text={task.due_date}
        textColor="black"
        sx={{ pt: "1rem" }}
      />
    </Card>
  );
}

export default CustomTaskDetailsCard;
