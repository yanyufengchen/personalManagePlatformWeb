import HttpRequest from '@/libs/axios'
// import config from '@/config'
// const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

const axios = new HttpRequest('/person/api/v1')
export default axios