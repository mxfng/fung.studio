document.addEventListener("DOMContentLoaded", () => {
	if (!window.matchMedia("(hover: none)").matches) return;

	const dropdowns = document.querySelectorAll("[data-dropdown]");

	dropdowns.forEach((dropdown) => {
		const button = dropdown.querySelector(".dropdown-trigger");
		const menu = dropdown.querySelector(".dropdown-menu");

		if (!button || !menu) return;

		button.addEventListener("click", (e) => {
			e.stopPropagation();

			// Close other open dropdowns
			document.querySelectorAll("[data-dropdown].open").forEach((open) => {
				if (open !== dropdown) {
					open.classList.remove("open");
					const otherMenu = open.querySelector(".dropdown-menu");
					if (otherMenu) {
						otherMenu.style.opacity = "0";
						otherMenu.style.visibility = "hidden";
					}
				}
			});

			const isOpen = dropdown.classList.toggle("open");
			menu.style.opacity = isOpen ? "1" : "0";
			menu.style.visibility = isOpen ? "visible" : "hidden";
		});
	});

	// Close all dropdowns when clicking outside
	document.addEventListener("click", () => {
		document.querySelectorAll("[data-dropdown].open").forEach((dropdown) => {
			dropdown.classList.remove("open");
			const menu = dropdown.querySelector(".dropdown-menu");
			if (menu) {
				menu.style.opacity = "0";
				menu.style.visibility = "hidden";
			}
		});
	});
});
