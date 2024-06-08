import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.scss";
import store from "./typescript/store/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PlayerView from "./typescript/views/BattleViews/PlayerView.tsx";
import GameMasterView from "./typescript/views/BattleViews/GameMasterView.tsx";
import DiceTableView from "./typescript/views/DiceTableView.tsx";
import EditPlayerView from "./typescript/views/EditPlayerView.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DiceTableView />,
  },
  {
    path: "/edit",
    element: <EditPlayerView />,
  },
  {
    path: "/player",
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
