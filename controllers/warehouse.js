const Warehouse = require("../models/warehouse");

exports.getWarehouseById = (req , res, next, id) => {
    Warehouse.findById(id).exec((err, ware) => {
        if(err){
            res.status(400).json({
                error: "Warehouse not found in DB"
            })
        }
        req.warehouse = ware;
        next();
    })
}

exports.createWarehouse = (req, res) => {
    const warehouse = new Warehouse(req.body);
    warehouse.save((err, warehouse) => {
        if(err) {
            return res.status(400).json({
                error: "Not able save the warehouse in DB"
            });
        }
        res.json({warehouse});
    });
}

exports.getWarehouse = (req, res) => {
    return res.json(req.warehouse);
}

exports.getAllWarehouse = (req, res) => {
    Warehouse.find().exec((err, warehouses) => {
        if(err) {
            return res.status(400).json({
                error: "No warehouse found"
            });
        }
        res.json(warehouses);
    });
}

exports.updateWarehouse = (req, res) => {
    const warehouse = req.warehouse;
    warehouse.name = req.body.name;
    warehouse.save((err, updatedWarehouse) => {
        if(err) {
            return res.status(400).json({
                error: "Failed to update warehouse"
            });
        }
        res.json(updatedWarehouse);
    });
}

exports.removeWarehouse = (req, res) => {
    const warehouse = req.warehouse;
    warehouse.remove((err, warehouse) => {
        if(err) {
            return res.status(400).json({
                error: "Failed to remove warehouse"
            });
        }
        res.json({
            message: `Successfully removed ${warehouse.name} warehouse`
        });
    })
}