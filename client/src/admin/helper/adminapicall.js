const { API } = require("../../backend");

//category calls
export const createWarehouse = (userId, token, warehouse) => {
  return fetch(`${API}/warehouse/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(warehouse),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get all warehouses
export const getWarehouses = () => {
  return fetch(`${API}/warehouse`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};


//delete a warehouse
export const deleteWarehouse = (warehouseId, userId, token) => {
  return fetch(`${API}/warehouse/${warehouseId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    return response.json();
  })
  .catch((err) => console.log(err));
};

//update a warehouse
export const updateWarehouse = (warehouseId, userId, token, warehouse) => {
  return fetch(`${API}/warehouse/${warehouseId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: warehouse,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}

//products calls

//create a product
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};



//get all products

export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//delete a product

export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get a product

export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

//update a product

export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


//Order Calls

export const getOrders = (userId, token) => {
  return fetch(`${API}/order/all/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export const updateOrderStatus = (orderId, userId, token, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(status),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}

export const incStocks = (userId, token, orderData) => {
  return fetch(`${API}/order/incstock/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}