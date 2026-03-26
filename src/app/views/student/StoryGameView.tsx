import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, RefreshCw, ShieldCheck, AlertCircle, ChevronRight, Star, Heart, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";

type NodeId = 'start' | 'node2A' | 'node2B' | 'end1' | 'end2' | 'end3';

interface StoryNode {
  id: NodeId;
  title: string;
  subtitle?: string;
  content: string;
  image: string;
  isEnding?: boolean;
  options?: {
    text: string;
    nextNode: NodeId;
    icon?: React.ReactNode;
    colorClass?: string;
  }[];
}

const storyData: Record<NodeId, StoryNode> = {
  start: {
    id: 'start',
    title: 'TÌNH HUỐNG 1',
    subtitle: 'Đối mặt với "Bão Mạng"',
    content: 'Sau khi đăng một bài điều tra về đường dây cá độ, Linh bất ngờ nhận được hàng loạt bình luận công kích, chửi bới từ các tài khoản ảo.\n\nTrong tình huống này, Linh nên làm gì?',
    image: 'https://images.unsplash.com/photo-1591522811280-a8759970b03f?w=1200&h=800&fit=crop',
    options: [
      { text: 'Phản bác lại các bình luận', nextNode: 'node2A', colorClass: 'bg-orange-600 hover:bg-orange-700' },
      { text: 'Phớt lờ các bình luận', nextNode: 'node2B', colorClass: 'bg-indigo-600 hover:bg-indigo-700' }
    ]
  },
  node2A: {
    id: 'node2A',
    title: 'TÌNH HUỐNG 2',
    subtitle: 'Lời Đe Dọa',
    content: 'Linh quyết định phản hồi và bảo vệ bài viết của mình. Việc này khiến cuộc tranh luận trở nên sôi nổi hơn và thu hút nhiều sự chú ý.\n\nTuy nhiên, phản ứng của cô cũng khiến một người đàn ông – chủ một hệ thống cá độ trực tuyến – chú ý. Hắn bắt đầu tìm kiếm thông tin cá nhân của Linh và gửi những tin nhắn đe dọa yêu cầu cô gỡ bài.\n\nLinh phải quyết định cách xử lý các tin nhắn đe dọa.',
    image: 'https://images.unsplash.com/photo-1597888619263-41e68f36c16a?w=1200&h=800&fit=crop',
    options: [
      { text: 'Báo cảnh sát và tìm sự hỗ trợ', nextNode: 'end2', colorClass: 'bg-green-600 hover:bg-green-700' },
      { text: 'Xóa bài viết để được an toàn', nextNode: 'end1', colorClass: 'bg-rose-600 hover:bg-rose-700' }
    ]
  },
  node2B: {
    id: 'node2B',
    title: 'TÌNH HUỐNG 2',
    subtitle: 'Sự Công Kích Cá Nhân',
    content: 'Linh chọn cách không tham gia tranh luận và tiếp tục công việc.\n\nNhưng các tài khoản công kích bắt đầu chuyển sang trang cá nhân của cô. Họ đăng các bài viết bôi nhọ và chỉnh sửa hình ảnh của cô để lan truyền trên mạng.\n\nLinh phải đối mặt với việc hình ảnh cá nhân bị lan truyền trên mạng.',
    image: 'https://images.unsplash.com/photo-1622084730216-39187f8bb9de?w=1200&h=800&fit=crop',
    options: [
      { text: 'Xóa bài viết để ngừng bị tấn công', nextNode: 'end1', colorClass: 'bg-rose-600 hover:bg-rose-700' },
      { text: 'Tìm kiếm sự hỗ trợ từ các tổ chức bảo vệ', nextNode: 'end3', colorClass: 'bg-pink-600 hover:bg-pink-700' }
    ]
  },
  end1: {
    id: 'end1',
    title: 'KẾT THÚC 1',
    subtitle: 'Từ Bỏ Công Việc',
    content: 'Vì lo sợ tình hình trở nên nguy hiểm hơn và áp lực quá lớn từ dư luận, Linh quyết định gỡ bài.\n\nÁp lực từ sự việc khiến cô suy sụp, quyết định rời khỏi tòa soạn và từ bỏ công việc báo chí mà cô từng đam mê.',
    image: 'https://images.unsplash.com/photo-1584550915105-da8b91eff98c?w=1200&h=800&fit=crop',
    isEnding: true
  },
  end2: {
    id: 'end2',
    title: 'KẾT THÚC 2',
    subtitle: 'Công Lý Được Thực Thi',
    content: 'Linh bình tĩnh lưu lại tất cả bằng chứng đe dọa và báo cáo sự việc với cơ quan chức năng.\n\nCơ quan chức năng đã vào cuộc điều tra và bắt giữ người đứng sau hệ thống cá độ đã đe dọa cô. Linh tiếp tục công việc điều tra của mình với sự bảo vệ của pháp luật.',
    image: 'https://images.unsplash.com/photo-1763569378571-50ef8417b15f?w=1200&h=800&fit=crop',
    isEnding: true
  },
  end3: {
    id: 'end3',
    title: 'KẾT THÚC 3',
    subtitle: 'Danh Dự Được Bảo Vệ',
    content: 'Linh liên hệ với các tổ chức hỗ trợ xử lý nội dung xâm phạm hình ảnh trên mạng và cung cấp các bằng chứng.\n\nCác bài đăng bôi nhọ và hình ảnh bị chỉnh sửa dần được gỡ bỏ khỏi các nền tảng. Linh tiếp tục làm việc và nhận được sự ủng hộ mạnh mẽ từ cộng đồng.',
    image: 'https://images.unsplash.com/photo-1768244016477-78da64149a23?w=1200&h=800&fit=crop',
    isEnding: true
  }
};

