import React from "react";
import { Switch, Route } from "react-router-dom";
import "./components/Masterlayout/Script";
import Room from "./components/Room/Room";
import Main from "./components/Main/Main";
import Roomsidebar from "./components/Masterlayout/Roomsidebar";
import Chat from "./components/Chat/Chat";
import Emoji from "./components/Chat/Emoji";
import Landing from "./components/landing";
import Component from "../src/components/containers/Container.js";
import Updateevent from "./components/MeetingScheduler/Updateevent";
import Linkjoin from "./components/Main/Linkjoin";
import Login from "./components/Auth/Login";
import { useSelector } from "react-redux";

export default function Path() {
  const data = useSelector((state) => state.login.UserData);
  console.log("redux", data.accessToken);
  return (
    <div>
      <Switch>
        <Route exact path="/main" component={Main} />
        <Route exact path="/room:roomId" component={Room} />
        <Route exact path="/roomsidebar" component={Roomsidebar} />
        <Route
          exact
          path="/chat"
          component={data.accessToken != null ? Chat : Login}
        />
        <Route exact path="/emoji" component={Emoji} />
        <Route exact path="/" component={Landing} />
        <Route
          exact
          path="/container"
          component={data.accessToken != null ? Component : Login}
        />
        <Route
          exact
          path="/updateevent/:id"
          component={data.accessToken != null ? Updateevent : Login}
        />
        <Route exact path="/linktojoin:id" component={Linkjoin} />
        <Route
          exact
          path="/login"
          component={data.accessToken == null ? Login : Landing}
        />
      </Switch>
    </div>
  );
}
