import React, { Fragment, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LaunchPage from "./pages/LaunchPage";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import LoadingSpinner from "./UI/LoadingSpinner";
const MyBooks = React.lazy(() => import("./pages/MyBooks"));

function App() {
  return (
    <Fragment>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
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
      </Suspense>
    </Fragment>
  );
}

export default App;
