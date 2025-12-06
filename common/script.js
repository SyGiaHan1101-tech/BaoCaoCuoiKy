document.addEventListener('DOMContentLoaded', function() {
    const authLinkContainer = document.getElementById('auth-link-container');
    const authLink = document.getElementById('auth-link');
    
    // 1. Kiểm tra trạng thái đăng nhập từ localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');

    if (isLoggedIn && userName) {
        // Nếu đã đăng nhập: Thay đổi liên kết thành "Xin chào [Tên] / Đăng xuất"
        
        // Thay đổi liên kết hiện tại thành Trang cá nhân/Profile
        authLink.textContent = `Xin chào, ${userName}`;
        authLink.href = "/BaoCaoCuoiKy/auth/index.html"; // Tạo trang profile.html nếu cần
        authLink.classList.remove('active');

        // Tạo nút Đăng xuất
        const logoutItem = document.createElement('li');
        logoutItem.className = 'nav-item';
        logoutItem.innerHTML = `<a class="nav-link" href="#" id="logout-btn">Đăng xuất</a>`;
        
        // Thêm nút Đăng xuất vào Navbar (sau liên kết auth)
        authLinkContainer.after(logoutItem); 

        // 2. Xử lý sự kiện Đăng xuất
        document.getElementById('logout-btn').addEventListener('click', function(e) {
            e.preventDefault();
            
            // Xóa thông tin đăng nhập khỏi localStorage
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userName');
            
            alert('Bạn đã đăng xuất.');
            // Tải lại trang chủ để cập nhật Navbar
            window.location.reload(); 
        });

    } else {
        // Nếu chưa đăng nhập: Giữ nguyên "Đăng ký/Đăng nhập" (hoặc thiết lập lại)
        authLink.textContent = 'Đăng ký/Đăng nhập';
        authLink.href = "/BaoCaoCuoiKy/auth/index.html";
    }
});
