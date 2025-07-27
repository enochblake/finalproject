export function initAuth() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginToggle = document.getElementById('loginToggle');
    const registerToggle = document.getElementById('registerToggle');
    const toggleLoginPassword = document.getElementById('toggleLoginPassword');
    const toggleRegisterPassword = document.getElementById('toggleRegisterPassword');
    const loginPassword = document.getElementById('loginPassword');
    const registerPassword = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const passwordStrengthBar = document.getElementById('passwordStrengthBar');
    const roleRadios = document.querySelectorAll('input[name="role"]');
    const clubFields = document.getElementById('clubFields');
    const authButton = document.getElementById('auth-button');
    const logoutButton = document.getElementById('logout-button');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    function showToast(message, type = 'success') {
        toast.classList.add('show', type);
        toastMessage.textContent = message;
        setTimeout(() => {
            toast.classList.remove('show', type);
        }, 3000);
    }

    function toggleAuthModal(mode = 'login') {
        const modal = document.getElementById('auth-modal');
        modal.classList.toggle('hidden');
        if (mode === 'login') {
            showLoginForm();
        } else {
            showRegisterForm();
        }
    }

    function showLoginForm() {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginToggle.classList.add('active');
        registerToggle.classList.remove('active');
        document.getElementById('auth-modal-title').textContent = 'Login to CampusHub';
    }

    function showRegisterForm() {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        loginToggle.classList.remove('active');
        registerToggle.classList.add('active');
        document.getElementById('auth-modal-title').textContent = 'Register for CampusHub';
    }

    function togglePasswordVisibility(inputField, toggleIcon) {
        if (inputField.type === 'password') {
            inputField.type = 'text';
            toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            inputField.type = 'password';
            toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    }

    loginToggle.addEventListener('click', showLoginForm);
    registerToggle.addEventListener('click', showRegisterForm);
    toggleLoginPassword.addEventListener('click', () => togglePasswordVisibility(loginPassword, toggleLoginPassword));
    toggleRegisterPassword.addEventListener('click', () => togglePasswordVisibility(registerPassword, toggleRegisterPassword));

    registerPassword.addEventListener('input', () => {
        const password = registerPassword.value;
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        passwordStrengthBar.style.width = `${strength}%`;
        passwordStrengthBar.style.backgroundColor = strength < 50 ? '#ef4444' : strength < 75 ? '#f59e0b' : '#10b981';
    });

    roleRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            clubFields.classList.toggle('hidden', radio.value !== 'club-rep');
        });
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPass = document.getElementById('confirmPassword').value;

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('emailError').classList.remove('hidden');
            isValid = false;
        } else {
            document.getElementById('emailError').classList.add('hidden');
        }

        if (password.length < 8) {
            document.getElementById('passwordError').classList.remove('hidden');
            isValid = false;
        } else {
            document.getElementById('passwordError').classList.add('hidden');
        }

        if (password !== confirmPass) {
            document.getElementById('confirmPasswordError').classList.remove('hidden');
            isValid = false;
        } else {
            document.getElementById('confirmPasswordError').classList.add('hidden');
        }

        if (!document.getElementById('terms').checked) {
            showToast('Please agree to the Terms & Conditions', 'error');
            isValid = false;
        }

        if (isValid) {
            const registerBtnText = document.getElementById('registerBtnText');
            const spinner = registerBtnText.nextElementSibling;
            registerBtnText.textContent = 'Creating Account...';
            spinner.classList.remove('hidden');

            setTimeout(() => {
                registerBtnText.textContent = 'Account Created!';
                spinner.classList.add('hidden');
                showToast('Account created successfully!', 'success');
                setTimeout(() => {
                    showLoginForm();
                    registerForm.reset();
                    passwordStrengthBar.style.width = '0%';
                    clubFields.classList.add('hidden');
                    toggleAuthModal();
                }, 1500);
            }, 2000);
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const loginBtnText = document.getElementById('loginBtnText');
        const spinner = loginBtnText.nextElementSibling;
        loginBtnText.textContent = 'Logging In...';
        spinner.classList.remove('hidden');

        setTimeout(() => {
            loginBtnText.textContent = 'Login Successful!';
            spinner.classList.add('hidden');
            const role = document.getElementById('loginRole').value;
            localStorage.setItem('user', JSON.stringify({ role }));
            showToast('Login successful!', 'success');
            authButton.classList.add('hidden');
            logoutButton.classList.remove('hidden');
            toggleAuthModal();
            if (role === 'admin') {
                document.getElementById('public-content').classList.add('hidden');
                document.getElementById('admin-dashboard').classList.remove('hidden');
                initDashboard();
            } else {
                document.getElementById('public-content').classList.remove('hidden');
                document.getElementById('admin-dashboard').classList.add('hidden');
            }
            loginForm.reset();
            loginBtnText.textContent = 'Login';
        }, 2000);
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('user');
        authButton.classList.remove('hidden');
        logoutButton.classList.add('hidden');
        document.getElementById('public-content').classList.remove('hidden');
        document.getElementById('admin-dashboard').classList.add('hidden');
        showToast('Logged out successfully!', 'success');
    });

    document.getElementById('logoutBtn').addEventListener('click', () => logoutButton.click());
    document.getElementById('logoutBtn2').addEventListener('click', () => logoutButton.click());

    window.toggleAuthModal = toggleAuthModal;
}