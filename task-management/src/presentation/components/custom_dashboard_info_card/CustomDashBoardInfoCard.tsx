import { Box, Card, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useMyAppColor } from "../../theme/colors";

function CustomDashBoardInfoCard({
  title,
  total,
}: {
  title: string;
  total: string;
}) {
  const appColors = useMyAppColor();

  return (
    <Card
      sx={{
        px: "1.5rem",
        py: "2.5rem",
        display: "flex",
        alignItems: "center",
        borderRadius: "12px",
        flexGrow: 1,
        mr: 2,
        flexBasis: 0,
        mb: { xs: 2, md: "0" },
        width: "100%",
        height: "4rem",
      }}
    >
      <AssignmentIcon
        sx={{
          fontSize: "64px",
          color: appColors.onSecondaryColor,
        }}
      />

      <Box display={"flex"} flexDirection={"column"} pl={"2.5rem"}>
        <Typography variant="h5" fontWeight={600}>
          {total}
        </Typography>
        <Typography
          variant="subtitle2"
          pt={"4px"}
          color={appColors.onSecondaryColor}
        >
          {title}
        </Typography>
      </Box>
    </Card>
  );
}

export default CustomDashBoardInfoCard;
