const padTo2Digits: (num: number) => string = (num) =>
  num.toString().padStart(2, '0');

const convertMsToHMS: (milliseconds: number) => string = (milliseconds) => {
  let seconds: number = Math.floor(milliseconds / 1000);
  let minutes: number = Math.floor(seconds / 60);
  let hours: number = Math.floor(minutes / 60);

  seconds = seconds % 60;

  minutes = seconds >= 30 ? minutes + 1 : minutes;
  minutes = minutes % 60;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
};

export { convertMsToHMS };
