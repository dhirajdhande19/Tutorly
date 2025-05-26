document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('testimonial-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const institution = document.getElementById('institution').value.trim();
    const rating = document.querySelector('input[name="rating"]:checked')?.value;
    const feedback = document.getElementById('feedback').value.trim();
    const imageInput = document.getElementById('image');

    // Validate inputs
    if (!name || !institution || !rating || !feedback) {
      alert('Please fill out all required fields, including a rating.');
      return;
    }

    // Default silhouette image
    const defaultImage = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

    // Function to process image
    const processImage = (file) => {
      return new Promise((resolve) => {
        if (!file) {
          resolve(defaultImage);
          return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
          alert('Please upload a valid image file (e.g., JPG, PNG).');
          resolve(defaultImage);
          return;
        }

        // Validate file size (limit to 2MB before compression)
        if (file.size > 2 * 1024 * 1024) {
          alert('Image size must be less than 2MB.');
          resolve(defaultImage);
          return;
        }

        // Compress image
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        img.onload = () => {
          // Resize to 128x128 pixels
          canvas.width = 128;
          canvas.height = 128;
          ctx.drawImage(img, 0, 0, 128, 128);
          // Convert to JPEG with 70% quality
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.onerror = () => resolve(defaultImage);
        img.src = URL.createObjectURL(file);
      });
    };

    // Process form submission
    processImage(imageInput.files[0]).then((image) => {
      // Create testimonial object
      const testimonial = {
        id: Date.now(),
        name,
        institution,
        rating: parseInt(rating),
        feedback,
        image, // Base64 string or default silhouette URL
      };

      // Retrieve existing testimonials or initialize empty array
      const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];

      // Add new testimonial
      testimonials.push(testimonial);
      try {
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
      } catch (e) {
        alert('Error saving testimonial: localStorage is full. Please clear some data.');
        return;
      }

      // Show success message
      alert('Thank you for your testimonial! It will appear on the homepage.');

      // Reset form
      form.reset();
    });
  });
});