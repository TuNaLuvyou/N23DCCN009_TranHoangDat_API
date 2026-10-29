import { z } from "zod";

const maSVField = z
  .string({ required_error: "Mã sinh viên là bắt buộc" })
  .trim()
  .min(1, "Mã sinh viên không được để trống")
  .max(10, "Mã sinh viên tối đa 10 ký tự");

const optionalText = (max, label) =>
  z.preprocess(
    (value) => (value === "" || value === undefined ? undefined : value),
    z
      .string({ invalid_type_error: `${label} phải là chuỗi` })
      .trim()
      .max(max, `${label} tối đa ${max} ký tự`)
      .nullish(),
  );

const optionalEmail = z.preprocess(
  (value) => (value === "" || value === undefined ? undefined : value),
  z
    .string({ invalid_type_error: "Email phải là chuỗi" })
    .trim()
    .email("Email không hợp lệ")
    .max(250, "Email tối đa 250 ký tự")
    .nullish(),
);

export const createSinhVienSchema = z.object({
  maSV: maSVField,
  hoTen: optionalText(50, "Họ tên"),
  email: optionalEmail,
  diaChi: optionalText(500, "Địa chỉ"),
  lop: optionalText(50, "Lớp"),
  hinhAnh: optionalText(500, "Hình ảnh"),
});

export const updateSinhVienSchema = z
  .object({
    maSV: maSVField.optional(),
    hoTen: optionalText(50, "Họ tên"),
    email: optionalEmail,
    diaChi: optionalText(500, "Địa chỉ"),
    lop: optionalText(50, "Lớp"),
    hinhAnh: optionalText(500, "Hình ảnh"),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Cần cung cấp ít nhất một trường để cập nhật",
  });

export const maSVParamSchema = z.object({
  maSV: maSVField,
});
