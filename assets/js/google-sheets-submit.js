/**
 * Google Sheets Form Submission Handler
 * Replace SCRIPT_URL with your Google Apps Script Web App URL
 */
(function () {
  "use strict";

  // REPLACE THIS URL with your deployed Google Apps Script Web App URL
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwjN0mddchMOr_QtCfNVXTC0nQe3SuuOIgiGN3dYGmf5dz78yDYH-F7SdxnLDk-0QeI/exec';

  function submitToGoogleSheets(formData) {
    // Convert FormData to URL-encoded string to avoid CORS issues
    const params = new URLSearchParams();
    params.append('name', formData.get('name') || '');
    params.append('contact', formData.get('contact') || '');
    params.append('subject', formData.get('subject') || '');
    params.append('message', formData.get('message') || '');

    // Use no-cors mode for Google Apps Script Web Apps
    // This prevents CORS errors but means we can't read the response
    return fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    });
  }

  // Override the default PHP form submission for Google Sheets
  // Use DOMContentLoaded or run immediately if DOM is ready
  function initGoogleSheetsForms() {
    const forms = document.querySelectorAll('.php-email-form[data-google-sheets]');
    
    forms.forEach(function(form) {
      // Remove action attribute to prevent PHP form handler from processing
      form.removeAttribute('action');
      
      // Add submit handler
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        let thisForm = this;
        
        // Check if SCRIPT_URL has been configured
        if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
          displayError(thisForm, new Error('Google Sheets integration not configured. Please add your Google Apps Script URL.'));
          return;
        }

        let formData = new FormData(thisForm);

        // Show loading
        thisForm.querySelector('.loading').classList.add('d-block');
        thisForm.querySelector('.error-message').classList.remove('d-block');
        thisForm.querySelector('.sent-message').classList.remove('d-block');

        // Submit to Google Sheets
        submitToGoogleSheets(formData)
          .then(() => {
            // With no-cors mode, we can't read the response
            // Assume success if no error is thrown
            thisForm.querySelector('.loading').classList.remove('d-block');
            thisForm.querySelector('.sent-message').classList.add('d-block');
            thisForm.reset();
          })
          .catch((error) => {
            displayError(thisForm, error);
          });
      }, true); // Use capture phase to run before other handlers
    });
  }

  // Initialize immediately if DOM is ready, otherwise wait for DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGoogleSheetsForms);
  } else {
    initGoogleSheetsForms();
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error.message || 'An error occurred. Please try again.';
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
