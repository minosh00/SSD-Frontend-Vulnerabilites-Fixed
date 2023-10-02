import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMenuById, updateMenuByID } from "./services/MenuServices";
import { MDBBtn } from "mdb-react-ui-kit";
import { ValidateAddNewMenu } from "./Validation";

const EditMenu = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setfoodName] = useState("");
  const [price, setprice] = useState("");
  const [images, setimages] = useState("");
  const [description, setDescription] = useState("");

  const handleName = (e) => {
    setfoodName(e.target.value);
  };

  const handlePrice = (e) => {
    setprice(e.target.value);
  };

  const handleImages = (e) => {
    setimages(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const GetData = async () => {
    let data = await getMenuById(id);
    console.log("Update Menu", data);
    setfoodName(data?.data?.name);
    setprice(data?.data?.price);
    setimages(data?.data?.images);
    setDescription(data?.data?.description);
  };

  useEffect(() => {
    GetData();
  });

  const UpdateData = async (e) => {
    e.preventDefault();
    let newdata = {
      name: name,
      price: price,
      images: images,
      description: description,
    };
    let validate = ValidateAddNewMenu(newdata);
    let msg = validate?.message.toString();
    console.log(msg);
    if (validate.status === false) {
      Swal.fire({
        toast: true,
        icon: "warning",
        html: `<span>${msg}</span>`,
        animation: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
      });
    } else {
      let data = await updateMenuByID(id, newdata);
      console.log("Update Success ", data);
      if (!data?.data?.name) {
        Swal.fire("Congrats", "Update Menu Successfully", "success");
        navigate("/AllMenus");
      } else {
        Swal.fire("Congrats", "Update Menu Successfully ", "success");
        navigate("/AllMenus");
      }
    }
  };

  return (
    <div>
      <div className="container shadow border border-5 my-5 mx-auto w-50">
        <div className="col p-3">
          <h3 className="fw-bolder mb-4">
            <center>Update Menu Details</center>
          </h3>
          <form>
            <div className="row py-3">
              <div className="col-md-6">
                <label htmlFor="name"> Name </label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={handleName}
                  placeholder="Enter Food Name"
                  required=""
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="type"> Price (LKR) </label>
                <input
                  className="form-control"
                  id="type"
                  value={price}
                  onChange={handlePrice}
                  placeholder="Enter Price (LKR)"
                  required
                />
              </div>
            </div>
            <div className="col-md-12">
              <label htmlFor="features"> Image URL </label>
              <textarea
                className="form-control"
                type="text"
                value={images}
                onChange={handleImages}
                placeholder="Enter Image URL"
                rows="3"
                required
              />{" "}
              <br />
            </div>
            <div className="col-md-12">
              <label htmlFor="description"> Description </label>
              <textarea
                className="form-control"
                type="text"
                value={description}
                onChange={handleDescription}
                placeholder="Enter Description"
                rows="6"
                required
              />
            </div>{" "}
            <br />
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <MDBBtn
                rounded
                color="danger"
                type="submit"
                onClick={(e) => UpdateData(e)}
                className="btn btn-warning"
              >
                {" "}
                Update Menu{" "}
              </MDBBtn>

              <Link to="/">
                <MDBBtn
                  rounded
                  color="warning"
                  type="submit"
                  className="btn btn-success"
                >
                  Back to Home{" "}
                </MDBBtn>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMenu;
