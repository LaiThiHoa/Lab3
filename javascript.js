function showContent(contentId) {
  // Ẩn tất cả các nội dung
  const contents = document.querySelectorAll(".content");
  contents.forEach((content) => {
    content.style.display = "none";
  });

  // Hiển thị nội dung được chọn
  const selectedContent = document.getElementById(contentId);
  if (selectedContent) {
    selectedContent.style.display = "block";
  }
}
function uploadFiles() {
  const input = document.getElementById('fileInput');
  const container = document.getElementById('documentsContainer');
  const viewer = document.getElementById('viewer');

  Array.from(input.files).forEach(file => {
    const docDiv = document.createElement('div');
    docDiv.classList.add('document');

    const fileURL = URL.createObjectURL(file);

    // Hiển thị hình ảnh nếu tệp là ảnh
    if (file.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.src = fileURL;
      img.alt = file.name;
      docDiv.appendChild(img);
    }

    // Tạo liên kết mở tài liệu
    const link = document.createElement('a');
    link.href = fileURL;
    link.target = '_blank';
    link.textContent = 'Xem ' + file.name;
    docDiv.appendChild(link);

    // Bấm vào tài liệu để xem trực tiếp trong iframe
    link.addEventListener('click', (e) => {
      e.preventDefault();  // Ngăn chặn mở tab mới
      viewer.src = fileURL;
      viewer.style.display = 'block';
    });

    // Thêm tài liệu mới vào container
    container.appendChild(docDiv);
  });

  // Xóa danh sách tệp đã chọn sau khi tải lên
  input.value = '';
}
