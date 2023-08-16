const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const preview = document.getElementById('preview');

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes

fileInput.addEventListener('change', function(event) {
  const selectedFile = event.target.files[0];

  const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
  const isValidExtension = allowedExtensions.includes('.' + fileExtension);
  const isSizeValid = selectedFile.size <= maxFileSize;

  if (!isValidExtension || !isSizeValid) {
    preview.style.display = 'none';
    fileInfo.innerHTML = 'Archivo no válido. Asegúrate de que sea un archivo de imagen (JPG, PNG, GIF) y no supere los 5 MB.';
    return;
  }

  fileInfo.innerHTML = `
    Nombre del archivo: ${selectedFile.name}<br>
    Tipo MIME: ${selectedFile.type}<br>
    Tamaño: ${selectedFile.size} bytes
  `;

  preview.style.display = 'block';
  const reader = new FileReader();

  reader.onload = function(e) {
    preview.src = e.target.result;
  };

  reader.readAsDataURL(selectedFile);
});
