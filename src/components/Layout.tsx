import Sidebar from "./Sidebar"


interface LayoutProps{
    children: React.ReactNode
    isLoggedIn:boolean
    setIsLoggedIn:(data:boolean)=>void
}


function Layout({children, isLoggedIn,setIsLoggedIn}:LayoutProps) {
    return (
        <div className="main">
            {isLoggedIn &&
            <div className="left">
                <Sidebar setIsLoggedIn={setIsLoggedIn}/>
            </div>}


            <div className="right">
                {children}
            </div>
        </div>
    )
}

export default Layout