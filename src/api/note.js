import axios from '@/libs/api.request'

/**
 * 获取当前人员所有待办事项
 * @returns {*|never|AxiosPromise<any>|ClientRequest|ClientHttp2Stream}
 */
export const getUntreat = (params) =>{
  return axios.request({
    url: 'note/getUntreatList',
    method: 'get',
    params:params
  })
}

/**
 * 获取当前人员所有已办事项
 * @returns {*|never|AxiosPromise<any>|ClientRequest|ClientHttp2Stream}
 */
export const getTreated = (params) =>{
  return axios.request({
    url: 'note/getTreatedList',
    method: 'get',
    params:params
  })
}

/**
 * 获取当前人员所有备忘事项
 * @returns {*|never|AxiosPromise<any>|ClientRequest|ClientHttp2Stream}
 */
export const getMemo = (params) =>{
  return axios.request({
    url: 'note/getMemoList',
    method: 'get',
    params:params
  })
}

export const getMemoById = (params) =>{
  return axios.request({
    url: 'note/getMemoById',
    method: 'get',
    params:params
  })
}

/**
 * 根据id删除备份事项
 * @returns {*|never|AxiosPromise<any>|ClientRequest|ClientHttp2Stream}
 */
export const delNote = (data) =>{
  return axios.request({
    url: 'note/delNote',
    method: 'delete',
    params:data
  })
}

/**
 * 根据id编辑备份事项
 * @returns {*|never|AxiosPromise<any>|ClientRequest|ClientHttp2Stream}
 */
export const ediNote = (id) =>{
  return axios.request({
    url: 'note/ediNote',
    method: 'post',
    data:id
  })
}

/**
 * 更新事项类型:待办-已办
 * @param data
 * @returns {ClientRequest | * | never | AxiosPromise<any> | void | ClientHttp2Stream}
 */
export const updateUntreatToTreated = (data) =>{
  return axios.request({
    url: 'note/updateUntreatToTreated',
    method: 'post',
    data:data
  })
}

/**
 * 更新事项类型:已办-待办
 * @param data
 * @returns {ClientRequest | * | never | AxiosPromise<any> | void | ClientHttp2Stream}
 */
export const updateTreatedToUntreat = (data) =>{
  return axios.request({
    url: 'note/updateTreatedToUntreat',
    method: 'post',
    data:data
  })
}

/**
 * 添加备忘事项
 * @returns {*|never|AxiosPromise<any>|ClientRequest|ClientHttp2Stream}
 */
export const addMote = (data) =>{
  return axios.request({
    url: 'note/addMote',
    method: 'post',
    data:data
  })
}
