import dayjs from 'dayjs';

function formatDate(inputDate: string): string {
  const parsedDate = dayjs(inputDate);

  return parsedDate.format('HH:mm DD/MM/YYYY');
}

export default formatDate;
