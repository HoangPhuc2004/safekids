export type VideoNodeId = string;

export interface VideoDecisionOption {
  text: string;
  nextNodeId: VideoNodeId;
  colorClass?: string;
  icon?: React.ReactNode;
}

export interface VideoStoryNode {
  id: VideoNodeId;
  title: string;
  subtitle?: string;
  description: string;
  videoUrl: string; // Đường dẫn đến file video (vd: '/videos/scene1.mp4')
  thumbnailUrl?: string; // Ảnh thumbnail hiển thị trước khi video chạy
  isEnding?: boolean;
  options?: VideoDecisionOption[];
}

export const videoStoryDatabase: Record<VideoNodeId, VideoStoryNode> = {
  start: {
    id: 'start',
    title: 'TÌNH HUỐNG 1',
    subtitle: 'Bắt đầu câu chuyện',
    description: 'Đoạn video giới thiệu hoàn cảnh nhân vật. Câu chuyện về một tình huống khó xử trên mạng xã hội.',
    videoUrl: '/videos/scene-start.mp4', // User sẽ bỏ file video vào folder public/videos/
    thumbnailUrl: '/videos/thumbnails/start-thumb.jpg',
    options: [
      { text: 'Lựa chọn A: Quyết định đối mặt', nextNodeId: 'node2A', colorClass: 'bg-orange-600 hover:bg-orange-700' },
      { text: 'Lựa chọn B: Lờ đi', nextNodeId: 'node2B', colorClass: 'bg-indigo-600 hover:bg-indigo-700' }
    ]
  },
  node2A: {
    id: 'node2A',
    title: 'TÌNH HUỐNG 2A',
    subtitle: 'Hậu quả của sự đối đầu',
    description: 'Video diễn tiến khi chọn đối mặt. Căng thẳng leo thang.',
    videoUrl: '/videos/scene-2a.mp4',
    options: [
      { text: 'Tìm sự giúp đỡ từ người lớn', nextNodeId: 'end2', colorClass: 'bg-green-600 hover:bg-green-700' },
      { text: 'Tự mình giải quyết bằng bạo lực', nextNodeId: 'end1', colorClass: 'bg-rose-600 hover:bg-rose-700' }
    ]
  },
  node2B: {
    id: 'node2B',
    title: 'TÌNH HUỐNG 2B',
    subtitle: 'Khi rắc rối không buông tha',
    description: 'Video diễn tiến khi lờ đi. Rắc rối bắt đầu lan rộng ra ngoài đời thực.',
    videoUrl: '/videos/scene-2b.mp4',
    options: [
      { text: 'Tiếp tục chịu đựng', nextNodeId: 'end1', colorClass: 'bg-rose-600 hover:bg-rose-700' },
      { text: 'Nhờ cơ quan chức năng can thiệp', nextNodeId: 'end3', colorClass: 'bg-pink-600 hover:bg-pink-700' }
    ]
  },
  end1: {
    id: 'end1',
    title: 'KẾT THÚC 1',
    subtitle: 'Hậu quả đáng buồn',
    description: 'Video kết thúc khi không có sự lựa chọn đúng đắn. Một bài học sâu sắc cần rút ra.',
    videoUrl: '/videos/ending-bad.mp4',
    isEnding: true
  },
  end2: {
    id: 'end2',
    title: 'KẾT THÚC 2',
    subtitle: 'Sự trợ giúp kịp thời',
    description: 'Video kết thúc tốt đẹp. Nhờ người thân/giáo viên giúp đỡ là quyết định sáng suốt.',
    videoUrl: '/videos/ending-good.mp4',
    isEnding: true
  },
  end3: {
    id: 'end3',
    title: 'KẾT THÚC 3',
    subtitle: 'Pháp luật bảo vệ',
    description: 'Video kết thúc an toàn. Sử dụng đúng chức năng báo cáo và công cụ pháp luật.',
    videoUrl: '/videos/ending-safe.mp4',
    isEnding: true
  }
};
