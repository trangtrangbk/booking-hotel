import React, { useEffect, useState } from "react";
import { Feather } from "../../../components";
import AddHotel from "./AddHotels";
import service from "../../../service/service";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ConfirmModal from "../../../components/ConfirmModal";

const Hotel = () => {
  const [addHotel, setAddHotel] = useState(false);
  const [deleteHotel, setDeleteHotel] = useState(false);

  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);
  const fetchOwnHotels = () => {
    service
      .get("/hotels", { params: { filter: { accountId: user._id } } })
      .then((res) => {
        console.log(res);
        setHotels(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOwnHotels();
  }, []);
 const onDeleteHotel = ()=>{
  service
  .delete(`/hotels/${selectedHotel._id}`,{hotelId : selectedHotel._id})
  .then((res) => {
    console.log(res);
    const temp = [...hotels];
    const index = temp.findIndex(h => h._id === selectedHotel._id)
    temp.splice(index,1)
    setHotels(temp);
    setDeleteHotel(false);
  })
  .catch((err) => {
    console.log(err);
    setLoading(false);
  });
 }
  return (
    <div>
      <div className="row justify-flex-end">
        <Feather
          name="PlusCircle"
          color="#FF8939"
          className="cursor_pointer"
          onClick={() => setAddHotel(true)}
        />
      </div>
      {/* filter */}
      <div className="row">
        {hotels.map((hotel) => (
          <div key={hotel._id} className="hotel__item col-md-5">
            <div className="bg"></div>
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
                  <span className="hotel__city mx-auto">{hotel.city}</span>
                </div>
                <div className="visit_button">
                  <NavLink to={`/hotels/${hotel._id}`}>Visit</NavLink>
                </div>
              </div>
            </div>
            <div className="action">
              <Feather name="Eye"/>
              <Feather name="Edit2" />
              <Feather name="Trash" onClick= {()=>{
                setDeleteHotel(true);
                setSelectedHotel(hotel)
              }} />
            </div>
          </div>
        ))}
      </div>
      <AddHotel
        show={addHotel}
        handleClose={() => setAddHotel(false)}
        onAddSuccess={(hotel) => setHotels([...hotels, hotel])}
      />
       <ConfirmModal
        show={deleteHotel}
        handleClose={() => setDeleteHotel(false)}
        msg = {"This hotel will be permanently deleted"}
        onConfirm = {onDeleteHotel}
      />
    </div>
  );
};

export default Hotel;
