export function dateDiffInDays(a, b) {
  const _Hours_PER_DAY = 24;
  const _Minutes_PER_DAY = 60 * _Hours_PER_DAY;
  const _Seconds_PER_DAY = 60 * _Minutes_PER_DAY;
  const _MilliSeconds_PER_DAY = 1000 * _Seconds_PER_DAY;
  const daysDifferent = Math.abs((a.getTime() - b.getTime()) / _MilliSeconds_PER_DAY);
  const onlyDaysDifferent = Math.floor(daysDifferent);
  var hour = (daysDifferent - onlyDaysDifferent) * 24;
  var onlyHour = Math.floor(hour);
  var minute = (hour - onlyHour) * 60;
  var onylyMinute = Math.floor(minute);
  if (onlyDaysDifferent > 0) {
    return `${onlyDaysDifferent}d ${onlyHour}h`;
  }
  return `${onlyHour}h ${onylyMinute}m`;
}

export function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
       const key = keyGetter(item);
       const collection = map.get(key);
       if (!collection) {
           map.set(key, [item]);
       } else {
           collection.push(item);
       }
  });
  return map;
}