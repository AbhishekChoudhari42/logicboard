import { v4 as uuid } from "uuid"

let data = {
    a: {
        pos: {
            x: 50,
            y: 50,
        },
        operation: 'SRC',

        output: 1
    },
    a1: {
        pos: {
            x: 50,
            y: 50,
        },
        operation: 'SRC',
        input: [
        {
            value: 1,
            source: null
        },
        ],
        output: 1
    },
    qw: {
        pos: {
            x: 50,
            y: 50,
        },
        operation: 'AND',
        input: [
        {
            value: 0,
            source: null
        },
        {
            value: 0,
            source: null
        }
        ],
        output: 0
    },
    l: {
        pos: {
            x: 50,
            y: 50,
        },
        operation: 'AND',
        input: [
        {
            value: 0,
            source: null
        },
        {
            value: 0,
            source: null
        }
        ],
        output: 0
    },
    b: {
        pos: {
            x: 50,
            y: 200,
        },
        operation: 'AND',
        input: [{
            value: 0,
            source: null
        },
        {
            value: 0,
            source: null
        }
        ],
        output: 0
    },
    g: {
        pos: {
            x: 250,
            y: 125,
        },
        operation: 'NOT',
        input: [{
            value: 0,
            source: null
        }
        ],
        output: 0
    },
    x: {
        pos: {
            x: 250,
            y: 125,
        },
        operation: 'NOT',
        input: [{
            value: 0,
            source: null
        }
        ],
        output: 0
    },
    z: {
        pos: {
            x: 250,
            y: 125,
        },
        operation: 'NOT',
        input: [{
            value: 0,
            source: null
        }
        ],
        output: 0
    },
    d: {
        pos: {
            x: 350,
            y: 350,
        },
        operation: 'AND',
        input: [
        {
            value: 0,
            source: null
        },
        {
            value: 0,
            source: null
        },
        {
            value: 0,
            source: null
        }
        ],
        output: 0
    },
    e: {
        pos: {
            x: 150,
            y: 350,
        },
        operation: 'OR',
        input: [{
            value: 0,
            source: null
        },
        {
            value: 0,
            source: null
        }
        ],
        output: 0
    },
}

const testValue = 2

for(let i = 0 ; i < testValue ; i++){

    // let opp = Math.random() > 0.5 ? 'AND' : 'OR'
    let opp = 'OR'
    
    let obj = {
        pos: {
            x: 100,
            y: 200,
        },
        operation: opp,
        input: [{
            value: 0,
            source: null
        },
        {
            value: 0,
            source: null
        }
        ],
        output: 0
    }
    data = {...data,['id'+i]:obj}
}

export default data