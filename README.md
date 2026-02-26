# 💰 Quản Lý Chi Tiêu Chung

Ứng dụng web quản lý chi tiêu chung cho 3 người cùng trọ, được xây dựng với Next.js, Supabase và deploy trên Vercel.

## 🚀 Tính Năng

- ✅ Thêm/Xóa chi tiêu
- ✅ Tính toán tự động số tiền mỗi người cần trả
- ✅ Lịch sử chi tiêu đầy đủ
- ✅ Đồng bộ dữ liệu qua Supabase
- ✅ Xuất/Nhập dữ liệu JSON
- ✅ Responsive design

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **UI Library**: SweetAlert2

## 📦 Cài Đặt

### 1. Clone repository

```bash
git clone <your-repo-url>
cd QuanLyChiTieu
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình Environment Variables

Tạo file `.env.local` trong thư mục gốc:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

Lấy thông tin này từ [Supabase Dashboard](https://app.supabase.com) → Settings → API

### 4. Setup Database

1. Vào Supabase Dashboard → SQL Editor
2. Chạy script từ file `database_setup.sql`

### 5. Chạy ứng dụng

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 🔧 Kiểm Tra Kết Nối Supabase

```bash
npm run check:supabase
```

Script này sẽ kiểm tra:
- Environment variables có đầy đủ không
- Kết nối đến Supabase có thành công không
- Bảng `expenses` có tồn tại không

## 🆘 Khôi Phục Dự Án

Nếu dự án bị "chết" sau một thời gian không sử dụng:

### ⚡ Hướng dẫn nhanh (5 phút)
👉 Xem file **[HƯỚNG_DẪN_NHANH.md](./HƯỚNG_DẪN_NHANH.md)**

### 📋 Hướng dẫn chi tiết
👉 Xem file **[KHÔI_PHỤC_DỰ_ÁN.md](./KHÔI_PHỤC_DỰ_ÁN.md)**

**Tóm tắt các bước:**
1. Khôi phục Supabase project (nếu bị pause)
2. Cập nhật Environment Variables trên Vercel
3. Redeploy lại dự án

## 📁 Cấu Trúc Dự Án

```
QuanLyChiTieu/
├── pages/              # Next.js pages
│   ├── index.js       # Trang chủ
│   ├── _app.js        # App wrapper
│   └── api/           # API routes
│       └── expenses.js # API xử lý chi tiêu
├── src/               # React components
│   └── components/    # UI components
├── lib/               # Utilities
│   └── supabase.js    # Supabase client
├── styles/            # CSS files
├── scripts/           # Utility scripts
└── database_setup.sql # SQL setup script
```

## 🔐 Bảo Mật

- Environment variables không được commit lên Git (đã có trong `.gitignore`)
- Supabase Row Level Security (RLS) đã được bật
- API routes có CORS headers được cấu hình

## 📝 Scripts

```bash
npm run dev          # Chạy development server
npm run build        # Build production
npm run start        # Chạy production server
npm run lint         # Chạy ESLint
npm run check:supabase # Kiểm tra kết nối Supabase
```

## 🌐 Deployment

Dự án được deploy tự động trên Vercel khi push code lên Git.

**Lưu ý khi deploy:**
- Đảm bảo đã set Environment Variables trên Vercel
- Supabase project phải ở trạng thái Active (không bị pause)

## 📄 License

MIT

## 👨‍💻 Author

Trần Vương

---

**💡 Tips**: Để tránh Supabase project bị pause, hãy sử dụng thường xuyên hoặc upgrade lên Pro plan.
