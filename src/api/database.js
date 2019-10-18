import axios from '@/libs/api.request'

/**
 * 添加备份数据
 * @param data
 * @returns {*|void|ClientRequest|never|AxiosPromise<any>|ClientHttp2Stream}
 */
export const addDataBak = (data) => {
  return axios.request({
    url: 'bak/database/add',
    method: 'post',
    data: data
  })
}

/**
 * 根据备份名获取备份数据
 * @param data
 * @returns {*|void|ClientRequest|never|AxiosPromise<any>|ClientHttp2Stream}
 */
export const getDataBak = (data) => {
  return axios.request({
    url: 'bak/database/getBakList',
    method: 'get',
    params: data
  })
}

/**
 * 删除备份数据
 * @param data
 * @returns {*|void|ClientRequest|never|AxiosPromise<any>|ClientHttp2Stream}
 */
export const deleteBak = (data) => {
  return axios.request({
    method: 'delete',
    url: `bak/database/deleteBak`,
    params: data
  });
}

/**
 * 恢复备份数据
 * @param data
 * @returns {*|void|ClientRequest|never|AxiosPromise<any>|ClientHttp2Stream}
 */
export const renewBak = (data) => {
  return axios.request({
    url: 'bak/database/renew',
    method: 'post',
    data: data
  })
}
