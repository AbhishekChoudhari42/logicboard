"use client"
import useDrag from '@/hooks/useDrag'
import React, { useState } from 'react'

const Gate = ({ gate,gates,setGates,id ,handleClick}) => {

    const {operation, input, output, pos } = gate
    const initialCoordinates = {
        x:pos.x,
        y:pos.y
    }
    const position = {
        left:pos.x+'px',
        top:pos.y+'px'
    }
    const [type,setType] = useState(null)
    useDrag(id,initialCoordinates,gates,setGates)
    return (
        <div id={id} style={position} className={`gate absolute w-[40px] h-[40px] border-blue-700 rounded-md`}>
            <span></span>
            <div className='gate-element w-[40px] h-[40px] flex justify-center items-center'><span>{id}</span></div>
            <div onClick={(e)=>{setType('OP');handleClick({id:id,class:'OP'})}} className={`output ${type == 'OP'?'bg-green-500':''}`}></div>
            <div onClick={(e)=>{setType('IP_A');handleClick({id:id,class:'IP_A'})}} className={`input inputa ${type == 'IP_A'?'bg-green-500':''}`}></div>
            <div onClick={(e)=>{setType('IP_B');handleClick({id:id,class:'IP_B'})}} className={`input inputb ${type == 'IP_B'?'bg-green-500':''}`}></div>
        </div>
    )
}

export default Gate