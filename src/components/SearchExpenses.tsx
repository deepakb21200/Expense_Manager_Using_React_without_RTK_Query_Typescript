import { Form } from "react-bootstrap"
import "../CSS/SearchExpenses.css"
import ExpenseTable from "./ExpenseTable";
import type { Expense } from "../type";
import { useEffect, useState } from "react";




interface SearchExpensesProps {
  expenses: Expense[];
  handleRefresh: () => void;
  loading: boolean
  error: string

}



function SearchExpenses({ loading, error, expenses, handleRefresh }: SearchExpensesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [expenseType, setExpenseType] = useState('');
  const [expenseYear, setExpenseYear] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    setFilteredExpenses(expenses);
    console.log(expenses);

    console.log("ok");

  }, [expenses]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("submitted");

    if (searchTerm.trim() !== "") {
      console.log("search term: ", searchTerm);
      setFilteredExpenses(
        expenses.filter((expense) =>
          expense.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    else {
      setFilteredExpenses(expenses);
    }

  }



  const handleFilterChange = (selectedOption: { type: string, value: string }) => {
    let { type, value } = selectedOption;
    switch (type) {
      case "expense_type":
        setExpenseType(value);
        if (value) {
          setFilteredExpenses(expenses.filter((expense) => expense.expense_type === value));
        }
        else {
          setFilteredExpenses(expenses);

        }
        setExpenseYear('')
        setSortBy('')
        setSearchTerm('')
        break;

      case "expense_year":
        setExpenseYear(value);
        let currentYear = new Date().getFullYear();

        if (value) {
          setFilteredExpenses(
            expenses.filter((expense) =>
              expense.expense_date.includes(
                value === "current_year"
                  ? `${currentYear}`
                  : `${currentYear - 1}`
              )
            )
          );
        } else {
          setFilteredExpenses(expenses);
        }
        setExpenseType('')
        setSortBy('')
        setSearchTerm('')
        break;



      case "sort_by":
        setSortBy(value);
        if (value) {
          if (value === "desc") {
            setFilteredExpenses(expenses.slice().sort((firstExpense, secondExpense) => {
              if (firstExpense.expense_date < secondExpense.expense_date) return -1
              if (firstExpense.expense_date > secondExpense.expense_date) return 1
              return 0
            }))
          }
          else if (value === "asc") {
            setFilteredExpenses(expenses.slice().sort((firstExpense, secondExpense) => {
              if (firstExpense.expense_date < secondExpense.expense_date) return 1
              if (firstExpense.expense_date > secondExpense.expense_date) return -1
              return 0
            }))
          }
        }
        else {
          setFilteredExpenses(expenses);
        }
        setExpenseType('')
        setExpenseYear('')
        setSearchTerm('')

        break;
      default:
        break;


    }
  }

  return (
    <div>
      <div className="search-expenses">
        <h2 className='my-3 text-center'>Search Expenses</h2>
        <div className="search-box">
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='search-input'>
              <Form.Control
                type='search'
                value={searchTerm}
                placeholder='Enter description to search and press enter key'
                onChange={(event) => {
                  setExpenseType('')
                  setExpenseYear('')
                  setSortBy('')
                  setSearchTerm(event.target.value);

                }}

              />
            </Form.Group>

          </Form>
        </div>


        <div className='filters'>
          <div className='expense-type-filter'>
            <Form.Label>Expense Type</Form.Label>
            <Form.Select
              aria-label='Select Expense Type'
              value={expenseType}
              onChange={(event) => handleFilterChange({
                type: "expense_type",
                value: event.target.value
              })}


            >
              <option value=''>Select Expense Type</option>
              <option value='card'>Card</option>
              <option value='cash'>Cash</option>
            </Form.Select>
          </div>

          <div className='date-filter'>
            <Form.Label>Expense Year</Form.Label>
            <Form.Select
              aria-label='Select Year'
              value={expenseYear}
              onChange={(event) => handleFilterChange({
                type: "expense_year",
                value: event.target.value
              })}

            >
              <option value=''>Select Year</option>
              <option value='current_year'>Current Year</option>
              <option value='previous_year'>Previous Year</option>
            </Form.Select>
          </div>
          <div className='sort-filter'>
            <Form.Label>Sort By</Form.Label>
            <Form.Select
              aria-label='Select Sort By'
              value={sortBy}
              onChange={(event) => handleFilterChange({
                type: "sort_by",
                value: event.target.value
              })}


            >
              <option value=''>Select Sort By</option>
              <option value='desc'>Oldest First</option>
              <option value='asc'>Newest First</option>
            </Form.Select>
          </div>
        </div>

      </div>
      {loading && <p className='loading'>Loading...</p>}
      {error && (
        <p className='error-msg' style={{ textAlign: 'center' }}>
          {error}
        </p>
      )}
      {!loading &&
        !error &&
        (filteredExpenses.length > 0 ? (
          <ExpenseTable
            expenses={filteredExpenses}
            handleRefresh={handleRefresh}
          />
        ) : (
          <h4 className='error-msg text-center'>No matching expenses found.</h4>
        ))}

    </div>
  )
}

export default SearchExpenses