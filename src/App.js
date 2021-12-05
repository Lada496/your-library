import React, { Fragment, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LaunchPage from "./pages/LaunchPage";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import LoadingSpinner from "./UI/LoadingSpinner";
import NotFound from "./pages/NotFound";
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
        <Routes>
          <Route path="/" element={<LaunchPage />} />
          <Route
            path="search-book/*"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="my-books"
            element={
              <Layout>
                <MyBooks />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
