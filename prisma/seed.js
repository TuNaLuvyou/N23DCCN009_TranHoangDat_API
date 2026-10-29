import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sinhViens = [
  {
    maSV: "SV001",
    hoTen: "Nguyễn Văn An",
    email: "an.nguyen@example.com",
    diaChi: "Quận 1, TP. Hồ Chí Minh",
    lop: "CNTT01",
    hinhAnh: null,
  },
  {
    maSV: "SV002",
    hoTen: "Trần Thị Bình",
    email: "binh.tran@example.com",
    diaChi: "Quận 3, TP. Hồ Chí Minh",
    lop: "CNTT01",
    hinhAnh: null,
  },
  {
    maSV: "SV003",
    hoTen: "Lê Hoàng Cường",
    email: "cuong.le@example.com",
    diaChi: "Quận 5, TP. Hồ Chí Minh",
    lop: "CNTT02",
    hinhAnh: null,
  },
];

async function main() {
  for (const sinhVien of sinhViens) {
    await prisma.sinhVien.upsert({
      where: { maSV: sinhVien.maSV },
      update: sinhVien,
      create: sinhVien,
    });
  }
  console.log(`Đã seed ${sinhViens.length} sinh viên.`);
}

main()
  .catch((error) => {
    console.error("Seed thất bại:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
