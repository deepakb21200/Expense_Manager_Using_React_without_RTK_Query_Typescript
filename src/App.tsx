import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import ExpenseList from "./components/ExpenseList"
import AddExpense from "./components/AddExpense"
import SearchExpense from "./components/SearchExpense"
import Profile from "./components/Profile"
import { useEffect, useState } from "react"
import axios from "axios"



function App() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  useEffect(() => {
    async function getExpenses() {
      try {
        setLoading(true)
        setError("")
        let { data } = await axios.get('http://localhost:4000/expenses')
        console.log(data)
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
  }, [])
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ExpenseList loading={loading} error={error} expenses={expenses} />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/search" element={<SearchExpense />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />


        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App