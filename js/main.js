/** @format */

document.addEventListener("DOMContentLoaded", function () {
	// Chart.js implementation for yield trends
	const ctx = document.getElementById("yieldChart").getContext("2d");

	const yieldChart = new Chart(ctx, {
		type: "bar",
		data: {
			labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
			datasets: [
				{
					label: "Crop Yield (tons/hectare)",
					data: [5.2, 5.7, 6.8, 7.9, 8.6, 9.2],
					backgroundColor: [
						"rgba(76, 175, 80, 0.6)",
						"rgba(76, 175, 80, 0.6)",
						"rgba(76, 175, 80, 0.6)",
						"rgba(76, 175, 80, 0.6)",
						"rgba(76, 175, 80, 0.6)",
						"rgba(76, 175, 80, 0.6)",
					],
					borderColor: [
						"rgba(76, 175, 80, 1)",
						"rgba(76, 175, 80, 1)",
						"rgba(76, 175, 80, 1)",
						"rgba(76, 175, 80, 1)",
						"rgba(76, 175, 80, 1)",
						"rgba(76, 175, 80, 1)",
					],
					borderWidth: 1,
				},
			],
		},
		options: {
			responsive: true,
			scales: {
				y: {
					beginAtZero: true,
					title: {
						display: true,
						text: "Yield (tons/hectare)",
					},
				},
				x: {
					title: {
						display: true,
						text: "Year",
					},
				},
			},
		},
	});

	// Smooth scrolling for navigation links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();

			const targetId = this.getAttribute("href");
			const targetElement = document.querySelector(targetId);

			window.scrollTo({
				top: targetElement.offsetTop - 70,
				behavior: "smooth",
			});
		});
	});

	// Form submission handling
	const contactForm = document.getElementById("contact-form");

	contactForm.addEventListener("submit", function (e) {
		e.preventDefault();

		// Get form values
		const name = contactForm.querySelector('input[name="name"]').value;
		const email = contactForm.querySelector('input[name="email"]').value;
		const message = contactForm.querySelector('textarea[name="message"]').value;

		// Here you would typically send this data to a server
		// For demo purposes, we'll just log it and show a success message
		console.log("Form submission:", { name, email, message });

		// Show success message
		alert("Thanks for your message! We will get back to you soon.");

		// Reset form
		contactForm.reset();
	});
});
