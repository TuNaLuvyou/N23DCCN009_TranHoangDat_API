import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";

test("GET getbyid với mã sinh viên quá 10 ký tự bị từ chối", async () => {
  const response = await request(app).get("/api/sinhvien/getbyid/SV1234567890");

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "400");
  assert.equal(response.body.message, "Dữ liệu không hợp lệ!");
  assert.equal(response.body.data[0].field, "maSV");
});

test("PUT update không có body bị từ chối", async () => {
  const response = await request(app)
    .put("/api/sinhvien/update/SV001")
    .send({});

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "400");
  assert.equal(response.body.message, "Dữ liệu không hợp lệ!");
});

test("PUT update với email sai định dạng bị từ chối", async () => {
  const response = await request(app)
    .put("/api/sinhvien/update/SV001")
    .send({ email: "khong-phai-email" });

  assert.equal(response.status, 200);
  assert.equal(response.body.status, "400");
  assert.ok(
    response.body.data.some((item) => item.field === "email"),
  );
});

test("DELETE thiếu mã sinh viên trả về 404", async () => {
  const response = await request(app).delete("/api/sinhvien/delete/");

  assert.equal(response.status, 404);
  assert.equal(response.body.status, "404");
});

test("Đường dẫn không tồn tại trả về 404", async () => {
  const response = await request(app).get("/api/khong-ton-tai");

  assert.equal(response.status, 404);
  assert.equal(response.body.status, "404");
});
