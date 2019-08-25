module.exports = {
    getDataResponse: (res, statusCode, values, totalValues, page, message) => {
        return res.json({
            status: statusCode,
            data: values,
            total: totalValues,
            page: page,
            message: message
        })
    },
    dataResponseEdit: (res, statusCode, message, values) => {
        return res.json({
            status: statusCode,
            message: message,
            data: values
        })
        }
    }