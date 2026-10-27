const form = document.getElementById('createf');
const text = document.getElementById('error');

function validateUrl(input) {
  const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(:\d{1,5})?(\/[^\s]*)?$/i;
  const url = input.value.trim();
  if (!urlRegex.test(url)) {
    return false;
  }
  text.textContent = "";
	return true;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = form.elements['username'];
  const image = form.elements['image'];
  const url = form.elements['url'];
  const description = form.elements['desc'];
  const cw = document.querySelector('#cwebring');
  const co = document.querySelector('#copensource');
  const cs = document.querySelector('#cselfhosted');
  const errors = [];

  if (!validateUrl(url)) {
    errors.push('Please enter a valid URL');
  }

  const file = image.files[0];

  if (file && !file.type.startsWith('image/')) {
    errors.push('Please upload only image files');
  }

  if (errors.length > 0) {
    text.textContent = errors.join(' & ');
    return;
  }

  text.textContent = '';

  document.getElementById("w").style.display = cw.checked ? "block" : "none";
  document.getElementById("o").style.display = co.checked ? "block" : "none";
  document.getElementById("s").style.display = cs.checked ? "block" : "none";

  document.getElementById('card-username').textContent = username.value;
  document.getElementById('card-img').src = URL.createObjectURL(file);
  document.getElementById('card-url').textContent = url.value;
  document.getElementById('card-desc').textContent = description.value;
});

document.getElementById('download').addEventListener('click', () => {
  const card = document.getElementById('id-card');

  html2canvas(card, { scale: 3, backgroundColor: null, useCORS: true }).then(function(canvas) {
    const link = document.createElement('a');
    link.download = `my-webmastersid.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});
