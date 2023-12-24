"use client"
import Gate from '@/components/gate'
import { drawGrid, renderNodeSVG, renderNodes, setCanvasDimension } from '@/utils/canvas'
import { useEffect, useRef, useState } from 'react'
import data from '@/constants/data'
import { evaluateLogic } from '@/utils/logicEvaluator'
import { v4 as uuid } from 'uuid'
import useGateStore from '@/store/store'
import useJoin from '@/hooks/useJoin'
     
export default function Home() {

  const canvasRef = useRef(null)
  const mainRef = useRef(null)
  const {setGates,gates} = useGateStore((state)=>state)
  useJoin(canvasRef)
  
  useEffect(() => {
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    function reset() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', reset)
    return () => {
      window.removeEventListener('resize', reset)
    }

  }, [gates])

  return (
    <main id='container' ref={mainRef} className="w-full flex flex-grow relative overflow-hidden">
      <canvas ref={canvasRef}>
      </canvas>
      {
        Object.entries(gates).map((gate) => {
          return <Gate key={gate[0]} gates={gates} setGates={setGates} id={gate[0]} gate={gate[1]} />
        })
      }
      <svg className='w-full h-screen'>
        {
          renderNodeSVG(gates).map(element => {
            return element
          })
        }
      </svg>
    </main>
  )
}
