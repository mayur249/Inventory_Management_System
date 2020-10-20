import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddWarehouse from "./admin/AddWarehouse";
import AddProduct from "./admin/AddProduct";
import ManageWarehouses from "./admin/ManageWarehouses";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Cart from "./core/Cart";
import Home from "./core/Home";
import AdminDashBoard from "./user/AdminDashBoard";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import UserDashBoard from "./user/UserDashBoard";
import ViewInventory from "./admin/ViewInventory";
import ManageOrders from "./admin/ManageOrders";
import CancelOrder from "./admin/CancelOrder";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
        <AdminRoute path="/admin/create/warehouse" exact component={AddWarehouse}/>
        <AdminRoute path="/admin/warehouses" exact component={ManageWarehouses}/>
        <AdminRoute path="/admin/create/product" exact component={AddProduct}/>
        <AdminRoute path="/admin/products" exact component={ManageProducts}/>
        <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
        <AdminRoute path="/admin/inventory" exact component={ViewInventory}/>
        <AdminRoute path="/admin/orders" exact component={ManageOrders}/>
        <AdminRoute path="/admin/order/status/:orderId" exact component={CancelOrder}/>

      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
