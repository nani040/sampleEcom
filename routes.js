const config = require('./config').config

module.exports = function(app,db){

    app.get("/orders/all", (req, res)=>{
        db.find(config.orderColl, {}, (err, data)=>{
            res.status(200).send({data: data})
        })
    })

    app.post("/orders/search", (req, res)=>{
        if(req.body.order_id){
            let findOrderQuery = {
                order_id : req.body.order_id
            }
            db.find(config.orderColl, findOrderQuery, (err, data)=>{
                if(err){
                    return res.status(500).send({
                        status: false,
                        msg : err
                    })
                }
                return res.status(200).send({
                    status: true,
                    msg: "order details",
                    data: data
                })
            })
        }else{
            res.status(400).send({
                status: false,
                msg: "required parameters are missing"
            })
        }
    })

    app.post('/orders/create', (req, res) => {
        if(req.body.order_id && req.body.item_name){
            let findOrderQuery = {
                order_id : req.body.order_id
            }
            db.find(config.orderColl, findOrderQuery, (err, data)=>{
                if(err){
                    return res.status(500).send({
                        status: false,
                        msg : err
                    })
                }
                if(data.length > 0){
                    return res.status(400).send({
                        status: false,
                        msg : "already have same order_id"
                    })
                }else{
                    db.insert(config.orderColl, req.body, (orderErr, orderInfo)=>{
                        if(orderErr){
                            return res.status(500).send({
                                status: false,
                                msg : orderErr
                            })
                        }else{
                            return res.status(200).send({
                                status: true,
                                msg : "order placed"
                            })
                        }
                    })
                }
            })
        }else{
            res.status(400).send({
                status: false,
                msg: "required parameters are missing"
            })
        }
    })

    app.post('/orders/update', (req, res) => {
        if(req.body.order_id && req.body.delivery_date){
            let findOrderQuery = {
                order_id : req.body.order_id
            }
            db.find(config.orderColl, findOrderQuery, (err, data)=>{
                if(err){
                    return res.status(500).send({
                        status: false,
                        msg : err
                    })
                }
                if(data.length > 0){
                    let updateData = {
                        delivery_date : req.body.delivery_date
                    }
                    db.update(config.orderColl, findOrderQuery, updateData, (orderErr, orderInfo)=>{
                        if(orderErr){
                            return res.status(500).send({
                                status: false,
                                msg : orderErr
                            })
                        }else{
                            return res.status(200).send({
                                status: true,
                                msg : "order updated"
                            })
                        }
                    })
                }else{
                    return res.status(400).send({
                        status: false,
                        msg : "order not found"
                    })
                }
            })
        }else{
            res.status(400).send({
                status: false,
                msg: "required parameters are missing"
            })
        }
    })

    

    app.post("/orders/list", (req, res)=>{
        if(req.body.order_date){
            let findOrderQuery = {
                order_date : req.body.order_date
            }
            db.find(config.orderColl, findOrderQuery, (err, data)=>{
                if(err){
                    return res.status(500).send({
                        status: false,
                        msg : err
                    })
                }
                return res.status(200).send({
                    status: true,
                    msg: "order details",
                    data: data
                })
            })
        }else{
            res.status(400).send({
                status: false,
                msg: "required parameters are missing"
            })
        }
    })

    app.post("/orders/delete", (req, res)=>{
        if(req.body.order_id){
            let findOrderQuery = {
                order_id : req.body.order_id
            }
            db.find(config.orderColl, findOrderQuery, (err, data)=>{
                if(err){
                    return res.status(500).send({
                        status: false,
                        msg : err
                    })
                }
                if(data.length > 0){
                    db.remove(config.orderColl, findOrderQuery, (err, data)=>{
                        if(err){
                            return res.status(500).send({
                                status: false,
                                msg : err
                            })
                        }
                        return res.status(200).send({
                            status: true,
                            msg: "order removed",
                            data: data
                        })
                    })
                }else{
                    res.status(400).send({
                        status: false,
                        msg: "order not found"
                    })
                }
            })
            
        }else{
            res.status(400).send({
                status: false,
                msg: "required parameters are missing"
            })
        }
    })
}