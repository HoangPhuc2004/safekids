import React from "react"
import { Link, useNavigate } from "react-router"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { BookHeart, ArrowLeft } from "lucide-react"

export default function Register() {
  const navigate = useNavigate()
  const [role, setRole] = React.useState("student")

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Đây là bản demo, vui lòng đăng nhập bằng tài khoản có sẵn.")
    navigate("/login")
  }

  return (
    <div className="flex justify-center min-h-screen bg-slate-100">
      <div className="flex flex-col min-h-screen items-center p-6 bg-pink-50 text-slate-800 w-full max-w-md shadow-2xl shadow-slate-300">
        <div className="w-full flex justify-start mb-6 pt-4">
        <Link to="/login" className="flex items-center text-pink-600 font-bold hover:text-pink-700 transition-colors bg-white px-4 py-2 rounded-full shadow-sm">
          <ArrowLeft size={20} className="mr-2" /> Quay lại
        </Link>
      </div>

      <div className="flex flex-col items-center mb-8 gap-2">
        <div className="bg-white p-3 rounded-full shadow-md text-pink-500">
          <BookHeart size={48} strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl font-extrabold text-pink-600 tracking-tight text-center mt-2">Tạo tài khoản</h1>
      </div>

      <form onSubmit={handleRegister} className="w-full max-w-sm flex flex-col gap-4 bg-white p-6 rounded-3xl shadow-xl shadow-pink-100/50">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-slate-600">Họ và tên</label>
          <Input placeholder="Nhập tên của bạn" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-slate-600">Vai trò</label>
          <select 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="flex h-12 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-2 text-base text-slate-700 outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-colors font-medium cursor-pointer appearance-none">
            <option value="student">Học sinh</option>
            <option value="teacher">Giáo viên</option>
            <option value="parent">Phụ huynh</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-slate-600">
            {role === "student" ? "Tên đăng nhập" : "Email"}
          </label>
          <Input 
            placeholder={role === "student" ? "Chọn tên đăng nhập" : "Nhập email của bạn"} 
            type={role === "student" ? "text" : "email"}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-slate-600">Giới tính</label>
          <select className="flex h-12 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 py-2 text-base text-slate-700 outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-colors font-medium cursor-pointer appearance-none">
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-slate-600">Ngày sinh</label>
          <Input type="date" />
        </div>

        <div className="flex flex-col gap-1.5 mb-2">
          <label className="text-sm font-bold text-slate-600">Mật khẩu</label>
          <Input type="password" placeholder="Tạo mật khẩu an toàn" />
        </div>

        <Button type="submit" size="lg" className="w-full font-bold shadow-lg shadow-pink-200 mt-2">
          Đăng ký
        </Button>
      </form>
      </div>
    </div>
  )
}