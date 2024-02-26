document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        const emailInput = document.getElementById('email');
        const email = emailInput.value;

        if (!validarEmail(email)) {
            event.preventDefault();
            alert('Email inválido');
        }
    });

    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});



