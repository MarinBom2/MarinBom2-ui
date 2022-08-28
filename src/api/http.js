import axios from 'axios'
import { customParamsSerializer } from "@/utils";

const getPromise = (method, uri, data = null, options = null) => {


    const config = {
        method: method,
        url: uri,
        ...options,
        headers: {
            ...(options && options.headers),
        },
    }

    if (method.toUpperCase() === 'GET') {
        config.params = data
        config.paramsSerializer = params => customParamsSerializer(params)
    } else {
        config.data = data
    }

    return axios(config).then(response => {
        if (response) {
            return Promise.resolve(response.data)
        }
    }).catch(error => {
        if (error.response && error.response.status === 401) {
            return
        }
        return Promise.reject(error)
    })
}


export default {
    getPromise
}