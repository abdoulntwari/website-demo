// Safety net: always clear the loading screen
(function () {
	function clearPreload() {
		document.body.classList.remove('is-preload');
	}
	if (document.readyState === 'complete') {
		clearPreload();
	} else {
		window.addEventListener('load', clearPreload);
	}
	// Force it after 2.5s no matter what, in case something else stalls
	setTimeout(clearPreload, 2500);
})();



document.addEventListener('DOMContentLoaded', function () {

    // Scroll glass effect
    const header = document.getElementById('header');
    const threshold = 60; // px before glass effect kicks in

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > threshold) {
            header.classList.add('is-glass');
        } else {
            header.classList.remove('is-glass');
        }
    }, { passive: true });

    // Slideshow
    const section = document.querySelector('#two.slideshow');
    if (!section) return;

    const slides = section.querySelectorAll('.slide');
    const texts = section.querySelectorAll('.slide-text');
    const dots = section.querySelectorAll('.slide-dot');
    let current = 0;
    let timer;

    function goToSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    texts.forEach((t, i) => t.classList.toggle('is-active', i === index));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));

    // Override the theme's static inline background with the active slide's image
    const activeImg = slides[index].querySelector('img');
    if (activeImg) {
        section.style.backgroundImage = `url("${activeImg.getAttribute('src')}")`;
    }

    current = index;
}
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetTimer();
        });
    });

    function nextSlide() {
        goToSlide((current + 1) % slides.length);
    }

    function resetTimer() {
        clearInterval(timer);
        timer = setInterval(nextSlide, 5000);
    }

    resetTimer();

});




(function () {
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('[data-nav-theme]');
    if (!header || !sections.length) return;

    let ticking = false;

    function currentTheme() {
        const probeY = header.offsetHeight + 1; // just below the header
        let theme = 'light';
        sections.forEach(function (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= probeY && rect.bottom > probeY) {
                theme = section.getAttribute('data-nav-theme');
            }
        });
        return theme;
    }

    function updateTheme() {
        const theme = currentTheme();
        header.classList.toggle('on-dark', theme === 'dark');
        header.classList.toggle('on-light', theme === 'light');
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateTheme);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateTheme();
})();







// Custom smooth scroll with adjustable speed (replaces native scroll-behavior)
document.addEventListener('DOMContentLoaded', function () {

	var SCROLL_DURATION = 900; // ms — raise for slower, lower for faster
	var header = document.getElementById('header');

	function getOffset() {
		return header ? header.offsetHeight : 0;
	}

	function easeInOutQuad(t) {
		return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	}

	function smoothScrollTo(targetY, duration) {
		var startY = window.pageYOffset;
		var distance = targetY - startY;
		var startTime = null;

		function step(currentTime) {
			if (startTime === null) startTime = currentTime;
			var elapsed = currentTime - startTime;
			var progress = Math.min(elapsed / duration, 1);
			window.scrollTo(0, startY + distance * easeInOutQuad(progress));
			if (progress < 1) {
				requestAnimationFrame(step);
			}
		}
		requestAnimationFrame(step);
	}

	document.querySelectorAll('a[href^="#"]').forEach(function (link) {
		link.addEventListener('click', function (e) {
			var id = this.getAttribute('href').slice(1);
			var target = document.getElementById(id);
			if (!target) return;

			e.preventDefault();
			var targetY = target.getBoundingClientRect().top + window.pageYOffset - getOffset();
			smoothScrollTo(targetY, SCROLL_DURATION);
		});
	});

}); 