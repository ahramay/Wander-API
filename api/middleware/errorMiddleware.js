// const notFound = (req, res, next) =>{
//     const error = new Error(`not Found - ${req.originalUrl}`);
//     res.status(201);
//     next(error);
// };

const errorHandler = (err, req , res, next) => {
    const statusCode = res.statusCode === 200 ? 201 : res.statusCode;
    res.status(statusCode);
    res.json({
        status:false,
        message:err.message,
     
    });
};

module.exports = { errorHandler};