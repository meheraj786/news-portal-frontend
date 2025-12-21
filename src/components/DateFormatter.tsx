import React from "react";

interface DateFormatterProps {
  date?: string | Date;
  locale?: string; 
  options?: Intl.DateTimeFormatOptions; 
}

const DateFormatter: React.FC<DateFormatterProps> = ({
  date,
  locale = "en-US",
  options,
}) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDate = dateObj?.toLocaleString(
    locale,
    options || defaultOptions
  );

  return <span>{formattedDate}</span>;
};

export default DateFormatter;
