# 🚀 Hướng dẫn Setup Supabase - Chi tiết từng bước

## ✅ Bước 1: Tạo tài khoản Supabase

1. **Truy cập:** https://supabase.com
2. **Đăng ký:** Click "Start your project" → Sign up with GitHub
3. **Xác thực email** (nếu cần)

## ✅ Bước 2: Tạo Project mới

1. **Create New Project:**
   - **Organization:** Personal (hoặc tạo organization mới)
   - **Name:** `chi-tieu-chung` 
   - **Database Password:** Tạo password mạnh (ghi nhớ lại)
   - **Region:** `Southeast Asia (Singapore)` - gần VN nhất
   
2. **Click Create new project**
3. **Đợi 2-3 phút** để database khởi tạo

## ✅ Bước 3: Tạo bảng Database

1. **Vào SQL Editor:**
   - Sidebar bên trái → **SQL Editor** 
   - Click **New query**

2. **Copy và chạy script này:**

```sql
-- Tạo bảng expenses
CREATE TABLE public.expenses (
  id BIGSERIAL PRIMARY KEY,
  person VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Thêm Row Level Security
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Tạo policies (cho phép mọi người truy cập - phù hợp app chia sẻ)
CREATE POLICY "Enable read access for all users" 
ON public.expenses FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" 
ON public.expenses FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable delete access for all users" 
ON public.expenses FOR DELETE USING (true);

-- Thêm dữ liệu mẫu
INSERT INTO public.expenses (person, description, amount) VALUES 
('Trần Vương', 'Mua thịt bò', 50000),
('Hào bé  o', 'Mua rau xanh', 30000),
('Đăng H+ MP Poll', 'Mua gạo và gia vị', 120000);
```

3. **Click "RUN"** để chạy script
4. **Kiểm tra:** Vào **Table Editor** → Bảng `expenses` đã được tạo

## ✅ Bước 4: Lấy API Keys

1. **Vào Settings:**
   - Sidebar → **Settings** → **API**

2. **Copy 2 thông tin này:**
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJhbGciOiJIUzI1NiIs...` (key rất dài)

## ✅ Bước 5: Cập nhật Environment Variables

**Thay thế nội dung file `.env.local` bằng:**

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

**⚠️ Lưu ý:** 
- Thay `xxxxx` bằng project ID thật của bạn
- Thay key bằng anon key thật từ Supabase

## ✅ Bước 6: Update API để dùng Supabase thật

Sau khi cập nhật `.env.local`, tôi sẽ giúp bạn chuyển từ mock data sang Supabase thật.

---

## 🎯 **Checklist hoàn thành:**

- [ ] Tạo tài khoản Supabase
- [ ] Tạo project mới  
- [ ] Chạy SQL script tạo bảng
- [ ] Copy Project URL và anon key
- [ ] Cập nhật `.env.local`
- [ ] Test kết nối

**Bạn có thể bắt đầu từ Bước 1 và báo tôi khi hoàn thành!** 🚀