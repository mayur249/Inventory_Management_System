import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
  getWarehouses,
  deleteWarehouse,
  deleteProduct,
} from "./helper/adminapicall";

const ManageWarehouses = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [count, setCount] = useState(0);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getWarehouses().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setWarehouses(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisWarehouse = (warehouseId) => {
    deleteProduct(warehouseId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>
          {/* {
                warehouses.map((warehouse, index) => {
                    return(
                        <h3 className="text-white" key={index}>
                            {warehouse.name}
                        </h3>
                    )
                })
            } */}
          {warehouses.map((warehouse, index) => (
            <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{warehouse.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/product/update/productId`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button
                  onClick={() => {
                    // deleteThisWarehouse(warehouse._id);
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default ManageWarehouses;
