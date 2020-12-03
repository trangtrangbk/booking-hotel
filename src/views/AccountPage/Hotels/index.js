import React, { useEffect, useState } from "react";

import { Feather, Spinner } from "../../../components";
import AddHotel from "./AddHotels";
import service from "../../../service/service";
import { useSelector } from "react-redux";
import ConfirmModal from "../../../components/ConfirmModal";
import { mappingAmenity } from "../../../utils/amenities";
import { CircularProgress } from "@material-ui/core";

const Hotel = () => {
  const [addHotel, setAddHotel] = useState(false);
  const [deleteHotel, setDeleteHotel] = useState(false);

  const [hotels, setHotels] = useState([]);
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const fetchOwnHotels = () => {
    setLoading(true);
    if (!user) return;
    service
      .get("/hotels", { params: { filter: { accountId: user._id } } })
      .then((res) => {
        setLoading(false);
        setHotels(res.data.hotels);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOwnHotels();
  }, []);

  const onDeleteHotel = () => {
    service
      .delete(`/hotels/${hotels[0]._id}`, { params : {hotelId: hotels[0]._id} })
      .then((res) => {
        setHotels([]);
        setDeleteHotel(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : hotels.length === 0 ? (
        <div className="row justify-content-center">
          <span className="text-center" style={{ margin: "auto" }}>
            Create your own hotel{" "}
            <span className="hover-text" onClick={() => setAddHotel(true)}>
              here
            </span>
          </span>
        </div>
      ) : (
        <div className="relative">
          <div className="action">
            <Feather name="Edit2" />
            <Feather
              name="Trash"
              onClick={() => {
                setDeleteHotel(true);
              }}
            />
          </div>
          <div className="main">
            <div className="homepage">
              <div
                className="bg"
                style={
                  hotels[0].image
                    ? { backgroundImage: `url(${hotels[0].image[0]})` }
                    : {}
                }
              ></div>

              {/* welcome  */}
              <div className="welcome">
                <h1 className="row">{hotels[0].name}</h1>
              </div>
            </div>
            <div className="row hotel__infor">
              <div className="row amenities">
                {hotels[0].amenities.map((amenity, index) => (
                  <div className="amenities__item" key={index}>
                    <img src={mappingAmenity(amenity)} alt={amenity}/>
                  </div>
                ))}
              </div>
              <div className="row hotel__infor__item">
                <span>{hotels[0].description}</span>
              </div>
              <div className="col-6" style={{ padding: "2rem" }}>
                <div className="row hotel__infor__item">
                  <Feather name="Mail" />
                  <span>{hotels[0].email}</span>
                </div>

                <div className="row hotel__infor__item">
                  <Feather name="Phone" />
                  <span>{hotels[0].phone}</span>
                </div>

                <div className="row hotel__infor__item">
                  <Feather name="Anchor" />
                  <span>{hotels[0].address}</span>
                </div>

                <div className="row hotel__infor__item">
                  <Feather name="MapPin" />
                  <span>{hotels[0].city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* filter */}

      <AddHotel
        show={addHotel}
        handleClose={() => setAddHotel(false)}
        onAddSuccess={(hotel) => setHotels([...hotels, hotel])}
      />
      <ConfirmModal
        show={deleteHotel}
        handleClose={() => setDeleteHotel(false)}
        msg={"This hotel will be permanently deleted"}
        onConfirm={onDeleteHotel}
      />
    </>
  );
};

export default Hotel;
