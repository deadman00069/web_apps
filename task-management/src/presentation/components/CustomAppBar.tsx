import { AppBar, IconButton, Toolbar } from "@mui/material";
import React from "react";

export function CustomAppBar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: isOpen ? "none" : "inherit" }}
          onClick={() => {
            setisOpen(!isOpen);
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tasky
        </Typography>
        <Box display={"flex"} alignItems={"center"}>
          <Avatar
            alt="Remy Sharp"
            src="https://images.unsplash.com/photo-1712847331931-8a0ea66c4904?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
            sx={{ width: 56, height: 56, mr: 1, my: 2 }}
          />
          <Box>
            <Typography variant="body2" component="div" sx={{ flexGrow: 1 }}>
              Konark Shivam
            </Typography>
            <Typography
              variant="caption"
              fontWeight={400}
              component="div"
              sx={{ flexGrow: 1 }}
            >
              UI/UX
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
