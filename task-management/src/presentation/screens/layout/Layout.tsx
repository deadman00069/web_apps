import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import { useState } from "react";
import { ArrowBackIos, Height } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useMyAppColor } from "../../theme/colors";
import CustomAppBar from "../../components/custom_app_bar";

function Layout() {
  const [isOpen, setisOpen] = useState(false);

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));

  const appColor = useMyAppColor();

  return (
    <>
      <Box display={"flex"} height={"100vh"}>
        <Drawer
          sx={{
            width: isOpen ? 240 : 0,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: isOpen ? 240 : 0,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={isOpen}
        >
          <DrawerHeader>
            <IconButton onClick={() => setisOpen(!isOpen)}>
              <ArrowBackIos />
            </IconButton>
          </DrawerHeader>
          <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box flexGrow={1}>
          <CustomAppBar setisOpen={() => setisOpen(!isOpen)} isOpen={isOpen} />
          <Box height={"100%"} bgcolor={appColor.backgroundColor}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Layout;
