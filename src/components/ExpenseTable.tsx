import { Button, Table } from "react-bootstrap";
import type { Expense } from "../type";
import { Link } from "react-router-dom";
import "../CSS/ExpenseTable.css"


interface ExpenseTableProps {
    expenses: Expense[];
}
function ExpenseTable({ expenses }: ExpenseTableProps) {
    return (
        <>
            <Table striped bordered hover responsive className='expense-list'>
                <thead>
                    <tr>
                        <th className='heading'>#</th>
                        <th className='heading'>Expense Type</th>
                        <th className='heading'>Expense Date</th>
                        <th className='heading'>Expense Amount</th>
                        <th className='heading'>Description</th>
                        <th className='heading'>Edit</th>
                        <th className='heading'>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {expenses.map(({ expense_type, expense_date, expense_amount, description }, index) => {
                        return (
                            <tr key={index}>
                                <td className='expense-item'>{index + 1}</td>
                                <td className='expense-item'>{expense_type}</td>
                                <td className='expense-item'>{expense_date}</td>
                                <td className='expense-item'>{expense_amount}</td>
                                <td className='expense-item'>{description}</td>

                                <td>
                                    <Link to={`/`}>
                                        <Button variant="info" size="sm">
                                            Edit
                                        </Button>

                                    </Link>
                                </td>

                                <td>
                                    <Link to={`/`}>
                                        <Button variant="danger" size="sm">
                                            Delete
                                        </Button>

                                    </Link>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default ExpenseTable