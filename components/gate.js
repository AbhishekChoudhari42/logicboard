"use client"
import useDrag from '@/hooks/useDrag'
import useGateStore from '@/store/store'
import evaluateLogic from '@/utils/logicEvaluator'
import React, { useState } from 'react'

const Gate = ({ gate,id}) => {

    const {currentSelection,setCurrentSelection,setGates,setGatesAfterNodeJoin,gates,set} = useGateStore(state=>state) 
    const {operation, input, output, pos } = gate
    const initialCoordinates = {
        x:pos.x,
        y:pos.y
    }
    
    const position = {
        left:pos.x+'px',
        top:pos.y+'px'
    }
    
    const handleClick = (e,id,type) => {
        e.stopPropagation();
        console.log({id,type})
        if(currentSelection?.startId){
            let newGates = {...gates}
            newGates[id].input[0].source = currentSelection.startId
            setCurrentSelection(null)
            setGatesAfterNodeJoin(gates)
            return
        }
        setCurrentSelection({startId:id,startType:type})
    }
    
    useDrag(id,initialCoordinates)
    
    return (
        <div id={id} style={position} className={`gate absolute w-[40px] h-[40px] border-blue-700 rounded-md`}>
            <span></span>
            <div className='gate-element w-[40px] h-[40px] flex justify-center items-center'><span>{operation}</span></div>
            <div onClick={(e)=>{handleClick(e,id,'OP')}} className={`output ${gate.output ?'bg-green-500':'bg-red-500'}`}></div>
            <div onClick={(e)=>{handleClick(e,id,'IP_A')}} className={`input inputa ${gate.input[0].value ?'bg-green-500 border-green-600':'bg-red-500'}`}></div>
            <div onClick={(e)=>{handleClick(e,id,'IP_B')}} className={`input inputb ${gate.input[1].value ?'bg-green-500 border-green-600':'bg-red-500 '}`}></div>
        </div>
    )
}

export default Gate