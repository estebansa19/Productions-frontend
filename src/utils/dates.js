export function formatDate(date) {
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()
  let year = date.getFullYear()

  if (month.length < 2) {
    month = '0' + month;
  }

  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-')
}

export function convertStringDate(date) {
  let dateParts = date.split('-')
  let parsedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])

  return parsedDate.toDateString()
}