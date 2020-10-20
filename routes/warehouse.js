const express = require("express");
const router = express.Router();
const { getWarehouseById, createWarehouse, getWarehouse, getAllWarehouse, updateWarehouse, removeWarehouse } = require("../controllers/warehouse");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/authentication");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);

router.param("warehouseId", getWarehouseById);

//actual routes

//create routes
router.post(
  "/warehouse/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createWarehouse
);

//read routes
router.get("/warehouse/:warehouseId", getWarehouse);
router.get("/warehouse", getAllWarehouse);

//update route
router.put(
  "/warehouse/:warehouseId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateWarehouse
);

//delete route
router.delete(
  "/warehouse/:warehouseId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeWarehouse
);

module.exports = router;
