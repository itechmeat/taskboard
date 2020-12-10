export function clearText(text) {
  return text.replace(/&nbsp;/g, "").trim();
}

export function splitTime(m) {
  const hours = Math.floor(m / 60 / 60);
  const minutes = Math.floor(m / 60) % 60;
  const seconds = m % 60;

  return { hours, minutes, seconds };
}

export function getReadableTime(m) {
  const time = splitTime(m);

  if (time.minutes === 0) {
    return `${time.hours}h`;
  }

  if (time.hours === 0) {
    return `${time.minutes}m`;
  }

  return `${time.hours}h ${time.minutes}m`;
}
