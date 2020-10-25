import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import DatePicker from "react-datepicker";

import service from "../../../service/service";
import { Feather, Spinner, TextField } from "../../../components";
import { diffDays } from "../../../utils/dateUtil";
import { useDispatch } from "react-redux";
import { setReservation } from "../../../redux/reducers/reservations/actions";
import { useHistory } from "react-router-dom";

const Room = (props) => {

  let history = useHistory();
  const dispatch = useDispatch();
  const [hotel, setHotel] = useState({});
  const [room, setRoom] = useState({});
  const { hotelId, roomId } = props.match.params;
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  useEffect(() => {
    fetchHotel();
    fetchRoom();
  }, []);

  const fetchHotel = () => {
    setLoading(true);
    service
      .get(`/hotels/${hotelId}`)
      .then((res) => {
        setHotel(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const fetchRoom = () => {
    setLoading(true);
    service
      .get(`/rooms/${roomId}`)
      .then((res) => {
        setRoom(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(setReservation({
      infor : {
        name,address,email, phone
      },
      checkIn : startDate,
      checkOut: endDate,
      cost :room.price * diffDays(startDate, endDate),
      hotelId : hotelId,
      roomId : roomId,
     }))
    history.push('/reservation')
  }
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

      <div className="section">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-8">
                <h4 className="bottom-line mb-5" style={{ padding: "10px 0" }}>
                  <span className='mr-20'>{room.name}</span>
                  <span className="price-tag">
                    <span className="price-tag__main">{room.price} $/day</span>
                  </span>
                </h4>
                {room.image && (
                  <Slide easing="ease" pauseOnHover={true} duration={3000}>
                    {room.image.map((img) => (
                      <img src={img} width="100%" height="100%" key={img} />
                    ))}
                  </Slide>
                )}
                <div className="row content__block bottom-line">
                  <label>Description</label>
                  <span>{room.description}</span>
                </div>
                <div className="row content__block bottom-line">
                  <label>Space</label>
                  <span>
                    Area: {room.area} m <sup>2</sup>
                  </span>
                  {room.checkIn && <span>Check In: {room.checkIn}</span>}
                  {room.checkOut && <span>Check Out: {room.checkOut}</span>}
                  {room.space &&
                    room.space.map((sp, index) => (
                      <span key={index}>
                        {sp.name} : {sp.quantity}
                      </span>
                    ))}
                </div>
                <div className="row content__block bottom-line">
                  <div className="col-md-6 no-padding">
                    <label>Amenities</label>
                    {room.amenities &&
                      room.amenities.map((ameity, index) => (
                        <span key={index}>
                          {ameity.name} : {ameity.value}
                        </span>
                      ))}
                  </div>
                  <div className="col-md-6 no-padding">
                    <label>House Rules</label>
                    {room.rules &&
                      room.rules.map((rule, index) => (
                        <span key={index}>{rule}</span>
                      ))}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <form className="booking-form" onSubmit={handleSubmit} >
                  <div className="booking-form__head">Make a reservation</div>
                  <div className="booking-form__main">
                    <label className="row">Name</label>
                    <TextField defaultValue= {name} onChange = {e=>setName(e.target.value)} required/>
                    <label className="row">Address</label>
                    <TextField defaultValue= {address} onChange = {e=>setAddress(e.target.value)} required/>

                    <label className="row">Email</label>
                    <TextField defaultValue= {email} onChange = {e=>setEmail(e.target.value)} required/>

                    <label className="row">Phone</label>
                    <TextField defaultValue= {phone} onChange = {e=>setPhone(e.target.value)} required/>

                    <div className="row">
                      <div className="col-6" style={{ paddingLeft: "0" }}>
                        <label className="row">Check in</label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                        />
                      </div>

                      <div className="col-6 no-padding">
                        <label className="row">Check out</label>
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                        />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <label className="row">Cost</label>
                      <div className="row justify-content-between">
                        <div>
                          <span className="price-tag">
                            <span className="price-tag__main">{room.price} $</span>
                          </span>{" "}
                          x {diffDays(startDate, endDate)}{" "}
                          {diffDays(startDate, endDate) > 0 ? "days" : "day"}
                        </div>
                        <div>= {room.price * diffDays(startDate, endDate)} $</div>
                      </div>
                    </div>

                    <div className="row justify-flex-end">
                      <button className="book_button" type='submit'>Book now</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default Room;
