export default function evaluateLogic(gates){

    let isEvaluated = []
    let gateIdArray = Object.keys(gates)
    let isVisited = {}
    
    gateIdArray.forEach((id)=>{
        isVisited = {...isVisited,[id]:{count:0}}
    })
    function evaluateGate(id){
        
        if(isEvaluated.includes(id)){
            return gates[id].output;
        }
        if(isVisited[id].count > 1){
            return
        }
        isVisited[id].count = isVisited[id].count + 1; 
        let currentGate = gates[id];
        let output

        switch(currentGate.operation){
            case 'AND':
                output = 1
                break
            case 'OR':
                output = 0
                break
            case 'NOT':
                output = 0
                break 
        }
    
        for(let i = 0 ; i < currentGate.input.length; i++){
            let gateId = currentGate?.input[i].source;

            if(!gateId){
                switch(currentGate.operation){
                    case 'AND':
                        output *= currentGate?.input[i].value;
                        break
                    case 'OR':
                        output += currentGate?.input[i].value;
                        break
                    case 'NOT':
                        output += currentGate?.input[i].value;
                        break
                }
                // output *= currentGate?.input[i].value;
            }else{
                let op = evaluateGate(gateId)
                gates[id].input[i].value = op

                switch(currentGate.operation){
                    case 'AND':
                        output *= op
                        break
                    case 'OR':
                        output += op
                        break
                    case 'NOT':
                        output += op
                        break
                }
                // output *= op
            }
        }
        isEvaluated.push(id)
        switch(currentGate.operation){
            case 'AND':
                output = output
                break
            case 'OR':
                output = output ? (output/output) : 0
                break
            case 'NOT':
                output = !output
                break
        }
        gates[id].output = output
        return gates[id].output
    }

    gateIdArray.forEach((id)=>{
            evaluateGate(id)
    })
    return gates

}