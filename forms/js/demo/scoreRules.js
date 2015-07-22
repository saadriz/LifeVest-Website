// this object will be used for score calculation
var scoreRules = {
    s2q1: [
        {robo: 3,brokerage: 0,fa: 2,ria: 2},
        {robo: 2,brokerage: 0,fa: 2,ria: 2},
        {robo: 2,brokerage: 0,fa: 2,ria: 2},
        {robo: 1,brokerage: 1,fa: 1,ria: 1},
        {robo: 1,brokerage: 2,fa: 1,ria: 1},
        {robo: 0,brokerage: 2,fa: 0,ria: 0},
        {robo: 0,brokerage: 3,fa: 0,ria: 0}
    ],    
    s2q2: [
        {robo: 3,brokerage: 0,fa: 2,ria: 2},
        {robo: 2,brokerage: 1,fa: 1,ria: 0},
        {robo: 0,brokerage: 2,fa: 1,ria: 0},
        {robo: 0,brokerage: 2,fa: 0,ria: 0},
        {robo: 0,brokerage: 3,fa: 0,ria: 0}
    ],    
    s2q3: [
        {robo: 0,brokerage: 3,fa: 0,ria: 0},
        {robo: 0,brokerage: 2,fa: 1,ria: 3},
        {robo: 0,brokerage: 2,fa: 3,ria: 2},
        {robo: 1,brokerage: 1,fa: 2,ria: 1},
        {robo: 1,brokerage: 1,fa: 0,ria: 0},
        {robo: 1,brokerage: 1,fa: 0,ria: 0}
    ],    
    s2q4: [
        {robo: 1,brokerage: 3,fa: 0,ria: 1},
        {robo: 1,brokerage: 2,fa: 0,ria: 1},
        {robo: 1,brokerage: 1,fa: 1,ria: 1},
        {robo: 2,brokerage: 0,fa: 2,ria: 2},
        {robo: 3,brokerage: 0,fa: 2,ria: 2}
    ],    
    s3q1: [
        {robo: 2,brokerage: 2,fa: 0,ria: 1},
        {robo: 1,brokerage: 2,fa: 0,ria: 1},
        {robo: 1,brokerage: 1,fa: 1,ria: 1},
        {robo: 1,brokerage: 1,fa: 2,ria: 2},
        {robo: 1,brokerage: 0,fa: 2,ria: 2}
    ],    
    s3q2: [
        {robo: 0,brokerage: 1,fa: 0,ria: 0},
        {robo: 0,brokerage: 1,fa: 0,ria: 0},
        {robo: 1,brokerage: 1,fa: 1,ria: 1},
        {robo: 1,brokerage: 0,fa: 1,ria: 1},
        {robo: 1,brokerage: 0,fa: 1,ria: 1}
    ],    
    s3q3: [
        {robo: 0,brokerage: 2,fa: 2,ria: 0},
        {robo: 0,brokerage: 2,fa: 1,ria: 1},
        {robo: 0,brokerage: 2,fa: 2,ria: 2},
        {robo: 1,brokerage: 2,fa: 2,ria: 2},
        {robo: 1,brokerage: 2,fa: 1,ria: 1},
        {robo: 2,brokerage: 1,fa: 0,ria: 0},
        {robo: 3,brokerage: 0,fa: 0,ria: 0}
    ],    
    s3q4: [
        {robo: 0,brokerage: 2,fa: 0,ria: 0},
        {robo: 0,brokerage: 2,fa: 2,ria: 2},
        {robo: 1,brokerage: 1,fa: 2,ria: 2},
        {robo: 2,brokerage: 1,fa: 1,ria: 1},
        {robo: 2,brokerage: 0,fa: 0,ria: 0}
    ],    
    s3q5: [
        {robo: 3,brokerage: 0,fa: 0,ria: 0},
        {robo: 2,brokerage: 1,fa: 0,ria: 0},
        {robo: 2,brokerage: 1,fa: 0,ria: 0},
        {robo: 2,brokerage: 1,fa: 0,ria: 2},
        {robo: 1,brokerage: 2,fa: 2,ria: 2},
        {robo: 1,brokerage: 2,fa: 3,ria: 3}
    ],    
    s4q1: [
        {robo: 0,brokerage: 0,fa: 3,ria: 3},
        {robo: 1,brokerage: 1,fa: 1,ria: 2},
        {robo: 2,brokerage: 1,fa: 0,ria: 0}
    ],    
    s4q2: [
        {robo: 0,brokerage: 0,fa: 3,ria: 2},
        {robo: 0,brokerage: 0,fa: 1,ria: 1},
        {robo: 3,brokerage: 3,fa: 0,ria: 0}
    ],    
    s4q3: [
        {robo: 0,brokerage: 3,fa: 2,ria: 2},
        {robo: 0,brokerage: 1,fa: 1,ria: 1},
        {robo: 2,brokerage: 0,fa: 0,ria: 0}
    ],    
    s4q4: [
        {robo: 1,brokerage: 3,fa: 0,ria: 2},
        {robo: 2,brokerage: 1,fa: 1,ria: 1},
        {robo: 0,brokerage: 0,fa: 3,ria: 2}
    ],    
    s4q5: [
        {robo: 0,brokerage: 2,fa: 1,ria: 0},
        {robo: 0,brokerage: 1,fa: 2,ria: 0},
        {robo: 3,brokerage: 0,fa: 0,ria: 3}
    ] 
};
