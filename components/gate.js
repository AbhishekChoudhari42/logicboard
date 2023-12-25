"use client"
import useDrag from '@/hooks/useDrag'
import { v4 as uuid } from 'uuid'
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
    let gateHeight = input.length * 20
    
    const position = {
        left:pos.x+'px',
        top:pos.y+'px'
    }
    
    const handleClick = (e,id,type) => {
        e.stopPropagation();
        let newGates = {...gates}
        if(currentSelection?.startId){
            if(currentSelection.startType.value == "IP" && type?.value == 'OP'){
                let InputId = currentSelection.startId
                let inputIndex = currentSelection.startType.index
                newGates[InputId].input[inputIndex].source = id
            }else 
            if(currentSelection.startType.value == "OP" && type?.value == 'IP')
            {
                newGates[id].input[type?.index].source = currentSelection.startId
            }else{
                return
            }
            setCurrentSelection(null)
            setGatesAfterNodeJoin(gates)
            return
        }
        setCurrentSelection({startId:id,startType:type})
    }
    
    useDrag(id,initialCoordinates)
    const gateStyle = {height:`${(input.length*20)}px`}
    return (
        <div id={id} style={{...position,...gateStyle}} className={`gate absolute  h-${(input.length*4)} border-blue-700 rounded-md`}>
            <span></span>
            <div style={gateStyle} className={`gate-element flex justify-center items-center`}><span>{operation}</span></div>
            
            <div onClick={(e)=>{handleClick(e,id,{value:'OP',index:null})}} className={`output ${gate.output ?'bg-green-500':'bg-red-500'}`}></div>

            <div className='input-container'>
                {
                    gate.input.map((el,index)=>{
                        return <div key={uuid()} onClick={(e)=>{handleClick(e,id,{value:'IP',index})}} className={`input ${gate.input[index].value ?'bg-green-500 border-green-600':'bg-red-500'}`}></div>                        
                    })
                }
            </div>
        </div>
    )
}

export default Gate