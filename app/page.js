"use client"
import Gate from '@/components/gate'
import { drawGrid, renderNodeSVG, renderNodes, setCanvasDimension } from '@/utils/canvas'
import { useEffect, useRef, useState } from 'react'
import data from '@/constants/data'
import { evaluateLogic } from '@/utils/logicEvaluator'
import { v4 as uuid } from 'uuid'
import useGateStore from '@/store/store'
import useJoin from '@/hooks/useJoin'
import TempPath from '@/components/tempPath'
export default function Home() {

  const svgRef = useRef(null)
  const mainRef = useRef(null)
  const {setGates,gates,currentSelection,setCurrentSelection} = useGateStore((state)=>state)
  const [currentPos,setCurrentPos] = useState(null)

  // useJoin(svgRef)


  
  useEffect(() => {
    const mouseMove = (e) => {
      if(currentSelection){
        setCurrentPos({x:e.clientX,y:e.clientY})
      }
    }
    const mouseClick = (e) => {
        setCurrentSelection(null)
    }
    svgRef.current.addEventListener('mousemove',mouseMove)
    svgRef.current.addEventListener('click',mouseClick)
    
    return ()=>{
        svgRef?.current?.removeEventListener('mousemove',mouseMove)
        svgRef?.current?.removeEventListener('click',mouseClick)
    }
  }, [currentSelection])
  
  return (
    <main id='container' ref={mainRef} className="w-full flex flex-grow relative overflow-hidden">
      {/* <canvas ref={canvasRef}>
      </canvas> */}
      {
        Object.entries(gates).map((gate) => {
          return <Gate key={gate[0]} gates={gates} setGates={setGates} id={gate[0]} gate={gate[1]} />
        })
      }
      <svg ref={svgRef} className='w-full h-screen'>
        {
          renderNodeSVG(gates).map(element => {
            return element
          })
        }
        {
          <TempPath currentPos={currentPos}/>
        }
      </svg>
      
    </main>
  )
}
