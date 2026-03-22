import { useMode } from "../custom-hooks/useMode"
import Sidebar from "./Sidebar"


interface LayoutProps{
    children: React.ReactNode
    isLoggedIn:boolean
    setIsLoggedIn:(data:boolean)=>void
}


function Layout({children, isLoggedIn,setIsLoggedIn}:LayoutProps) {
    let {selectedMode}=useMode()
    return (
        <div className="main">
            {isLoggedIn &&
            <div className={`left ${selectedMode}`}>
                <Sidebar setIsLoggedIn={setIsLoggedIn}/>
            </div>}


            <div className={`right ${selectedMode}`}>
                {children}
            </div>
        </div>
    )
}

export default Layout