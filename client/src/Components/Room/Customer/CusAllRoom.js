/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { DatePicker, Space } from 'antd';
import moment from 'moment'
import { StartUrl } from "../../../configs/Url.json";

const CusAllRooms = () => {
  const { RangePicker } = DatePicker;
  const [serachItem, setserachItem] = useState("");
  const [users, setusers] = useState([]);
  const [show, setShow] = useState(false);
  const [adult, setAdult] = useState("");
  const [children, setChildren] = useState("");
  const [bedroom, setBedroom] = useState("");
  const [fromdate, setFromdate] = useState("");
  const [todate, setTodate] = useState("");

  useEffect(async () => {
    try {
      const data = await (
        await axios.get(`${StartUrl}api/rooms/`)
      ).data;
      setusers(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  function filterbyDate(dates) {
    const fromDate = moment(dates[0]).format('YYYY-MM-DD');
    const toDate = moment(dates[1]).format('YYYY-MM-DD');
    setFromdate(fromDate);
    setTodate(toDate);
  }

  function SearchAdult() {
    axios.get(`${StartUrl}api/rooms/adult/${adult}`)
      .then(res => {
        console.log(res.data)
        setusers(res.data)
      }).catch(err => console.error(err))
  }

  function SearchChildren() {
    axios.get(`${StartUrl}api/rooms/children/${children}`)
      .then(res => {
        console.log(res.data)
        setusers(res.data)
      }).catch(err => console.error(err))
  }

  function SearchBedroom() {
    axios.get(`${StartUrl}api/rooms/bedroom/${bedroom}`)
      .then(res => {
        console.log(res.data)
        setusers(res.data)
      }).catch(err => console.error(err))
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container">
      <br /><br /><br />
      <div className="row">
        <div className="col-md-6 mx-auto">
          <input
            type="search"
            className="form-control"
            placeholder="Search by Room Name"
            aria-label="Search"
            onChange={event => { setserachItem(event.target.value) }}
            aria-describedby="search-addon"
          />
        </div>
      </div>
      <br></br><br></br>
      <div className="row">
        <div className="col-md-3">
          <Space direction="vertical" size={12}>
            <RangePicker
              className="date"
              format='DD-MM-YYYY'
              onChange={filterbyDate}
            />
          </Space>
        </div>
        <div className="col-md-3">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <select
              className='form-control select-btn'
              name="adult"
              id="adult"
              value={adult}
              onChange={e => setAdult(e.target.value)}
            >
              <option>Adult</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <Button
              className='btn btn-dark search-btn'
              onClick={SearchAdult}
            >
              Search
            </Button>
          </div>
        </div>

        <div className="col-md-3">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <select
              className='form-control select-btn'
              name="gid"
              id="gid"
              value={children}
              onChange={e => setChildren(e.target.value)}
            >
              <option>Children</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            <Button
              className='btn btn-dark search-btn'
              onClick={SearchChildren}
            >
              Search
            </Button>
          </div>
        </div>

        <div className="col-md-3">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <select
              className='form-control select-btn'
              name="gid"
              id="gid"
              value={bedroom}
              onChange={e => setBedroom(e.target.value)}
            >
              <option>BedRoom</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
            <Button
              className='btn btn-dark search-btn'
              onClick={SearchBedroom}
            >
              Search
            </Button>
          </div>
          <br />
          <br />
        </div>
      </div>

      <div className="">
        <div className="container">
          {users &&
            users.filter((user) => {
              if (serachItem === "") {
                return true;
              } else if (user.type.toLowerCase().includes(serachItem.toLowerCase())) {
                return true;
              }
              return false;
            }).map((user) => (
              <div className="row bs" key={user._id}>
                <br></br>
                <h3> {user.name}</h3>
                <br /><br />
                <div className="col-md-7">
                  <img src={user.imageurls[0]} className="smallimg" alt="" />
                </div>

                <div className="col-md-5">
                  <h5> <b>{user.type} Room</b></h5> <br />
                  <h5> <b>Features:</b> </h5>
                  <p className="feat">{user.features}</p> <br />
                  <h6> <b>Rent Per Day:</b> LKR {user.rentperday}.00 /=</h6> <br />
                  <div className="row">
                    <div className="col-md-6">
                      <h6> <b>Max Count: </b> 0{user.maxcount} </h6> <br />
                    </div>
                    <div className="col-md-6">
                      <h6> <b>Adult: </b> 0{user.adult} </h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h6> <b>Children: </b> 0{user.children} </h6>
                    </div>
                    <div className="col-md-6">
                      <h6> <b>BedRoom: </b> 0{user.bedroom} </h6>
                    </div>
                  </div>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                      <Modal.Title><center><b>{user.type} Room</b></center></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Carousel prevLabel='' nextLabel=''>
                        {user.imageurls.map(url => (
                          <Carousel.Item key={url}>
                            <img className='d-block w-100 bigimg' src={url} alt="" />
                            <h5> {user.description}</h5>
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <br /> <br />
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className='btn btn-danger' onClick={handleShow}>View Details</button>
                    <Link to={`/updateRoomsByIDcus/${user._id}/${fromdate}/${todate}`}>
                      <button className='btn btn-success'>Book Room</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default CusAllRooms;
