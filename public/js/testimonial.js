document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    if (darkModeToggle) {
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
        }

        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        });
    } else {
        console.warn('Dark mode toggle button not found.');
    }

    // Testimonial Form Submission
    const form = document.getElementById('testimonial-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = form.querySelector('#name').value.trim();
            const institution = form.querySelector('#institution').value.trim();
            const rating = form.querySelector('input[name="rating"]:checked')?.value;
            const feedback = form.querySelector('#feedback').value.trim();

            if (!rating) {
                alert('Please select a rating.');
                return;
            }

            // Log submission (replace with backend API call as needed)
            console.log('Testimonial Submitted:', {
                name,
                institution,
                rating,
                feedback
            });

            // Show success message
            alert('Thank you for your testimonial! It will be reviewed and added soon.');

            // Reset form
            form.reset();
        });
    } else {
        console.warn('Testimonial form not found.');
    }
});