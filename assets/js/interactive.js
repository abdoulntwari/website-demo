/* =========================================================
   Rwanda International Trade Fair 2026 — Interactive Additions
   Animated stat counter (Section One)
   Add via: <script src="assets/js/interactive.js"></script>
   Place it near the other <script> tags at the bottom of the page.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
	var counters = document.querySelectorAll('.stat-number');
	if (!counters.length) return;

	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function animateCounter(el) {
		var target = parseInt(el.getAttribute('data-count'), 10) || 0;
		var suffix = el.getAttribute('data-suffix') || '';

		if (reduceMotion) {
			el.textContent = target + suffix;
			return;
		}

		var duration = 1400;
		var start = null;

		function step(timestamp) {
			if (!start) start = timestamp;
			var progress = Math.min((timestamp - start) / duration, 1);
			var eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
			el.textContent = Math.floor(eased * target) + suffix;
			if (progress < 1) {
				window.requestAnimationFrame(step);
			} else {
				el.textContent = target + suffix;
			}
		}
		window.requestAnimationFrame(step);
	}

	if ('IntersectionObserver' in window) {
		var observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					animateCounter(entry.target);
					observer.unobserve(entry.target);
				}
			});
		}, { threshold: 0.5 });

		counters.forEach(function (el) {
			observer.observe(el);
		});
	} else {
		// Fallback for very old browsers: just animate immediately
		counters.forEach(animateCounter);
	}
});







document.addEventListener('DOMContentLoaded', function () {
	var header = document.getElementById('header');
	var toggle = document.getElementById('navToggle');
	if (!header || !toggle) return;

	toggle.addEventListener('click', function () {
		var isOpen = header.classList.toggle('nav-open');
		toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
	});

	var navLinks = header.querySelectorAll('#nav a');
	navLinks.forEach(function (link) {
		link.addEventListener('click', function () {
			header.classList.remove('nav-open');
			toggle.setAttribute('aria-expanded', 'false');
		});
	});
});





document.addEventListener('DOMContentLoaded', function () {
	var carousel = document.getElementById('heroPeek');
	if (!carousel) return;

	var track = carousel.querySelector('.hero-peek-track');
	var slides = carousel.querySelectorAll('.hero-peek-slide');
	var dots = carousel.querySelectorAll('.hero-peek-dot');
	if (!slides.length) return;

	var current = 0;
	var autoTimer = null;

	function update() {
		var containerWidth = carousel.offsetWidth;
		var activeSlide = slides[current];
		var offset = activeSlide.offsetLeft - (containerWidth - activeSlide.offsetWidth) / 2;
		track.style.transform = 'translateX(' + (-offset) + 'px)';

		slides.forEach(function (slide, i) {
			slide.classList.toggle('is-active', i === current);
		});
		dots.forEach(function (dot, i) {
			dot.classList.toggle('is-active', i === current);
		});
	}

	function goNext() {
		current = (current + 1) % slides.length;
		update();
	}

	function startAuto() {
		stopAuto();
		autoTimer = setInterval(goNext, 3200);
	}

	function stopAuto() {
		if (autoTimer) {
			clearInterval(autoTimer);
			autoTimer = null;
		}
	}

	dots.forEach(function (dot) {
		dot.addEventListener('click', function () {
			current = parseInt(dot.getAttribute('data-index'), 10);
			update();
			startAuto();
		});
	});

	carousel.addEventListener('mouseenter', stopAuto);
	carousel.addEventListener('mouseleave', startAuto);
	window.addEventListener('resize', update);

	update();
	startAuto();
});










