import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import { useDispatch, useSelector } from "react-redux";
import { fetchListHotels } from "../../../redux/reducers/hotels/actions";
import { Feather, TextField } from "../../../components";
import { NavLink } from "react-router-dom";

const Hotels = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { hotels, sending } = useSelector((store) => store.hotels);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListHotels());
  }, []);

  return (
    <div className="main">
      {/* filter */}
      <div className="homepage">
        <div className="bg"></div>

        {/* welcome  */}
        <div className="welcome">
          <h1 className="row">A luxury stay</h1>
          <div className="row booking-form">
            <div className="welcome__block">
              <label className="row">Check In</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="welcome__block">
              <label className="row">Check Out</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="welcome__block">
              <label className="row">Location</label>
              <TextField />
            </div>
            <div className="welcome__block" style={{ marginTop: "38px" }}>
              <div className="book_button">
                <a href="booking.html">Filter</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="row">
          <div className='col-md-12'>
         <div className='row'>
         {hotels.map((hotel) => (
            <div
              key={hotel._id}
              className="hotel__item"
              style={{
                backgroundImage: `url(${hotel.image[0]})`,
                backgroundSize: "cover",
              }}
            >
              <div className="hotel__info">
                <span>{hotel.name}</span>
                <div className='flex justify-flex-end'>
                  <Feather name="MapPin" width ='15px'/>
                  <span className='hotel__city'>{hotel.city}</span>
                </div>
              </div>
              <div className="bg"></div>
              <div className="book_button">
                <NavLink to={`/hotels/${hotel._id}`}>Book now</NavLink>
              </div>
            </div>
          ))}
         </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
