import { Box, IconButton, Menu, MenuItem, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import MyAppElevatedButton from "../my_app_elevated_button/MyAppElevatedButton";
import { Filter, FilterList } from "@mui/icons-material";

function CustomTabBar({
  currentIndex,
  handleTabChange,
  onMenuClick,
}: {
  currentIndex: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  onMenuClick: (index: number) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        justifyContent: "space-between",
        mb: "2rem",
      }}
    >
      <Tabs
        value={currentIndex}
        onChange={handleTabChange}
        aria-label="basic tabs example"
      >
        <Tab label="Ongoing" />
        <Tab label="Pending" />
        <Tab label="Completed" />
      </Tabs>

      <IconButton
        aria-label="menu"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <FilterList />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            onMenuClick(0);
            handleClose();
          }}
        >
          Date
        </MenuItem>
        <MenuItem
          onClick={() => {
            onMenuClick(1);
            handleClose();
          }}
        >
          All
        </MenuItem>
        <MenuItem
          onClick={() => {
            onMenuClick(2);
            handleClose();
          }}
        >
          High
        </MenuItem>
        <MenuItem
          onClick={() => {
            onMenuClick(3);
            handleClose();
          }}
        >
          Medium
        </MenuItem>
        <MenuItem
          onClick={() => {
            onMenuClick(4);
            handleClose();
          }}
        >
          Low
        </MenuItem>
        <MenuItem
          onClick={() => {
            onMenuClick(5);
            handleClose();
          }}
        >
          Reset
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default CustomTabBar;
