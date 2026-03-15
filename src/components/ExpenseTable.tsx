import { Button, Table } from "react-bootstrap";
import type { Expense } from "../type";
import { Link, useLocation } from "react-router-dom";
import "../CSS/ExpenseTable.css"
import { useState } from "react";
import { BASE_API_URL } from "../utils/constants";
import axios from "axios";
import { getFormattedDate, getFormattedPrice, getShortDescription } from "../utils/functions";


interface ExpenseTableProps {
    expenses: Expense[];
    handleRefresh: () => void;
}
function ExpenseTable({ expenses, handleRefresh }: ExpenseTableProps) {
    const [errorMsg, setErrorMsg] = useState('');
    const [deleteIndex, setDeleteIndex] = useState(-1);
    const { pathname } = useLocation();



    const handleDelete = async (id: number) => {
     
        console.log("before ");
        
        const shouldDelete = window.confirm(
            'Are you sure you want to delete this expense?'
        );

        console.log("after");
        
        if (shouldDelete) {
            try {
                setErrorMsg('');
                await axios.delete(`${BASE_API_URL}/expenses/${id}`);
                handleRefresh();
            } catch (error) {
                console.log(error);
                setErrorMsg('Error while deleting the expense. Try again later.');
            }
        }
            setDeleteIndex(-1);
    };


    console.log("delete index", deleteIndex);
    
    return (
        <>
            {errorMsg && <p className='error-msg'>{errorMsg}</p>}
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
                    {expenses.map(({ expense_type, expense_date, expense_amount, description, id }, index) => {
                        return (
                            <tr key={id} className={`${id === deleteIndex ? 'active' : ''}`}>
                                <td className='expense-item'>{index + 1}</td>
                                <td className='expense-item'>{expense_type}</td>
                                <td className='expense-item'>{getFormattedDate(expense_date)}</td>
                                <td className='expense-item'>{getFormattedPrice(String(expense_amount))}</td>
                                <td className='expense-item' title={description}>
                                    {getShortDescription(description)}
                                </td>

                                <td>
                                    <Link to={`/edit/${id}`}>
                                        <Button variant="info" size="sm"
                                            className='button btn-edit'>
                                            Edit
                                        </Button>

                                    </Link>
                                </td>

                                <td>
                                    <Link to={`/`}>
                                        <Button variant="danger" size="sm"
                                        onMouseDown={() => setDeleteIndex(id)}
                                            onClick={() => handleDelete(id)}
                                            className='button btn-delete'>
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