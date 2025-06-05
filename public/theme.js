const getThemePreference = () => {
	if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
		return localStorage.getItem("theme");
	}
	return "light";
};

const isDark = getThemePreference() === "dark";
document.documentElement.classList[isDark ? "add" : "remove"]("dark");

if (typeof localStorage !== "undefined") {
	const observer = new MutationObserver(() => {
		const isDark = document.documentElement.classList.contains("dark");
		localStorage.setItem("theme", isDark ? "dark" : "light");
	});
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
}

// Initialize all theme toggles
document.querySelectorAll(".theme-toggle").forEach((button) => {
	const darkText = button.querySelector(".dark-text");
	const lightText = button.querySelector(".light-text");

	const updateThemeDisplay = () => {
		const isDark = document.documentElement.classList.contains("dark");
		if (darkText && lightText) {
			darkText.style.color = isDark ? "var(--foreground)" : "var(--muted-foreground)";
			lightText.style.color = isDark ? "var(--muted-foreground)" : "var(--foreground)";
		}
	};

	button.addEventListener("click", () => {
		const isDark = document.documentElement.classList.contains("dark");
		document.documentElement.classList[isDark ? "remove" : "add"]("dark");
		localStorage.setItem("theme", isDark ? "light" : "dark");
		updateThemeDisplay();
	});

	// Initial state
	updateThemeDisplay();
});
