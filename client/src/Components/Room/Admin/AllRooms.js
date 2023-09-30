import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { DatePicker, Space } from 'antd';
import moment from 'moment'

const AllRooms = () => {

  const { RangePicker } = DatePicker;
  const [serachItem, setserachItem] = useState([]);
  const [users, setusers] = useState();
  const [loading, setloading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [adult, setAdult] = useState();
  const [children, setChildren] = useState();
  const [bedroom, setBedroom] = useState();

  const [fromdate, setFromdate] = useState();
  const [todate, setTodate] = useState();

  useEffect(async () => {
    try {
      const data = await (
        await axios.get("http://localhost:5000/room/getAllRooms/")
      ).data;
      setusers(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }, []);

  function filterbyDate(dates) {
    console.log(moment(dates[0]).format('YYYY-MM-DD'))
    console.log(moment(dates[1]).format('YYYY-MM-DD'))
    setFromdate(moment(dates[0]).format('YYYY-MM-DD'))
    setTodate(moment(dates[1]).format('YYYY-MM-DD'))
  }

  const deleteRoom = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/room/RemoveRooms/${id}`)
      const newRoom = users.filter(user => user._id !== id);
      setusers(newRoom);
    } catch (err) {
      console.log(err);
    }
  }

  function SearchAdult() {
    axios.get(`http://localhost:5000/room/getadult/${adult}`)
      .then(res => {
        console.log(res.data)
        setusers(res.data)
      }).catch(err => console.error(err))
  }

  function SearchChildren() {
    axios.get(`http://localhost:5000/room/getchildren/${children}`)
      .then(res => {
        console.log(res.data)
        setusers(res.data)
      }).catch(err => console.error(err))
  }

  function SearchBedroom() {
    axios.get(`http://localhost:5000/room/getbedroom/${bedroom}`)
      .then(res => {
        console.log(res.data)
        setusers(res.data)
      }).catch(err => console.error(err))
  }

  return (
    <div className="container"><br /><br /><br />
      <div className="row">
        <div class="input-group">
          <div className="col-md-6 mx-auto">
            <input type="search" class="form-control" placeholder="Search by Room Name" aria-label="Search" onChange={event => { setserachItem(event.target.value) }}
              aria-describedby="search-addon" />
          </div>
        </div>
        <br /> <br />

        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <Link to='/AddRoom'>
            <button className='btn btn-secondary'>Add Room</button>
          </Link>
          <Link to='/allbookingsroom'>
            <button className='btn btn-secondary'>All Bookings</button>
          </Link>
        </div>


        <br /> <br /><br />

        <div className="row">
          <div className="col-md-3">
            <Space direction="vertical" size={12}>
              <RangePicker className="date" format='DD-MM-YYYY' onChange={filterbyDate} />
            </Space>
          </div>
          <div className="col-md-3">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <select className='form-control select-btn' name="adult" id="adult" value={adult} onChange={e => setAdult(e.target.value)}>
                <option>Adult</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
              <Button className='btn btn-dark search-btn' onClick={() => { SearchAdult({ adult }) }}>Search</Button>
            </div>
          </div>

          <div className="col-md-3">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <select className='form-control select-btn' name="gid" id="gid" value={children} onChange={e => setChildren(e.target.value)}>
                <option>Children</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
              <Button className='btn btn-dark search-btn' onClick={() => { SearchChildren({ children }) }}>Search</Button>
            </div>
          </div>

          <div className="col-md-3">
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <select className='form-control select-btn' name="gid" id="gid" value={bedroom} onChange={e => setBedroom(e.target.value)} >
                <option>BedRoom</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
              <Button className='btn btn-dark search-btn' onClick={() => { SearchBedroom({ bedroom }) }}>Search</Button>
            </div>
            <br />
            <br />
          </div>
        </div>


        <div className="">
          <div className="container">
            {users &&
              users.filter((users) => {
                if (serachItem == "") {
                  return users
                } else if (users.type.toLowerCase().includes(serachItem.toLowerCase())) {
                  return users
                }
              })

                .map((user) => (
                  <div className="row bs" key={1}><br></br>
                    <h3> {user.name}</h3> <br /><br />
                    <div className="col-md-6"   >
                      <img src={user.imageurls[0]} className="smallimg" alt="" />
                    </div>

                    <div className="col-md-6">
                      <h5> <b>{user.type} Room</b></h5> <br />
                      <h5> <b>Features:</b> </h5>
                      <p className="feat">{user.features}</p> <br />
                      <h6> <b>Rent Per Day:</b> LKR {user.rentperday}.00 /= </h6> <br />
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
                    </div>

                    <Modal show={show} onHide={handleClose}   >
                      <Modal.Header>
                        <Modal.Title><center><b>{user.type} Room</b></center></Modal.Title>
                      </Modal.Header>
                      <Modal.Body >

                        <Carousel prevLabel='' nextLabel=''>
                          {
                            user.imageurls.map(url => {
                              return <Carousel.Item>
                                <img className='d-block w-100 bigimg' src={url} />
                                <h5 id="roomdet" > {user.description} </h5>
                              </Carousel.Item>
                            })
                          }
                        </Carousel>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button className='btn btn-primary' onClick={handleShow}>View Details</button>
                      <Link to={`/updateRoomsByID/${user?._id}`}>
                        <button className='btn btn-success'> Update Room</button>
                      </Link>
                      <button className='btn btn-danger' onClick={() => deleteRoom(user._id)}>Delete Room</button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllRooms