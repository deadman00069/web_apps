import SignupScreen from "./screens/signup/SignupScreen";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./screens/layout/Layout";
import TasksScreen from "./screens/tasks/TasksScreen";
import ProjectsScreen from "./screens/projects/ProjectsScreen";
import DashboardScreen from "./screens/dashboard/DashboardScreen";
import PrivateRoutes from "./routes/PrivateRoute";
import { useContext, useState } from "react";
import { AuthContext, UserDataContext } from "../context/AuthContext";
import { LoginScreen } from "./screens/login/LoginScreen";
import { UserModel } from "../models/UserModel";

const font = "'Poppins', sans-serif";

const materialTheme = createTheme({
  palette: {
    primary: {
      main: "#1B1A55",
    },
    secondary: {
      main: "#9290C3",
    },
  },
  typography: {
    fontFamily: font,
  },
});

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [userModel, setUserModel] = useState<UserModel | null>();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<SignupScreen />} />
        <Route path="login" element={<LoginScreen />} />
        <Route path="layout" element={<PrivateRoutes children={<Layout />} />}>
          <Route index path="dashboard" element={<DashboardScreen />} />
          <Route path="tasks" element={<TasksScreen />} />
          <Route path="projects" element={<ProjectsScreen />} />
        </Route>
      </Route>
    )
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, setisAuthenticated }}>
      <ThemeProvider theme={materialTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
