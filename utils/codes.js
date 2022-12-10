exports.commonmessage = (json) => {
    return {
        data : json
    }
}

exports.PAGINATION = 10;

exports.exceptionmessage = (msg) => {
    return {
        msg
    }
}