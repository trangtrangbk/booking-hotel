import React from 'react';

const Dashboard = React.lazy(() => import('../views/Pages/Dashboard'));
const Hotels = React.lazy(() => import('../views/Pages/Hotels'));
const Rooms = React.lazy(() => import('../views/Pages/Rooms'));
const Room = React.lazy(() => import('../views/Pages/Room'));
const Reservation = React.lazy(() => import('../views/Pages/Reservation'));
const routes = [
    {
        id: 1,
        exact: true,
        path: '/hotels',
        name: 'Hotels',
        component: Hotels
    },
    {
        id: 2,
        exact: true,
        path: '/hotels/:hotelId',
        name: 'Rooms',
        component: Rooms
    },
    {
        id: 3,
        exact: true,
        path: '/hotels/:hotelId/rooms/:roomId',
        name: 'Room',
        component: Room
    },
    {
        id: 4,
        exact: true,
        path: '/homepage',
        name: 'Homepage',
        component: Dashboard
    },
    {
        id: 5,
        exact: true,
        path: '/reservation',
        name: 'Homepage',
        component: Reservation
    }
];

export default routes;
