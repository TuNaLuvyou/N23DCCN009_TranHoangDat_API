import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/clients/prisma.client.js";

const MA_SV = "TEST01";

before(async () => {
  await prisma.$connect();
  await prisma.sinhVien.deleteMany({ where: { maSV: MA_SV } });
});

after(async () => {
  await prisma.sinhVien.deleteMany({ where: { maSV: MA_SV } });
  await prisma.$disconnect();
});

test("luồng thêm -> tìm -> sửa -> xóa sinh viên", async (t) => {
  await t.test("thêm sinh viên", async () => {
    const response = await request(app).post("/api/sinhvien/insert").send({
      maSV: MA_SV,
      hoTen: "Sinh Viên Test",
      email: "test@example.com",
      diaChi: "Quận 1",
      lop: "TEST01",
    });

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "200");
    assert.equal(response.body.message, "Thêm dữ liệu thành công!");
    assert.equal(response.body.data.maSV, MA_SV);
  });

  await t.test("tìm sinh viên theo mã", async () => {
    const response = await request(app).get(`/api/sinhvien/getbyid/${MA_SV}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "200");
    assert.equal(response.body.data.hoTen, "Sinh Viên Test");
  });

  await t.test("sửa sinh viên", async () => {
    const response = await request(app)
      .put(`/api/sinhvien/update/${MA_SV}`)
      .send({ hoTen: "Sinh Viên Đã Sửa", lop: "TEST02" });

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "200");
    assert.equal(response.body.message, "Sửa sinh viên thành công!");
    assert.equal(response.body.data.hoTen, "Sinh Viên Đã Sửa");
    assert.equal(response.body.data.lop, "TEST02");
  });

  await t.test("xóa sinh viên", async () => {
    const response = await request(app).delete(`/api/sinhvien/delete/${MA_SV}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "200");
    assert.equal(response.body.message, "Xóa sinh viên thành công!");
    assert.equal(response.body.data.maSV, MA_SV);
  });

  await t.test("tìm lại sinh viên đã xóa trả về 401", async () => {
    const response = await request(app).get(`/api/sinhvien/getbyid/${MA_SV}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.status, "401");
    assert.equal(response.body.message, "Không tồn tại sinh viên!");
  });
});
