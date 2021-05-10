// var table = document.getElementById("table-1");
// var row = table.insertRow(1);
// var organiztion = row.insertCell(0);
// organiztion.classList.add("blue");
// var locality = row.insertCell(1);
// var contact = row.insertCell(2);
// var covidMeds = row.insertCell(3);
// var nurseAvailibilty = row.insertCell(4);
// var number = row.insertCell(5);
// var report = document.createElement("report");
// var div = row.insertCell(6);
// div.append(report);
// var text = document.createTextNode("Report");
// report.appendChild(text);
// report.classList.add("report");

let i = 0;
// fetch("https://66f9c6dba911.ngrok.io/getBedsP?pincode=411040")
// 	.then((res) => res.json())
// 	.then((data) => {
// 		data.beds.forEach((lead) => {
// var table = document.getElementById("table-1");
// var row = table.insertRow(1);
// var organiztion = row.insertCell(0);
// organiztion.classList.add("blue");
// var locality = row.insertCell(1);
// var contact = row.insertCell(2);
// var covidMeds = row.insertCell(3);
// var nurseAvailibilty = row.insertCell(4);
// var number = row.insertCell(5);
// var report = document.createElement("report");
// report.setAttribute("id", lead._id);
// var div = row.insertCell(6);
// div.append(report);
// var text = document.createTextNode("Report");
// report.appendChild(text);
// report.classList.add("report");

// 			organiztion.innerHTML = data.name[i];
// 			i++;
// 			locality.innerHTML = lead.locality;
// 			contact.innerHTML = lead.contact;
// 			covidMeds.innerHTML = lead.covid_meds;
// 			nurseAvailibilty.innerHTML = lead.nurse;
// 			number.innerHTML = lead.availability;
// 		});
// 	});

function showPopup() {
	document.getElementById("popup").classList.remove("hide");
}
function closePopup() {
	document.getElementById("popup").classList.add("hide");
}
// const getValue = () => {
// 	const pincode = document.getElementById("pincode").value;
// 	const org = document.getElementById("organization");
// 	org.innerHTML = "Test";
// 	console.log(pincode);
// };

// var table = document.getElementById("table-1");
// var header = table.createTHead();
// var row = header.insertRow(0);
// var cell = row.insertCell(0);
// var cell2 = row.insertCell(1);
// cell2.innerHTML = "Hey";
// cell.innerHTML = "<b>This is a table header</b>";
// var header2 = table.createHead();

