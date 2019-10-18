import { charAllOne } from '@/libs/tools'

/**
 * 判断对象是否为空
 */
export function validateNull (val) {
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val === 'null' || val === null || val === 'undefined' || val === undefined || val === '') return true
    if (typeof val === 'string' && val.trim() === '') return true
    return false
  }
  return false
}

/**
 * 一个或多个空格
 */
export function validateBlank (val) {
  const blankRegex = /\s+/
  return blankRegex.test(val)
}

/* 合法uri */
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母 */
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validatAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 验证不能全是数字 */
export function validateAllNum (str) {
  const reg = /^[0-9]*$/
  return reg.test(str)
}

/* 起始必须是字母（大小写都可以）或数字，中间可以有连字符、下划线和点
 * 并且不能全是数字
 */
export function validateLabelName (str) {
  // 先验证是不是全是数字
  if (validateAllNum(str)) {
    return false
  }
  const reg = /^[A-Za-z0-9]([-_.A-Za-z0-9]*[A-Za-z0-9])?$/
  return reg.test(str)
}

/* 起始必须是小写字母，中间可以有数字和中横线,不支持大写字母和全数字
 *
 */
export function validateNormalName (str) {
  // 先验证是不是全是数字
  if (validateAllNum(str)) {
    return false
  }
  const reg = /^[a-z]([-a-z0-9]*[a-z0-9])?$/
  return reg.test(str)
}

/* 验证Linux 路劲合法性 */
export function validateLinuxPath (str) {
  if (str === '/') {
    return true
  }
  if (str.startsWith('//') || str.endsWith('//')) {
    return false
  }
  const reg = /^(\/([-_.:0-9a-zA-Z]*)\/?)+$/
  return !charAllOne(str, '/') && reg.test(str)
}

/* 验证环境变量名称命名规则
 * 必须以字母、点、连字符、下划线开头，后面可以接数字
 */
export function validateEnvName (str) {
  const reg = /^[-._a-zA-Z][-._a-zA-Z0-9]*$/
  return reg.test(str)
}

/* 验证菜单英文名称
 * 必须是全英文
 */
export function validateMenuName (str) {
  const reg = /^[-_a-zA-Z]+$/
  return reg.test(str)
}

/**
 * IP地址验证
 */
export function validateIP (str) {
  const reg = /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/
  return reg.test(str)
}

/**
 * 团队名称验证
 * 支持字母大小写 数字 - _ .
 */
export function validateGroupName (str) {
  const reg = /^[-_.a-zA-Z0-9]+$/
  return reg.test(str)
}

/**
 * 项目名称验证
 * 起始为字母大小写 中间可以有数字和中横线 且不以中横线结尾
 */
export function validateProjectName (str) {
  const reg = /^[a-zA-Z]([-a-zA-Z0-9]*[a-zA-Z0-9])$/
  return reg.test(str)
}
/* 验证分支名称
 * 必须是
 */
export function validateBranchName (str) {
  const reg = /^([\u4E00-\u9FA5A-Za-z0-9]|[\u4E00-\u9FA5A-Za-z0-9_-]*[\u4E00-\u9FA5A-Za-z0-9]{1,30})+$/
  return reg.test(str)
}

/* 验证菜单中文名称
 * 必须是中文字符
 */
export function validateMenuTitle (str) {
  const reg = /^[\u4E00-\u9FA5]+$/
  return reg.test(str)
}

/* 验证环境管理配置文件名称
 * 起始必须是小写字母，中间可以有数字和中横线,不支持大写字母和全数字
 */
export function validateEnvConfName (str) {
  const reg = /^[a-z]([-a-z0-9]*[a-z0-9])?$/
  return reg.test(str)
}

/* 验证虚拟项目 路径名 */
export function validatePath (str) {
  const reg = /^(\w+-?\/?)+$/
  return reg.test(str)
}

/* 验证包名
 * 只能包含数字、小写字母 以一个或两个.间隔 分为两到三段
 */
export function validatePackageName (str) {
  const reg = /^[a-z][0-9a-z]*(\.[a-z][0-9a-z]*)+$/
  return reg.test(str)
}
/**
 * 验证资源名称
 * 必须是中英文斜线
 */
export function validateSourceName (str) {
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9-/]+$/
  return reg.test(str)
}

/**
 * 验证用户密码
 * 密码长度在8到20之间且需包含至少一个大写字符、一个小写字符和一个数字,不允许特殊字符
 */
export function validateRegistryUserPass (str) {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/
  return reg.test(str)
}

/**
 * 收件人名称验证
 * 起始为小写字母 中间是小写字母或下划线
 */
export function validateReceiverName (str) {
  const reg = /^[a-z]([a-z_]*[0-9]*)$/
  return reg.test(str)
}

export function validatePositive(str){
  const reg = /^[1-9]\d*$/
  return reg.test(str)
}

/**
 * ftp镜像名称验证
 * 只能是字符数字中横线下划线
 * @param {*} str
 */
export function validateImgName(str){
  const reg = /^[a-z0-9-_]+$/
  return reg.test(str)
}

/**
 * 镜像版本验证
 * 必须以小写字母或数字开头、结尾，中间可以是.-小写字母数字
 * @param {*} str
 */
export function validateVersion(str){
  const reg = /^[a-z\d]*[a-z\d.-]+[a-z\d]+$/
  return reg.test(str)
}


/**
 * 内存大小校验
 * @param {*} str
 */
export function validateMemoryNum(str){
  const reg = /^[+-]?\d+(\.\d+)?$|^$|^(\d+|\-){7,}$/
  return reg.test(str)
}
