const axios = require('axios')
const uploadButton = document.getElementById('uploadButton')
const fileInput = document.getElementById('fileInput')
const fileButton = document.getElementById('fileButton')
const userhashInput = document.getElementById('userhashInput')

uploadButton.disabled = true; // Initially disable the button

fileButton.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  uploadButton.disabled = false; // Enable the button when the file is changed
  if (fileInput.files[0]) {
    fileButton.textContent = fileInput.files[0].name; // Update the button text
  }
});

uploadButton.addEventListener('click', () => {
  const file = fileInput.files[0]
  let userhash = userhashInput.value
  if (file) {
    uploadButton.disabled = true; // Disable the button when the upload starts

    const form = new FormData()
    form.append('reqtype', 'fileupload')
    if (userhash) {
      form.append('userhash', userhash)
    }
    form.append('fileToUpload', file)

    axios.post('https://catbox.moe/user/api.php', form)
    .then(response => {
      console.log('File uploaded successfully. URL:', response.data)

      // Create a new button
      const button = document.createElement('button');
      button.id = 'linkButton';
      button.style.display = 'none'; // Initially hidden

      // Set the button's text to the URL of the uploaded file
      button.textContent = response.data;

      // Calculate the width of the button based on the length of the URL
      const urlWidth = response.data.length * 10; // Adjust the multiplier as needed
      const buttonWidth = Math.max(urlWidth, 200); // Use the larger of the two widths

      // Set the button width
      button.style.width = `${buttonWidth}px`;

      // Add a click event listener to the button
      button.addEventListener('click', () => {
        // Copy the link to the clipboard
        navigator.clipboard.writeText(response.data).then(() => {
          console.log('Link copied to clipboard');
          button.textContent = 'Link to the file has been copied!'; // Change the button text

          // Change the text back after 5 seconds
          setTimeout(() => {
            button.textContent = response.data;
          }, 5000);
        }, (err) => {
          console.error('Error copying link to clipboard:', err);
        });
      });

      // Append the button after the upload button
      uploadButton.parentNode.insertBefore(button, uploadButton.nextSibling);

      // Trigger the transition
      setTimeout(function() {
        button.style.display = 'block'; // This will trigger the transition

        // Trigger the animation
        button.animate([
          // keyframes
          { transform: 'scale(0)' }, 
          { transform: 'scale(1)' }
        ], { 
          // timing options
          duration: 1000,
          iterations: 1,
          easing: 'ease',
        });
      }, 0);

      // Re-enable the button after the upload is complete
      uploadButton.disabled = true; // Disable the button after the upload
    })
    .catch(error => {
      console.log('Error uploading file:', error)

      // Re-enable the button if there was an error
      uploadButton.disabled = false;
    })
  }
})