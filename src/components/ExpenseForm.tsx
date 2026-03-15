import { useEffect, useState, type FC } from 'react'
import { Button, Form } from 'react-bootstrap';
import type { Expense } from '../type';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface ExpenseFormProps {
    onSubmitForm: (inputData: Expense) => Promise<boolean>
    expense?: Expense | null
}

const ExpenseForm: FC<ExpenseFormProps> = ({ onSubmitForm, expense }) => {
    const [succesMsg, setSuccesMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<Expense>();

    const { id, description, expense_amount, expense_date, expense_type } =
        expense || {};

    useEffect(() => {
        reset({
            expense_type,
            expense_amount,
            description,
            expense_date
        });
    }, [id]);


    let navigate = useNavigate()

    const onSubmit = async (data: Expense) => {
        console.log("dataa", data);
        let isSucess = await onSubmitForm(data)

        if (isSucess) {
            if (!expense) {
                // reset for add expense
                reset();
            }
            setErrorMsg("")
            setSuccesMsg(`Expense ${expense ? 'updated' : 'added'} successfully.`);
            setTimeout(() => {
                setSuccesMsg("")
                navigate("/")
            }, 2000);
            console.log("success");

        }
        else {
            setSuccesMsg("")
            setErrorMsg(
                `Error while ${expense ? 'updating' : 'adding'
                } expense. Try again later.`
            );
            console.log("failure");

        }


    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {succesMsg && <p className='success-msg'>{succesMsg}</p>}
            {errorMsg && <p className='error-msg'>{errorMsg}</p>}
            <Form.Group className='mb-3' controlId='expense_type'>
                <Form.Label>Expense Type</Form.Label>
                <Form.Select
                    aria-label='Expense Type'
                    {...register('expense_type', {
                        required: true
                    })}
                >
                    <option value=''>Select Expense Type</option>
                    <option value='cash'>Cash</option>
                    <option value='card'>Card</option>
                </Form.Select>
                {errors.expense_type && (
                    <p className='error-msg'>Please enter expense type</p>
                )}
            </Form.Group>
            <Form.Group className='mb-3' controlId='expense_date'>
                <Form.Label>Expense Date</Form.Label>
                <Form.Control
                    type='date'
                    {...register('expense_date', {
                        required: true
                    })}
                />
                {errors.expense_date && (
                    <p className='error-msg'>Please enter expense date</p>
                )}
            </Form.Group>
            <Form.Group className='mb-3' controlId='expense_amount'>
                <Form.Label>Expense Amount (In USD)</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter amount'
                    {...register('expense_amount', {
                        required: true
                    })}
                />
                {errors.expense_amount && (
                    <p className='error-msg'>Please enter expense amount</p>
                )}
            </Form.Group>
            <Form.Group className='mb-3' controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={3}
                    placeholder='Enter description'
                    {...register('description', {
                        required: true
                    })}
                />
                {errors.description && (
                    <p className='error-msg'>Please enter description</p>
                )}
            </Form.Group>
            <Form.Group>
                <Button type='submit' variant='success'>
                    {expense ? 'Update' : 'Add'} Expense
                </Button>
            </Form.Group>
        </Form>
    );
}

export default ExpenseForm