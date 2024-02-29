const axios = require('axios')
const uploadButton = document.getElementById('uploadButton')
const fileInput = document.getElementById('fileInput')
const fileButton = document.getElementById('fileButton')
const userhashInput = document.getElementById('userhashInput')

fileButton.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  uploadButton.disabled = !fileInput.value;
});

uploadButton.addEventListener('click', () => {
  const file = fileInput.files[0]
  let userhash = userhashInput.value
  if (file) {
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

      // Add a click event listener to the button
      button.addEventListener('click', () => {
        // Copy the link to the clipboard
        navigator.clipboard.writeText(response.data).then(() => {
          console.log('Link copied to clipboard');
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
    })
    .catch(error => {
      console.log('Error uploading file:', error)
    })
  }
})