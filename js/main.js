/** @format */

document.addEventListener("DOMContentLoaded", function () {
	// Set global Chart.js defaults
	Chart.defaults.color = "#555";
	Chart.defaults.font.family =
		"'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";

	// Utility to create gradient backgrounds
	function createGradient(ctx, colorStart, colorEnd) {
		const gradient = ctx.createLinearGradient(0, 0, 0, 400);
		gradient.addColorStop(0, colorStart);
		gradient.addColorStop(1, colorEnd);
		return gradient;
	}

	// 1. Main Yield Chart - Line chart with annotations
	const yieldCtx = document.getElementById("yieldChart").getContext("2d");
	const yieldGradient = createGradient(
		yieldCtx,
		"rgba(76, 175, 80, 0.6)",
		"rgba(76, 175, 80, 0.1)"
	);

	const yieldChart = new Chart(yieldCtx, {
		type: "line",
		data: {
			labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
			datasets: [
				{
					label: "With Flaha Technology",
					data: [5.2, 5.9, 7.1, 8.3, 9.2, 10.5],
					borderColor: "#4CAF50",
					backgroundColor: yieldGradient,
					borderWidth: 3,
					pointBackgroundColor: "#2E7D32",
					pointRadius: 5,
					tension: 0.3,
					fill: true,
				},
				{
					label: "Industry Average",
					data: [5.1, 5.3, 5.6, 5.8, 6.1, 6.3],
					borderColor: "#90A4AE",
					backgroundColor: "rgba(144, 164, 174, 0.2)",
					borderWidth: 2,
					pointRadius: 4,
					pointBackgroundColor: "#607D8B",
					tension: 0.3,
					fill: true,
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					position: "top",
					labels: {
						boxWidth: 12,
						usePointStyle: true,
						pointStyle: "circle",
					},
				},
				tooltip: {
					mode: "index",
					intersect: false,
					backgroundColor: "rgba(46, 125, 50, 0.85)",
					titleColor: "#fff",
					bodyColor: "#fff",
					borderColor: "#4CAF50",
					borderWidth: 1,
					padding: 10,
					displayColors: true,
					callbacks: {
						label: function (context) {
							return (
								context.dataset.label +
								": " +
								context.parsed.y +
								" tons/hectare"
							);
						},
					},
				},
				annotation: {
					annotations: {
						line1: {
							type: "line",
							yMin: 9.2,
							yMax: 9.2,
							xMin: "2022",
							xMax: "2022",
							borderColor: "#FF5722",
							borderWidth: 2,
							borderDash: [5, 5],
							label: {
								content: "Record Yield",
								enabled: true,
								position: "top",
							},
						},
					},
				},
			},
			scales: {
				y: {
					beginAtZero: true,
					title: {
						display: true,
						text: "Yield (tons/hectare)",
						color: "#555",
					},
					ticks: {
						precision: 1,
					},
					grid: {
						color: "rgba(0, 0, 0, 0.05)",
					},
				},
				x: {
					title: {
						display: true,
						text: "Year",
						color: "#555",
					},
					grid: {
						display: false,
					},
				},
			},
		},
	});

	// 2. Resource Optimization Chart - Bar chart showing water and fertilizer usage
	const resourceCtx = document.getElementById("resourceChart").getContext("2d");

	const resourceChart = new Chart(resourceCtx, {
		type: "bar",
		data: {
			labels: ["Before", "After"],
			datasets: [
				{
					label: "Water Usage (gal/acre)",
					data: [2500, 1875],
					backgroundColor: createGradient(
						resourceCtx,
						"rgba(33, 150, 243, 0.8)",
						"rgba(33, 150, 243, 0.4)"
					),
					borderColor: "#1E88E5",
					borderWidth: 2,
				},
				{
					label: "Fertilizer Usage (lb/acre)",
					data: [300, 210],
					backgroundColor: createGradient(
						resourceCtx,
						"rgba(156, 39, 176, 0.8)",
						"rgba(156, 39, 176, 0.4)"
					),
					borderColor: "#8E24AA",
					borderWidth: 2,
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					position: "top",
					labels: {
						boxWidth: 12,
						usePointStyle: true,
						pointStyle: "rectRounded",
					},
				},
				tooltip: {
					callbacks: {
						label: function (context) {
							const label = context.dataset.label || "";
							const value = context.parsed.y || 0;
							const unit = label.includes("Water") ? "gal/acre" : "lb/acre";
							return label + ": " + value + " " + unit;
						},
						afterBody: function (context) {
							const datasetIndex = context[0].datasetIndex;
							const dataIndex = context[0].dataIndex;
							const dataset = this._chart.data.datasets[datasetIndex];
							const beforeValue = dataset.data[0];
							const afterValue = dataset.data[1];

							if (dataIndex === 1) {
								// Only for "After" bars
								const reduction = (
									((beforeValue - afterValue) / beforeValue) *
									100
								).toFixed(1);
								return `\nReduction: ${reduction}%`;
							}
							return "";
						},
					},
				},
			},
			scales: {
				y: {
					beginAtZero: true,
					title: {
						display: true,
						text: "Usage",
						color: "#555",
					},
					grid: {
						color: "rgba(0, 0, 0, 0.05)",
					},
				},
				x: {
					grid: {
						display: false,
					},
				},
			},
		},
	});

	// 3. Crop Health Metrics - Radar chart showing early detection rates
	const healthCtx = document.getElementById("healthChart").getContext("2d");

	const healthChart = new Chart(healthCtx, {
		type: "radar",
		data: {
			labels: [
				"Disease Detection",
				"Pest Detection",
				"Nutrient Deficiency",
				"Water Stress",
				"Weed Pressure",
			],
			datasets: [
				{
					label: "With Flaha Technology",
					data: [90, 85, 95, 88, 82],
					backgroundColor: "rgba(76, 175, 80, 0.3)",
					borderColor: "#4CAF50",
					borderWidth: 2,
					pointBackgroundColor: "#2E7D32",
					pointBorderColor: "#fff",
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "#2E7D32",
				},
				{
					label: "Traditional Methods",
					data: [45, 50, 40, 35, 60],
					backgroundColor: "rgba(244, 67, 54, 0.3)",
					borderColor: "#F44336",
					borderWidth: 2,
					pointBackgroundColor: "#D32F2F",
					pointBorderColor: "#fff",
					pointHoverBackgroundColor: "#fff",
					pointHoverBorderColor: "#D32F2F",
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			scales: {
				r: {
					angleLines: {
						display: true,
						color: "rgba(0, 0, 0, 0.1)",
					},
					suggestedMin: 0,
					suggestedMax: 100,
					ticks: {
						backdropColor: "transparent",
						stepSize: 20,
					},
				},
			},
			plugins: {
				legend: {
					position: "top",
					labels: {
						boxWidth: 12,
					},
				},
				tooltip: {
					callbacks: {
						label: function (context) {
							return (
								context.dataset.label + ": " + context.raw + "% detection rate"
							);
						},
					},
				},
			},
		},
	});

	// 4. ROI Analysis - Doughnut chart showing return on investment
	const roiCtx = document.getElementById("roiChart").getContext("2d");

	const roiChart = new Chart(roiCtx, {
		type: "doughnut",
		data: {
			labels: [
				"Increased Yield Revenue",
				"Resource Savings",
				"Labor Savings",
				"Investment Cost",
			],
			datasets: [
				{
					data: [45, 25, 20, -30],
					backgroundColor: [
						"#66BB6A", // green
						"#29B6F6", // blue
						"#FFA726", // orange
						"#EF5350", // red (negative)
					],
					borderColor: ["#43A047", "#0288D1", "#FB8C00", "#E53935"],
					borderWidth: 1,
					hoverOffset: 15,
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			cutout: "65%",
			plugins: {
				legend: {
					position: "right",
					labels: {
						boxWidth: 12,
						usePointStyle: true,
						pointStyle: "circle",
					},
				},
				tooltip: {
					callbacks: {
						label: function (context) {
							const label = context.label || "";
							const value = context.raw || 0;
							const sign = value < 0 ? "-" : "+";
							const absValue = Math.abs(value);
							return label + ": " + sign + "$" + absValue + "k";
						},
						afterLabel: function (context) {
							const total = context.dataset.data.reduce(
								(a, b) => a + (b > 0 ? b : 0),
								0
							);
							const value = context.raw || 0;
							if (value > 0) {
								const percentage = ((value / total) * 100).toFixed(1);
								return `${percentage}% of positive returns`;
							}
							return "";
						},
					},
				},
			},
		},
	});

	// Add event listeners for any interactive elements
	document.querySelectorAll(".data-viz-item").forEach((item) => {
		item.addEventListener("mouseenter", function () {
			this.style.transform = "translateY(-7px)";
		});

		item.addEventListener("mouseleave", function () {
			this.style.transform = "translateY(-5px)";
		});
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

	// Handle chart resizing
	window.addEventListener('resize', function() {
		if (yieldChart) yieldChart.resize();
		if (resourceChart) resourceChart.resize();
		if (healthChart) healthChart.resize();
		if (roiChart) roiChart.resize();
	});

	// Fix for Chart.js sizing issues
	function resizeCharts() {
		const charts = document.querySelectorAll('.chart-container');
		charts.forEach(chart => {
			const parent = chart.parentElement;
			chart.style.width = parent.clientWidth + 'px';
		});
	}

	// Initialize chart sizing
	resizeCharts();
	window.addEventListener('resize', resizeCharts);

	// Improved chart responsiveness
	function setupResponsiveCharts() {
		// Define chart options for mobile
		const isMobile = window.innerWidth < 768;
		const isTablet = window.innerWidth < 992 && window.innerWidth >= 768;
		
		// Adjust legend display on mobile
		if (isMobile) {
			// For ROI chart (doughnut)
			if (roiChart) {
				roiChart.options.plugins.legend.position = 'bottom';
				roiChart.options.plugins.legend.labels.boxWidth = 10;
				roiChart.options.plugins.legend.labels.font = { size: 10 };
			}
			
			// For all charts - reduce font sizes
			[yieldChart, resourceChart, healthChart].forEach(chart => {
				if (!chart) return;
				
				// Reduce axis label font size
				if (chart.options.scales && chart.options.scales.y) {
					chart.options.scales.y.ticks = { 
						font: { size: 10 },
						maxRotation: 0
					};
					chart.options.scales.y.title.font = { size: 11 };
				}
				
				if (chart.options.scales && chart.options.scales.x) {
					chart.options.scales.x.ticks = { 
						font: { size: 10 },
						maxRotation: 0
					};
					chart.options.scales.x.title.font = { size: 11 };
				}
				
				// Adjust legend
				chart.options.plugins.legend.labels = {
					boxWidth: 10,
					font: { size: 10 }
				};
				
				chart.update();
			});
		}
		
		// Force chart container sizes
		document.querySelectorAll('.chart-container').forEach(chartContainer => {
			const parent = chartContainer.parentElement;
			chartContainer.style.width = '100%';
			chartContainer.style.maxWidth = '100%';
		});
	}

	// Call this function on load and resize
	setupResponsiveCharts();
	window.addEventListener('resize', function() {
		setupResponsiveCharts();
		
		// Redraw charts after resize
		setTimeout(() => {
			if (yieldChart) yieldChart.update();
			if (resourceChart) resourceChart.update();
			if (healthChart) resourceChart.update();
			if (roiChart) roiChart.update();
		}, 100);
	});

	// Fix chart scaling issues on orientation change (especially for mobile)
	window.addEventListener('orientationchange', function() {
		setTimeout(() => {
			setupResponsiveCharts();
			if (yieldChart) yieldChart.update();
			if (resourceChart) resourceChart.update();
			if (healthChart) healthChart.update();
			if (roiChart) roiChart.update();
		}, 200);
	});
});
