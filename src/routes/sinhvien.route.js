import { Router } from "express";
import * as sinhVienController from "../controllers/sinhvien.controller.js";

const router = Router();

// 1. Lấy danh sách sinh viên
router.get("/danhsach", sinhVienController.getAllSinhVien);

// 2. Tìm sinh viên theo mã sinh viên
router.get("/getbyid/:maSV", sinhVienController.getSinhVienByMaSV);

// 3. Thêm sinh viên
router.post("/insert", sinhVienController.createSinhVien);

// 4. Sửa sinh viên
router.put("/update/:maSV", sinhVienController.updateSinhVien);

// 5. Xóa sinh viên
router.delete("/delete/:maSV", sinhVienController.deleteSinhVien);

export default router;
