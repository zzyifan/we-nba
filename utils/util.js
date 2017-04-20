
/**
 * 格式化日期
 */
function formatDate(date) {
  date = new Date(date);
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-');
}

/**
 * 格式化时间
 */
function formatTime(date) {
  date = new Date(date);
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [hour, minute, second].map(formatNumber).join(':');
}

/**
 * 格式化日期时间
 */
function formatDateTime(date) {
  return formatDate(date) + ' ' + formatTime(date);
}

/**
 * 十位补0
 */
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n;
}

/**
 * 对象是否为空
 */
function isEmptyObject(obj) {
  for (var n in obj) {
    return false
  }
  return true;
}

module.exports = {
  formatDate: formatDate,
  formatTime: formatTime,
  formatDateTime: formatDateTime,
  isEmptyObject: isEmptyObject
}