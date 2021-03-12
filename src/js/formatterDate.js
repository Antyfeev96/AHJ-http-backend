/* eslint-disable no-unused-vars */
const formatterDate = () => {
  const date = new Date();

  const formatter = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const dateTime = date.toLocaleTimeString('ru', {
    hour: 'numeric',
    minute: 'numeric',
  });

  return `${formatter.format(date)} ${dateTime}`;
};
