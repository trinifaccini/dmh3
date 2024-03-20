import { Transaction } from "./activitySummary/ActivitySummary";

export function getMonthName(dateString: string) {
  const date = new Date();
  date.setMonth(parseInt(dateString.substring(5, 7)) - 1);

  return (
    dateString.substring(8, 10) +
    " de " +
    date.toLocaleString("es-AR", { month: "long" })
  );
}

export function getMonthNumber(dateString: string) {
  return dateString.substring(8, 10) + "/" + dateString.substring(5, 7);
}

export function orderTransactionsByDate(transactions: Transaction[]) {
  return transactions.sort(function (a, b) {
    return new Date(b.dated) as any - (new Date(a.dated) as any);
  });
}
