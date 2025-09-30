# 🎯 SUPABASE SETUP - CHECKLIST HOÀN CHỈNH

## ✅ Những bước bạn cần làm:

### 1. Tạo tài khoản Supabase
- [ ] Truy cập https://supabase.com
- [ ] Đăng ký với GitHub hoặc email
- [ ] Xác thực tài khoản

### 2. Tạo Project
- [ ] Click "New project"
- [ ] Nhập tên: `chi-tieu-chung`
- [ ] Chọn region: `Southeast Asia (Singapore)`
- [ ] Tạo password mạnh cho database
- [ ] Click "Create new project"
- [ ] Đợi 2-3 phút

### 3. Chạy Database Script
- [ ] Vào SQL Editor
- [ ] Copy nội dung file `database_setup.sql`
- [ ] Paste và click "RUN"
- [ ] Kiểm tra bảng "expenses" được tạo với 5 dòng dữ liệu

### 4. Lấy API Keys
- [ ] Vào Settings → API
- [ ] Copy **Project URL**: `https://xxxxx.supabase.co`
- [ ] Copy **anon public key**: `eyJhbGciOiJIUzI1NiIs...`

### 5. Cập nhật .env.local
- [ ] Mở file `.env.local` 
- [ ] Thay thế:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
  ```

### 6. Test kết nối
- [ ] Restart server: `npm run dev`
- [ ] Mở http://localhost:3000
- [ ] Nhấn "Đồng bộ dữ liệu"
- [ ] Kiểm tra dữ liệu từ Supabase hiển thị

## 🚨 Khi hoàn thành các bước trên:

**Báo cho tôi biết:**
- ✅ "Đã tạo xong Supabase project"
- ✅ "Đã chạy SQL script thành công" 
- ✅ "Đã cập nhật .env.local với keys thật"

**Sau đó tôi sẽ giúp bạn:**
- 🧪 Test kết nối thật
- 🚀 Deploy lên Vercel 
- 🌍 Chia sẻ cho 2 bạn cùng trọ

## 💡 Tips:
- **Lưu password database** để sau này dùng
- **Không chia sẻ anon key** với ai khác
- **Backup project URL** để dễ truy cập sau

---
**Need help? Hỏi tôi bất cứ lúc nào!** 🆘