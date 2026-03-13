import Sidebar from "./Sidebar"


interface LayoutProps{
    children: React.ReactNode
}


function Layout({children}:LayoutProps) {
    return (
        <div className="main">
            <div className="left">
                <Sidebar/>
            </div>


            <div className="right">
                {children}
            </div>
        </div>
    )
}

export default Layout