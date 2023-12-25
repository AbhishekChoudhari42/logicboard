"use client"
import { useEffect, useRef } from "react"
import useGateStore from "@/store/store"

const useDrag = (id,initialCoordinates) =>{
    const isClicked = useRef(false)
    const {gates,setGates} = useGateStore()
    const coords = useRef({
        startX:initialCoordinates.x,
        startY:initialCoordinates.y,
        lastX:initialCoordinates.x,
        lastY:initialCoordinates.y
    })

    useEffect(()=>{
        const target = document.getElementById(id);
        if(!target) throw new Error("element not found")
        const targetChild = document.querySelector('#'+id+' .gate-element')
        const container = target.parentElement
        if(!container) throw new Error("element must have a parent")

        const onMouseDown = (e) =>{
            isClicked.current = true
            coords.current.startX = e.clientX
            coords.current.startY = e.clientY
           
        }

        const onMouseUp = (e) =>{
            isClicked.current = false
            coords.current.lastX = target.offsetLeft
            coords.current.lastY = target.offsetTop
        }

        const onMouseMove = (e) => {
            if(!isClicked.current){
                target.style.boxShadow = 'none'
                return
            }
            const nextX = e.clientX - coords.current.startX + coords.current.lastX
            const nextY = e.clientY - coords.current.startY + coords.current.lastY

            let obj = gates[id]
            obj.pos = {x:nextX,y:nextY}
            let newGates = {...gates,[id]:obj}
            setGates(newGates)
            target.style.boxShadow = '3px 3px 10px #1111, -3px -3px 10px #1111, -3px 3px 10px #1111, 3px -3px 10px #1111'

        }

        targetChild.addEventListener('mousedown',onMouseDown);
        target.addEventListener('mouseup',onMouseUp);
        container.addEventListener('mousemove',onMouseMove);
        container.addEventListener('mouseleave',onMouseUp);
        
        const cleanUp = () =>{

            targetChild.removeEventListener('mousedown',onMouseDown);
            target.removeEventListener('mouseup',onMouseUp);
            container.removeEventListener('mousemove',onMouseMove);
            container.removeEventListener('mouseleave',onMouseUp);

        }

        return cleanUp;
    },[id])
} 
export default useDrag