// Lấy các phần tử từ DOM
const container = document.getElementById('puzzle-container');
const nutXaoTron = document.getElementById('shuffle-button');

// Tạo mảng mảnh ghép từ 1 đến 15 và một ô trống
const mangManhGhep = [...Array(15).keys()].map(i => i + 1).concat(null);

// Hàm tạo trò chơi xếp hình
function taoTroChoi() {
    container.innerHTML = ''; // Xóa nội dung cũ của container
    mangManhGhep.forEach((manhGhep, index) => {
        const div = document.createElement('div'); // Tạo một div mới cho mỗi mảnh ghép
        div.classList.add('puzzle-piece'); // Thêm lớp CSS cho mảnh ghép
        div.textContent = manhGhep !== null ? manhGhep : ''; // Hiển thị số hoặc để trống cho ô trống
        div.dataset.index = index; // Lưu chỉ số của mảnh ghép
        div.addEventListener('click', () => diChuyenManhGhep(index)); // Thêm sự kiện click để di chuyển mảnh ghép
        container.appendChild(div); // Thêm mảnh ghép vào container
    });
}

// Hàm di chuyển mảnh ghép
function diChuyenManhGhep(index) {
    const viTriTrong = mangManhGhep.indexOf(null); // Tìm vị trí của ô trống
    // Các chỉ số mảnh ghép có thể di chuyển vào ô trống
    const viTriHopLe = [viTriTrong - 1, viTriTrong + 1, viTriTrong - 4, viTriTrong + 4];

    // Kiểm tra nếu mảnh ghép có thể di chuyển
    if (viTriHopLe.includes(index)) {
        mangManhGhep[viTriTrong] = mangManhGhep[index]; // Di chuyển mảnh ghép vào ô trống
        mangManhGhep[index] = null; // Đặt ô trống tại vị trí mảnh ghép đã di chuyển
        taoTroChoi(); // Tạo lại trò chơi để cập nhật giao diện
    }
}

// Hàm xáo trộn các mảnh ghép
function xaoTronManhGhep() {
    for (let i = mangManhGhep.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Tạo chỉ số ngẫu nhiên
        [mangManhGhep[i], mangManhGhep[j]] = [mangManhGhep[j], mangManhGhep[i]]; // Hoán đổi vị trí
    }
    taoTroChoi(); // Tạo lại trò chơi sau khi xáo trộn
}

// Thêm sự kiện click cho nút xáo trộn
nutXaoTron.addEventListener('click', xaoTronManhGhep);

// Gọi hàm tạo trò chơi khi trang được tải
taoTroChoi();
