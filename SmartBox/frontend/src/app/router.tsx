import { createBrowserRouter } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import MachineDetail from "../pages/MachineDetail/MachineDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "dashboard/machine/:machineId",
        element: <MachineDetail />,
      },
    ],
  },
]);