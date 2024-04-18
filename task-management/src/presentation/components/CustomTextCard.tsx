import { Box, SxProps, Theme, Typography } from "@mui/material";
import React from "react";

function CustomTextCard({
  bgColor,
  text,
  sx,
  textColor = "white",
}: {
  bgColor: string;
  text: string;
  textColor?: string;
  sx?: SxProps<Theme>;
}) {
  return (
    <Box sx={sx}>
      <Box
        px={"11px"}
        py={"3px"}
        bgcolor={bgColor}
        color={"white"}
        borderRadius={"4px"}
        component={"span"}
      >
        <Typography variant="caption" fontWeight={400} color={textColor}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
}

export default CustomTextCard;
