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
        let output = 1
    
        for(let i = 0 ; i < currentGate.input.length; i++){
            let gateId = currentGate?.input[i].source;

            if(!gateId){
                output *= currentGate?.input[i].value;
            }else{
                let op = evaluateGate(gateId)
                gates[id].input[i].value = op
                output *= op
            }
        }
        isEvaluated.push(id)
        gates[id].output = output
        return gates[id].output
    }

    gateIdArray.forEach((id)=>{
            evaluateGate(id)
    })
    console.log("gates ==> ",gates)   
    return gates

}