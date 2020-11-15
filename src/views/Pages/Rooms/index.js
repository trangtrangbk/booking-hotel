import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import service from "../../../service/service";
import { Feather, Spinner } from "../../../components";
import { NavLink } from "react-router-dom";
import { fetchListRooms } from "../../../redux/reducers/rooms/actions";
import { mappingAmenity } from "../../../utils/amenities";

const Rooms = (props) => {
  const { rooms, sending } = useSelector((store) => store.rooms);
  const [hotel, setHotel] = useState({});
  const { hotelId } = props.match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    fetchHotel();
    dispatch(fetchListRooms({ filter: { hotelId } }));
  }, []);

  const fetchHotel = () => {
    service
      .get(`/hotels/${hotelId}`)
      .then((res) => setHotel(res.data))
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="main">
      {/* filter */}
      <div className="homepage">
        <div
          className="bg"
          style={
            hotel.image ? { backgroundImage: `url(${hotel.image[0]})` } : {}
          }
        ></div>

        {/* welcome  */}
        <div className="welcome">
          <h1 className="row">{hotel.name}</h1>
        </div>
      </div>
      <div className="row hotel__infor">
        <div className="row amenities">
          {hotel.amenities?.map((amenity) => (
            <div className="amenities__item" key={amenity}>
              <img src={mappingAmenity(amenity)} />
            </div>
          ))}
        </div>
        <div className="row" style={{ padding: "2rem 8rem" }}>
          <div className="row hotel__infor__item">
            <span>{hotel.description}</span>
          </div>
          <div className="col-6" style={{ padding: "2rem" }}>
            <div className="row hotel__infor__item">
              <Feather name="Mail" />
              <span>{hotel.email}</span>
            </div>

            <div className="row hotel__infor__item">
              <Feather name="Phone" />
              <span>{hotel.phone}</span>
            </div>

            <div className="row hotel__infor__item">
              <Feather name="Anchor" />
              <span>{hotel.address}</span>
            </div>

            <div className="row hotel__infor__item">
              <Feather name="MapPin" />
              <span>{hotel.city}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              {rooms.map((room) => (
                <div key={room._id} className="hotel__item col-md-3">
                  <img src={room.image[0]} />
                  <div className="hotel__info">
                    <h4 className="row md-3">{room.name}</h4>
                    <div className="hotel__tag">{room.price}$</div>
                    <div className="flex justify-content-between">
                      <div></div>
                      <div className="visit_button">
                        <NavLink to={`/hotels/${hotelId}/rooms/${room._id}`}>
                          Book now
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {sending && <Spinner />}
    </div>
  );
};

export default Rooms;
