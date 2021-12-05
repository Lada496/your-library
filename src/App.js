import React, { Fragment, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LaunchPage from "./pages/LaunchPage";
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
          <Route path="search-book/*" element={<Home />} />
          <Route path="my-books" element={<MyBooks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
