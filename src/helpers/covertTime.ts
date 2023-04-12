export const convertTime = (day: string): string => {
  let dateString = day;
  let dateParts = dateString.split('-'); // Tách ngày thành mảng ["2023", "4", "12"]
  let newDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0]; // Ghép lại ngày theo đúng định dạng mới: "12-4-2023"
  return newDate;
};
