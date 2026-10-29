import { prisma } from "../clients/prisma.client.js";
import { removeUndefined } from "../utils/response.js";

/** Lấy toàn bộ sinh viên */
export const getAllSinhVien = () => {
  return prisma.sinhVien.findMany({ orderBy: { maSV: "asc" } });
};

/** Tìm sinh viên theo mã sinh viên */
export const getSinhVienByMaSV = (maSV) => {
  return prisma.sinhVien.findUnique({ where: { maSV } });
};

/** Thêm sinh viên mới */
export const createSinhVien = (payload) => {
  return prisma.sinhVien.create({
    data: removeUndefined(payload),
  });
};

/** Cập nhật thông tin sinh viên */
export const updateSinhVien = (maSV, payload) => {
  return prisma.sinhVien.update({
    where: { maSV },
    data: removeUndefined(payload),
  });
};

/** Xóa sinh viên */
export const deleteSinhVien = (maSV) => {
  return prisma.sinhVien.delete({
    where: { maSV },
  });
};
