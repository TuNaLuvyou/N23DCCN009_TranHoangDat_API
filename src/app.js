import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.config.js";
import sinhVienRoute from "./routes/sinhvien.route.js";
import { sendError } from "./utils/response.js";

const app = express();

app.use(cors());
app.use(express.json());

if (!env.isTest) {
  app.use(morgan("dev"));
}

// Định tuyến trực tiếp API sinh viên
app.use("/api/sinhvien", sinhVienRoute);

// Xử lý 404 - Không tìm thấy route
app.use((req, res) => {
  sendError(res, `Không tìm thấy đường dẫn ${req.method} ${req.originalUrl}`, "404", null, 404);
});

// Bắt lỗi toàn cục (JSON sai cú pháp, lỗi máy chủ)
app.use((err, _req, res, _next) => {
  if (err?.type === "entity.parse.failed") {
    return sendError(res, "Dữ liệu JSON không hợp lệ!", "400", null);
  }
  return sendError(res, err.message || "Đã xảy ra lỗi máy chủ!", "500", null, 500);
});

export default app;
