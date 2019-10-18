import axios from '@/libs/api.request'

/**
 * 获取个人全部教育经历
 * @returns {*|never|AxiosPromise<any>|http.ClientRequest|ClientHttp2Stream|void}
 */
export const personMessage = () => {
  return axios.request({
    url: 'manage/message',
    method: 'get'
  })
}

/**
 * 添加教育经历
 * @param data
 * @returns {*|never|AxiosPromise<any>|http.ClientRequest|ClientHttp2Stream|void}
 */
export const addEducation = (data) => {
  return axios.request({
    url:'manage/addEdu',
    method:'post',
    data: data
  })
}

/**
 * 根据Id删除教育经历
 * @param data
 * @returns {*|never|AxiosPromise<any>|http.ClientRequest|ClientHttp2Stream|void}
 */
export const delEducation = (data) =>{
  return axios.request({
    url:'manage/deleteEdu',
    method:'delete',
    params: data
  })
}

/**
 * 根据ID编辑教育经历信息
 * @param data
 * @returns {*|never|AxiosPromise<any>|http.ClientRequest|ClientHttp2Stream|void}
 */
export const editEducation = (data) =>{
  return axios.request({
    url:'manage/editEdu',
    method:'post',
    data: data
  })
}

/**
 * 根据id获取教育信息
 * @param data
 * @returns {*|never|AxiosPromise<any>|http.ClientRequest|ClientHttp2Stream|void}
 */
export const getEduById = (data) =>{
  return axios.request({
    url:'manage/getEduById',
    params:data,
    method:'get'
  })
}
