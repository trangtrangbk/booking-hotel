import React from 'react';

const Dashboard = React.lazy(() => import('../views/Pages/Dashboard'));
const Hotels = React.lazy(() => import('../views/Pages/Hotels'));

const routes = [
    {
        id: 0,
        exact: true,
        path: '/Homepage',
        name: 'Homepage',
        component: Dashboard
    },
    {
        id: 1,
        exact: true,
        path: '/hotels',
        name: 'Hotels',
        component: Hotels
    }
];

export default routes;
