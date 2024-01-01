const constants = require("../constants");

exports.errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500 ;
    switch (statusCode) {
        case constants.constants.VALIDATION_ERROR:
            res.json({
                title: "VALIDATION_ERROR",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case constants.constants.UNAUTHORIZED:
            res.json({
                title: "UNAUTHORIZED",
                message: err.message,
                stackTrace: err.trace
            });
            break;

        case constants.constants.FORBIDDEN:
            res.json({
                title: "FORBIDDEN",
                message: err.message,
                stackTrace: err.trace
            });
            break;

        case constants.constants.NOT_FOUND:
            res.json({
                title: "NOT_FOUND",
                message: err.message,
                stackTrace: err.trace                
            });
            break;

        case constants.constants.SERVER_ERROR:
            res.json({
                title: "SERVER_ERROR",
                message: err.message,
                stackTrace: err.trace
            });
            break;
    
        default:
            console.log("OK");

            break;
    }
};