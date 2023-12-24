"use client"
import useGateStore from "@/store/store"
import { drawNode } from "@/utils/canvas"
import { Exo_2 } from "next/font/google"
import { useEffect } from "react"

const useJoin = (canvasRef) => {

    const gateStore = useGateStore(state=>state)
    console.log(gateStore)
    const { currentSelection, setCurrentSelection ,gates,setGatesAfterNodeJoin} = gateStore
    useEffect((currentSelection) => {
        
        if (!canvasRef) throw new Error("element not found")
        
        const ctx = canvasRef.current.getContext('2d')

        const onClick = () =>{
            setCurrentSelection(null)
            console.log(',esg')
        }
        
        const onMouseUp = (e) => {
            // console.log(currentSelection.startId)
            setCurrentSelection(undefined)
        }
        
        const onMouseMove = (e) => {
            if (!currentSelection?.startId) {
                return
            }
            let gate = gates[currentSelection.startId]

            console.log('move ==> ', currentSelection.startId)
            ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height)
            drawNode(gate.pos.x,gate.pos.y,e.clientX,e.clientY,ctx)
        }

        canvasRef.current.addEventListener('click', onClick);
        canvasRef.current.addEventListener('mouseup', onMouseUp);
        canvasRef.current.addEventListener('mousemove', (e)=>{onMouseMove(e,currentSelection)});
        
        const cleanUp = () => {
            if (canvasRef.current) {
                canvasRef.current.removeEventListener('click', onClick);
                canvasRef.current.removeEventListener('mouseup',onMouseUp);
                canvasRef.current.removeEventListener('mousemove', (e)=>{onMouseMove(e,currentSelection)});
            }
        }

        return cleanUp;

    }, [currentSelection])
}
export default useJoin
