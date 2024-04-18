import { Box, CircularProgress, Grid } from "@mui/material";
import CustomTaskDetailsCard from "../custom_task_details_card/CustomTaskDetailsCard";
import { TaskModel } from "../../../models/TaskModel";

function CustomTabPanelChild({
  list,
  loading = false,
}: {
  list?: Array<TaskModel>;
  loading?: boolean;
}) {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      {loading ? (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"50vh"}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {list!.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CustomTaskDetailsCard task={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default CustomTabPanelChild;
