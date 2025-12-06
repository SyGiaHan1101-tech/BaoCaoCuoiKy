document.addEventListener('DOMContentLoaded', function () {

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginFormElement = document.getElementById('login-form');
    const registerFormElement = document.getElementById('register-form');

    // ========================
    // CHUYỂN FORM
    // ========================
    function showRegister() {
        loginForm.classList.add('d-none');
        registerForm.classList.remove('d-none');
    }

    function showLogin() {
        registerForm.classList.add('d-none');
        loginForm.classList.remove('d-none');
    }

    if (switchToRegister) {
        switchToRegister.addEventListener('click', function (e) {
            e.preventDefault();
            showRegister();
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', function (e) {
            e.preventDefault();
            showLogin();
        });
    }

    // ========================
    // LẤY DANH SÁCH USER
    // ========================
    function getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];

    }

    function saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    // ========================
    // XỬ LÝ ĐĂNG KÝ
    // ========================
    if (registerFormElement) {
        registerFormElement.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // 1. Kiểm tra mật khẩu trùng
            if (password !== confirmPassword) {
                alert('❌ Mật khẩu và xác nhận mật khẩu không khớp!');
                return;
            }

            let users = getUsers();

            // 2. Kiểm tra user tồn tại
            const userExists = users.find(user => user.email === email);

            if (userExists) {
                alert('❌ Tài khoản đã tồn tại!');
                return;
            }

            // 3. Lưu user mới
            users.push({
                email: email,
                password: password
            });

            saveUsers(users);

            alert('✅ Đăng ký thành công! Mời bạn đăng nhập.');
            showLogin();
            registerFormElement.reset();
        });
    }

    // ========================
    // XỬ LÝ ĐĂNG NHẬP
    // ========================
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;

            let users = getUsers();

            // 1. Tìm user
            const user = users.find(u => u.email === email);

            if (!user) {
                alert('❌ Không tìm thấy người dùng!');
                return;
            }

            // 2. So mật khẩu
            if (user.password !== password) {
                alert('❌ Mật khẩu không chính xác!');
                return;
            }

            // 3. Đăng nhập thành công
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', email.trim().toLowerCase().split('@')[0]);

            alert('✅ Đăng nhập thành công!');
            window.location.href = "../index.html";

        });
    }

});
