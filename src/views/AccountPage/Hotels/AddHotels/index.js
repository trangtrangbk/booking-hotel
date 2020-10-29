import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { cityList } from "../../../../utils/cityUtil";
import { storage } from "../../../../firebase/firebase";
import service from "../../../../service/service";
import {
  Modal,
  Button,
  TextArea,
  TextField,
  Dropdown,
  Spinner,
} from "../../../../components";
import { useSelector } from "react-redux";

const AddHotel = ({ show, handleClose,onAddSuccess}) => {
  const [picture, setPicture] = useState([]);
  const [city, setCity] = useState("");
  const [name, set_name] = useState("");
  const [description, set_description] = useState("");
  const [email, set_email] = useState("");
  const [phone, set_phone] = useState("");
  const [address, set_address] = useState("");
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);

  const [msg, setMsg] = useState("");
  const onDrop = (pic) => {
    setPicture(pic);
  };

  const handleAddHotel = (e) => {
    e.preventDefault();

    if (city === "") {
      setMsg("Please fill all fields");
      return;
    }
    setLoading(true);
    handleFireBaseUpload()
      .then((image) => {
        const params = {
          accountId: user._id,
          image,
          name,
          address,
          city,
          email,
          phone,
          description,
        };
        service
          .post("/hotels", params)
          .then((res) => {
            onAddSuccess(res.data);
            handleClose();
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setMsg("Something went wrong when upload image, please try later");
      });
  };

  const handleFireBaseUpload = async () => {
    let result = await Promise.all(
      picture.map((el) => {
        return new Promise((resolve, reject) => {
          const uploadTask = storage.ref(`images/${el.name}`).put(el);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // console.log("Upload is " + progress + "% done");
            },
            reject,
            () => {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                  let data = { ...picture, imageUrl: [] };
                  data.imageUrl.push({ downloadURL, alt: el.alt });
                  resolve(data);
                });
            }
          );
        });
      })
    );
    return result.map((i) => i.imageUrl[0].downloadURL);
  };
  return (
    <Modal show={show} handleClose={handleClose} maxWidth={1200}>
      <div className="modal__title">
        Create your hotel by fill the below fields
      </div>
      <div className="modal__content">
        <div className="row">
          <span style={{ color: "#de1414cf", fontSize: "15px" }}>{msg}</span>
        </div>
        <form onSubmit={handleAddHotel}>
          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="form-group" style={{ width: "100%" }}>
                  <label>Name</label>
                  <TextField
                    onChange={(e) => set_name(e.target.value)}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group" style={{ width: "100%" }}>
                  <label>Description</label>
                  <TextArea
                    onChange={(e) => set_description(e.target.value)}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group" style={{ width: "100%" }}>
                  <label>Image</label>
                  <ImageUploader
                    withPreview
                    withIcon={true}
                    buttonText="Choose images"
                    onChange={(pic) => onDrop(pic)}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                  />
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row">
                <div className="form-group" style={{ width: "100%" }}>
                  <label>Email</label>
                  <TextField
                    onChange={(e) => set_email(e.target.value)}
                    type="email"
                    required
                  />
                </div>

                <div className="form-group" style={{ width: "100%" }}>
                  <label>Phone</label>
                  <TextField
                    onChange={(e) => set_phone(e.target.value)}
                    type="text"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-6 no-padding">
                    <div className="form-group" style={{ width: "100%" }}>
                      <label>Address</label>
                      <TextField
                        onChange={(e) => set_address(e.target.value)}
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-6" style={{ paddingRight: "0" }}>
                    <div className="form-group" style={{ width: "100%" }}>
                      <label>City</label>
                      <Dropdown
                        onChange={(e) => setCity(e.value)}
                        defaultValue={{ value: city, label: city }}
                        options={cityList.map((c) => {
                          return {
                            value: c,
                            label: c,
                          };
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-flex-end">
            <Button
              customClass="btn--block btn--primary"
              style={{ width: "100px" }}
              htmlType="submit"
              type="primary"
            >
              <strong>Add</strong>
            </Button>
          </div>
        </form>
      </div>
      {loading && <Spinner />}
    </Modal>
  );
};
export default AddHotel;
