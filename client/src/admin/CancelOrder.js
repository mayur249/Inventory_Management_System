import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { incStocks, updateOrderStatus } from "./helper/adminapicall";

const CancelOrder = ({ match }) => {
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setStatus(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    if (status === "Cancelled") {
      updateOrderStatus(match.params.orderId, user._id, token, { status })
        .then((data) => {
          if (data.error) {
            setError(true);
          } else {
            incStocks(user._id, token, data)
              .then((prod) => {
                if (prod.error) {
                  setError(true);
                } else {
                  console.log(prod);
                  setError("");
                  setSuccess(true);
                  setStatus("");
                }
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    } else {
      setError(true);
    }
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Order cancelled successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to cancel the order</h4>;
    }
  };

  const orderCancelForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">
          Are you sure you want to cancel the order? if yes then re-type this:
          <strong style={{ color: "#000" }}> "Cancelled"</strong>
        </p>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          onChange={handleChange}
          value={status}
        />
        <button className="btn btn-dark" onClick={onSubmit}>
          Cancel Order
        </button>
        <Link to="/admin/orders">
          <span className="btn btn-dark ml-2">Go Back</span>
        </Link>
      </div>
    </form>
  );

  return (
    <Base className="container bg-info p-4">
      <div className="row bg-white rounded">
        <div className="col-md-8 offset md-2">
          {successMessage()}
          {warningMessage()}
          {orderCancelForm()}
        </div>
      </div>
    </Base>
  );
};

export default CancelOrder;
