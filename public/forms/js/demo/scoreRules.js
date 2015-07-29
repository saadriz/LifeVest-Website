// this object will be used for score calculation
var scoreRules = {
    s2q1: [
        {robo: 3,brokerage: 0,fa: 2,ria: 2, textValue: "Very rarely"},
        {robo: 2,brokerage: 0,fa: 2,ria: 2, textValue: "Quarterly"},
        {robo: 2,brokerage: 0,fa: 2,ria: 2, textValue: "Monthly"},
        {robo: 1,brokerage: 1,fa: 1,ria: 1, textValue: "2-3 times a month"},
        {robo: 1,brokerage: 2,fa: 1,ria: 1, textValue: "Weekly"},
        {robo: 0,brokerage: 2,fa: 0,ria: 0, textValue: "2-3 times a week"},
        {robo: 0,brokerage: 3,fa: 0,ria: 0, textValue: "Daily"}
    ],    
    s2q2: [
        {robo: 3,brokerage: 0,fa: 2,ria: 2, textValue: "0-1 hours"},
        {robo: 2,brokerage: 1,fa: 1,ria: 0, textValue: "1-3 hours"},
        {robo: 0,brokerage: 2,fa: 1,ria: 0, textValue: "3-5 hours"},
        {robo: 0,brokerage: 2,fa: 0,ria: 0, textValue: "5-15 hours"},
        {robo: 0,brokerage: 3,fa: 0,ria: 0, textValue: "15+ hours"}
    ],    
    s2q3: [
        {robo: 0,brokerage: 3,fa: 0,ria: 0, textValue: "Weekly"},
        {robo: 0,brokerage: 2,fa: 1,ria: 3, textValue: "Monthly"},
        {robo: 0,brokerage: 2,fa: 3,ria: 2, textValue: "Quarterly"},
        {robo: 1,brokerage: 1,fa: 2,ria: 1, textValue: "Twice a year"},
        {robo: 1,brokerage: 1,fa: 0,ria: 0, textValue: "Once a year"},
        {robo: 1,brokerage: 1,fa: 0,ria: 0, textValue: "One every few years"}
    ],    
    s2q4: [
        {robo: 1,brokerage: 3,fa: 0,ria: 1, textValue: "Very high"},
        {robo: 1,brokerage: 2,fa: 0,ria: 1, textValue: "High"},
        {robo: 1,brokerage: 1,fa: 1,ria: 1, textValue: "Average"},
        {robo: 2,brokerage: 0,fa: 2,ria: 2, textValue: "Low"},
        {robo: 3,brokerage: 0,fa: 2,ria: 2, textValue: "Very low"}
    ],    
    s3q1: [
        {robo: 2,brokerage: 2,fa: 0,ria: 1, textValue: "Daily"},
        {robo: 1,brokerage: 2,fa: 0,ria: 1, textValue: "2-3 times a week"},
        {robo: 1,brokerage: 1,fa: 1,ria: 1, textValue: "Weekly"},
        {robo: 1,brokerage: 1,fa: 2,ria: 2, textValue: "A few times a month"},
        {robo: 1,brokerage: 0,fa: 2,ria: 2, textValue: "Monthly"}
    ],
    s3q2: [
        {robo: 3,brokerage: 0,fa: 0,ria: 0, textValue: "$0 - $2,500"},
        {robo: 2,brokerage: 1,fa: 0,ria: 0, textValue: "$2,500 - $10,000"},
        {robo: 2,brokerage: 1,fa: 0,ria: 0, textValue: "$10,000 - $50,000"},
        {robo: 2,brokerage: 1,fa: 0,ria: 2, textValue: "$50,000 - $100,000"},
        {robo: 1,brokerage: 2,fa: 2,ria: 2, textValue: "$100,000 - $250,000"},
        {robo: 1,brokerage: 2,fa: 3,ria: 3, textValue: "More than $250,000"}
    ],
    s3q3: [
        {robo: 0,brokerage: 2,fa: 0,ria: 0, textValue: "Very high"},
        {robo: 0,brokerage: 2,fa: 2,ria: 2, textValue: "High"},
        {robo: 1,brokerage: 1,fa: 2,ria: 2, textValue: "Average"},
        {robo: 2,brokerage: 1,fa: 1,ria: 1, textValue: "Low"},
        {robo: 2,brokerage: 0,fa: 0,ria: 0, textValue: "Very low"}
    ],
    s3q4: [
        {robo: 0,brokerage: 1,fa: 0,ria: 0, textValue: "0 to 5%"},
        {robo: 0,brokerage: 1,fa: 0,ria: 0, textValue: "5 to 15%"},
        {robo: 1,brokerage: 1,fa: 1,ria: 1, textValue: "15 to 25%"},
        {robo: 1,brokerage: 0,fa: 1,ria: 1, textValue: "25 to 50%"},
        {robo: 1,brokerage: 0,fa: 1,ria: 1, textValue: "More than"}
    ],
    s3q5: [
        {robo: 0,brokerage: 2,fa: 2,ria: 0, textValue: "Intra-month"},
        {robo: 0,brokerage: 2,fa: 1,ria: 1, textValue: "1 month"},
        {robo: 0,brokerage: 2,fa: 2,ria: 2, textValue: "6 months"},
        {robo: 1,brokerage: 2,fa: 2,ria: 2, textValue: "1 year"},
        {robo: 1,brokerage: 2,fa: 1,ria: 1, textValue: "2-3 years"},
        {robo: 2,brokerage: 1,fa: 0,ria: 0, textValue: "3-10 years"},
        {robo: 3,brokerage: 0,fa: 0,ria: 0, textValue: "10+ years"}
    ],
    s4q1: [
        {robo: 0,brokerage: 0,fa: 3,ria: 3, textValue: "High"},
        {robo: 1,brokerage: 1,fa: 1,ria: 2, textValue: "Medium"},
        {robo: 2,brokerage: 1,fa: 0,ria: 0, textValue: "Low"}
    ],    
    s4q2: [
        {robo: 0,brokerage: 0,fa: 3,ria: 2, textValue: "High"},
        {robo: 0,brokerage: 0,fa: 1,ria: 1, textValue: "Medium"},
        {robo: 3,brokerage: 3,fa: 0,ria: 0, textValue: "Low"}
    ],    
    s4q3: [
        {robo: 0,brokerage: 3,fa: 2,ria: 2, textValue: "High"},
        {robo: 0,brokerage: 1,fa: 1,ria: 1, textValue: "Medium"},
        {robo: 2,brokerage: 0,fa: 0,ria: 0, textValue: "Low"}
    ],    
    s4q4: [
        {robo: 0,brokerage: 2,fa: 1,ria: 0, textValue: "High"},
        {robo: 0,brokerage: 1,fa: 2,ria: 0, textValue: "Medium"},
        {robo: 3,brokerage: 0,fa: 0,ria: 3, textValue: "Low"}
    ],    
    s4q5: [
        {robo: 1,brokerage: 3,fa: 0,ria: 0, textValue: "Very important. Regardless of how my investments perform, I want  to pay the lowest possible cost."},
        {robo: 2,brokerage: 1,fa: 1,ria: 1, textValue: "Moderate. I am willing to pay a reasonable fees for service, but I do not believe paying more equals better performance."},
        {robo: 0,brokerage: 0,fa: 3,ria: 2, textValue: "Less important. I am willing to pay more for the potential of better advice and performance."}
    ] 
};
