import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.scss";
import store from "./store/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PlayerView from "./views/PlayerView.tsx";
import GameMasterView from "./views/GameMasterView.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <PlayerView />,
  },
  {
    path: "gm",
    element: <GameMasterView />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
