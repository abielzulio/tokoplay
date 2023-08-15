import { intlFormatDistance } from "date-fns"

export function timeFromNow(date: string): string {
  return intlFormatDistance(new Date(date), new Date())
}
