import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/auth';
import { Ripple } from "../components";

const NAV_ITEMS = [
    {
        name: 'Trang chủ',
        path: '/Homepage',
    },
    {
        name: 'About us',
        path: '/MasterData',
    },
    {
        name: 'Rooms',
        path: '/Competitors',
    },
    {
        name: 'Contact',
        path: '/PricePlanning',
    }  
];

const TheHeader = () => {
    let history = useHistory();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="header">
		<div className="header_content d-flex flex-row align-items-center justify-content-between">
			<div className="logo"><a href="#">The River</a></div>
			<div className="ml-auto d-flex flex-row align-items-center justify-content-start">
				<nav className="main_nav">
					<ul className="d-flex flex-row align-items-start justify-content-start">
                    {NAV_ITEMS.map((nav, i) => (
                        <NavLink
                            key={i}
                            onClick={() => history.push(nav.path)}
                            to ={`${nav.path}`}
                            style={{padding : '20px'}}
                            >
                            {nav.name}
                        </NavLink>
                    ))}
					
					</ul>
				</nav>
				<div className="book_button"><a href="booking.html">Book Online</a></div>
				<div className="header_phone d-flex flex-row align-items-center justify-content-center">
					<img src="images/phone.png" alt=""/>
					<span>0183-12345678</span>
				</div>

				<div className="hamburger"><i className="fa fa-bars" aria-hidden="true"></i></div>
			</div>
		</div>
	</header>
    );
};

export default TheHeader;
