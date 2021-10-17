import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import LaunchPage from "./pages/LaunchPage";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import MyBooks from "./pages/MyBooks";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <LaunchPage />
        </Route>
        <Layout>
          <Switch>
            <Route path="/search-book">
              <Home />
            </Route>
            <Route path="/my-books">
              <MyBooks />
            </Route>
          </Switch>
        </Layout>
      </Switch>
    </Fragment>
  );
}

export default App;
