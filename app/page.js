"use client"
import Gate from '../components/gate'
import { renderNodeSVG } from '../utils/canvas'
import { useEffect, useRef, useState } from 'react'
import useGateStore from '../store/store'
import TempPath from '../components/tempPath'
export default function Home() {

  const svgRef = useRef(null)
  const mainRef = useRef(null)
  const {setGates,gates,currentSelection,setCurrentSelection} = useGateStore((state)=>state)
  const [currentPos,setCurrentPos] = useState(null)
  
  useEffect(() => {
    const mouseMove = (e) => {
      console.log('sdsd')
      if(currentSelection){
        setCurrentPos({x:e.clientX,y:e.clientY})
      }
    }
    const mouseClick = (e) => {
        console.log('click')
        setCurrentPos(null)
        setCurrentSelection(null)
    }
    svgRef.current.addEventListener('mousemove',mouseMove)
    svgRef.current.addEventListener('click',mouseClick)
    
    return ()=>{
       
        svgRef?.current?.removeEventListener('mousemove',mouseMove)
        svgRef?.current?.removeEventListener('click',mouseClick)
    }
  }, [currentSelection])
  
  const saveData = (data) => {
    localStorage.setItem('data',JSON.stringify(data))
  }
  const reset = () =>{
    localStorage.clear()
  }

  return (
    <main id='container' ref={mainRef} className="w-full flex flex-grow relative overflow-hidden">
      {
        Object.entries(gates).map((gate) => {
          return <Gate key={gate[0]} setCurrentPos={setCurrentPos} currentPos={currentPos} gates={gates} setGates={setGates} id={gate[0]} gate={gate[1]} />
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
