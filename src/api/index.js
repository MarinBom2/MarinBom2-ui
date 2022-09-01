import api from './http'
export const  urlPrefix = {
     baseURL: 'http://localhost:8080',

}
export const commonAPI = {
    fetchNewsList() {
        return api.getPromise('GET', `${urlPrefix.baseURL}/v1/api/testData/FindData`)
    },
    sendAuthMail(data) {
        return api.getPromise('POST', `${urlPrefix.baseURL}/v1/user/authMail/${data}`)
    },
    sendAuthKey(data) {
        return api.getPromise('POST', `${urlPrefix.baseURL}/v1/user/authKey`,data)
    },
    sendUserData(data) {
        return api.getPromise('POST', `${urlPrefix.baseURL}/v1/user/signUp`,data)
    },
    userLogin(data) {
        return api.getPromise('POST', `${urlPrefix.baseURL}/v1/user/login`,data)
    }

}


export default {
    commonAPI
}





