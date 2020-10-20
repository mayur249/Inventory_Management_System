import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createWarehouse } from "./helper/adminapicall";

const AddWarehouse = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    createWarehouse(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch((err) => console.log(err));
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Warehouse created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-danger">Failed to create Warehouse</h4>;
    }
  };

  const myWarehouseForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the warehouse:</p>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          onChange={handleChange}
          value={name}
          placeholder="For Ex. Mumbai-South"
        />
        <button className="btn btn-outline-info" onClick={onSubmit}>
          {" "}
          Create Warehouse
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a Warehouse here"
      description="Add a new warehouse for products"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset md-2">
          {successMessage()} {warningMessage()}
          {myWarehouseForm()} {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddWarehouse;
