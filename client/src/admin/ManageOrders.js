import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getOrders, updateOrderStatus } from "./helper/adminapicall";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  // const [id, setId] = useState(0);
  const [confirm, setConfirm] = useState(true);
  const [error, setError] = useState("");

  const { user, token } = isAuthenticated();

  const preload = () => {
    getOrders(user._id, token).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };


  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Orders" description="Manage and View your orders here">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
     <table className="table table-bordered mt-2">
        <thead className="bg-info">
          <tr>
            <th scope="col">Customer Name</th>
            <th scope="col">Product</th>
            <th scope="col">Quantity Requested</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody className="bg-light">
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.user.name}</td>
              <td>{order.products[0].name}</td>
              <td>{order.products.length}</td>
              <td>
                {(order.status === "Confirmed") && (
                  <span className="btn btn-success mr-2">
                    {order.status}
                  </span>
                )}
                {(order.status === "Confirmed") && (
                  <Link
                    to={`/admin/order/status/${order._id}`}
                  >
                    <span
                      className="btn btn-danger mr-2"
                    >
                      Cancel Order
                    </span>
                  </Link>
                )}
                {(order.status !== "Confirmed") && (
                  <span className="btn btn-danger mr-2">Cancelled</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Base>
  );
};

export default ManageOrders;
