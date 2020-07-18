export function unixTimeToString(unixTime) {
  const dateObj = new Date(unixTime);
  const year = dateObj.getUTCFullYear();
  const month = dateObj.getUTCMonth() + 1;
  const day = dateObj.getUTCDate();

  const dateNow = new Date();
  const year0 = dateNow.getUTCFullYear();
  const month0 = dateNow.getUTCMonth() + 1;
  const day0 = dateNow.getUTCDate();

  // let's do proper Euro dates...

  if (year0 == year && month0 == month && day0 == day) {
    return 'Today';
  }
  return `${day}-${month}-${year}`;
}

export function secondsToString(seconds) {
  const date = new Date(seconds * 1000);
  let hh = date.getUTCHours();
  let mm = date.getUTCMinutes();
  let ss = date.getSeconds();

  hh = (hh == 0) ? '' : `${hh}:`;
  if (mm < 10) {
    mm = `0${mm}:`;
  } else {
    mm == `${mm}:`;
  }
  if (ss < 10) { ss = `0${ss}`; }
  return hh + mm + ss;
}
