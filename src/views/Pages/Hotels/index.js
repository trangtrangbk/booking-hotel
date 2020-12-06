import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListHotels } from "../../../redux/reducers/hotels/actions";
import {
  Button,
  Dropdown,
  Feather,
  Spinner,
  TextField,
} from "../../../components";
import { NavLink, useHistory } from "react-router-dom";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { cityList } from "../../../utils/cityUtil";
const Hotels = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [city, setCity] = useState("Hà Nội");
  const { hotels, sending, count } = useSelector((store) => store.hotels);
  const [limit, set_limit] = useState(6);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(
      fetchListHotels({
        setting: {
          limit,
          offset: 0,
        },
      })
    );
  }, []);

  return (
    <div className="main">
      {/* filter */}
      <div className="homepage">
        <div className="bg"></div>

        {/* welcome  */}
        <div className="welcome">
          <h1 className="row">Find The Best Hotels</h1>
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
            <div className="welcome__block">
              <label className="row">Location</label>
              <Dropdown
                onChange={(e) => setCity(e.value)}
                defaultValue={{ value: city, label: city }}
                options={cityList.map((c) => {
                  return {
                    value: c,
                    label: c,
                  };
                })}
              />{" "}
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
          <div className="col-md-12">
            <div className="row">
              {hotels.map((hotel) => (
                <div
                  key={hotel._id}
                  className="hotel__item col-md-3 cursor_pointer"
                  onClick={() => history.push(`/hotels/${hotel._id}`)}
                >
                  <img src={hotel.image[0]} />
                  <div className="hotel__info">
                    <h4 className="row md-3">{hotel.name}</h4>
                    <div className="flex justify-content-between">
                      <div className="flex justify-flex-start">
                        <Feather
                          name="MapPin"
                          className="mr-10"
                          width="18px"
                          color="#ffa37b"
                        />
                        <span className="hotel__city mx-auto">
                          {hotel.city}
                        </span>
                      </div>
                      <div className="visit_button">
                        <NavLink to={`/hotels/${hotel._id}`}>Visit</NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {count > hotels.length && (
              <div className="row">
                <Button
                  customClass="btn--primary"
                  style={{ width: "150px", margin: "auto" }}
                  type="primary"
                  onClick={() =>
                    dispatch(
                      fetchListHotels({
                        setting: {
                          limit,
                          offset: hotels.length,
                        },
                      })
                    )
                  }
                >
                  <strong>See more...</strong>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {sending && <Spinner />}
    </div>
  );
};

export default Hotels;
