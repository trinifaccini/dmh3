import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

type CalendarProps = {
  captureStartDate: (date: string) => void;
  captureEndDate: (date: string) => void;
};

type DateRange = [Date | null, Date | null]

export default function Calendar( { captureStartDate, captureEndDate }: CalendarProps ) {
  const [dateRange, setDateRange] = useState<DateRange>([null, null]);
  const [startDate, endDate] = dateRange;
 
  useEffect(() => {
    if (startDate && endDate) {
      captureStartDate(parseDates(startDate));
      captureEndDate(parseDates(endDate));
    }
  }, dateRange);

  function parseDates(date: Date) {
    return (date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2))
  }

  return (
    <DatePicker
      selectsRange={true}
      locale="es"
      dateFormat="dd 'de' MMM"
      showDisabledMonthNavigation
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      withPortal={true}
      isClearable={true}
      shouldCloseOnSelect={true}
      placeholderText="Seleccionar: Desde - Hasta"
    ></DatePicker>
  );
}
