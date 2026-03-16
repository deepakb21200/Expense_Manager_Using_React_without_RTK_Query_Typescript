import type { Expense } from "../type";
import ExpenseTable from "./ExpenseTable";


interface ExpenseListProps {
  loading: boolean;
  error: string;
  expenses: Expense[];
  handleRefresh: () => void;
}
function ExpenseList({ loading, error, expenses , handleRefresh}: ExpenseListProps) {
  return (
    <div className="main-content">
      <h2 className="my-3 text-center">Expense List</h2>
      {loading && <p className="loading">Loading expenses...</p>}
      {error && <p className="error-msg">{error}</p>}

      {
        expenses.length > 0 ? (
          <ExpenseTable expenses={expenses} handleRefresh={handleRefresh} />
        ) : (
          !loading && !error && <p className="error-msg">No expenses found. Please add some expenses.</p>
        )
      }
    </div>
  )
}

export default ExpenseList