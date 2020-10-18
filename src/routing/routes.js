import React from 'react';

const Dashboard = React.lazy(() => import('../views/Pages/Dashboard'));
const routes = [
    {
        id: 2,
        exact: true,
        path: '/Homepage',
        name: 'Homepage',
        component: Dashboard
    },
];

export default routes;
