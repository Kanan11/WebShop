import { useState, useEffect } from "react";

export function useFormattedDate(dateString: string): string {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    const formattedString = `${hours}:${minutes} ${day}/${month}/${year}`;
    setFormattedDate(formattedString);
  }, [dateString]);

  return formattedDate;
}
