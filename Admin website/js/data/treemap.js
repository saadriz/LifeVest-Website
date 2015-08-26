$(window).load(function() {
	 var data = [{
                     label: 'Cash',
                     value: 2,
                     color: "#C8DC42"
                 }, {
                     label: 'Home',
                     value: 3,
                     color: "#FFC927"
                 }, {
                     label: 'Rental Properties',
                     value: 16,
                     color: "#F37120"
                 }, {
                     label: 'Stocks',
                     value: 27,
                     color: "#38CFFF"
                 }, {
                     label: 'Bonds',
                     value: 51,
                     color: "#148FCC"
                 }, {
                     label: 'Alternative',
                     value: 2,
                     color: "#E8466E"
                 }];
                 $('#treemap').jqxTreeMap({
                     width: 335,
                     height: 215,
                     source: data
                 });
});