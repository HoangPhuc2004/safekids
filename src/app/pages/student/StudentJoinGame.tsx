import React, { useState } from "react"
import { useNavigate } from "react-router"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Gamepad2, ArrowRight } from "lucide-react"

export default function StudentJoinGame() {
  const [code, setCode] = useState("")
  const navigate = useNavigate()

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.trim() === "") {
      alert("Vui lòng nhập mã phòng!")
      return
    }
    // Navigate to game lobby
    navigate("/student/game-lobby")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 animate-in zoom-in-95 duration-500">
      <div className="w-full max-w-sm flex flex-col items-center text-center gap-6">
        <div className="w-32 h-32 bg-indigo-100 rounded-[2.5rem] rotate-12 flex items-center justify-center text-indigo-500 shadow-2xl shadow-indigo-200 mb-4">
          <Gamepad2 size={64} className="-rotate-12" strokeWidth={2} />
        </div>
        
        <div>
          <h1 className="text-3xl font-black text-slate-800 mb-2">Vào chơi ngay!</h1>
          <p className="text-slate-500 font-medium">Nhập mã phòng do thầy cô chia sẻ để cùng bạn bè ôn tập.</p>
        </div>

        <form onSubmit={handleJoin} className="w-full flex flex-col gap-4 bg-white p-6 rounded-3xl shadow-xl shadow-slate-100 border border-slate-50">
          <div className="flex flex-col gap-2 text-left">
            <label className="text-sm font-bold text-slate-600 ml-1 uppercase tracking-widest">Mã Phòng</label>
            <Input 
              placeholder="VD: SAFE99" 
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="text-center text-2xl font-black tracking-widest h-16 uppercase bg-slate-50 border-slate-200 focus-visible:ring-indigo-100 focus-visible:border-indigo-500"
              maxLength={6}
            />
          </div>

          <Button type="submit" size="lg" className="w-full font-black text-lg h-16 shadow-lg shadow-indigo-200 bg-indigo-500 hover:bg-indigo-600 border-b-4 border-indigo-700 active:border-b-0 active:translate-y-1 transition-all flex gap-2 items-center">
            Vào phòng chơi <ArrowRight size={24} />
          </Button>
        </form>

        <p className="text-sm text-slate-400 font-medium mt-4">
          Hãy hỏi thầy cô nếu bạn chưa có mã nhé.
        </p>
      </div>
    </div>
  )
}