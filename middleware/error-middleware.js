const errorMiddleware=(err, req, res, next) => {
    res.status(err.status || 404).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
}

module.exports=errorMiddleware;