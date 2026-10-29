/**
 * Tiện ích phản hồi API (thành công / thất bại)
 */

/**
 * Trả về kết quả thành công kèm dữ liệu (thêm, sửa, xóa, lấy danh sách)
 */
export const sendSuccess = (res, data = null, message = "Thao tác thành công!") => {
  return res.status(200).json({
    status: "200",
    message,
    data,
  });
};

/**
 * Trả về thông báo lỗi kèm mã trạng thái
 */
export const sendError = (
  res,
  message = "Đã xảy ra lỗi!",
  status = "400",
  data = null,
  httpStatus = 200,
) => {
  return res.status(httpStatus).json({
    status: String(status),
    message,
    data,
  });
};

/**
 * Lọc bỏ các trường undefined trước khi ghi vào CSDL
 */
export const removeUndefined = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, val]) => val !== undefined));
