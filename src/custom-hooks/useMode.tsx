import { useContext } from "react";
import ModeContext from "../hooks/contextapi/Theme";

 



export const useMode = () => {
  const context = useContext(ModeContext);

  if (!context) {
    throw new Error('Use ModeContext only inside ModeContextProvider');
  }

  return context;
};
