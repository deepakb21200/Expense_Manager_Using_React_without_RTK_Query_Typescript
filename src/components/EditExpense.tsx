import { useEffect, useState, type FC } from "react";
import ExpenseForm from "./ExpenseForm";
import { useParams } from "react-router-dom";
import type { Expense } from "../type";
import axios from "axios";
import { BASE_API_URL } from "../utils/constants";

interface EditExpenseProps {
  handleRefresh: () => void;
}


const EditExpense :FC<EditExpenseProps>= ({ handleRefresh }) => {
    const [expense, setExpense] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const { id } = useParams();

    useEffect(() => {
        const getExpense = async () => {
            try {
                setIsLoading(true);
                setErrorMsg('');
                const { data } = await axios.get(`${BASE_API_URL}/expenses/${id}`);
                setExpense(data);
            } catch (error) {
                console.log(error);
                setErrorMsg(
                    'Error while getting expense information. Try again later.'
                );
            } finally {
                setIsLoading(false);
            }
        };
        getExpense();
    }, [id]);

    const handleSubmit = async (inputData: Expense): Promise<boolean> => {
        try {
            const { data } = await axios.patch(`${BASE_API_URL}/expenses/${id}`, {
                ...inputData
            });
            console.log("updated", data);
            
            handleRefresh();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    return (
        <div className='main-content'>
            <h2 className='my-3 text-center'>Edit Expense</h2>
            {isLoading && <p className='loading'>Loading...</p>}
            {errorMsg && <p className='error-msg'>{errorMsg}</p>}
            <ExpenseForm onSubmitForm={handleSubmit} expense={expense} />
        </div>
    )
}    

export default EditExpense