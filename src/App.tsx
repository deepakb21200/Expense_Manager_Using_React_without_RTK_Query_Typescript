import   {   Suspense, useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import axios from "axios"
import { BASE_API_URL } from "./utils/constants"
import { AddExpense, EditExpense, ExpenseList, Layout, Login, PrivateRoute, Profile, Register, SearchExpense } from "./Dynamicimports";
import useLocalStorage from "./custom-hooks/Session";
import  { ModeContextProvider } from "./hooks/contextapi/Theme";
 

// let sleep = () => new Promise((resolve) => setTimeout(resolve, 3000));

function App() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [refresh, setRefresh] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false)
  const [selectedTheme, setSelectedTheme] = useLocalStorage('selectedTheme','light');

  useEffect(() => {
    async function getExpenses() {
      try {
        setLoading(true)
        setError("")
        // await sleep();
        //throw new Error() isse bhi kar sakte hia 
        let { data } = await axios.get(`${BASE_API_URL}/expenses`)
        // console.log(data)
        setExpenses(data)
      } catch (error) {
        console.error("Error fetching expenses:", error)
        setError("Error while getting list of expenses. Try again later.")
      }
      finally {
        setLoading(false)
      }
    }


    getExpenses()
  }, [refresh])



  // useEffect(() => {
  //   console.log(refresh);

  // }, [refresh])

  const handleRefresh = () => {
    setRefresh((refresh) => !refresh);
    console.log("done");

  };
  return (
    // <ModeContext.Provider value={{selectedMode, toogleMode}}>
        <ModeContextProvider selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme}>
          <BrowserRouter>
      <Suspense fallback={<p className="loading">loading...</p>}>
        <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
          <Routes>
            <Route path="/" element={
              isLoggedIn ? <ExpenseList loading={loading} error={error} expenses={expenses} handleRefresh={handleRefresh} />
                : <Login setIsLoggedIn={setIsLoggedIn} />
            } />
            <Route path="/add" element={
              isLoggedIn ? <AddExpense handleRefresh={handleRefresh} />
                : <Login setIsLoggedIn={setIsLoggedIn} />
            } />

            <Route path="/edit/:id" element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <EditExpense handleRefresh={handleRefresh} />
              </PrivateRoute>
            } />



            <Route path="/search" element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <SearchExpense loading={loading} error={error} expenses={expenses} handleRefresh={handleRefresh} />
              </PrivateRoute>} />


            <Route path="/profile" element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <Profile />
              </PrivateRoute>

            } />
            <Route path="/register" element={
              !isLoggedIn ? <Register setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />
            } />
            <Route path="/login" element={
              !isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> :
                <Navigate to="/" />
            } />
            <Route path="*" element={<Navigate to="/" />} />


          </Routes>
        </Layout>

      </Suspense>
    </BrowserRouter>
    </ModeContextProvider>
  )
}

export default App