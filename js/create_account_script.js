document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const submitButton = document.getElementById('submitButton');
    const fields = Array.from(form.querySelectorAll('input[required], select[required]'));
    const passwordField = form.querySelector('input[name="password"]');
    const confirmPasswordField = form.querySelector('input[name="confirmPassword"]');

    function validateForm() {
        let valid = true;
        fields.forEach(field => {
            if (!field.value.trim()) {
                valid = false;
            }
        });

        if (passwordField.value !== confirmPasswordField.value) {
            valid = false;
        }

        submitButton.disabled = !valid;
        if (valid) {
            submitButton.classList.remove('no-hover');
        } else {
            submitButton.classList.add('no-hover');
        }
    }

    fields.forEach(field => {
        field.addEventListener('input', validateForm);
    });

    confirmPasswordField.addEventListener('input', validateForm);

    submitButton.addEventListener('click', () => {
        if (!submitButton.disabled) {
            form.submit();
        }
    });
});