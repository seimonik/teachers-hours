import dayjs from "dayjs";
import { DateFormat } from "@/types/enums/DateFormat";

export const getFormattedDate = (
  date: string,
  dateFormat: DateFormat = DateFormat.dateTime
) => {
  return dayjs(date).format(dateFormat);
};
