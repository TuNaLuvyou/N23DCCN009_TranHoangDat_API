import * as sinhVienService from "../services/sinhvien.service.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { validateInput } from "../validators/validate.js";
import {
  createSinhVienSchema,
  maSVParamSchema,
  updateSinhVienSchema,
} from "../validators/sinhvien.validator.js";

/** GET /api/sinhvien/danhsach - Lấy toàn bộ sinh viên */
export const getAllSinhVien = async (_req, res) => {
  try {
    const data = await sinhVienService.getAllSinhVien();
    return sendSuccess(res, data, "Lấy dữ liệu thành công!");
  } catch (error) {
    return sendError(res, "Lấy dữ liệu thất bại!", "400", error.message);
  }
};

/** GET /api/sinhvien/getbyid/:maSV - Tìm sinh viên theo mã */
export const getSinhVienByMaSV = async (req, res) => {
  const validation = validateInput(maSVParamSchema, req.params);
  if (!validation.success) {
    return sendError(res, "Dữ liệu không hợp lệ!", "400", validation.errors);
  }

  try {
    const sinhVien = await sinhVienService.getSinhVienByMaSV(validation.data.maSV);
    if (!sinhVien) {
      return sendError(res, "Không tồn tại sinh viên!", "401", "");
    }
    return sendSuccess(res, sinhVien, "Lấy dữ liệu sinh viên thành công!");
  } catch (error) {
    return sendError(res, "Lấy dữ liệu sinh viên thất bại!", "400", error.message);
  }
};

/** POST /api/sinhvien/insert - Thêm sinh viên */
export const createSinhVien = async (req, res) => {
  const validation = validateInput(createSinhVienSchema, req.body);
  if (!validation.success) {
    return sendError(res, "Dữ liệu không hợp lệ!", "400", validation.errors);
  }

  try {
    const data = await sinhVienService.createSinhVien(validation.data);
    return sendSuccess(res, data, "Thêm dữ liệu thành công!");
  } catch (error) {
    if (error?.code === "P2002") {
      return sendError(res, "Mã sinh viên đã tồn tại!", "400", {
        field: "maSV",
        value: validation.data.maSV,
      });
    }
    return sendError(res, "Thêm dữ liệu thất bại!", "400", error.message);
  }
};

/** PUT /api/sinhvien/update/:maSV - Sửa sinh viên */
export const updateSinhVien = async (req, res) => {
  const paramVal = validateInput(maSVParamSchema, req.params);
  if (!paramVal.success) {
    return sendError(res, "Dữ liệu không hợp lệ!", "400", paramVal.errors);
  }

  const bodyVal = validateInput(updateSinhVienSchema, req.body);
  if (!bodyVal.success) {
    return sendError(res, "Dữ liệu không hợp lệ!", "400", bodyVal.errors);
  }

  const { maSV } = paramVal.data;

  try {
    const existing = await sinhVienService.getSinhVienByMaSV(maSV);
    if (!existing) {
      return sendError(res, "Không tồn tại sinh viên!", "401", "");
    }

    const data = await sinhVienService.updateSinhVien(maSV, bodyVal.data);
    return sendSuccess(res, data, "Sửa sinh viên thành công!");
  } catch (error) {
    if (error?.code === "P2002") {
      return sendError(res, "Mã sinh viên đã tồn tại!", "400", {
        field: "maSV",
        value: bodyVal.data.maSV,
      });
    }
    return sendError(res, "Sửa sinh viên thất bại!", "401", error.message);
  }
};

/** DELETE /api/sinhvien/delete/:maSV - Xóa sinh viên */
export const deleteSinhVien = async (req, res) => {
  const paramVal = validateInput(maSVParamSchema, req.params);
  if (!paramVal.success) {
    return sendError(res, "Dữ liệu không hợp lệ!", "400", paramVal.errors);
  }

  const { maSV } = paramVal.data;

  try {
    const existing = await sinhVienService.getSinhVienByMaSV(maSV);
    if (!existing) {
      return sendError(res, "Không tồn tại sinh viên!", "401", "");
    }

    const data = await sinhVienService.deleteSinhVien(maSV);
    return sendSuccess(res, data, "Xóa sinh viên thành công!");
  } catch (error) {
    return sendError(res, "Không tồn tại sinh viên!", "401", error.message);
  }
};
