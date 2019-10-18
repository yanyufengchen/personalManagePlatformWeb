import axios from 'axios'
import store from '@/store'
import iView from 'iview'
import router from '@/router'
// import { Spin } from 'iview'
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      timeout: 30000,
      withCredentials: true,
      headers: {
        //
      }
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data,status } = res
      if(data != null){
        if (!data.success) {
          // 未登录跳转到登陆页面
          if (data.errorCode === '00000004') {
            router.push({replace: true, name: 'login'})
          } else {
            // 业务请求失败, 统一处理业务错误信息
            if (data.errorMessage) {
              iView.Message.error({
                content: data.errorMessage,
                duration: 5
              })
            }
          }
        }
      }
      return { data,status }
    }, error => {
      this.destroy(url)
      if (error.status == 500 || error.status == 404) {
          iView.Message.error({
            content: "后台服务崩溃，请检查服务！",
            duration: 5
          });
      }
      if (error.response && error.response.data && error.response.data.errorMessage) {
        iView.Message.error({
          content: error.response.data.errorMessage,
          duration: 5
        })
      }
      if (error.message && error.message.indexOf('timeout') > -1) {
        iView.Message.error({
          content: '请求超时, 请稍候再试',
          duration: 3
        })
      }
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
