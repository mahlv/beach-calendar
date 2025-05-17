// Helper to create a date at midnight UTC to avoid timezone issues
function createUTCDate(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month, day, 0, 0, 0, 0));
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 1)).getUTCDay()
}

export function isToday(date: Date): boolean {
  const today = new Date()
  return (
    date.getUTCDate() === today.getUTCDate() &&
    date.getUTCMonth() === today.getUTCMonth() &&
    date.getUTCFullYear() === today.getUTCFullYear()
  )
}

export function isPastDay(date: Date): boolean {
  const today = new Date()
  const todayUTC = createUTCDate(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
  return date < todayUTC
}

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

export function formatMonthYear(date: Date): string {
  const month = date.getUTCMonth()
  const year = date.getUTCFullYear()
  return `${monthNames[month]} ${year}`
}
