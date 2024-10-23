export default function evaluateLogic(gates){

    let isEvaluated = []
    let gateIdArray = Object.keys(gates)
    let isVisited = {}
    
    gateIdArray.forEach((id)=>{
        isVisited = {...isVisited,[id]:{count:0}}
    })

    function evaluateGate(id){

        let inputArray = []
        
        if(isEvaluated.includes(id)){
            return gates[id].output;
        }
        if(isVisited[id].count > 2){
            return
        }
        isVisited[id].count = isVisited[id].count + 1; 
        let currentGate = gates[id];
    
        for(let i = 0 ; i < currentGate.input?.length; i++){
            let gateId = currentGate?.input[i].source;

            if(!gateId){
                let output = currentGate?.input[i].value;
                inputArray.push(output)
            }else{
                let op = evaluateGate(gateId)
                gates[id].input[i].value = op
                inputArray.push(op)
            }
        }
        isEvaluated.push(id)
        gates[id].output = evaluateOutput(inputArray,currentGate.operation)
        return gates[id].output
    }

    gateIdArray.forEach((id)=>{
            evaluateGate(id)
    })
    return gates

}

function evaluateOutput(inputArray,operation){
    let finalOutput
    switch(operation){
        case 'SRC':
            finalOutput = 1
        case 'AND':
            finalOutput = inputArray.reduce((a,b)=> a*b,1)
            break
        case 'OR':
            finalOutput = inputArray.reduce((a,b) => a+b,0)
            break
        case 'NOT':
            finalOutput = !inputArray[0]
            break
    }
    return finalOutput
}