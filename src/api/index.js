import api from './http'
export const  urlPrefix = {
     baseURL: 'http://localhost:8080',

}

export const commonAPI = {
    fetchNewsList() {
        return api.getPromise('GET', `${urlPrefix.baseURL}/api/testData/FindData`)
    }
}


export default {
    commonAPI
}





