const { differenceInDays, differenceInMinutes, differenceInHours, parseISO } = require("date-fns");

const TimeDifference = (inputDate: any) => {
  // Parse the input date string
  const parsedDate = parseISO(inputDate);

  // Get the difference in days
  const daysDifference = differenceInDays(new Date(), parsedDate);

  // Get the difference in hours
  const hoursDifference = differenceInHours(new Date(), parsedDate);

  // Get the difference in minutes
  const minutesDifference = differenceInMinutes(new Date(), parsedDate);

  console.log("Difference in days:", daysDifference);
  console.log("Difference in hours:", hoursDifference);
  console.log("Difference in minutes:", minutesDifference);

  // Return whatever you want here
  return <p>hi</p>;
};

export default TimeDifference;