export default function StoryGameView() {
  const navigate = useNavigate();
  const [currentNodeId, setCurrentNodeId] = useState<NodeId>('start');

  const currentNode = storyData[currentNodeId];

  const handleOptionClick = (nextNodeId: NodeId) => {
    setCurrentNodeId(nextNodeId);
  };

  const handleRestart = () => {
    setCurrentNodeId('start');
  };

  return (
    <div className="bg-indigo-950 min-h-screen flex flex-col font-sans overflow-hidden">
      {/* Cinematic Header Overlay */}
      <div className="absolute top-0 w-full p-6 flex items-center justify-between z-40">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:bg-white/20 transition-all shadow-2xl"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full text-white font-black text-xs tracking-[0.2em] uppercase">
          Story Challenge
        </div>
        <div className="flex gap-2">
           <button className="p-3 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl text-white">
              <Heart size={20} />
           </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentNode.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden"
        >
          {/* Visual Column / Area */}
          <div className="relative h-[35vh] lg:h-full lg:w-1/2 flex-shrink-0 group overflow-hidden">
            <ImageWithFallback 
              src={currentNode.image} 
              alt={currentNode.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 ease-linear scale-110 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/20 lg:via-transparent lg:from-transparent lg:to-transparent to-transparent"></div>
            <div className="hidden lg:block absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-indigo-950 to-transparent"></div>
            
            {/* Interactive Character Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-end lg:justify-center z-10 pointer-events-none pb-40 lg:pb-0">
              <motion.div 
                className="relative cursor-pointer pointer-events-auto group/character lg:mt-20"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                {/* Speech Bubble on Hover */}
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white text-indigo-900 px-6 py-3 rounded-2xl rounded-bl-sm font-bold text-sm lg:text-base shadow-2xl opacity-0 translate-y-4 group-hover/character:opacity-100 group-hover/character:translate-y-0 transition-all duration-300 whitespace-nowrap z-30 pointer-events-none border-2 border-indigo-100">
                  <span className="animate-pulse inline-block mr-2">💭</span>
                  Trời ơi, đau đầu quá!
                  <div className="absolute -bottom-[10px] left-6 w-4 h-4 bg-white border-b-2 border-r-2 border-indigo-100 transform rotate-45"></div>
                </div>
                
                {/* Character Image */}
                <img 
                  src="/character-sad.png" 
                  alt="Story Character" 
                  className="w-[200px] lg:w-[320px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] filter hover:brightness-110 hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 pointer-events-auto"
                />
              </motion.div>
            </div>

            <div className="absolute bottom-0 w-full p-8 lg:p-12 z-20">
               <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500 text-white rounded-full text-[10px] font-black tracking-widest uppercase mb-4 shadow-xl shadow-indigo-500/20">
                  {currentNode.isEnding ? <ShieldCheck size={14} /> : <Star size={14} />}
                  {currentNode.title}
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight drop-shadow-2xl">
                  {currentNode.subtitle}
                </h1>
              </motion.div>
            </div>
          </div>

          {/* Narrative & Interaction Column */}
          <div className="flex-1 bg-indigo-950 lg:h-full flex flex-col items-center justify-center p-8 lg:p-20 relative">
            <div className="max-w-xl w-full space-y-12">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="prose prose-invert prose-lg"
              >
                {currentNode.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-indigo-100/80 font-medium leading-relaxed text-xl lg:text-2xl drop-shadow-sm">
                    {paragraph}
                  </p>
                ))}
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-4"
              >
                {!currentNode.isEnding ? (
                  <div className="grid grid-cols-1 gap-4">
                    {currentNode.options?.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionClick(option.nextNode)}
                        className={`
                          group w-full p-6 lg:p-8 rounded-[2rem] text-white font-black text-lg lg:text-xl shadow-2xl transition-all 
                          flex items-center justify-between transform hover:scale-[1.02] active:scale-95 border-2 border-white/5
                          ${option.colorClass || 'bg-white/10 hover:bg-white/20'}
                        `}
                      >
                        <span className="tracking-tight">{option.text}</span>
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-indigo-900 transition-all">
                          <ChevronRight size={24} strokeWidth={3} />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className={`p-8 rounded-[2.5rem] border-2 bg-white/5 backdrop-blur-md flex flex-col gap-4 ${currentNode.id === 'end1' ? 'border-rose-500/30' : 'border-green-500/30'}`}>
                      <div className="flex items-center gap-3">
                        {currentNode.id === 'end1' ? (
                          <AlertCircle className="text-rose-500" size={32} />
                        ) : (
                          <ShieldCheck className="text-green-500" size={32} />
                        )}
                        <h3 className="text-xl font-black text-white tracking-tight uppercase">Bài học cho chúng ta</h3>
                      </div>
                      <p className="text-indigo-100/70 font-bold leading-relaxed">
                        {currentNode.id === 'end1' 
                          ? 'Đôi khi áp lực trên mạng có thể đánh gục chúng ta. Tuy nhiên, im lặng hoặc nhượng bộ không phải lúc nào cũng là giải pháp tốt nhất. Hãy luôn nhớ rằng em có sự hỗ trợ từ gia đình và nhà trường.' 
                          : 'Việc nhờ đến sự can thiệp của cơ quan chức năng hoặc tổ chức bảo vệ là cách giải quyết an toàn và đúng đắn nhất khi đối mặt với bạo lực mạng. Em là một chiến binh dũng cảm!'}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleRestart}
                        className="flex-1 p-6 rounded-[2rem] bg-white text-indigo-900 font-black text-lg shadow-2xl hover:bg-indigo-50 transition-all flex items-center justify-center gap-3"
                      >
                        <RefreshCw size={24} strokeWidth={3} />
                        CHƠI LẠI
                      </button>
                      <button
                        onClick={() => navigate('/student')}
                        className="flex-1 p-6 rounded-[2rem] bg-indigo-500 hover:bg-indigo-600 text-white font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-3"
                      >
                        VỀ TRANG CHỦ
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}