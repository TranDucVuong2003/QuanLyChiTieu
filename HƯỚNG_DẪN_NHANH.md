# ⚡ Hướng Dẫn Khôi Phục Nhanh (5 Phút)

## 🎯 Mục Tiêu
Khôi phục lại dự án đã bị "chết" sau 1 tuần không sử dụng.

---

## 📝 CÁC BƯỚC THỰC HIỆN

### BƯỚC 1: Khôi Phục Supabase (2 phút)

1. **Đăng nhập Supabase**: https://app.supabase.com
2. **Tìm project** của bạn trong dashboard
3. **Nếu project bị pause** (màu đỏ):
   - Click vào project
   - Click nút **"Restore Project"** hoặc **"Resume"**
   - ⏳ Đợi 2-5 phút để project được khôi phục
4. **Lấy thông tin kết nối**:
   - Vào **Settings** → **API**
   - Copy **Project URL** và **anon public key**

---

### BƯỚC 2: Cập Nhật Vercel (2 phút)

1. **Đăng nhập Vercel**: https://vercel.com/dashboard
2. **Tìm project** của bạn
3. **Vào Settings** → **Environment Variables**
4. **Cập nhật/Create** 2 biến sau:
   ```
   NEXT_PUBLIC_SUPABASE_URL = [URL bạn vừa copy từ Supabase]
   NEXT_PUBLIC_SUPABASE_ANON_KEY = [Key bạn vừa copy từ Supabase]
   ```
5. **Chọn tất cả environments**: Production, Preview, Development
6. **Click Save**

---

### BƯỚC 3: Redeploy (1 phút)

1. Vào tab **Deployments**
2. Click vào deployment gần nhất
3. Click **"..."** → **"Redeploy"**
4. ⏳ Đợi 2-5 phút

---

### BƯỚC 4: Kiểm Tra

1. Mở URL của bạn: `https://your-project.vercel.app`
2. Nếu thấy app hoạt động → ✅ **THÀNH CÔNG!**
3. Nếu vẫn lỗi → Xem phần **TROUBLESHOOTING** bên dưới

---

## 🔧 TROUBLESHOOTING

### ❌ Lỗi: "Missing Supabase environment variables"
**Giải pháp**: Kiểm tra lại environment variables trên Vercel đã được set đúng chưa

### ❌ Lỗi: "Failed to connect to Supabase"
**Giải pháp**: 
- Kiểm tra Supabase project đã được restore chưa
- Kiểm tra URL và Key có đúng không

### ❌ Lỗi: "Table 'expenses' does not exist"
**Giải pháp**: 
1. Vào Supabase → **SQL Editor**
2. Chạy script từ file `database_setup.sql`
3. Redeploy lại trên Vercel

### ❌ App vẫn không chạy
**Giải pháp**:
1. Xem **Logs** trên Vercel để tìm lỗi cụ thể
2. Test local trước:
   ```bash
   # Tạo file .env.local
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   
   # Chạy local
   npm install
   npm run dev
   ```
3. Nếu local chạy được → Vấn đề ở Vercel
4. Nếu local không chạy → Vấn đề ở code hoặc Supabase

---

## ✅ CHECKLIST

- [ ] Supabase project đã được restore
- [ ] Đã copy Supabase URL và Key
- [ ] Đã cập nhật Environment Variables trên Vercel
- [ ] Đã redeploy lại
- [ ] App đã hoạt động bình thường

---

## 📞 CẦN GIÚP ĐỠ?

Xem file `KHÔI_PHỤC_DỰ_ÁN.md` để có hướng dẫn chi tiết hơn.
