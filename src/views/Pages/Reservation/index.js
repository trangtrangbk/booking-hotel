import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StepProgressBar from "react-step-progress";
import { PaypalBtn, Feather, Button, Spinner } from "../../../components";
import service from "../../../service/service";
import { Tick } from "react-crude-animated-tick";
import { resetReservation } from "../../../redux/reducers/reservations/actions";
import { useHistory } from "react-router-dom";

const Reservation = () => {
  const { reservation } = useSelector((store) => store.reservations);
  console.log({reservation});
  const dispatch = useDispatch();
  const history = useHistory();
  const onNext = () => {
    console.log("next");
    document
      .querySelector("#root > div > div > div._3uApM > a._2pGos._hsN1w")
      .click();
  };

  const onPrevious = () => {
    document
      .querySelector("#root > div > div > div._3uApM > a._2pGos._3CDiP")
      .click();
  };

  const onSubmitProgress = () => {
    dispatch(resetReservation());
    history.push("/");
  };

  return (
    <div className="main">
      {reservation && (
        <StepProgressBar
          startingStep={0}
          steps={[
            {
              label: "Confirm reservation",
              name: "step 1",
              content: (
                <ReservationData reservation={reservation} onNext={onNext} />
              ),
            },
            {
              label: "Payment",
              name: "step 2",
              content: (
                <Payment
                  onPrevious={onPrevious}
                  onNext={onNext}
                  reservation={reservation}
                />
              ),
            },
            {
              label: "Complete",
              name: "step 3",
              content: (
                <CompleteReservation onSubmitProgress={onSubmitProgress} />
              ),
              // validator: step3Validator
            },
          ]}
        />
      )}
    </div>
  );
};

const ReservationData = ({ reservation, onNext }) => {
  return (
    <>
      <div className="reservation">
        <>
          <div className="row">
            <div className="col-5">
              <img src={reservation.room.image[0]} />
            </div>
            <div className="col-7">
              <div className="bottom-line" style={{ paddingBottom: "20px" }}>
                <div className="row reservation__hotel-name">
                  {reservation.hotel.name}
                </div>
                <div className="row justify-content-between ">
                  <div className="flex reservation__hotel-location">
                    <Feather
                      name="MapPin"
                      style={{ marginRight: "5px" }}
                      width="20px"
                      height="20px"
                    />
                    <span>{reservation.hotel.city}</span>
                  </div>
                  <span className="reservation__code">
                    code : {reservation.code}
                  </span>
                </div>
                <div className="row" style={{ marginLeft: "25px" }}>
                  {reservation.hotel.address}
                </div>
              </div>
              <div
                className="row bottom-line"
                style={{ paddingTop: "20px", paddingBottom: "20px" }}
              >
                <label style={{ marginRight: "20px" }}>Room</label>
                <span>{reservation.room.name}</span>
              </div>
              <div
                className="row bottom-line"
                style={{ paddingTop: "20px", paddingBottom: "20px" }}
              >
                <div className="col-4 no-padding">
                  <div className="row justify-flex-start">
                    <label>Check-In</label>
                  </div>
                  <div className="row justify-flex-start">
                    <span>{reservation.checkIn}</span>
                  </div>
                </div>
                <div className="col-4 no-padding">
                  <div className="row justify-content-center">
                    <Feather name="Clock" style={{ marginBottom: "11.5px" }} />
                  </div>
                  <div className="row justify-content-center">
                    <span>
                      {reservation.diffDays}{" "}
                      {reservation.diffDays > 1 ? "days" : "day"}
                    </span>
                  </div>
                </div>
                <div className="col-4 no-padding">
                  <div className="row justify-flex-end">
                    <label>Check-Out</label>
                  </div>
                  <div className="row justify-flex-end">
                    <span>{reservation.checkOut}</span>
                  </div>
                </div>
              </div>
              <div className="row" style={{ paddingTop: "20px" }}>
                <div className="col-6 no-padding">
                  <label style={{ marginRight: "20px" }}>Cost</label>
                  <span style={{ color: "#f52200" }}>${reservation.cost}</span>
                </div>
                <div className="col-6 no-padding justify-flex-end">
                  <label style={{ marginRight: "20px" }}>Guests</label>
                  <span>
                    {reservation.guests.adult}{" "}
                    {reservation.guests.adult > 1 ? "Adults" : "Adult"} -{" "}
                    {reservation.guests.children} Children
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <label
              style={{
                margin: "40px 0 20px 15px",
                width: "100%",
                paddingBottom: "20px",
              }}
              className="bottom-line"
            >
              Your information
            </label>
            <div className="row">
              <div className="col-6">
                <div className="row">
                  <label style={{ marginRight: "10px" }}>Name: </label>
                  <span>{reservation.infor.name}</span>
                </div>
                <div className="row">
                  <label style={{ marginRight: "10px" }}>Email: </label>
                  <span>{reservation.infor.email}</span>
                </div>
              </div>
              <div className="col-6">
                <div className="row">
                  <label style={{ marginRight: "10px" }}>Address: </label>
                  <span>{reservation.infor.address}</span>
                </div>
                <div className="row">
                  <label style={{ marginRight: "10px" }}>Phone: </label>
                  <span>{reservation.infor.phone}</span>
                </div>
              </div>
            </div>
            <div className="row" style={{ marginLeft: "18px" }}>
              <label style={{ marginRight: "10px" }}>Note: </label>
              <span>{reservation.note}</span>
            </div>
          </div>
        </>
      </div>
      <div
        className="row justify-flex-end"
        style={{ maxWidth: "1300px", margin: "20px auto" }}
      >
        <Button onClick={onNext} style={{ width: "100px" }}>
          Next
        </Button>
      </div>
    </>
  );
};

const Payment = ({ reservation, onPrevious, onNext }) => {
  const [loading, setLoading] = useState(false);
  const paymentHandler = (details, data) => {
    console.log(details, data);
    setLoading(true);
    service
      .post("/reservations", reservation)
      .then((res) => {
        setLoading(false)
        onNext();

      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  if(loading) return <Spinner />

  return (
    <>
      <div className="payment">
        <PaypalBtn
          amount={reservation.cost}
          currency={"USD"}
          onSuccess={paymentHandler}
        />
      </div>
      <div
        className="row justify-flex-start"
        style={{ maxWidth: "1300px", margin: "20px auto" }}
      >
        <Button onClick={onPrevious} style={{ width: "100px" }}>
          Back
        </Button>
      </div>
    </>
  );
};

const CompleteReservation = ({ onSubmitProgress }) => {
  return (
    <>
      <div className="complete_reservation">
        <div className="row">
          <span style={{ margin: "auto" }}>
            Thank you! Your booking has been placed. We will contact you to
            confirm about the booking soon.
          </span>
        </div>
        <div className="row">
          <Tick size={200} />
        </div>
      </div>
      <div
        className="row justify-content-center"
        style={{ maxWidth: "1300px", margin: "20px auto" }}
      >
        <Button
          onClick={onSubmitProgress}
          type={"secondary"}
          style={{ width: "100px" }}
        >
          Home
        </Button>
      </div>
    </>
  );
};

export default Reservation;
