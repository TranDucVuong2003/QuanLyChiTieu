# 🔧 Hướng Dẫn Khôi Phục Dự Án Vercel + Supabase

## 📋 Tổng Quan Vấn Đề

Sau 1 tuần không truy cập, dự án có thể gặp các vấn đề:
- ✅ **Supabase project bị pause** (free tier tự động pause sau 1 tuần không hoạt động)
- ✅ **Environment variables trên Vercel bị mất hoặc sai**
- ✅ **Vercel deployment bị lỗi**

---

## 🚀 BƯỚC 1: Kiểm Tra & Khôi Phục Supabase

### 1.1. Kiểm tra trạng thái Supabase Project

1. Đăng nhập vào [Supabase Dashboard](https://app.supabase.com)
2. Vào **Project Settings** → **General**
3. Kiểm tra trạng thái project:
   - 🟢 **Active**: Project đang hoạt động bình thường
   - 🔴 **Paused**: Project đã bị pause → Cần **Restore Project**

### 1.2. Khôi phục Supabase Project (nếu bị pause)

1. Trong Supabase Dashboard, click vào project bị pause
2. Click nút **"Restore Project"** hoặc **"Resume"**
3. Đợi 2-5 phút để project được khôi phục
4. ⚠️ **Lưu ý**: Nếu project bị pause quá lâu, có thể cần tạo project mới

### 1.3. Lấy lại thông tin kết nối Supabase

1. Vào **Settings** → **API**
2. Copy các thông tin sau:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIs...`

### 1.4. Kiểm tra Database

1. Vào **Table Editor** → Kiểm tra bảng `expenses` còn tồn tại không
2. Nếu bảng bị mất, chạy lại script SQL từ file `database_setup.sql` hoặc `SUPABASE_SETUP.md`

---

## 🌐 BƯỚC 2: Kiểm Tra & Cập Nhật Vercel

### 2.1. Kiểm tra trạng thái Deployment

1. Đăng nhập vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Tìm project của bạn
3. Kiểm tra:
   - Trạng thái deployment (✅ Ready / ❌ Error)
   - Logs của deployment gần nhất

### 2.2. Cập nhật Environment Variables trên Vercel

1. Vào **Project Settings** → **Environment Variables**
2. Kiểm tra và thêm/cập nhật các biến sau:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

3. ⚠️ **Quan trọng**: 
   - Chọn **Production**, **Preview**, và **Development** cho cả 2 biến
   - Click **Save**

### 2.3. Redeploy lại dự án

1. Vào **Deployments** tab
2. Click vào deployment gần nhất
3. Click **"Redeploy"** hoặc **"..."** → **"Redeploy"**
4. Đợi deployment hoàn tất (2-5 phút)

---

## 🔍 BƯỚC 3: Kiểm Tra Lỗi

### 3.1. Kiểm tra Logs trên Vercel

1. Vào **Deployments** → Click vào deployment mới nhất
2. Xem **Logs** tab để tìm lỗi
3. Các lỗi thường gặp:
   - `Missing Supabase environment variables` → Cần cập nhật env vars
   - `Failed to connect to Supabase` → Supabase project chưa được restore
   - `Build failed` → Lỗi trong code

### 3.2. Test API Endpoint

1. Mở URL: `https://your-project.vercel.app/api/expenses`
2. Nếu thấy JSON data → ✅ API hoạt động
3. Nếu thấy lỗi → Kiểm tra logs và environment variables

---

## 🛠️ BƯỚC 4: Khôi Phục Từ Local (Nếu cần)

### 4.1. Tạo file .env.local

Tạo file `.env.local` trong thư mục gốc:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

### 4.2. Test local

```bash
npm install
npm run dev
```

Mở `http://localhost:3000` và kiểm tra xem app có chạy không.

### 4.3. Deploy lại lên Vercel

```bash
# Nếu dùng Vercel CLI
vercel --prod

# Hoặc push code lên Git (nếu đã connect với Vercel)
git add .
git commit -m "Fix: Update environment variables"
git push
```

---

## ✅ CHECKLIST KHÔI PHỤC

- [ ] Supabase project đã được restore (không còn pause)
- [ ] Đã lấy lại Supabase URL và Anon Key
- [ ] Environment variables đã được cập nhật trên Vercel
- [ ] Đã redeploy lại trên Vercel
- [ ] Đã test API endpoint `/api/expenses`
- [ ] App đã hoạt động bình thường

---

## 🆘 NẾU VẪN KHÔNG ĐƯỢC

### Tạo Supabase Project mới

1. Tạo project mới trên Supabase
2. Chạy lại script SQL từ `database_setup.sql`
3. Cập nhật environment variables trên Vercel với thông tin mới
4. Redeploy lại

### Kiểm tra Code

1. Clone lại code từ Git (nếu có)
2. Chạy `npm install` để cài lại dependencies
3. Test local trước khi deploy

---

## 📞 HỖ TRỢ

- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## 💡 TIPS ĐỂ TRÁNH BỊ PAUSE

1. **Supabase Free Tier**: 
   - Sử dụng project thường xuyên (ít nhất 1 lần/tuần)
   - Hoặc upgrade lên Pro plan ($25/tháng)

2. **Vercel Free Tier**:
   - Vercel không tự động pause, nhưng có thể bị sleep
   - Sử dụng Vercel Pro để có better performance

3. **Monitoring**:
   - Setup uptime monitoring (UptimeRobot, Pingdom)
   - Setup alerts khi app down
