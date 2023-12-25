"use client"
import useGateStore from "@/store/store"
import { drawNode } from "@/utils/canvas"
import { useEffect } from "react"

const useJoin = (svgRef) => {

    const gateStore = useGateStore(state=>state)
    const { currentSelection, setCurrentSelection ,gates,setGatesAfterNodeJoin} = gateStore

    useEffect(() => {
        
        if (!svgRef) throw new Error(" svg element not found")
        
        const onClick = () =>{
            setCurrentSelection(null)
        }
        
        const onMouseUp = (e) => {
            setCurrentSelection(undefined)
        }
        
        const onMouseMove = (e,currentSelection) => {
            
            if (!currentSelection?.startId) {
                return
            }
            let gate = gates[currentSelection.startId]
        }

        svgRef.current.addEventListener('click', onClick);
        svgRef.current.addEventListener('mouseup', onMouseUp);
        svgRef.current.addEventListener('mousemove', (e)=>{onMouseMove(e,currentSelection)});
        
        const cleanUp = () => {
            if (svgRef.current) {
                svgRef.current.removeEventListener('click', onClick);
                svgRef.current.removeEventListener('mouseup',onMouseUp);
                svgRef.current.removeEventListener('mousemove', (e)=>{onMouseMove(e,currentSelection)});
            }
        }

        return cleanUp;

    }, [currentSelection])
}
export default useJoin
