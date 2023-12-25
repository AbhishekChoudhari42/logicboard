import React from 'react'
import { drawNodeSVG, getInputOutputPos } from '@/utils/canvas'
import useGateStore from '@/store/store'

export const line = (x1,y1,x2,y2) => {

    let xHalf = Math.round(x2-x1)/2
    let yHalf = Math.round(y2-y1)/2
    let line = `M${x1} ${y1} L${x1+xHalf} ${y1} L${x1+xHalf} ${y1 + yHalf} L${x1+xHalf} ${y2} L${x2} ${y2}`
    return line
}

const TempPath = ({currentPos}) => {
    const {currentSelection,gates} = useGateStore((state)=>state)
    const startGate = gates[currentSelection?.startId]
    let startPos
    if(currentSelection?.startType?.value){
        if(currentSelection?.startType.value == 'OP'){
            startPos = getInputOutputPos(startGate.pos.x,startGate.pos.y,startGate.input.length).output
        }else if(currentSelection?.startType.value == 'IP'){
            startPos = getInputOutputPos(startGate.pos.x,startGate.pos.y,startGate.input.length).input[currentSelection.startType.index]
        }
    }
   if(startPos && currentPos){
    return currentSelection?.startId && <path d={line(startPos.x,startPos.y,currentPos.x,currentPos.y)} stroke='#1115' strokeWidth={2} fill='none' className='temp-path'></path>
   }
}

export default TempPath