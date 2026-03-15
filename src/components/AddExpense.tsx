import axios from "axios"
import ExpenseForm from "./ExpenseForm"
import { BASE_API_URL } from "../utils/constants"
import type { Expense } from "../type"

interface AddExpenseProps {
  handleRefresh: () => void;
}
function AddExpense({ handleRefresh }: AddExpenseProps) {

  
  const handleSubmit = async (inputData:Expense):Promise<boolean>=>{
    try {
     
      let {data}= await axios.post(`${BASE_API_URL}/expenses`, {...inputData})

      console.log("posting", data);
      handleRefresh()

      return true
      
    } catch (error) {
      console.log(error);
      return false
      
      
    }

  }
  return (
     <div className='main-content'>
      <h2 className='my-3 text-center'>Add Expense</h2>
      <ExpenseForm   onSubmitForm={handleSubmit} />
    </div>
  )
}

export default AddExpense