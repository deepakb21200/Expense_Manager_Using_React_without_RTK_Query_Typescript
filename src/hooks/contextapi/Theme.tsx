import React, { createContext, useState } from "react";

export type Mode = 'light' | 'dark'

type ModeContextType = {
    selectedMode: Mode
    toogleMode: () => void

}

const ModeContext = createContext<ModeContextType | null>(null)

export default ModeContext


type ModeContextProviderProps = ({
    children: React.ReactNode
    selectedTheme:Mode
    setSelectedTheme: (theme: Mode) => void

})

// export const ModeContextProvider = ({ children }: { children: React.ReactNode ,

// }) => {
//     const [selectedMode, setSelectedMode] = useState<Mode>('light')

//     function toogleMode() {
//         setSelectedMode(selectedMode == "light" ? "dark" : "light")
//     }
//     return <ModeContext.Provider value={{ selectedMode, toogleMode }}>
//         {children}
//     </ModeContext.Provider>
// }






export const ModeContextProvider = ({ children,selectedTheme, setSelectedTheme }: ModeContextProviderProps) => {
    const [selectedMode, setSelectedMode] = useState<Mode>(selectedTheme ||'light')

    function toogleMode() {

        // console.log("selected mode_BEFORE", selectedMode);
        // setSelectedMode(selectedMode == "light" ? "dark" : "light")
        // console.log("selected mode_AFTER", selectedMode);
        // setSelectedTheme(selectedMode)
        const mode = selectedMode === 'light' ? 'dark' : 'light';
         console.log("selected mode_BEFORE", selectedMode);
        setSelectedMode(mode);
        console.log("selected mode_AFTER", selectedMode);
        setSelectedTheme(mode);
    }
    return <ModeContext.Provider value={{ selectedMode, toogleMode }}>
        {children}
    </ModeContext.Provider>
}


