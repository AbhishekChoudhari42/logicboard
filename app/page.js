"use client"
import Gate from '@/components/gate'
import { drawGrid, renderNodeSVG, renderNodes, setCanvasDimension } from '@/utils/canvas'
import { useEffect, useRef, useState } from 'react'
import data from '@/constants/data'
export default function Home() {
  const canvasRef = useRef(null)
  const mainRef = useRef(null)
  
  const [gates,setGates] = useState(data);
  let current = null;
  function handleClick(object){
    if(!current){
      console.log(object)
      current = object
    }else{
      if(current.class ==  'OP'){
        console.log(object)
        console.log(current)
        if(object.class == 'IP_A'){
          let newObj = gates[object.id]
          newObj.input.a.source = current.id
          setGates({...gates,[object.id]:newObj})
        }else if(object.class == 'IP_B'){
            let newObj = gates[object.id]
            newObj.input.b.source = current.id
            setGates({...gates,[object.id]:newObj})
      }
    }
    current = null
  }
}
  useEffect(()=>{
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // renderNodes(gates,ctx)

    function reset(){
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // renderNodes(gates,ctx)
    }
    
    window.addEventListener('resize',reset)
    return ()=>{
      window.removeEventListener('resize',reset)
    }
  },[gates])

  return (
    <main id='container' ref={mainRef} className="w-full flex flex-grow relative overflow-hidden">
      <canvas ref={canvasRef}>
      </canvas>
      {
       Object.entries(gates).map((gate)=>{
          return <Gate handleClick={handleClick} key={gate[0]} gates={gates} setGates={setGates} id={gate[0]} gate={gate[1]}/>
        })
      }
      <svg className='w-full h-screen'>
      {
        renderNodeSVG(gates).map(element=>{
          return element
        })      
      }
      </svg>
    </main>
  )
  }
