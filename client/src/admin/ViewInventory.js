import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { getProducts } from "./helper/adminapicall";

const ViewInventory = () => {
  const [products, setProducts] = useState([]);

  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Inventory" description="View product's stocks and warehouse ">
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span>Admin Home</span>
      </Link>
      <table className="table table-bordered mt-2">
        <thead className="bg-info">
          <tr>
            <th scope="col">Product</th>
            <th scope="col">In Stock</th>
            <th scope="col">Warehouse</th>
          </tr>
        </thead>
        <tbody className="bg-light">
        {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>{product.warehouse.name}</td>
            </tr>
          ))} 
        </tbody>
      </table>
    </Base>
  );
};

export default ViewInventory;
