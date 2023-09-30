import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { ValidateAddNewMenu } from "./Validation";
import { MDBBtn } from "mdb-react-ui-kit";

const AddMenu = () => {

    const [name, setfoodName] = useState("");
    const [price, setprice] = useState();
    const [description, setDescription] = useState("");
    const [images, setimages] = useState("");

    const navigate = useNavigate();

    const changeOnClick = (f) => {
        const addmenu = {
            name,
            price,
            description,
            images,
        };
        //test
        let validate = ValidateAddNewMenu(addmenu);
        let msg = validate?.message;
        if (validate.status == false) {
            Swal.fire({
                toast: true,
                icon: 'warning',
                html: alert(`${msg}`),
                animation: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: false,
            });
        } else {
            axios.post("http://localhost:5000/menu/menu", addmenu);
            Swal.fire("Congrats", " New Menu Added  successfully", "success")
            navigate("/AllMenus");;
        }
    };

    return (
        <div>
            <div className="container shadow border border-5 my-5 mx-auto w-50">
                <div className="col p-3">
                    <h3 className=" fw-bolder mb-4"><center>Add New Food</center></h3>
                    <form onSubmit={changeOnClick}>
                        <div className="row py-3">
                            <div className="col-md-6">
                                <label for="name">  Name </label>
                                <input type="text" class="form-control" onChange={(f) => setfoodName(f.target.value)} placeholder="Enter Food Name" required />
                            </div>
                            <div class="col-md-6">
                                <label for="type"> Price (LKR) </label>
                                <input  type="number"class="form-control" id="type" onChange={(f) => setprice(f.target.value)} placeholder="Enter Price (LKR)" required />
                            </div>
                        </div>
                        <div class="col-md-12">
                            <label for="features"> Image URL </label>
                            <textarea class="form-control" type="text" onChange={(f) => setimages(f.target.value)} placeholder="Enter Image URL" rows="3" required /> <br />
                        </div>
                        <div class="col-md-12">
                            <label for="description"> Description   </label>
                            <textarea class="form-control" type="text" onChange={(f) => setDescription(f.target.value)} placeholder="Enter Description" rows="6" required />
                        </div> <br />
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <MDBBtn rounded color="danger" type="submit" className="btn btn-warning"> Add New Menu </MDBBtn>
                            <a><Link to="/AllMenus"><MDBBtn rounded color="warning" type="submit" className="btn btn-success">Back to Home  </MDBBtn></Link></a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMenu;