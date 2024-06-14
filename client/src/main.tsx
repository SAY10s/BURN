import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.scss";
import store from "./typescript/store/store.ts";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import PlayerView from "./typescript/views/BattleViews/PlayerView.tsx";
import GameMasterView from "./typescript/views/BattleViews/GameMasterView.tsx";
import DiceTableView from "./typescript/views/DiceTableView.tsx";
import EditPlayerView from "./typescript/views/EditPlayerView.tsx";
import AddPlayer from "./typescript/views/AddPlayer.tsx";
import Root from "./typescript/views/Root.tsx";
import Menu from "./typescript/views/Menu.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<Menu />} />

      <Route path="/dice" element={<DiceTableView />} />

      <Route path="gm" element={<GameMasterView />} />
      <Route path="player" element={<PlayerView />} />

      <Route path="add" element={<AddPlayer />} />
      <Route path="edit" element={<EditPlayerView />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
