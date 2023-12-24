const data = {
    a: {
        pos: {
            x: 50,
            y: 50,
        },
        operation: 'AND',
        input: [{
            value: 1,
            source: null
        },
        {
            value: 1,
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
            value: 1,
            source: null
        }
        ],
        output: 0
    },
    c: {
        pos: {
            x: 250,
            y: 125,
        },
        operation: 'NOT',
        input: [{
            value: 0,
            source: 'a'
        },
        {
            value: 0,
            source: 'b'
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
    e: {
        pos: {
            x: 150,
            y: 350,
        },
        operation: 'OR',
        input: [{
            value: 0,
            source: 'c'
        },
        {
            value: 0,
            source: 'd'
        }
        ],
        output: 0
    },
}

export default data