import axios from 'axios'

class NewAxios {
    constructor() {
        this.timeout = 10000;
        this.withCredentials = true;
    }

    setInterceptors = (instance, url) => {
        instance.interceptors.request.use((config) => {
            if(this.beforeRequest && typeof(this.beforeRequest)=='function'){
                this.beforeRequest(config)
            }
            return config;
        }, err => Promise.reject(err))

        instance.interceptors.response.use((response) => { // 响应拦截器
            if(this.beforeResponse && typeof(this.beforeResponse)=='function'){
                this.beforeResponse(response)
            }
            return response.data;
        }, (err) => {
            if (err.response) {
                // 响应错误码处理
                return Promise.reject(err.response);
            }
            if (err.request) {
                // 请求超时处理
                if (err.request.readyState === 4 && err.request.status === 0) {
                    // 当一个请求在上面的timeout属性中设置的时间内没有完成，则触发超时错误
                }
                console.log('err.request: ', err);
                return Promise.reject(err.request);
            }
            if (!window.navigator.onLine) {
                // 断网处理
                return -1;
            }
            console.log('err: ', err);
            return Promise.reject(err);
        });
    }

    request(options) {
        // 每次请求都会创建新的axios实例。
        const instance = axios.create();
        const config = { // 将用户传过来的参数与公共配置合并。
            ...options,
            baseURL: this.baseURL,
            timeout: this.timeout,
            withCredentials: this.withCredentials,
        };
        // 配置拦截器，支持根据不同url配置不同的拦截器。
        this.setInterceptors(instance, options.url);
        return instance(config); // 返回axios实例的执行结果
    }
}

export default new NewAxios()