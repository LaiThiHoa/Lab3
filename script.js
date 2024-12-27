document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.sidebar a');
    const contents = document.querySelectorAll('.content');

    // Gắn sự kiện click cho từng liên kết
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định (reload trang)

            // Xóa class "active" khỏi tất cả các liên kết
            links.forEach(link => link.classList.remove('active'));

            // Thêm class "active" cho liên kết được nhấn
            this.classList.add('active');

            // Lấy giá trị data-target của liên kết
            const target = this.getAttribute('data-target');

            // Hiển thị nội dung tương ứng và ẩn các nội dung khác
            contents.forEach(content => {
                content.classList.remove('active');
                if (content.id === target) {
                    content.classList.add('active');
                }
            });
        });
    });
});
// document.getElementById('uploadButton').addEventListener('click', function () {
//     const fileInput = document.getElementById('fileInput');
//     const fileList = document.getElementById('uploadedFilesList');

//     if (fileInput.files.length > 0) {
//         const file = fileInput.files[0];
        
//         // Hiển thị tên tệp trong danh sách
//         const listItem = document.createElement('li');
//         listItem.textContent = file.name;
//         fileList.appendChild(listItem);

//         // Reset file input sau khi tải lên
//         fileInput.value = '';
//         alert('Tệp đã được tải lên thành công!');
//     } else {
//         alert('Vui lòng chọn một tệp để tải lên.');
//     }
// });
document.getElementById('uploadButton').addEventListener('click', function () {
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('uploadedFilesList');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileName = file.name;

        // Tạo mục mới cho tệp đã tải lên
        const listItem = document.createElement('li');
        listItem.classList.add('uploaded-file-item');

        // Thêm tên tệp vào mục
        const fileNameSpan = document.createElement('span');
        fileNameSpan.textContent = fileName;
        listItem.appendChild(fileNameSpan);

        // Tạo nút xóa
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Xóa';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function () {
            listItem.remove();
            document.getElementById('filePreview').innerHTML = ''; // Xóa nội dung preview khi xóa tệp
        });

        // Thêm nút xóa vào mục
        listItem.appendChild(deleteButton);

        // Thêm mục vào danh sách
        fileList.appendChild(listItem);

        // Đọc tệp (TXT hoặc PDF)
        const reader = new FileReader();

        reader.onload = function(e) {
            const fileContent = e.target.result;

            if (file.type === 'application/pdf') {
                // Hiển thị PDF
                const iframe = document.createElement('iframe');
                iframe.src = fileContent;
                iframe.width = "100%";
                iframe.height = "500px";
                document.getElementById('filePreview').innerHTML = '';  // Xóa preview cũ
                document.getElementById('filePreview').appendChild(iframe);
            } else if (file.type === 'text/plain') {
                // Hiển thị nội dung tệp văn bản
                document.getElementById('filePreview').innerHTML = `<pre>${fileContent}</pre>`;
            } else {
                document.getElementById('filePreview').innerHTML = `<p>Không hỗ trợ xem tệp này.</p>`;
            }
        };

        if (file.type === 'application/pdf') {
            reader.readAsDataURL(file); // Đọc file PDF
        } else if (file.type === 'text/plain') {
            reader.readAsText(file); // Đọc file văn bản
        } else {
            document.getElementById('filePreview').innerHTML = `<p>Không hỗ trợ xem tệp này.</p>`;
        }

        // Reset file input sau khi tải lên
        fileInput.value = '';
        alert('Tệp đã được tải lên thành công!');
    } else {
        alert('Vui lòng chọn một tệp để tải lên.');
    }
});

