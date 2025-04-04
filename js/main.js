/** @format */

$(document).ready(function () {
	$(".header-nav__block-list a").click(function (e) {
		e.preventDefault();
		var country = $(this).attr("data-name");
		$(".header-nav__block-list a").removeClass("active");
		$(this).addClass("active");
		$("#currentcountry").text(country);
		$(".header-nav").removeClass("opened");
		var link = $(this).attr("href");
		var data = {
			action: "changecountry",
			country: country,
		};
		$.ajax({
			url: ajaxurl, // обработчик
			data: data, // данные
			type: "POST", // тип запроса
			success: function (data) {
				window.location.href = link;
			},
		});
	});

	$("#btnsubmit").click(function (e) {
		e.preventDefault();
		$(this).closest(".contacts-grid").find("form #formbutton").click();
	});

	$("#fertilizer").val($("h1").text());
});

// Language switcher functionality
$(document).ready(function () {
	// Handle language selection
	$(".language-switcher a").click(function (e) {
		e.preventDefault();
		var lang = $(this).data("lang");
		var href = $(this).attr("href");

		// Set cookie for language preference
		document.cookie =
			"preferred_language=" + lang + "; path=/; max-age=31536000";

		// Redirect to the appropriate language page
		window.location.href = href;
	});
});

// Contact form validation
$(document).ready(function () {
	// Fix form submission issues
	$("form.wpcf7-form").each(function () {
		// Prevent double submission
		let submitted = false;

		$(this).on("submit", function (e) {
			if (submitted) {
				e.preventDefault();
				return false;
			}

			// Validate required fields
			let isValid = true;
			$(this)
				.find('[aria-required="true"]')
				.each(function () {
					if (!$(this).val()) {
						$(this).addClass("wpcf7-not-valid");
						isValid = false;
					} else {
						$(this).removeClass("wpcf7-not-valid");
					}
				});

			if (!isValid) {
				e.preventDefault();
				return false;
			}

			submitted = true;
			setTimeout(() => {
				submitted = false;
			}, 5000);
		});

		// Fix phone input mask
		$(this).find('input[name="your-phone"]').mask("+99 (999) 999-9999");
	});
});

// Smooth scrolling for anchor links
$(document).ready(function () {
	$('a[href^="#"]').on("click", function (e) {
		e.preventDefault();

		var target = $(this.hash);
		if (target.length) {
			$("html, body").animate(
				{
					scrollTop: target.offset().top,
				},
				1000
			);
		}
	});
});

// Enhanced lazy loading for images
$(document).ready(function () {
	// Initialize lazy loading for all images with data-src attribute
	const observer = lozad(".lazyload", {
		rootMargin: "10px 0px",
		threshold: 0.1,
		loaded: function (el) {
			el.classList.add("loaded");
			// Add fade-in animation
			el.style.opacity = 0;
			setTimeout(function () {
				el.style.transition = "opacity 0.5s ease-in-out";
				el.style.opacity = 1;
			}, 100);
		},
	});
	observer.observe();
});

// Cookie consent functionality
$(document).ready(function () {
	// Check if user has already made a choice
	if (!localStorage.getItem("cookieConsent")) {
		$("#cookie-consent").show();
	}

	// Handle accept button
	$("#accept-cookies").click(function () {
		localStorage.setItem("cookieConsent", "accepted");
		$("#cookie-consent").hide();
	});

	// Handle decline button
	$("#decline-cookies").click(function () {
		localStorage.setItem("cookieConsent", "declined");
		$("#cookie-consent").hide();

		// Disable analytics and tracking cookies
		// This is a placeholder - implement according to your tracking solution
		window["ga-disable-UA-XXXXXXXX-X"] = true;
	});
});

// Social media sharing functionality
$(document).ready(function () {
	$(".share-button").click(function (e) {
		e.preventDefault();

		var platform = $(this).data("platform");
		var url = encodeURIComponent(window.location.href);
		var title = encodeURIComponent(document.title);
		var shareUrl;

		switch (platform) {
			case "facebook":
				shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + url;
				break;
			case "twitter":
				shareUrl =
					"https://twitter.com/intent/tweet?url=" + url + "&text=" + title;
				break;
			case "linkedin":
				shareUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + url;
				break;
			case "whatsapp":
				shareUrl = "https://api.whatsapp.com/send?text=" + title + " " + url;
				break;
		}

		window.open(shareUrl, "_blank", "width=600,height=400");
	});
});
