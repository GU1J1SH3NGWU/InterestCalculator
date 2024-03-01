var simpleInterest = true;

var simpleInterestRadio = document.getElementById('simpleInterest');
simpleInterestRadio.addEventListener('change', function () {
	if (this.checked) {
		simpleInterest = true;
	}
});

var compoundInterestRadio = document.getElementById('compoundInterest');
compoundInterestRadio.addEventListener('change', function () {
	if (this.checked) {
		simpleInterest = false;
	}
});

function calculateInterest() {
	if (simpleInterest) {
		document.getElementById("simpleError").innerHTML = "<p style='color: green;'>✓</p>";
		document.getElementById("compoundError").innerHTML = "<p></p>";
	} else {
		document.getElementById("compoundError").innerHTML = "<p style='color: green;'>✓</p>";
		document.getElementById("simpleError").innerHTML = "<p></p>";
	}

	
	var principal = Number(document.getElementById('principalAmount').value);
	var principalValid = false;
	if (isNaN(principal) || principal < 0.01 || (principal).toFixed(2) != principal) {
		text = "<p style='color: red;'>✗</p>";
		principalValid = false;
	} else {
		text = "<p style='color: green;'>✓</p>";
		principalValid = true;
	}
	document.getElementById("principalError").innerHTML = text;


	var rate = Number(document.getElementById('interestRate').value);
	var rateValid = false;
	if (isNaN(rate) || rate < 0.01 || (rate).toFixed(2) != rate) {
		text = "<p style='color: red;'>✗</p>";
		rateValid = false;
	} else {
		text = "<p style='color: green;'>✓</p>";
		rateValid = true;
	}
	document.getElementById("rateError").innerHTML = text;

	
	
	var freq = document.getElementById('interestFreq').value;
	document.getElementById("freqError").innerHTML = "<p style='color: green;'>✓</p>";

	

	var duration = Number(document.getElementById('duration').value);
	var durationValid = false;
	if (isNaN(duration) || duration < 1 || duration > 100 || Math.round(duration) != duration) {
		text = "<p style='color: red;'>✗</p>";
		durationValid = false;
	} else {
		text = "<p style='color: green;'>✓</p>";
		durationValid = true;
	}
	document.getElementById("durationError").innerHTML = text;


	
	const timesPerYear = {"Annually" : 1,"Semiannually" : 2,"Quarterly" : 4,"Monthly" : 12};
	var times = duration * timesPerYear[freq];


	if (principalValid && rateValid && durationValid) {
		rate = rate / 100;
		var output = "<table class='resultTable'><tr><th>Year</th><th>Interest</th><th>Total Amount</th></tr>";
		if (simpleInterest) {
			for (var i = timesPerYear[freq]; i <= times; i+=timesPerYear[freq]) {
				var total = principal + principal * rate * i;
				var year = Math.ceil(i / timesPerYear[freq]);
				output += "<tr><td style='text-align: center;'>" + year + "</td>";
				output += "<td style='text-align: right;'>$" + (principal * rate * timesPerYear[freq]).toFixed(2) + "</td>";
				output += "<td style='text-align: right;'>$" + total.toFixed(2) + "</td></tr>";
			}
		} else {
			for (var i = timesPerYear[freq]; i <= times; i+=timesPerYear[freq]) {
				var total = principal * (1 + rate) ** i;
				var year = Math.ceil(i / timesPerYear[freq]);
				output += "<tr><td style='text-align: center;'>" + year + "</td>";
				output += "<td style='text-align: right;'>$" + (principal * (1 + rate) ** i - principal * (1 + rate) ** (i-timesPerYear[freq])).toFixed(2) + "</td>";
				output += "<td style='text-align: right;'>$" + total.toFixed(2) + "</td></tr>";
			}
		}
		output += "</table>";
	} else {
		var output = "<p>Invalid Inputs</p>"
	}

	document.getElementById('results').innerHTML = output;
	
}




const moneyInputs = document.querySelectorAll(".money-input");

moneyInputs.forEach(function(input) {
	input.addEventListener("blur", function() {
		addTrailingZeros(this);
	});
});

function addTrailingZeros(input) {
	if (input.value === '') return;
	const floatValue = parseFloat(input.value);
	if (!isNaN(floatValue)) {
		input.value = floatValue.toFixed(2);
	}
}
