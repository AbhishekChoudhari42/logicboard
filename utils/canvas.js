import { v4 as uuid } from "uuid"

export const line = (x1,y1,x2,y2,ctx) => {
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2,y2)
}

export const getInputOutputPos = (posX,posY,inputLength) => {
    let inputArray = []
    for(let i = 0 ; i < inputLength ; i++){
        inputArray.push({
            x:posX - 5,
            y:posY + 10 + i*20
        })
    }
    return {
        input:inputArray,
        output:{
            y:posY + (inputLength/2)*20,
            x:posX + 50,
        }
    }
}
const randomColor = () => {
    let r = Math.floor(Math.random()*155) + 100
    let g = Math.floor(Math.random()*155) + 100
    let b = Math.floor(Math.random()*155) + 100
    return `rgb(${r},${g},${b},255)`
}
export const drawNode = (x1,y1,x2,y2,ctx) =>{
    let xHalf = Math.round(x2-x1)/2
    let yHalf = Math.round(y2-y1)/2
    
    ctx.beginPath()
    line(x1,y1,x1 + xHalf,y1,ctx)
    line(x1 + xHalf,y1,x1 + xHalf,y1+yHalf,ctx)
    line(x1 + xHalf,y1+yHalf,x1 + xHalf,y2,ctx)
    line(x1 + xHalf,y2,x2,y2,ctx)
    ctx.strokeStyle = '#000'
    ctx.stroke()
    ctx.closePath()
    
}

export const renderNodes = (gates,ctx) => {

    Object.keys(gates).forEach((gate)=>{
        
        const targetObj = gates[gate]
        const target = targetObj?.pos

    //     const sourceA = gates[targetObj.input[0].source]?.pos
    //     const sourceB = gates[targetObj.input[1].source]?.pos
        
    //     if(sourceA && target){
    //         let sourceA_pos = getInputOutputPos(sourceA.x,sourceA.y).output
    //         let target_pos = getInputOutputPos(target.x,target.y).inputA
            
    //         drawNode(target_pos.x,target_pos.y,sourceA_pos.x,sourceA_pos.y,ctx)
    //     }
    //     if(sourceB && target){
    //         let sourceB_pos = getInputOutputPos(sourceB.x,sourceB.y).output
    //         let target_pos = getInputOutputPos(target.x,target.y).inputB
    //         drawNode(target_pos.x,target_pos.y,sourceB_pos.x,sourceB_pos.y,ctx)
    //     }
    })
}

export const setCanvasDimension = (canvasRef,mainRef) => {
    // canvasRef.current.height = mainRef.current.clientHeight
    // canvasRef.current.width = mainRef.current.clientWidth
}

export const renderNodeSVG = (gates) => {
    const arr = []
    Object.keys(gates).map((gate)=>{
        
        const targetObj = gates[gate]
        const target = targetObj?.pos
        
        for(let i = 0 ; i < targetObj?.input.length ; i++){
            const sourceGate = gates[targetObj.input[i].source]
            const source = sourceGate?.pos
            if(source){    
                let sourcePos = getInputOutputPos(source.x,source.y,sourceGate.input.length).output
                let targetPos = getInputOutputPos(target.x,target.y,targetObj?.input.length).input[i]                
                arr.push(drawNodeSVG(targetPos.x,targetPos.y,sourcePos.x,sourcePos.y,sourceGate?.output))
            }
        }        
    })

    return (arr)
}

export const drawNodeSVG = (x1,y1,x2,y2,output) => {

    let xHalf = Math.round(x2-x1)/2
    let yHalf = Math.round(y2-y1)/2
    let line = `M${x1} ${y1} L${x1+xHalf} ${y1} L${x1+xHalf} ${y1 + yHalf} L${x1+xHalf} ${y2} L${x2} ${y2}`

    return <path className={`${output ? 'move':''}`} id="ab" key={uuid()} onClick={(e)=>{console.log(e.target.id)}}  d={line} strokeWidth="2" fill="none" stroke={`${output?'#0f0':'#f00'}`} strokeLinecap="round"></path>
}