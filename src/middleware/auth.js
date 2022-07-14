const jwt = require("jsonwebtoken");

const authentication = async function (req, res, next) {
    try {
        const token = req.headers['x-api-key'];
        if (!token) {
            return res.status(400).send({status:false, message:"token in header is missing"})
        }
        const decodedToken = jwt.verify(token, "functionUp-project-3");
        if (!decodedToken) {
           return res.status(401).send({status:false, message:"token is invalid"})
        }
        req.decodedToken = decodedToken;
        next();
    } catch (err) {
         res.status(500).send({ status: false, msg: err.message }) 
    }
}

module.exports.authentication = authentication;