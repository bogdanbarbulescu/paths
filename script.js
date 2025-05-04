document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const themeKey = 'themePreference'; // Keep key as is or change if desired

    // --- Theme Toggle Logic ---

    // Function to apply the theme (dark/light) // Translated comment
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggleButton.textContent = 'Light Mode'; // Translated text
            themeToggleButton.setAttribute('aria-label', 'Switch to light mode'); // Translated aria-label
        } else {
            body.classList.remove('dark-mode');
            themeToggleButton.textContent = 'Dark Mode'; // Translated text
             themeToggleButton.setAttribute('aria-label', 'Switch to dark mode'); // Translated aria-label
        }
    };

    // Check saved preference in localStorage on page load // Translated comment
    const savedTheme = localStorage.getItem(themeKey);
    // Also check system preference if none is saved // Translated comment
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Determine initial theme: localStorage > system preference > default (light) // Translated comment
    let currentTheme = savedTheme;
    if (!currentTheme) {
        currentTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    }
    applyTheme(currentTheme);


    // Listener for the toggle button // Translated comment
    themeToggleButton.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');
        const newTheme = isDarkMode ? 'light' : 'dark';
        applyTheme(newTheme);
        // Save the new preference in localStorage // Translated comment
        localStorage.setItem(themeKey, newTheme);
    });

    // (Optional) Listen for system preference changes // Translated comment
    prefersDarkScheme.addEventListener('change', (e) => {
        // Apply system theme ONLY if the user hasn't set an explicit preference // Translated comment
        if (!localStorage.getItem(themeKey)) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });


    // --- Learning Path Collapse/Expand Logic ---

    const pathContainers = document.querySelectorAll('.learning-path');

    pathContainers.forEach(path => {
        const header = path.querySelector('.path-header');
        const button = path.querySelector('.toggle-button');
        // const content = path.querySelector('.path-content'); // No longer needed directly // Translated comment

        // Function to update the button UI and container class // Translated comment
        const updateUI = (isExpanded) => {
            // Translated button texts
            button.textContent = isExpanded ? 'Hide Steps' : 'Show Steps';
            button.setAttribute('aria-expanded', isExpanded);
            if (isExpanded) {
                path.classList.remove('collapsed');
            } else {
                path.classList.add('collapsed');
            }
        };

        // Check initial state (if it has the 'collapsed' class in HTML) // Translated comment
        const isInitiallyExpanded = !path.classList.contains('collapsed');
        updateUI(isInitiallyExpanded);

        // Toggle function // Translated comment
        const togglePath = () => {
            const isCurrentlyExpanded = button.getAttribute('aria-expanded') === 'true';
            updateUI(!isCurrentlyExpanded);
        };

        // Listener on header (excluding the button inside) // Translated comment
        header.addEventListener('click', (e) => {
            // Don't toggle if clicking directly on the expand/collapse button // Translated comment
            if (!e.target.closest('.toggle-button')) {
                 togglePath();
            }
        });

        // Separate listener for the expand/collapse button (more robust) // Translated comment
        button.addEventListener('click', togglePath);

    }); // End of forEach pathContainers // Translated comment

}); // End of DOMContentLoaded // Translated comment
