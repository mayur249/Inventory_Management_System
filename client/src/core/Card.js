import { add } from "lodash";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Base from "./Base";
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const [error, setError] = useState(false);
  const [stock, setStock] = useState(0);

  const cardTitle = product ? product.name : "Default Title";
  const cardDescription = product ? product.description : "Description";
  const cardPrice = product ? product.price * stock : "DEFAULT";
  const cartCardPrice = product ? product.price : "DEFAULT";

  const addtoCart = () => {
    addItemToCart(product, () => setRedirect(true), stock);
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addtoCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  const handleChange = (event) => {
    if (product.stock - event.target.value < 0) {
      setError(true);
    } else {
      setError(false);
      if (event.target.value >= 0) {
        setStock(event.target.value);
      } else {
        setStock(1);
      }
    }
  };

  const warningMessage = () => {
    if (error) {
      return (
        <h4 className="text-white bg-danger">ERROR: Stock limit exceeded</h4>
      );
    }
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      {warningMessage()}
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        {(addToCart && (
          <p className="btn btn-success rounded  btn-sm px-4">${cardPrice}</p>
        )) ||
          (removeFromCart && (
            <p className="btn btn-success rounded  btn-sm px-4">
              ${cartCardPrice}
            </p>
          ))}
        {addToCart && (
          <input
            onChange={handleChange}
            type="number"
            className="form-control"
            placeholder="Stock"
            value={stock}
          />
        )}
        <div className="row">
          <div className="col-12">{!error && showAddToCart(addToCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
