import type { Expense } from "../type";
import ExpenseTable from "./ExpenseTable";


interface ExpenseListProps {
  loading: boolean;
  error: string;
  expenses: Expense[];
}
function ExpenseList({ loading, error, expenses }: ExpenseListProps) {
  return (
    <div className="main-content">
      <h2 className="my-3 text-center">Expense List</h2>
      {loading && <p className="loading">Loading expenses...</p>}
      {error && <p className="error-msg">{error}</p>}

      <ExpenseTable expenses={expenses} />
    </div>
  )
}

export default ExpenseList