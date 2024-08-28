import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import CreatePage from "../pages/CreatePage";
import HomePage from "../pages/HomePage";
import EventPage from "../pages/EventPage";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/edit/:eventId" element={<EventPage />} />
    </Route>
  )
);
