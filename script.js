const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadBtn = document.getElementById('download');

upload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Apply Light Red Filter
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Light red tint
        data[i] = Math.min(255, r + 100);     // Red
        data[i + 1] = g * 0.5 + 50;            // Green
        data[i + 2] = b * 0.5 + 50;            // Blue
      }

      ctx.putImageData(imageData, 0, 0);
      downloadBtn.style.display = "inline-block";
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'retro_red_effect.png';
  link.href = canvas.toDataURL();
  link.click();
});
