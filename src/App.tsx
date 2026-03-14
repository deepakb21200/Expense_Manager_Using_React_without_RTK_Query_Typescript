import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import ExpenseList from "./components/ExpenseList"
import AddExpense from "./components/AddExpense"
import SearchExpense from "./components/SearchExpense"
import Profile from "./components/Profile"
import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_API_URL } from "./utils/constants"
import EditExpense from "./components/EditExpense"



function App() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    async function getExpenses() {
      try {
        setLoading(true)
        setError("")
        let { data } = await axios.get(`${BASE_API_URL}/expenses`)
        // console.log(data)
        setExpenses(data)
      } catch (error) {
        console.error("Error fetching expenses:", error)
        setError("Failed to fetch expenses. Please try again later.")
      }
      finally {
        setLoading(false)
      }
    }


    getExpenses()
  }, [refresh])

  const handleRefresh = () => {
    setRefresh((refresh) => !refresh);
  };
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ExpenseList loading={loading} error={error} expenses={expenses} handleRefresh={handleRefresh} />} />
          <Route path="/add" element={<AddExpense handleRefresh={handleRefresh} />} />

          <Route path="/edit/:id" element={<EditExpense handleRefresh={handleRefresh} />} />



          <Route path="/search" element={<SearchExpense />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />


        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App