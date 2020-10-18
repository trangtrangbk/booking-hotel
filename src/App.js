import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './store/store';
import { loadUser } from './actions/auth';
import ProtectedRoute from './routing/ProtectedRoute';
import './scss/_custom.scss';
import TheHeader from "./containers/TheHeader";

const loading = () => (
    <div className='animated fadeIn pt-3 text-center'>
        <div className='sk-spinner sk-spinner-pulse'></div>
    </div>
);

const store = createStore;

const Login = React.lazy(() => import('./views/Pages/Login/Login'));
const HomePage = React.lazy(() => import('./views/Pages/Dashboard'));
// const Register = React.lazy(() => import('./views/Pages/Register/Register'));
const DefaultLayout = React.lazy(() => import('./containers/TheLayout'));

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <React.Suspense fallback={loading()}>
                    <TheHeader />
                    <Switch>
                    <Route exact path='/' component={HomePage} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/homepage' component={HomePage} />
                        <ProtectedRoute path='/' component={DefaultLayout} />
                    </Switch>
                </React.Suspense>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
