import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Slide } from "react-slideshow-image";
import StarRatings from "react-star-ratings";

import { useDispatch, useSelector } from "react-redux";
import { fetchListHotels } from "../../../redux/reducers/hotels/actions";
import { NavLink, useHistory } from "react-router-dom";
import { Feather } from "../../../components";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import service from "../../../service/service";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { hotels, sending } = useSelector((store) => store.hotels);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(fetchListHotels());
  }, []);

  const onGetAvailable = () => {
    service
      .get("/hotels/available", {params : {setting : {
        checkIn : startDate,
        checkOut : endDate
      }}})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => err);
  };
  return (
    <div className="main">
      <div className="homepage">
        <div className="bg"></div>

        {/* welcome  */}
        <div className="welcome">
          <h1 className="row">The River System</h1>
          <div className="row booking-form">
            <div className="welcome__block">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="mui-pickers-date"
                  label="Check In"
                  value={startDate}
                  name="checkInFrom"
                  format="dd/MM/yyyy"
                  onChange={(date) => {
                    setStartDate(date);
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="welcome__block">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="mui-pickers-date"
                  label="Check Out"
                  value={endDate}
                  name="checkInFrom"
                  format="dd/MM/yyyy"
                  onChange={(date) => {
                    setEndDate(date);
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="welcome__block" style={{ marginTop: "38px" }}>
              <div className="book_button" onClick={onGetAvailable}>
                <span>Lọc</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* hotels */}
      <div className="hotels">
        <div className="section text-center">
          <h2>Đặt phòng ngay</h2>
          <span>
            The River mang đến cho các bạn những lựa chọn phù hợp nhất để nghỉ
            ngơi. Hệ thống của chúng tôi tập hợp nhiều khách sạn với đầy đủ tiện
            nghi cũng như đa đạng về mức giá, dịch vụ. Hãy tận hưởng những
            chuyến đi của bạn.
          </span>
          <div className="book_button" style={{ margin: "1rem auto" }}>
            <NavLink to="/hotels">Xem thêm khách sạn</NavLink>
          </div>
        </div>
        <div className="section">
          {hotels && (
            <Slide
              easing="ease"
              // pauseOnHover={true}
              duration={5000}
              // autoplay={false}
            >
              {hotels.map((hotel) => (
                <div
                  className="each-slide row flex"
                  key={hotel._id}
                  onClick={() => history.push(`/hotels/${hotel._id}`)}
                >
                  <div className="col-6">
                    <div
                      style={{
                        backgroundImage: `url(${hotel.image[0]})`,
                        backgroundSize: "cover",
                        height: "500px",
                        padding: "20px",
                      }}
                    ></div>
                  </div>
                  <div className="col-6 hotel__description">
                    <h2
                      style={{
                        padding: "0",
                        color: "#ffa37b",
                        marginBottom: "1rem",
                      }}
                    >
                      {hotel.name}
                    </h2>
                    <div className="row flex justify-content-start mb-3">
                      <Feather
                        name="MapPin"
                        style={{ marginRight: "0.5rem" }}
                      />
                      <span>{hotel.city}</span>
                    </div>
                    <div>
                      <StarRatings
                        rating={hotel.rate || 0}
                        starRatedColor="#ff8939"
                        starDimension="22px"
                        starSpacing="3px"
                        numberOfStars={5}
                        name="rating"
                      />
                    </div>
                    <span>{hotel.description}</span>
                  </div>
                </div>
              ))}
            </Slide>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
