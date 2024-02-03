import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import CreateDeck from "./Home/CreateDeck";
import Study from "./Home/Study";
import Deck from "./Home/Deck";
import EditDeck from "./Home/EditDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route exact path={"/decks/new"}>
            <CreateDeck />
          </Route>
          <Route exact path={"/decks/:deckId"}>
            <Deck />
          </Route>
          <Route exact path={"/decks/:deckId/edit"}>
            <EditDeck />
          </Route>
          <Route exact path={"/decks/:deckId/study"}>
            <Study />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
