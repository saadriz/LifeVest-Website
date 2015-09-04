/**
 * Created by Marwen on 30/08/2015.
 */

$(function () {
	var chart = null;
	function outputCalculation() {
		var saving = $(".saving_input").val(); //parseFloat($(".saving").val());
		var number_of_year = $(".number_of_year_input").val(); // parseInt($('.number_of_year').val());
		var inflation_rate = $(".inflation_rate_input").val();
		var invenstment_returns = $(".investment_rate_input").val();

		var not_invested_purchasing_power,
			not_invested_paper_value,
			invested_purchasing_power, invested_paper_value;

		$(".saving").text("$" + saving);
		$("#number_of_year").text(number_of_year);
		$("#inflation_rate").text(inflation_rate + "%");
		$("#investment_returns").text(invenstment_returns + "%");

		not_invested_paper_value = saving;
		not_invested_purchasing_power = Math.round(not_invested_paper_value / Math.pow(1 + inflation_rate / 100, number_of_year));
		$("#not_invested_paper_value").text("$" + not_invested_paper_value);
		$("#not_invested_purchasing_power").text("$" + not_invested_purchasing_power);

		invested_paper_value = Math.round(saving * Math.pow(1 + invenstment_returns / 100, number_of_year));
		invested_purchasing_power = Math.round(invested_paper_value / Math.pow(1 + (inflation_rate / 100), number_of_year));
		$("#invested_paper_value").text("$" + invested_paper_value);
		$("#invested_purchasing_power").text("$" + invested_purchasing_power);

		var barChartData = {
			labels: ["Not Invested", "Invested"],
			datasets: [
				{
					fillColor: "rgba(26,123,185,0.5)",
					strokeColor: "rgba(220,220,220,0.8)",
					highlightFill: "rgba(56,153,215,0.75)",
					highlightStroke: "rgba(56,153,215,1)",
					data: [ not_invested_purchasing_power, invested_purchasing_power]
				}
			]
		};
		var ctx = document.getElementById("horizontalBarChart").getContext("2d");

		if(chart!=null){
			chart.destroy();
		}

		chart = new Chart(ctx).HorizontalBar(barChartData, {
			responsive: true,
			barShowStroke: false
		});
		chart.draw();
	}

	outputCalculation();

	$(document).on("click", ".close_educ_tool", function() {
		$("#myModal4").hide();
	});

	$(document).on("click", ".launch_educational_tool" , function() {
		$("#myModal4").fadeIn();
	});

	$(document).on("click", ".save_variables", function () {
		var primer_obj = {};
		primer_obj.saving = $(".saving_input").val();
		primer_obj.years = $(".number_of_year_input").val();
		primer_obj.inflation = $(".inflation_rate_input").val();
		primer_obj.investment =$(".investment_rate_input").val();
		$("#variable_form").validate({

		});
		if($("#variable_form").valid()) {
			$.ajax({
				url: "/update-variables",
				data: primer_obj,
				dataType: "json",
				method: "POST"
			}).success(function (res) {
				if(res.status == 200) {
					outputCalculation();
					$("#myModal4").fadeOut();
				}
			}).error(function (res) {
				console.error("Error inserting user informations.")
			});
		}
	});
});