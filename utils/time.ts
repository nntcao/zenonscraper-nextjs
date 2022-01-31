export function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000)
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  var year = a.getFullYear()
  var month = months[a.getMonth()]
  var date = a.getDate()
  var hour = (a.getHours() < 10 ? '0' : '') + a.getHours()
  var min = (a.getMinutes() < 10 ? '0' : '') + a.getMinutes()
  var sec = (a.getSeconds() < 10 ? '0' : '') + a.getSeconds()
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec 
  return time
}

export function timeConvertorDayOnly(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000)
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  var month = months[a.getMonth()]
  var date = a.getDate()
  var time = `${month} ${date}`
  return time
}