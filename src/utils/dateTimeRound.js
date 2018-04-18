import moment from 'moment'

export const dateTimeRound = (date) => {
  const start = moment(date);
  const remainder = 30 - (start.minute() % 30);
  return moment(start).add(remainder, "minutes");
}