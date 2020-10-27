import React, { Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import TheHeader from './TheHeader';

import routes from '../routing/routes';
import TheFooter from "./TheFooter";
import ScrollToTop from "./ScrollToTop";

const loading = (
    <div className='pt-3 text-center'>
        <div className='sk-spinner sk-spinner-pulse'></div>
    </div>
);

const TheLayout = () => {
    return (
        <>
            <TheHeader />
            <Suspense fallback={loading}>
            <ScrollToTop />
                <Switch>
                    {routes.map((route, idx) => {
                        return (
                            route.component && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    name={route.name}
                                    exact={route.exact}
                                    render={props => <route.component {...props} />}
                                />
                            )
                        );
                    })}
                </Switch>
            </Suspense>
            <TheFooter />

        </>
    );
};

export default React.memo(TheLayout);
