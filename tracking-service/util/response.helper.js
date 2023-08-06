const RestResponse = {
    success: (value,message,code) => {
        return {
            code,value,message
        }
    },
    error: (error,code) => {
        return {
            code,error
        }
    }
}

module.exports = RestResponse;