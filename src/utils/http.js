import axios from 'axios'
import { Promise } from 'core-js'

class Http {
    constructor(options) {
        const config = {
            // baseURL: this.baseURL,
            timeout: 10000,
            withCredentials: true,
            xsrfHeaderName:'Authorization',
            ...options
        }
        const apiList = options.apiList
        delete config.apiList
        this.config = config
        this.service = axios.create(config)
        this.setInterceptors()
        this.request = options => {
            let dOptions = { ...options }
            if (dOptions.name && apiList) {
                let defaultOpt = apiList[options.name]
                let addUrl = ''
                if (dOptions.rest && defaultOpt.rest) {
                    addUrl = '/' + dOptions.rest.join('/')
                }
                Object.assign(defaultOpt, dOptions)
                defaultOpt.url += addUrl
                dOptions = defaultOpt
                delete dOptions.rest
            }
            return new Promise((resolve, reject) => {
                this.service(dOptions)
                    .then(data => {
                        if (dOptions.success) {
                            dOptions.success(data)
                        } else {
                            resolve(data)
                        }
                    })
                    .catch(err => {
                        if (dOptions.error) {
                            dOptions.error(err)
                        } else {
                            reject(err)
                        }
                    })
            })
        }
    }

    setInterceptors() {
        this.service.interceptors.request.use(config => {
            this.config.beforeRequest && this.config.beforeRequest(config)
            return config
        }, err => {
            let errorHandler = this.config.requestErrorHandler || Promise.reject
            return errorHandler(err)
        })

        this.service.interceptors.response.use(response => {
            this.config.beforeResponse && this.config.beforeResponse(response)
            if (response.config.responseType == 'blob') {
                return response
            } else {
                return response.data
            }
        }, err => {
            if (this.config.responseErrorHandler) {
                this.config.responseErrorHandler(err)
                return
            }
            if (err.response) {
                // 响应错误码处理
                return Promise.reject(err.response)
            }
            if (err.request) {
                // 请求超时处理
                if (err.request.readyState === 4 && err.request.status === 0) {
                    // 当一个请求在上面的timeout属性中设置的时间内没有完成，则触发超时错误
                    return Promise.reject('request overtime')
                }
                console.log('err.request: ', err)
                return Promise.reject(err.request)
            }
            if (!window.navigator.onLine) {
                // 断网处理
                return Promise.reject('network disconnection')
            }
            console.log('err: ', err)
            return Promise.reject(err)
        })
    }
}

export default Http