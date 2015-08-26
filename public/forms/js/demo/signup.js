/**
 * Created by Marwen on 20/08/2015.
 */
//read in a form's data and convert it to a key:value object
function getFormData(dom_query) {
	var out = {};
	var s_data = $(dom_query).serializeArray();
	console.debug(s_data);
	//transform into simple data/value object
	for (var i = 0; i < s_data.length; i++) {
		var record = s_data[i];
		out[record.name] = record.value;
	}
	return out;
}
$(function () {
	var submitSignup = function() {
		var user = getFormData($("#ss-form"));
		user.year_of_birth = user.year;
		$("#ss-form").validate({
			rules: {
				email: {
					required: true,
					email: true
				},
				username: {
					required: true
				},
				agreement: {
					required: true
				}
			},
			messages: {
				email: {
					required: "Please enter a valid e-mail address",
					email: "Please enter a valid e-mail address"
				},
				year: {
					required: "Please select your year of birth"
				}
			}
		});
		if($("#ss-form").valid()) {
			user.password = $.md5(user.password)
			$.ajax({
				url: "/signup/",
				data: user,
				dataType: "json",
				method: "POST"
			}).success(function (res) {
				user._id = res._id;
				window.scrollTo(0, 0);
			}).error(function (res) {
				console.error("Error inserting user informations.")
			});
		}
	};
	$("#signupBtn").click(submitSignup);
});