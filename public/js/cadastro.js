const inputs = document.querySelectorAll('.inputs');
const alerta = document.querySelector('p');

inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (alerta.innerText.trim() === '') {
            alerta.style.display = 'none';
        }
    });
});

if (alerta.innerText.trim() !== '') {
    alerta.style.display = 'block';
}
