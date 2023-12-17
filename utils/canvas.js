export const line = (x1,y1,x2,y2,ctx) => {
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2,y2)
}

export const getInputOutputPos = (posX,posY) => {
    return {
        inputA:{
            x:posX - 5,
            y:posY + 10
        },
        inputB:{
            x:posX-5,
            y:posY+30
        },
        output:{
            x:posX + 50,
            y:posY + 20
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
        const sourceA = gates[targetObj.input.a.source]?.pos
        const sourceB = gates[targetObj.input.b.source]?.pos
        
        if(sourceA && target){
            let sourceA_pos = getInputOutputPos(sourceA.x,sourceA.y).output
            let target_pos = getInputOutputPos(target.x,target.y).inputA
            
            drawNode(target_pos.x,target_pos.y,sourceA_pos.x,sourceA_pos.y,ctx)
        }
        if(sourceB && target){
            let sourceB_pos = getInputOutputPos(sourceB.x,sourceB.y).output
            let target_pos = getInputOutputPos(target.x,target.y).inputB
            drawNode(target_pos.x,target_pos.y,sourceB_pos.x,sourceB_pos.y,ctx)
        }
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
        const sourceA = gates[targetObj.input.a.source]?.pos
        const sourceB = gates[targetObj.input.b.source]?.pos
        
        if(sourceA && target){
            let sourceA_pos = getInputOutputPos(sourceA.x,sourceA.y).output
            let target_pos = getInputOutputPos(target.x,target.y).inputA
            arr.push(drawNodeSVG(target_pos.x,target_pos.y,sourceA_pos.x,sourceA_pos.y))
        }
        if(sourceB && target){
            let sourceB_pos = getInputOutputPos(sourceB.x,sourceB.y).output
            let target_pos = getInputOutputPos(target.x,target.y).inputB
            arr.push(drawNodeSVG(target_pos.x,target_pos.y,sourceB_pos.x,sourceB_pos.y))
        }
    })
    return (arr)
}

export const drawNodeSVG = (x1,y1,x2,y2) => {

    let xHalf = Math.round(x2-x1)/2
    let yHalf = Math.round(y2-y1)/2
    
    const line = `M${x1} ${y1} L${x1+xHalf} ${y1} L${x1+xHalf} ${y1 + yHalf} L${x1+xHalf} ${y2} L${x2} ${y2}`
    return <path id="ab" onClick={(e)=>{console.log(e.target.id)}}  d={line} stroke-width="2" fill="none" stroke='#f00'></path>
}