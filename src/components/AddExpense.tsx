import ExpenseForm from "./ExpenseForm"

function AddExpense() {
  return (
     <div className='main-content'>
      <h2 className='my-3 text-center'>Add Expense</h2>
      <ExpenseForm   />
    </div>
  )
}

export default AddExpense