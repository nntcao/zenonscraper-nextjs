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

export function msToFormattedTime(ms) {
  const msPerYear = 31556952000
  const msPerDay = 86400000
  const msPerHour = 3600000
  const msPerMinute = 60000
  const msPerSecond = 1000
  if (ms > msPerYear) {
    const years = Math.floor(ms / msPerYear)
    const days = Math.floor((ms - years * msPerYear) / msPerDay)
    const yearsText = years == 1 ? `${years} year` : `${years} year`
    const daysText = days == 1 ? `${days} day` : `${days} days`

    if (days == 0) {
      return yearsText
    }
    return `${yearsText} and ${daysText}`
  } else if (ms > msPerDay) {
    const days = Math.floor(ms / msPerDay)
    const hours = Math.floor((ms - days * msPerDay) / msPerHour)
    const daysText = days == 1 ? `${days} day` : `${days} days`
    const hoursText = hours == 1 ? `${hours} hour` : `${hours} hours`
    
    if (hours == 0) {
      return hoursText
    }
    return `${daysText} and ${hoursText}`
  } else if (ms > msPerHour) {
    const hours = Math.floor(ms / msPerHour)
    const minutes = Math.floor((ms - hours * msPerHour) / msPerMinute)
    const hoursText = hours == 1 ? `${hours} hour` : `${hours} hours`
    const minutesText = minutes == 1 ? `${minutes} minute` : `${minutes} minutes`

    if (minutes == 0) {
      return hoursText
    }
    return `${hoursText} and ${minutesText}`
  } else {
    const minutes = Math.floor(ms / msPerMinute)
    const seconds = Math.floor((ms - minutes * msPerMinute) / msPerSecond)
    const minutesText = minutes == 1 ? `${minutes} minute` : `${minutes} minutes`
    const secondsText = seconds == 1 ? `${seconds} second` : `${seconds} seconds`

    if (minutes == 0) {
      return secondsText
    } else if (seconds == 0) {
      return minutesText
    }
    return `${minutesText} and ${secondsText}`
  }
}