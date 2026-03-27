import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ChevronRight, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type NodeId = 'start' | 'scene2' | 'node-phan-bac' | 'node-phot-lo' | 'end-tu-bo' | 'end-bao-canh-sat' | 'end-danh-du';

interface StoryNode {
  id: NodeId;
  title?: string;
  content: string;
  image: string;
  isEnding?: boolean;
  options?: {
    text: string;
    nextNode: NodeId;
    colorClass?: string;
  }[];
}

const storyData: Record<NodeId, StoryNode> = {
  start: {
    id: 'start',
    content: 'Linh là một nữ nhà báo đang thực hiện bài điều tra về các trang web phát sóng bóng đá không bản quyền. Trong quá trình tìm hiểu, cô phát hiện nhiều trang web này liên kết với các nền tảng cá độ trực tuyến. Những nền tảng này đã khiến nhiều người rơi vào nợ nần, dẫn đến mâu thuẫn gia đình và nhiều hệ quả xã hội nghiêm trọng.\n\nSau nhiều tuần thu thập thông tin và phỏng vấn các nạn nhân, Linh đăng tải bài viết điều tra của mình trên trang báo. Chỉ trong vài giờ, bài viết thu hút sự chú ý lớn từ cộng đồng mạng. Nhiều người ủng hộ việc phanh phui vấn đề này.\n\nTuy nhiên, bên cạnh đó cũng xuất hiện những bình luận công kích cho rằng cô đang “phá hỏng thú vui xem bóng đá” hoặc “đang cố gây chú ý”. Linh đọc các bình luận và nhận ra cuộc tranh luận đang dần trở nên căng thẳng.',
    image: 'character-default',
    options: [
      { text: 'Tiếp tục', nextNode: 'scene2', colorClass: 'bg-indigo-600 hover:bg-indigo-500' }
    ]
  },
  scene2: {
    id: 'scene2',
    title: 'Phản ứng trước các bình luận công kích',
    content: 'Sau khi bài báo được đăng, rất nhiều bình luận tiêu cực và công kích cá nhân nhắm vào Linh xuất hiện liên tiếp. Linh sẽ phải lựa chọn cách đối mặt với tình huống này.',
    image: 'character-angry',
    options: [
      { text: 'Phản bác các bình luận', nextNode: 'node-phan-bac', colorClass: 'bg-indigo-600 hover:bg-[#ff5722]' },
      { text: 'Phớt lờ các bình luận', nextNode: 'node-phot-lo', colorClass: 'bg-indigo-600 hover:bg-indigo-500' }
    ]
  },
  'node-phan-bac': {
    id: 'node-phan-bac',
    content: 'Linh quyết định phản hồi và bảo vệ bài viết của mình. Việc này khiến cuộc tranh luận trở nên sôi nổi hơn và thu hút nhiều sự chú ý.\n\nTuy nhiên, phản ứng của cô cũng khiến một người đàn ông – chủ một hệ thống cá độ trực tuyến – chú ý. Hắn bắt đầu tìm kiếm thông tin cá nhân của Linh và gửi những tin nhắn đe dọa yêu cầu cô gỡ bài.\n\nLinh phải quyết định cách xử lý các tin nhắn đe dọa.',
    image: 'character-angry',
    options: [
      { text: 'Báo cảnh sát và tìm sự hỗ trợ', nextNode: 'end-bao-canh-sat', colorClass: 'bg-indigo-600 hover:bg-indigo-500' },
      { text: 'Xóa bài viết', nextNode: 'end-tu-bo', colorClass: 'bg-indigo-600 hover:bg-[#ff5722]' }
    ]
  },
  'node-phot-lo': {
    id: 'node-phot-lo',
    content: 'Linh chọn cách không tham gia tranh luận và tiếp tục công việc.\n\nNhưng các tài khoản công kích bắt đầu chuyển sang trang cá nhân của cô. Họ đăng các bài viết bôi nhọ và chỉnh sửa hình ảnh của cô để lan truyền trên mạng.\n\nLinh phải đối mặt với việc hình ảnh cá nhân bị lan truyền trên mạng.',
    image: 'character-sad',
    options: [
      { text: 'Xóa bài viết', nextNode: 'end-tu-bo', colorClass: 'bg-indigo-600 hover:bg-[#ff5722]' },
      { text: 'Tìm kiếm sự hỗ trợ từ các tổ chức bảo vệ người dùng', nextNode: 'end-danh-du', colorClass: 'bg-indigo-600 hover:bg-indigo-500' }
    ]
  },
  'end-tu-bo': {
    id: 'end-tu-bo',
    title: 'Kết thúc 1 – Từ bỏ công việc',
    content: 'Nếu Linh chọn xóa bài viết, áp lực từ sự việc khiến cô quyết định rời khỏi tòa soạn và từ bỏ công việc báo chí.',
    image: 'character-sad',
    isEnding: true
  },
  'end-bao-canh-sat': {
    id: 'end-bao-canh-sat',
    title: 'Kết thúc 2 – Công lý được thực thi',
    content: 'Nếu Linh báo cảnh sát, cơ quan chức năng điều tra và bắt giữ người đứng sau hệ thống cá độ đã đe dọa cô. Linh tiếp tục công việc điều tra của mình.',
    image: 'character-happy',
    isEnding: true
  },
  'end-danh-du': {
    id: 'end-danh-du',
    title: 'Kết thúc 3 – Danh dự được bảo vệ',
    content: 'Nếu Linh tìm kiếm sự hỗ trợ từ các tổ chức bảo vệ người dùng, các bài đăng bôi nhọ và hình ảnh bị chỉnh sửa dần được gỡ bỏ. Linh tiếp tục làm việc và nhận được sự ủng hộ từ cộng đồng.',
    image: 'character-happy',
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
    <div className="min-h-screen bg-[#1b193f] relative flex items-center justify-center p-6 lg:p-12 font-sans overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-950 to-[#1b193f] z-0" />
      
      {/* HUD - Header controls */}
      <div className="absolute top-6 left-6 z-40">
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-md border border-white/20 shadow-lg"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentNode.id}
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.02, y: -10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-6xl flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16 z-10"
        >
          {/* Left: Image Box */}
          <div className="w-full lg:w-5/12 flex-shrink-0 flex items-center justify-center">
            <div className="w-full aspect-square max-w-md bg-white rounded-[2.5rem] lg:rounded-[3rem] p-8 lg:p-12 flex items-center justify-center shadow-2xl relative overflow-hidden">
              <img 
                src={`/${currentNode.image}.png`} 
                alt="Story Character" 
                className="w-full h-full object-contain filter drop-shadow-xl z-10"
              />
            </div>
          </div>

          {/* Right: Content & Choices box */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center py-6">
            <div className="mb-10 text-white">
              {currentNode.title && (
                <h2 className="text-2xl lg:text-3xl font-black mb-6 text-white leading-tight">
                  {currentNode.title}
                </h2>
              )}
              <div className="space-y-4">
                {currentNode.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-lg lg:text-xl text-indigo-100/90 font-medium leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-4 w-full">
              {!currentNode.isEnding ? (
                currentNode.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option.nextNode)}
                    className={`
                      w-full p-6 lg:p-7 rounded-[2rem] font-black text-xl text-white shadow-xl 
                      flex items-center justify-between transition-all transform hover:scale-[1.02] active:scale-95
                      ${option.colorClass} border border-white/10
                    `}
                  >
                    <span className="text-left pr-4">{option.text}</span>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <ChevronRight size={24} />
                    </div>
                  </button>
                ))
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button
                    onClick={handleRestart}
                    className="flex-1 p-6 rounded-[2rem] bg-indigo-500 hover:bg-indigo-600 border border-white/20 text-white font-black text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-95"
                  >
                    <RefreshCw size={24} strokeWidth={3} />
                    CHƠI LẠI
                  </button>
                  <button
                    onClick={() => navigate('/student')}
                    className="flex-1 p-6 rounded-[2rem] bg-white text-indigo-900 font-black text-lg shadow-xl hover:shadow-2xl hover:bg-indigo-50 transition-all flex items-center justify-center transform hover:scale-[1.02] active:scale-95"
                  >
                    VỀ TRANG CHỦ
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}