import {useState,useEffect} from "react"

export default function useVisualMode(initial) {
  const [mode,setMode]= useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (nextMode,replace = false) =>{ 
    if (replace) {
      // if replace is true, replace the current mode with the next mode
      setHistory([...history.slice(0,-1),nextMode])

    } else {
      
      setHistory([...history,nextMode])
    }
  };
  
  const back = () => {
    if (history.length >= 2) {

      setHistory(history.slice(0,history.length -1))
    }
     
  }

  useEffect(()=>{
    setMode(history.slice(-1)[0])

  },[history])


  return {mode,transition,back}
}