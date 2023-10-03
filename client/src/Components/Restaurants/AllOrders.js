import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../configs/Url.json";

const AllOrders = () => {
  const [searchItem, ] = useState("");
  const [orders, setOrders] = useState([]);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/orders/`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container shadow my-5 mx-auto">
      <br />
      <br />
      <br />
      <h3 className="fw-bolder mb-4">
        <center>All Orders</center>
        <hr />
      </h3>
      <br />

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">Customer Name</th>
            <th scope="col">Street</th>
            <th scope="col">City</th>
            <th scope="col">Order Details</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {orders &&
            orders
              .filter((order) => {
                if (searchItem === "") {
                  return true;
                } else {
                  return order._id.toLowerCase().includes(searchItem.toLowerCase());
                }
              })
              .map((order) => (
                <tr key={order._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{order.user?.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{order.user?.street}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{order.user?.city}</p>
                  </td>
                  <td>
                    <table className="table">
                      <thead className="table-primary">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        {order.orderedItems.map((item) => (
                          <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.amount}</td>
                            <td>LKR: {item.price} /=</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
