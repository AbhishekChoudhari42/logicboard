import { create } from 'zustand'
import data from '../constants/data'
import evaluateLogic from '../utils/logicEvaluator'
const useGateStore = create((set) => ({
    gates: data,
    setGates: (gatesObject) => set(() => ({ gates: gatesObject })),
    currentSelection: null,
    setCurrentSelection: (elementData) => set(() => ({ currentSelection:elementData })),
    setGatesAfterNodeJoin: (gatesObject) => {
        gatesObject = evaluateLogic(gatesObject)
        set(() => ({ gates: gatesObject , currentSelection:null}))
    },
}))
export default useGateStore