# 🔐 Hướng Dẫn Cấu Hình Environment Variables

## 📋 Tạo File .env.local

Tạo file `.env.local` trong thư mục gốc của dự án với nội dung sau:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔍 Lấy Thông Tin Từ Supabase

### Bước 1: Đăng nhập Supabase
1. Truy cập: https://app.supabase.com
2. Đăng nhập vào tài khoản của bạn

### Bước 2: Chọn Project
1. Chọn project của bạn từ danh sách
2. Nếu project bị pause, click **"Restore Project"** trước

### Bước 3: Lấy API Credentials
1. Vào **Settings** (biểu tượng bánh răng ở sidebar)
2. Click **API** trong menu Settings
3. Copy các thông tin sau:

   - **Project URL**: 
     ```
     https://xxxxxxxxxxxxx.supabase.co
     ```
     → Đây là `NEXT_PUBLIC_SUPABASE_URL`

   - **anon public** key:
     ```
     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1yZWYiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTk2ODAwMCwiZXhwIjoxOTYxNTQ0MDAwfQ.example-key
     ```
     → Đây là `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Bước 4: Cập Nhật .env.local

Thay thế các giá trị trong file `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1yZWYiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTk2ODAwMCwiZXhwIjoxOTYxNTQ0MDAwfQ.example-key
```

## ✅ Kiểm Tra

Sau khi tạo file `.env.local`, chạy lệnh sau để kiểm tra:

```bash
npm run check:supabase
```

Nếu thấy thông báo "✅ Tất cả kiểm tra đều thành công!" → Bạn đã cấu hình đúng!

## 🌐 Cấu Hình Trên Vercel

Nếu bạn deploy lên Vercel, cần thêm Environment Variables trên Vercel:

1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project của bạn
3. Vào **Settings** → **Environment Variables**
4. Thêm 2 biến sau:
   - `NEXT_PUBLIC_SUPABASE_URL` = [URL từ Supabase]
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = [Key từ Supabase]
5. Chọn tất cả environments: **Production**, **Preview**, **Development**
6. Click **Save**
7. **Redeploy** lại project

## ⚠️ Lưu Ý Quan Trọng

- ❌ **KHÔNG** commit file `.env.local` lên Git (đã có trong `.gitignore`)
- ❌ **KHÔNG** chia sẻ anon key với người khác
- ✅ File `.env.local` chỉ dùng cho development local
- ✅ Trên Vercel, phải set Environment Variables trong dashboard

## 🆘 Troubleshooting

### Lỗi: "Missing Supabase environment variables"
- Kiểm tra file `.env.local` đã được tạo chưa
- Kiểm tra tên biến có đúng không (phải có `NEXT_PUBLIC_` prefix)
- Kiểm tra không có khoảng trắng thừa trong file

### Lỗi: "Failed to connect to Supabase"
- Kiểm tra URL và Key có đúng không
- Kiểm tra Supabase project có đang hoạt động không (không bị pause)
- Thử copy lại URL và Key từ Supabase Dashboard

### Lỗi: "JWT expired" hoặc "Invalid API key"
- Key đã bị thay đổi hoặc hết hạn
- Lấy lại key mới từ Supabase Dashboard → Settings → API
