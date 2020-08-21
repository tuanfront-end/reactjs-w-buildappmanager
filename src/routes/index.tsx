import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from 'containers/Header/Header';

const HomePage = lazy(() => import(/* webpackChunkName: "HomePage" */ 'containers/HomePage/HomePage'));
const AboutPage = lazy(() => import(/* webpackChunkName: "AboutPage" */ 'containers/AboutPage/AboutPage'));
const NotFoundPage = lazy(() => import(/* webpackChunkName: "NotFoundPage" */ 'containers/NotFoundPage/NotFoundPage'));

const Routes = () => {
  return (
    <BrowserRouter>
      <header>
        <Header />
      </header>
      <main>
        <Switch>
          <Route path="/" exact>
            <Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </Suspense>
          </Route>
          <Route path="/about">
            <Suspense fallback={<div>Loading...</div>}>
              <AboutPage />
            </Suspense>
          </Route>
          <Route>
            <Suspense fallback={<div>Loading...</div>}>
              <NotFoundPage />
            </Suspense>
          </Route>
        </Switch>
      </main>
      <footer></footer>
    </BrowserRouter>
  );
};

export default Routes;