const beds = () => {
	document.getElementById("beds-table").classList.remove("hide");
	document.getElementById("oxygen-table").classList.add("hide");
	document.getElementById("medicines-table").classList.add("hide");
	document.getElementById("food-table").classList.add("hide");
	document.getElementById("doctor").classList.add("hide");
};
const oxygen = () => {
	document.getElementById("beds-table").classList.add("hide");
	document.getElementById("oxygen-table").classList.remove("hide");
	document.getElementById("medicines-table").classList.add("hide");
	document.getElementById("food-table").classList.add("hide");
	document.getElementById("doctor").classList.add("hide");
	let i = 0;
	fetch(`https://277ce0072a0c.ngrok.io/getOxygenP?pincode=411040`)
		.then((res) => res.json())
		.then((data) =>
			data.oxygens.forEach((oxygen) => {
				var table = document.getElementById("oxygen-table");
				var row = table.insertRow(1);
				var organiztion = row.insertCell(0);
				organiztion.classList.add("blue");
				var locality = row.insertCell(1);
				var contact = row.insertCell(2);
				var type = row.insertCell(3);
				var price = row.insertCell(4);
				var number = row.insertCell(5);
				var report = document.createElement("button");
				var div = row.insertCell(6);
				div.append(report);
				var text = document.createTextNode("Report");
				report.appendChild(text);
				report.classList.add("report");
				organiztion.innerHTML = data.name[i];
				i++;
				locality.innerHTML = oxygen.locality;
				contact.innerHTML = oxygen.contact;
				type.innerHTML = oxygen.type;
				price.innerHTML = oxygen.price;
				number.innerHTML = oxygen.availability;
			}),
		);
};
const medicines = () => {
	document.getElementById("beds-table").classList.add("hide");
	document.getElementById("oxygen-table").classList.add("hide");
	document.getElementById("medicines-table").classList.remove("hide");
	document.getElementById("food-table").classList.add("hide");
	document.getElementById("doctor").classList.add("hide");
	let i = 0;
	fetch(`https://cd0ef9542865.ngrok.io/getVaccinesP?pincode=411040`)
		.then((res) => res.json())
		.then((data) =>
			data.vaccines.forEach((vaccine) => {
				var table = document.getElementById("medicines-table");
				var row = table.insertRow(1);
				var organiztion = row.insertCell(0);
				organiztion.classList.add("blue");
				var locality = row.insertCell(1);
				var contact = row.insertCell(2);
				var number = row.insertCell(3);
				var type = row.insertCell(3);
				var report = document.createElement("button");
				var div = row.insertCell(5);
				div.append(report);
				var text = document.createTextNode("Report");
				report.appendChild(text);
				report.classList.add("report");
				organiztion.innerHTML = data.name[i];
				i++;
				locality.innerHTML = vaccine.locality;
				contact.innerHTML = vaccine.contact;
				number.innerHTML = vaccine.availability;
				type.innerHTML = vaccine.type;
			}),
		);
};
const food = () => {
	document.getElementById("beds-table").classList.add("hide");
	document.getElementById("oxygen-table").classList.add("hide");
	document.getElementById("medicines-table").classList.add("hide");
	document.getElementById("food-table").classList.remove("hide");
	document.getElementById("doctor").classList.add("hide");
	const city = document.getElementById("city").value;
	const pincode = document.getElementById("pincode").value;
	if (city) {
		let i = 0;
		fetch(`https://277ce0072a0c.ngrok.io/getFoodC?city=${city}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				data.foods.forEach((food) => {
					var table = document.getElementById("food-table");
					var row = table.insertRow(1);
					var organiztion = row.insertCell(0);
					organiztion.classList.add("blue");
					var locality = row.insertCell(1);
					var contact = row.insertCell(2);
					var number = row.insertCell(3);
					organiztion.innerHTML = data.name[i];
					i++;
					locality.innerHTML = food.locality;
					contact.innerHTML = food.contact;
					number.innerHTML = food.availability;
				});
			});
	} else if (pincode) {
		let i = 0;
		fetch(`https://cd0ef9542865.ngrok.io/getFoodP?pincode=${pincode}`)
			.then((res) => res.json())
			.then((data) => {
				data.foods.forEach((food) => {
					var table = document.getElementById("food-table");
					var row = table.insertRow(1);
					var organiztion = row.insertCell(0);
					organiztion.classList.add("blue");
					var locality = row.insertCell(1);
					var contact = row.insertCell(2);
					var number = row.insertCell(3);
					organiztion.innerHTML = data.name[i];
					i++;
					locality.innerHTML = food.locality;
					contact.innerHTML = food.contact;
					number.innerHTML = food.availability;
				});
			});
	} else {
		alert("Please Select City or Pincode");
	}
};

const doctor = () => {
	document.getElementById("beds-table").classList.add("hide");
	document.getElementById("oxygen-table").classList.add("hide");
	document.getElementById("medicines-table").classList.add("hide");
	document.getElementById("food-table").classList.add("hide");
	document.getElementById("doctor").classList.remove("hide");
};

// const post = (e) => {
// 	e.preventDefault();
// 	const name = document.getElementById("doctor-name").value;
// 	const email = document.getElementById("doctor-email").value;
// 	const contact = document.getElementById("doctor-contact").value;
// 	const reason = document.getElementById("doctor-reason").value;
// 	let data = {
// 		name,
// 		email,
// 		contact,
// 		reason,
// 	};
// 	fetch("https://cd0ef9542865.ngrok.io/requestDoctor", {
// 		method: "POST",
// 		body: JSON.stringify(data),
// 	})
// 		.then((response) => response.json())
// 		.then((json) => console.log(json))
// 		.catch((err) => console.log(err));
// };

var form = document.getElementById("doctor-form");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	const name = document.getElementById("doctor-name").value;
	const email = document.getElementById("doctor-email").value;
	const contact = document.getElementById("doctor-contact").value;
	const reason = document.getElementById("doctor-reason").value;
	let data = {
		name: name,
		email: email,
		contact: contact,
		reason: reason,
	};
	const body = JSON.stringify(data);
	console.log(JSON.stringify(data));
	fetch("https://cd0ef9542865.ngrok.io/requestDoctor", {
		method: "POST",
		body: {
			name: "tera bap",
			email: "bc",
			contact: "q3r34",
			reason: "Tu q nahi chal raha",
		},
	})
		.then((response) => response.json())
		.then((json) => console.log(json))
		.catch((err) => console.log(err));
});

