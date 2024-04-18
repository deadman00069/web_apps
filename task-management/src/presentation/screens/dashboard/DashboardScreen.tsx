import { Box, Container, Typography } from "@mui/material";
import CustomDashBoardInfoCard from "../../components/custom_dashboard_info_card/CustomDashBoardInfoCard";
import { useEffect, useState } from "react";
import CustomTabBar from "../../components/custom_tab_bar/CustomTabBar";
import CustomTabPannel from "../../components/custom_tab_bar/CustomTabPannel";
import CustomDialog from "../../components/custom_dialog/CustomDialog";
import { taskHistoryRepository } from "../../../services/get_task_history_repository";
import { TaskHistoryModel } from "../../../models/TaskHistoryModel";
import { timeout } from "../../../utils/Utils";
import CustomTabPanelChild from "../../components/custom_tab_panel_child/CustomTabPanelChild";
import { taskListRepository } from "../../../services/get_task_list_repository";
import { TaskModel } from "../../../models/TaskModel";
import { Priority, Status } from "../../../consts/enums";
import MyAppElevatedButton from "../../components/my_app_elevated_button/MyAppElevatedButton";
import AppConfig from "../../../config/AppConfig";

function DashboardScreen() {
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [tabIndex, settabIndex] = useState(0);
  const [taskHistory, settaskHistory] = useState<TaskHistoryModel | null>();
  const [taskListLoading, settaskListLoading] = useState(false);
  const [listOfTasks, setlistOfTasks] = useState<Array<TaskModel>>([]);
  const [taskStatus, settaskStatus] = useState(Status.Ongoing);
  const [sortedTasks, setSortedTasks] = useState<Array<TaskModel>>([]); // Initial state is unsorted

  // Function to handle sorting by due date
  function sortByDueDate() {
    const sorted = [...sortedTasks].sort(
      (a, b) => Date.parse(b.due_date) - Date.parse(a.due_date)
    );
    setSortedTasks(sorted);
  }

  function reset() {
    setSortedTasks(listOfTasks);
  }
  const sortByPriority = (priority: Priority) => {
    let filteredTasks;

    switch (priority) {
      case Priority.Low:
        filteredTasks = listOfTasks.filter((task) => task.priority === 0);

        break;
      case Priority.Medium:
        filteredTasks = listOfTasks.filter((task) => task.priority === 1);
        break;
      case Priority.High:
        filteredTasks = listOfTasks.filter((task) => task.priority === 2);
        break;
      default:
        // Handle unexpected priority values
        console.error("Invalid priority value:", priority);
        return;
    }
    setSortedTasks(filteredTasks);
  };

  const getTaskHistory = async () => {
    try {
      await timeout(AppConfig().apiDelay);
      var resp = await taskHistoryRepository();
      if (resp.status) {
        settaskHistory(resp.data);
      }
    } catch (e) {}
  };

  const getTaskList = async () => {
    try {
      settaskListLoading(true);
      setlistOfTasks([]);
      setSortedTasks([]);
      await timeout(AppConfig().apiDelay);
      var resp = await taskListRepository(taskStatus);
      console.log("resp.status");
      console.log(resp);
      if (resp.status) {
        setlistOfTasks(resp.data!);
        setSortedTasks(resp.data!);
      }
    } catch (e) {
      console.log(e);
    } finally {
      settaskListLoading(false);
    }
  };

  const handleFilter = (index: number) => {
    switch (index) {
      case 0: {
        sortByDueDate();
        break;
      }
      case 1: {
        reset();
        break;
      }
      case 2: {
        sortByPriority(Priority.High);
        break;
      }
      case 3: {
        sortByPriority(Priority.Medium);
        break;
      }
      case 4: {
        sortByPriority(Priority.Low);
        break;
      }
      case 5: {
        reset();
        break;
      }
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    settabIndex(newValue);

    switch (newValue) {
      case 0: {
        settaskStatus(Status.Ongoing);
        break;
      }

      case 1: {
        settaskStatus(Status.InProgress);
        break;
      }
      case 2: {
        settaskStatus(Status.Completed);
        break;
      }
      default: {
        settaskStatus(Status.Ongoing);
        break;
      }
    }
  };

  //
  useEffect(() => {
    getTaskHistory();
  }, []);

  //
  useEffect(() => {
    getTaskList();
  }, [tabIndex]);

  return (
    <Container>
      {/* Welcome section */}
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{ pt: "1.5rem", pb: "2.5rem" }}
      >
        Hi, Welcome back 👋
      </Typography>

      {/* Cards with total tasks */}
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={{ xs: "2rem", md: "0" }}
      >
        <CustomDashBoardInfoCard
          title="Total Tasks"
          total={taskHistory?.total_task ?? "0"}
        />
        <CustomDashBoardInfoCard
          title="Ongoing Tasks"
          total={taskHistory?.ongoging_task ?? "0"}
        />
        <CustomDashBoardInfoCard
          title="Pending Tasks"
          total={taskHistory?.pending_task ?? "0"}
        />
        <CustomDashBoardInfoCard
          title="Completed Tasks"
          total={taskHistory?.completed_task ?? "0"}
        />
      </Box>

      {/* My task section */}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        sx={{ pt: "4rem", pb: "2.5rem" }}
      >
        <Typography variant="h5" fontWeight={600}>
          My Tasks
        </Typography>
        <MyAppElevatedButton
          label="Add Task"
          px="0px"
          py="0px"
          borderRadius={10}
          onClick={() => setisDialogOpen(true)}
        />
      </Box>

      {/* Task tab to select task status */}
      <CustomTabBar
        currentIndex={tabIndex}
        handleTabChange={handleTabChange}
        onMenuClick={(i) => handleFilter(i)}
      />

      {/* Tab child */}
      <CustomTabPannel
        children={
          <CustomTabPanelChild list={sortedTasks} loading={taskListLoading} />
        }
        index={tabIndex}
        value={0}
      />

      <CustomTabPannel
        children={
          <CustomTabPanelChild list={sortedTasks} loading={taskListLoading} />
        }
        index={tabIndex}
        value={1}
      />

      <CustomTabPannel
        children={
          <CustomTabPanelChild list={sortedTasks} loading={taskListLoading} />
        }
        index={tabIndex}
        value={2}
      />

      {/* Create Task Dialog */}
      <CustomDialog
        isOpen={isDialogOpen}
        onClosePressed={() => setisDialogOpen(false)}
      />
    </Container>
  );
}

export default DashboardScreen;
