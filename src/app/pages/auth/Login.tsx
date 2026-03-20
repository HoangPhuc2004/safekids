import React, { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate, Link } from "react-router"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { ShieldAlert, BookHeart } from "lucide-react"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(username, password)) {
      if (username === "giaovien1") navigate("/teacher")
      if (username === "hocsinh1") navigate("/student")
    } else {
      setError("Sai tài khoản hoặc mật khẩu!")
    }
  }

  return (
    <div className="flex justify-center min-h-screen bg-slate-100">
      <div className="flex flex-col min-h-screen items-center justify-center p-6 bg-pink-50 text-slate-800 w-full max-w-md shadow-2xl shadow-slate-300">
        <div className="flex flex-col items-center mb-8 gap-2">
        <div className="bg-white p-4 rounded-full shadow-lg shadow-pink-200 text-pink-500">
          <BookHeart size={64} strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl font-extrabold text-pink-600 tracking-tight text-center mt-4">SafeSchool</h1>
        <p className="text-slate-500 font-medium text-center">Giáo dục phòng chống quấy rối cho trẻ</p>
      </div>

      <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4 bg-white p-6 rounded-3xl shadow-xl shadow-pink-100/50">
        <h2 className="text-xl font-bold mb-2">Đăng nhập</h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-xl flex items-center gap-2 text-sm font-medium">
            <ShieldAlert size={18} /> {error}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-slate-600">Tài khoản</label>
          <Input 
            placeholder="Ví dụ: giaovien1 hoặc hocsinh1" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5 mb-2">
          <label className="text-sm font-bold text-slate-600">Mật khẩu</label>
          <Input 
            type="password" 
            placeholder="Mật khẩu (nhập 1)" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" size="lg" className="w-full font-bold shadow-lg shadow-pink-200">
          Đăng nhập
        </Button>

        <p className="text-center text-sm text-slate-500 mt-4">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-pink-600 font-bold hover:underline">
            Đăng ký ngay
          </Link>
        </p>

        <div className="mt-4 p-4 bg-pink-50 rounded-xl text-xs text-slate-600 space-y-2 border border-pink-100">
          <p className="font-bold text-pink-700">Tài khoản Demo:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Giáo viên: giaovien1 / 1</li>
            <li>Học sinh: hocsinh1 / 1</li>
          </ul>
        </div>
      </form>
      </div>
    </div>
  )
}
