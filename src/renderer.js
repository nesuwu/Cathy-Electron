const axios = require('axios')
const uploadButton = document.getElementById('uploadButton')
const fileInput = document.getElementById('fileInput')
const userhashInput = document.getElementById('userhashInput')

uploadButton.addEventListener('click', () => {
  const file = fileInput.files[0]
  const userhash = userhashInput.value
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
    })
    .catch(error => {
      console.log('Error uploading file:', error)
    })
  }
})