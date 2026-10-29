# API Quản lý Sinh viên (BTHDV)

API quản lý sinh viên xây dựng bằng **Node.js (Express)**, sử dụng **Prisma ORM** kết nối **Microsoft SQL Server 2022** chạy trên **Docker**.

---

## 1. Cài đặt & Khởi chạy nhanh

```bash
# 1. Cài đặt thư viện
npm install

# 2. Tạo file cấu hình môi trường
Copy-Item .env.example .env

# 3. Khởi động SQL Server bằng Docker
npm run db:up

# 4. Tạo bảng và nạp dữ liệu mẫu
npx prisma migrate deploy
npm run prisma:seed

# 5. Chạy server (môi trường dev)
npm run dev
```

* API chạy tại: `http://localhost:3000`
* SQL Server chạy tại: `localhost:1433` (`sa` / `YourStrongPassword123!`)

---

## 2. Danh sách API

Tất cả API trả về định dạng chuẩn: `{ "status": "200", "message": "...", "data": ... }`

| Phương thức | Đường dẫn | Chức năng | Body / Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/sinhvien/danhsach` | Lấy toàn bộ danh sách sinh viên | Không |
| `GET` | `/api/sinhvien/getbyid/:maSV` | Tìm sinh viên theo mã | `maSV` (trên URL) |
| `POST` | `/api/sinhvien/insert` | Thêm sinh viên mới | JSON (`maSV`, `hoTen`, `email`, `diaChi`, `lop`, `hinhAnh`) |
| `PUT` | `/api/sinhvien/update/:maSV` | Cập nhật thông tin sinh viên | `maSV` (URL) + JSON các trường cần sửa |
| `DELETE` | `/api/sinhvien/delete/:maSV` | Xóa sinh viên | `maSV` (trên URL) |

---

## 3. Cấu trúc thư mục

```text
├── prisma/               # Schema và file migration SQL Server
├── src/
│   ├── clients/          # Khởi tạo kết nối Prisma Client
│   ├── config/           # Đọc biến môi trường (.env)
│   ├── controllers/      # Điều hướng và xử lý request/response
│   ├── middlewares/      # Middleware (chưa dùng phân quyền)
│   ├── routes/           # Định nghĩa các endpoint API
│   ├── services/         # Logic nghiệp vụ và truy vấn CSDL
│   ├── utils/            # Tiện ích phản hồi (sendSuccess, sendError)
│   ├── validators/       # Kiểm tra hợp lệ dữ liệu (Zod)
│   └── app.js            # Khởi tạo Express app
├── tests/                # Unit test và integration test
├── docker-compose.yml    # Cấu hình container Microsoft SQL Server
└── server.js             # Điểm khởi chạy ứng dụng
```

---

## 4. Các lệnh thường dùng

| Lệnh | Mô tả |
| :--- | :--- |
| `npm run dev` | Chạy server với Nodemon (tự reload khi sửa code) |
| `npm run db:up` | Bật container SQL Server |
| `npm run db:down` | Dừng container SQL Server |
| `npm run prisma:studio` | Mở giao diện xem và chỉnh sửa dữ liệu CSDL trực quan |
| `npm test` | Chạy unit test API |
| `npm run test:db` | Chạy test tích hợp CRUD trực tiếp trên database |
