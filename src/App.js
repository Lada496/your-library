import { Fragment, useState } from "react";
import { Route, Switch } from "react-router-dom";
import LaunchPage from "./pages/LaunchPage";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import MyBooks from "./pages/MyBooks";

function App() {
  const [isStart, setStart] = useState(false);
  const startHandler = () => {
    setStart(true);
  };
  const endHandler = () => {
    setStart(false);
  };
  const content = (
    <Layout onEnd={endHandler}>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/my-books">
          <MyBooks />
        </Route>
      </Switch>
    </Layout>
  );

  return (
    <Fragment>
    
      {!isStart && <LaunchPage onStart={startHandler} />}
      {isStart && content}
    </Fragment>
  );
}

export default App;
