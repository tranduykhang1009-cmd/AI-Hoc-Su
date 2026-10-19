export const BATTLES_DATA = {
  'rach-gam': {
    id: 'rach-gam',
    title: 'Thủy Chiến Rạch Gầm – Xoài Mút (1785)',
    subtitle: 'Nghệ thuật nhử địch và giáp công bao vây trên sông Tiền',
    center: [10.335, 106.310],
    zoom: 12,
    time: 'Đêm 19 rạng sáng 20/01/1785',
    modernLocation: 'Huyện Châu Thành & Thành phố Mỹ Tho, tỉnh Tiền Giang (Khu Di tích Quốc gia Chiến thắng Rạch Gầm – Xoài Mút tại xã Kim Sơn)',
    gpsCoordinates: '10°20\'06"B 106°18\'36"Đ (Sông Tiền đoạn Rạch Gầm – Xoài Mút)',
    commander: 'Long Nhương Tướng Quân Nguyễn Huệ',
    enemyCommander: 'Chiêu Tăng & Chiêu Sương (Xiêm La), Nguyễn Ánh',
    enemyForce: 'Khoảng 5 vạn quân (2 vạn thủy binh, 3 vạn bộ binh) cùng 300 thuyền chiến',
    ourForce: 'Khoảng 2 vạn quân Tây Sơn cùng hạm đội thuyền chiến hỏa hổ cơ động',
    summary: 'Nguyễn Huệ không đánh trực diện mà nghiên cứu quy luật dòng chảy con nước triều sông Tiền, bố trí bẫy phục kích dài khoảng 6–7km từ Rạch Gầm đến Xoài Mút. Khi đoàn thuyền giặc lọt vào lòng sông lúc triều rút, hai cánh thủy quân Tây Sơn từ các nhánh rạch lao ra khóa chặt hai đầu, phối hợp đại bác và hỏa hổ từ cù lao Thới Sơn thiêu rụi hạm đội giặc trong một đêm.',
    forcesComparison: {
      ourForces: {
        name: 'Nghĩa Quân Tây Sơn',
        count: 'Khoảng 2 vạn quân',
        percent: 28,
        color: '#10B981',
        details: 'Chiến thuyền hỏa hổ cơ động, đại bác dã chiến, quân thủy bộ tinh nhuệ'
      },
      enemyForces: {
        name: 'Liên Quân Xiêm La & Nguyễn Ánh',
        count: 'Khoảng 5 vạn quân (2 vạn thủy, 3 vạn bộ)',
        percent: 72,
        color: '#EF4444',
        details: 'Hơn 300 thuyền chiến hỏa khí hạng nặng'
      },
      ratioNote: 'Tương quan 1 chọi gần 3 (Lấy ít địch nhiều, mưu sâu chôn vùi 5 vạn giặc trong một đêm)'
    },
    funFacts: [
      {
        icon: 'Waves',
        title: 'Lợi dụng con nước triều',
        desc: 'Nguyễn Huệ tính toán chính xác chu kỳ triều rút sông Tiền để nhử địch vào cạm bẫy hẹp.'
      },
      {
        icon: 'Flame',
        title: 'Ống phóng Hỏa Hổ uy lực',
        desc: 'Hàng trăm ống hỏa hổ thiêu rụi thuyền Xiêm khiến quân giặc nhảy xuống sông tán loạn.'
      },
      {
        icon: 'Swords',
        title: 'Thắng lợi trong một đêm',
        desc: 'Toàn bộ 300 thuyền chiến và gần 5 vạn quân Xiêm bị xóa sổ chỉ trong một đêm rạng sáng 20/01/1785.'
      }
    ],
    phases: [
      {
        label: 'Nghi binh nhử địch',
        phase: 'Giai đoạn 1: Nghi binh nhử địch',
        tag: 'Khởi đầu trận đánh',
        icon: '⚔️',
        center: [10.355, 106.275],
        zoom: 13,
        modernLocation: 'Khúc sông Tiền gần xã Kim Sơn & Vĩnh Kim, Huyện Châu Thành, tỉnh Tiền Giang',
        desc: 'Cho thuyền nhỏ ra khiêu chiến rồi giả thua rút lui theo dòng chảy, kích động tướng Xiêm Chiêu Tăng dốc toàn lực hạm đội đuổi theo vào đúng đoạn sông mai phục.',
        miniQuiz: {
          question: 'Tại sao Nguyễn Huệ lại cho thuyền nhỏ ra khiêu chiến rồi vờ rút lui?',
          options: ['Do quân ít sợ hãi', 'Nghi binh nhử địch vào bẫy sông Rạch Gầm', 'Đợi viện binh từ Quy Nhơn', 'Để trinh sát ban ngày'],
          correct: 1,
          explain: 'Kế nghi binh giả thua khiến tướng Chiêu Tăng khinh địch, thúc toàn bộ 300 thuyền chiến tiến vào lòng sông mai phục.'
        }
      },
      {
        label: 'Khóa gọng kìm',
        phase: 'Giai đoạn 2: Khóa chặt thế gọng kìm',
        tag: 'Bước ngoặt then chốt',
        icon: '🔒',
        center: [10.335, 106.310],
        zoom: 13,
        modernLocation: 'Cửa sông Rạch Gầm (xã Kim Sơn) & rạch Xoài Mút (xã An Khánh, Huyện Châu Thành, Tiền Giang)',
        desc: 'Đúng lúc nước ròng (thủy triều rút nhanh), hai đạo thủy binh Tây Sơn từ rạch Rạch Gầm và rạch Xoài Mút đồng loạt xông ra bịt kín lối tiến lẫn lối thoái của giặc.',
        miniQuiz: {
          question: 'Yếu tố tự nhiên nào quyết định thời điểm phát lệnh công kích của quân Tây Sơn?',
          options: ['Gió mùa đông bắc', 'Trời đổ mưa rào', 'Nước ròng (thủy triều rút nhanh)', 'Sương mù dày đặc'],
          correct: 2,
          explain: 'Khi nước ròng rút nhanh, thuyền chiến lớn của giặc bị cản trở dòng chảy và mắc cạn, tạo thời cơ gọng kìm khép lại.'
        }
      },
      {
        label: 'Pháo hỏa hủy diệt',
        phase: 'Giai đoạn 3: Pháo hỏa hủy diệt',
        tag: 'Quyết chiến toàn thắng',
        icon: '🔥',
        center: [10.338, 106.320],
        zoom: 13.5,
        modernLocation: 'Cù lao Thới Sơn (xã Thới Sơn, Thành phố Mỹ Tho, tỉnh Tiền Giang) & cồn Bà Kiểu',
        desc: 'Từ cù lao Thới Sơn và hai bờ cây cối rậm rạp, pháo binh dã chiến và ống hỏa hổ bắn xối xả chia cắt đội hình, đốt cháy và đánh chìm toàn bộ 300 chiến thuyền giặc.',
        miniQuiz: {
          question: 'Lực lượng pháo binh và hỏa hổ Tây Sơn được bố trí mai phục ở đâu?',
          options: ['Cù lao Thới Sơn và hai bờ sông', 'Trên núi Bà Đen', 'Sau thành Mỹ Tho', 'Thả trôi theo bè lửa'],
          correct: 0,
          explain: 'Địa hình cù lao Thới Sơn rậm rạp giữa lòng sông Tiền là trận địa pháo bí mật xả đạn chia cắt đội hình thuyền giặc.'
        }
      }
    ],
    tactics: [
      { 
        id: 1,
        label: 'Nghi binh nhử địch',
        phase: 'Giai đoạn 1: Nghi binh nhử địch', 
        tag: 'Khởi đầu trận đánh',
        icon: '⚔️',
        center: [10.355, 106.275],
        zoom: 13,
        modernLocation: 'Khúc sông Tiền gần xã Kim Sơn & Vĩnh Kim, Huyện Châu Thành, tỉnh Tiền Giang',
        desc: 'Cho thuyền nhỏ ra khiêu chiến rồi giả thua rút lui theo dòng chảy, kích động tướng Xiêm Chiêu Tăng dốc toàn lực hạm đội đuổi theo vào đúng đoạn sông mai phục.',
        miniQuiz: {
          question: 'Tại sao Nguyễn Huệ lại cho thuyền nhỏ ra khiêu chiến rồi vờ rút lui?',
          options: ['Do quân ít sợ hãi', 'Nghi binh nhử địch vào bẫy sông Rạch Gầm', 'Đợi viện binh từ Quy Nhơn', 'Để trinh sát ban ngày'],
          correct: 1,
          explain: 'Kế nghi binh giả thua khiến tướng Chiêu Tăng khinh địch, thúc toàn bộ 300 thuyền chiến tiến vào lòng sông mai phục.'
        }
      },
      { 
        id: 2,
        label: 'Khóa gọng kìm',
        phase: 'Giai đoạn 2: Khóa chặt thế gọng kìm', 
        tag: 'Bước ngoặt then chốt',
        icon: '🔒',
        center: [10.335, 106.310],
        zoom: 13,
        modernLocation: 'Cửa sông Rạch Gầm (xã Kim Sơn) & rạch Xoài Mút (xã An Khánh, Huyện Châu Thành, Tiền Giang)',
        desc: 'Đúng lúc nước ròng (thủy triều rút nhanh), hai đạo thủy binh Tây Sơn từ rạch Rạch Gầm và rạch Xoài Mút đồng loạt xông ra bịt kín lối tiến lẫn lối thoái của giặc.',
        miniQuiz: {
          question: 'Yếu tố tự nhiên nào quyết định thời điểm phát lệnh công kích của quân Tây Sơn?',
          options: ['Gió mùa đông bắc', 'Trời đổ mưa rào', 'Nước ròng (thủy triều rút nhanh)', 'Sương mù dày đặc'],
          correct: 2,
          explain: 'Khi nước ròng rút nhanh, thuyền chiến lớn của giặc bị cản trở dòng chảy và mắc cạn, tạo thời cơ gọng kìm khép lại.'
        }
      },
      { 
        id: 3,
        label: 'Pháo hỏa hủy diệt',
        phase: 'Giai đoạn 3: Pháo hỏa hủy diệt', 
        tag: 'Quyết chiến toàn thắng',
        icon: '🔥',
        center: [10.338, 106.320],
        zoom: 13.5,
        modernLocation: 'Cù lao Thới Sơn (xã Thới Sơn, Thành phố Mỹ Tho, tỉnh Tiền Giang) & cồn Bà Kiểu',
        desc: 'Từ cù lao Thới Sơn và hai bờ cây cối rậm rạp, pháo binh dã chiến và ống hỏa hổ bắn xối xả chia cắt đội hình, đốt cháy và đánh chìm toàn bộ 300 chiến thuyền giặc.',
        miniQuiz: {
          question: 'Lực lượng pháo binh và hỏa hổ Tây Sơn được bố trí mai phục ở đâu?',
          options: ['Cù lao Thới Sơn và hai bờ sông', 'Trên núi Bà Đen', 'Sau thành Mỹ Tho', 'Thả trôi theo bè lửa'],
          correct: 0,
          explain: 'Địa hình cù lao Thới Sơn rậm rạp giữa lòng sông Tiền là trận địa pháo bí mật xả đạn chia cắt đội hình thuyền giặc.'
        }
      }
    ],
    // Vùng chiến lược tổng quát (Operational Areas)
    zones: [
      {
        id: 'zone-ambush-river',
        title: 'Vùng sông Tiền phục kích (Rạch Gầm – Xoài Mút)',
        type: 'battlefield',
        color: '#D4AF37',
        coords: [
          [10.355, 106.270],
          [10.345, 106.295],
          [10.320, 106.340],
          [10.310, 106.330],
          [10.335, 106.280],
          [10.355, 106.270]
        ],
        modernLocation: 'Đoạn sông Tiền dài khoảng 7km chảy qua xã Kim Sơn, huyện Châu Thành và TP. Mỹ Tho, tỉnh Tiền Giang',
        desc: 'Đoạn sông dài khoảng 7km, lòng sông rộng nhưng có nhiều cù lao chia cắt dòng chảy, là lòng chảo mai phục tiêu diệt chiến thuyền giặc.'
      },
      {
        id: 'zone-thoi-son',
        title: 'Khu vực cù lao Thới Sơn (Trận địa hỏa lực mai phục)',
        type: 'friendly',
        color: '#10B981',
        coords: [
          [10.345, 106.305],
          [10.348, 106.330],
          [10.330, 106.335],
          [10.328, 106.310],
          [10.345, 106.305]
        ],
        modernLocation: 'Cù lao Thới Sơn, xã Thới Sơn, thành phố Mỹ Tho, tỉnh Tiền Giang',
        desc: 'Cù lao rậm rạp giữa sông nơi bố trí bí mật bộ binh tinh nhuệ, đại bác dã chiến và súng phun lửa hỏa hổ ẩn mình chờ lệnh.'
      }
    ],
    // Các hướng tiến công và chuyển quân (Directional Flow Lines)
    flows: [
      {
        id: 'flow-enemy-advance',
        title: 'Hướng hạm đội thuyền giặc Xiêm tiến vào bẫy',
        type: 'enemy',
        color: '#EF4444',
        dashArray: '8, 8',
        points: [
          [10.360, 106.260],
          [10.350, 106.280],
          [10.338, 106.305],
          [10.325, 106.325]
        ],
        modernLocation: 'Xuôi dòng sông Tiền từ huyện Cai Lậy xuống huyện Châu Thành, tỉnh Tiền Giang',
        desc: 'Quân Xiêm hăm hở đuổi theo thuyền nghi binh của Tây Sơn xuôi theo dòng chảy sông Tiền.'
      },
      {
        id: 'flow-ally-lock-north',
        title: 'Cánh thủy quân Tây Sơn khóa đầu thượng lưu (Rạch Gầm)',
        type: 'friendly',
        color: '#F59E0B',
        points: [
          [10.370, 106.280],
          [10.355, 106.285],
          [10.348, 106.290]
        ],
        modernLocation: 'Cửa sông rạch Rạch Gầm, xã Kim Sơn, huyện Châu Thành, tỉnh Tiền Giang',
        desc: 'Thủy quân Tây Sơn từ rạch Rạch Gầm lao ra cắt đứt đường rút lui phía trên của quân địch.'
      },
      {
        id: 'flow-ally-lock-south',
        title: 'Cánh thủy quân Tây Sơn khóa đuôi hạ lưu (Xoài Mút)',
        type: 'friendly',
        color: '#F59E0B',
        points: [
          [10.315, 106.350],
          [10.322, 106.338],
          [10.328, 106.325]
        ],
        modernLocation: 'Cửa rạch Xoài Mút (xã An Khánh) và căn cứ Mỹ Tho, tỉnh Tiền Giang',
        desc: 'Cánh quân thứ hai từ rạch Xoài Mút và Mỹ Tho khóa kín cửa dưới, hoàn thành thế gọng kìm bất khả kháng.'
      }
    ]
  },

  'ngoc-hoi-dong-da': {
    id: 'ngoc-hoi-dong-da',
    title: 'Đại Phá Quân Thanh – Ngọc Hồi Đống Đa (1789)',
    subtitle: 'Nghệ thuật hành quân thần tốc và 5 mũi tiến công táo bạo',
    center: [20.940, 105.840],
    zoom: 11,
    time: 'Đêm 30 tháng Chạp năm Mậu Thân đến mùng 5 Tết Kỷ Dậu (1789)',
    modernLocation: 'Thủ đô Hà Nội (Quận Đống Đa, Huyện Thanh Trì, Huyện Thường Tín) & Tỉnh Ninh Bình (Thành phố Tam Điệp)',
    gpsCoordinates: '20°56\'24"B 105°50\'24"Đ (Trận địa Ngọc Hồi – Đống Đa)',
    commander: 'Hoàng đế Quang Trung – Nguyễn Huệ',
    enemyCommander: 'Tổng đốc Tôn Sĩ Nghị, Sầm Nghi Đống, Hứa Thế Hanh',
    enemyForce: '29 vạn quân Mãn Thanh đóng tại các cứ điểm quanh Thăng Long',
    ourForce: 'Khoảng 10 vạn quân Tây Sơn cùng hàng trăm thớt voi chiến và ống hỏa hổ',
    summary: 'Từ phòng tuyến Tam Điệp, vua Quang Trung chia quân làm 5 đạo tiến công đồng loạt. Mũi chủ lực do nhà vua chỉ huy dùng voi chiến và khiên rơm ướt phá tan đồn thép Ngọc Hồi. Cùng lúc, mũi vu hồi của Đô đốc Long luồn sâu đánh úp đồn Đống Đa khiến giặc tan vỡ hàng loạt. Trưa mùng 5 Tết, đại quân tiến vào Thăng Long trước sự hoảng loạn tháo chạy của Tôn Sĩ Nghị.',
    forcesComparison: {
      ourForces: {
        name: 'Đại Quân Tây Sơn',
        count: 'Khoảng 10 vạn quân',
        percent: 25,
        color: '#10B981',
        details: 'Hơn 100 thớt voi chiến mang hỏa hổ, dũng sĩ mang khiên rơm ướt, bộ binh hành quân thần tốc'
      },
      enemyForces: {
        name: 'Quân Xâm Lược Mãn Thanh',
        count: '29 vạn quân Mãn Thanh',
        percent: 75,
        color: '#EF4444',
        details: 'Kỵ binh Bát Kỳ thiện chiến, hỏa khí, công sự đồn lũy kiên cố tại Ngọc Hồi và Thăng Long'
      },
      ratioNote: 'Tương quan 1 chọi gần 3 (10 vạn quân thần tốc đè bẹp 29 vạn giặc trong 5 ngày Tết Kỷ Dậu)'
    },
    funFacts: [
      {
        icon: 'Sparkles',
        title: 'Ăn Tết sớm 30 Chạp',
        desc: 'Quang Trung khao quân ăn Tết trước ở Tam Điệp, hẹn mùng 7 Tết sẽ vào Thăng Long ăn mừng khải hoàn.'
      },
      {
        icon: 'Shield',
        title: 'Khiên bọc rơm ướt',
        desc: 'Cứ 20 dũng sĩ khiêng ván ghép bọc rơm ướt chắn hỏa khí súng đạn mở đường cho voi chiến công phá đồn.'
      },
      {
        icon: 'Flame',
        title: 'Hành quân thần tốc phi thường',
        desc: 'Đại quân đi bộ từ Phú Xuân ra Thăng Long hơn 600km chỉ trong vài ngày bằng cách cáng luân phiên.'
      }
    ],
    phases: [
      {
        label: 'Tam Điệp & Ăn Tết sớm',
        phase: 'Giai đoạn 1: Bàn đạp Tam Điệp & Ăn Tết sớm',
        tag: 'Xuất quân thần tốc',
        icon: '🏕️',
        center: [20.140, 105.930],
        zoom: 11.5,
        modernLocation: 'Dãy núi đèo Ba Dội, Thành phố Tam Điệp, tỉnh Ninh Bình & vùng Biện Sơn, Thị xã Nghi Sơn, tỉnh Thanh Hóa',
        desc: 'Tập kết toàn quân tại phòng tuyến Tam Điệp – Biện Sơn, khao quân ăn Tết trước vào ngày 30 tháng Chạp, hẹn mùng 7 Tết sẽ vào Thăng Long ăn mừng khải hoàn.',
        miniQuiz: {
          question: 'Vua Quang Trung khao quân ăn Tết trước ở đâu và hẹn khi nào vào Thăng Long?',
          options: ['Ở Nghệ An, hẹn rằm tháng Giêng', 'Ở Tam Điệp, hẹn mùng 7 Tết', 'Ở Thanh Hóa, hẹn mùng 1 Tết', 'Ở Phú Xuân, hẹn mùng 10'],
          correct: 1,
          explain: 'Vua khao quân ăn Tết sớm ở Tam Điệp – Biện Sơn ngày 30 Chạp, khẳng định chắc nịch sẽ ăn Tết chính thức tại Thăng Long vào mùng 7 Tết.'
        }
      },
      {
        label: 'Công phá Ngọc Hồi',
        phase: 'Giai đoạn 2: Hạ đồn Hà Hồi & Công phá Ngọc Hồi',
        tag: 'Đột phá cứ điểm thép',
        icon: '🐘',
        center: [20.910, 105.845],
        zoom: 12.5,
        modernLocation: 'Đồn Hà Hồi (xã Hà Hồi, Huyện Thường Tín) & cứ điểm đồn Ngọc Hồi (xã Ngọc Hồi, Huyện Thanh Trì, TP. Hà Nội)',
        desc: 'Đêm mùng 3 vây đồn Hà Hồi bằng cờ lệnh tiếng hò reo, bắt sống toàn bộ giặc. Rạng sáng mùng 5, voi chiến mang hỏa hổ cùng dũng sĩ mang khiên bọc rơm ướt xông lên bẻ gãy đồn thép Ngọc Hồi.',
        miniQuiz: {
          question: 'Chiến thuật độc đáo nào giúp nghĩa quân Tây Sơn vô hiệu hóa hỏa lực súng đạn tại đồn Ngọc Hồi?',
          options: ['Đào hào ngầm', 'Dùng khiên bện rơm ướt chắn đạn', 'Chờ sương mù tan', 'Bắn tên lửa ban đêm'],
          correct: 1,
          explain: 'Dũng sĩ Tây Sơn ghép ván bện rơm dấp nước bên ngoài che chắn hỏa tiễn và súng đạn của quân Thanh, tạo đường cho voi chiến xông lên.'
        }
      },
      {
        label: 'Đánh úp Đống Đa',
        phase: 'Giai đoạn 3: Đánh úp Đống Đa & Giải phóng Thăng Long',
        tag: 'Khải hoàn Thăng Long',
        icon: '⚡',
        center: [21.015, 105.830],
        zoom: 12.5,
        modernLocation: 'Di tích Quốc gia đặc biệt Gò Đống Đa & Khương Thượng, phường Quang Trung, quận Đống Đa, TP. Hà Nội',
        desc: 'Đạo quân Đô đốc Long phối hợp nhân dân luồn sâu đánh bất ngờ vào đồn Khương Thượng – Đống Đa khiến Sầm Nghi Đống tự vẫn. Tôn Sĩ Nghị bỏ chạy đứt cầu phao sông Hồng.',
        miniQuiz: {
          question: 'Đạo quân của vị tướng nào đã luồn sâu đánh bất ngờ vào đồn Khương Thượng – Đống Đa?',
          options: ['Đô đốc Long (Đặng Tiến Đông)', 'Đô đốc Bảo', 'Ngô Thì Nhậm', 'Nguyễn Nhạc'],
          correct: 0,
          explain: 'Đạo quân Đô đốc Long phối hợp cùng nhân dân địa phương đánh bất ngờ lúc rạng sáng, khiến tướng giặc Sầm Nghi Đống phải thắt cổ tự vẫn.'
        }
      }
    ],
    tactics: [
      { 
        id: 1,
        label: 'Tam Điệp & Ăn Tết sớm',
        phase: 'Giai đoạn 1: Bàn đạp Tam Điệp & Ăn Tết sớm', 
        tag: 'Xuất quân thần tốc',
        icon: '🏕️',
        center: [20.140, 105.930],
        zoom: 11.5,
        modernLocation: 'Dãy núi đèo Ba Dội, Thành phố Tam Điệp, tỉnh Ninh Bình & vùng Biện Sơn, Thị xã Nghi Sơn, tỉnh Thanh Hóa',
        desc: 'Tập kết toàn quân tại phòng tuyến Tam Điệp – Biện Sơn, khao quân ăn Tết trước vào ngày 30 tháng Chạp, hẹn mùng 7 Tết sẽ vào Thăng Long ăn mừng khải hoàn.',
        miniQuiz: {
          question: 'Vua Quang Trung khao quân ăn Tết trước ở đâu và hẹn khi nào vào Thăng Long?',
          options: ['Ở Nghệ An, hẹn rằm tháng Giêng', 'Ở Tam Điệp, hẹn mùng 7 Tết', 'Ở Thanh Hóa, hẹn mùng 1 Tết', 'Ở Phú Xuân, hẹn mùng 10'],
          correct: 1,
          explain: 'Vua khao quân ăn Tết sớm ở Tam Điệp – Biện Sơn ngày 30 Chạp, khẳng định chắc nịch sẽ ăn Tết chính thức tại Thăng Long vào mùng 7 Tết.'
        }
      },
      { 
        id: 2,
        label: 'Công phá Ngọc Hồi',
        phase: 'Giai đoạn 2: Hạ đồn Hà Hồi & Công phá Ngọc Hồi', 
        tag: 'Đột phá cứ điểm thép',
        icon: '🐘',
        center: [20.910, 105.845],
        zoom: 12.5,
        modernLocation: 'Đồn Hà Hồi (xã Hà Hồi, Huyện Thường Tín) & cứ điểm đồn Ngọc Hồi (xã Ngọc Hồi, Huyện Thanh Trì, TP. Hà Nội)',
        desc: 'Đêm mùng 3 vây đồn Hà Hồi bằng cờ lệnh tiếng hò reo, bắt sống toàn bộ giặc. Rạng sáng mùng 5, voi chiến mang hỏa hổ cùng dũng sĩ mang khiên bọc rơm ướt xông lên bẻ gãy đồn thép Ngọc Hồi.',
        miniQuiz: {
          question: 'Chiến thuật độc đáo nào giúp nghĩa quân Tây Sơn vô hiệu hóa hỏa lực súng đạn tại đồn Ngọc Hồi?',
          options: ['Đào hào ngầm', 'Dùng khiên bện rơm ướt chắn đạn', 'Chờ sương mù tan', 'Bắn tên lửa ban đêm'],
          correct: 1,
          explain: 'Dũng sĩ Tây Sơn ghép ván bện rơm dấp nước bên ngoài che chắn hỏa tiễn và súng đạn của quân Thanh, tạo đường cho voi chiến xông lên.'
        }
      },
      { 
        id: 3,
        label: 'Đánh úp Đống Đa',
        phase: 'Giai đoạn 3: Đánh úp Đống Đa & Giải phóng Thăng Long', 
        tag: 'Khải hoàn Thăng Long',
        icon: '⚡',
        center: [21.015, 105.830],
        zoom: 12.5,
        modernLocation: 'Di tích Quốc gia đặc biệt Gò Đống Đa & Khương Thượng, phường Quang Trung, quận Đống Đa, TP. Hà Nội',
        desc: 'Đạo quân Đô đốc Long phối hợp nhân dân luồn sâu đánh bất ngờ vào đồn Khương Thượng – Đống Đa khiến Sầm Nghi Đống tự vẫn. Tôn Sĩ Nghị bỏ chạy đứt cầu phao sông Hồng.',
        miniQuiz: {
          question: 'Đạo quân của vị tướng nào đã luồn sâu đánh bất ngờ vào đồn Khương Thượng – Đống Đa?',
          options: ['Đô đốc Long (Đặng Tiến Đông)', 'Đô đốc Bảo', 'Ngô Thì Nhậm', 'Nguyễn Nhạc'],
          correct: 0,
          explain: 'Đạo quân Đô đốc Long phối hợp cùng nhân dân địa phương đánh bất ngờ lúc rạng sáng, khiến tướng giặc Sầm Nghi Đống phải thắt cổ tự vẫn.'
        }
      }
    ],
    // Vùng chiến lược tổng quát
    zones: [
      {
        id: 'zone-tam-diep',
        title: 'Khu vực phòng tuyến Tam Điệp – Biện Sơn',
        type: 'friendly',
        color: '#10B981',
        coords: [
          [20.120, 105.880],
          [20.180, 105.950],
          [20.150, 106.020],
          [20.080, 105.920],
          [20.120, 105.880]
        ],
        modernLocation: 'Thành phố Tam Điệp, tỉnh Ninh Bình và thị xã Nghi Sơn, tỉnh Thanh Hóa',
        desc: 'Phòng tuyến hiểm trở nơi hội tụ đại quân thủy bộ Tây Sơn, khao quân ăn Tết sớm trước ngày xuất quân thần tốc.'
      },
      {
        id: 'zone-ngoc-hoi-fortress',
        title: 'Cụm cứ điểm phòng ngự Ngọc Hồi – Văn Điển',
        type: 'enemy',
        color: '#EF4444',
        coords: [
          [20.910, 105.830],
          [20.950, 105.860],
          [20.930, 105.880],
          [20.890, 105.840],
          [20.910, 105.830]
        ],
        modernLocation: 'Xã Ngọc Hồi & xã Văn Điển, huyện Thanh Trì, TP. Hà Nội (dọc tuyến Quốc lộ 1A ngày nay)',
        desc: 'Cứ điểm kiên cố nhất của quân Thanh án ngữ cửa ngõ phía Nam Thăng Long, có bãi chông ngầm và hỏa lực mạnh.'
      },
      {
        id: 'zone-thang-long',
        title: 'Khu vực kinh thành Thăng Long & Cầu phao sông Hồng',
        type: 'battlefield',
        color: '#D4AF37',
        coords: [
          [21.000, 105.820],
          [21.050, 105.840],
          [21.040, 105.880],
          [20.990, 105.850],
          [21.000, 105.820]
        ],
        modernLocation: 'Khu vực các quận Đống Đa, Ba Đình, Hoàn Kiếm và đoạn cầu Long Biên qua sông Hồng, TP. Hà Nội',
        desc: 'Trung tâm đầu não của Tôn Sĩ Nghị và khu vực cầu phao bị đứt khi quân Thanh chen chúc tháo chạy.'
      }
    ],
    // Các hướng tiến công và chuyển quân
    flows: [
      {
        id: 'flow-main-advance',
        title: 'Mũi tiến công chủ lực của vua Quang Trung',
        type: 'friendly',
        color: '#F59E0B',
        points: [
          [20.200, 105.900],
          [20.550, 105.880],
          [20.880, 105.850], // Hà Hồi
          [20.935, 105.845]  // Ngọc Hồi
        ],
        modernLocation: 'Dọc tuyến Quốc lộ 1A từ TP. Tam Điệp (Ninh Bình) qua Phủ Lý (Hà Nam), Thường Tín lên Thanh Trì (Hà Nội)',
        desc: 'Đạo quân chủ lực do đích thân vua Quang Trung cưỡi voi đốc chiến, phá đồn Hà Hồi rồi đè bẹp cứ điểm Ngọc Hồi.'
      },
      {
        id: 'flow-flank-dong-da',
        title: 'Mũi vu hồi của Đô đốc Long tập kích Đống Đa',
        type: 'friendly',
        color: '#10B981',
        dashArray: '6, 6',
        points: [
          [20.600, 105.750],
          [20.850, 105.770],
          [21.010, 105.825]  // Khương Thượng - Đống Đa
        ],
        modernLocation: 'Từ Ứng Hòa, Chương Mỹ luồn qua Thanh Oai tiến vào Khương Thượng, quận Đống Đa (Hà Nội)',
        desc: 'Đạo quân bí mật vòng qua sườn phía Tây, bất ngờ đánh úp đồn Khương Thượng – Đống Đa làm sụp đổ toàn bộ cánh quân Thanh.'
      },
      {
        id: 'flow-enemy-retreat',
        title: 'Hướng tháo chạy hỗn loạn của Tôn Sĩ Nghị qua sông Hồng',
        type: 'enemy',
        color: '#EF4444',
        dashArray: '6, 6',
        points: [
          [21.035, 105.850],
          [21.060, 105.870],
          [21.150, 105.950]
        ],
        modernLocation: 'Vượt sông Hồng qua cầu phao (nay gần khu vực cầu Long Biên / Chương Dương, Hoàn Kiếm, Hà Nội)',
        desc: 'Tôn Sĩ Nghị cùng tàn quân hoảng sợ vượt cầu phao sông Nhị chạy thục mạng về phương Bắc.'
      }
    ]
  },

  'phu-xuan-hue': {
    id: 'phu-xuan-hue',
    title: 'Kinh Đô Phú Xuân – Núi Bân Lên Ngôi & Xuất Quân (1786 – 1788)',
    subtitle: 'Hạ thành Phú Xuân, lập đàn Nam Giao đăng quang Hoàng đế & tiến quân thần tốc ra Bắc',
    center: [16.442, 107.585],
    zoom: 12,
    time: 'Tháng 6/1786 (Hạ thành Phú Xuân) & 22/12/1788 (Lên ngôi Hoàng đế)',
    modernLocation: 'Thành phố Huế (Thành phố trực thuộc Trung ương) — Quần thể Di tích Cố đô Huế & Di tích Lịch sử Núi Bân (phường An Tây, TP. Huế)',
    gpsCoordinates: '16°26\'18"B 107°35\'30"Đ (Khu Di tích Núi Bân, TP. Huế)',
    commander: 'Bắc Bình Vương Nguyễn Huệ — Hoàng đế Quang Trung',
    enemyCommander: 'Tướng Trịnh Phạm Ngô Cầu (1786) / Tổng đốc Mãn Thanh Tôn Sĩ Nghị (1788)',
    enemyForce: 'Hàng vạn quân Trịnh đồn trú (1786) / 29 vạn quân xâm lược Mãn Thanh tràn ngập Thăng Long (1788)',
    ourForce: 'Hơn 6 vạn nghĩa quân Tây Sơn tinh nhuệ hội tụ tại Phú Xuân cùng hàng trăm thớt voi chiến',
    summary: 'Kinh đô Phú Xuân (nay là trung tâm TP. Huế trực thuộc Trung ương) là bàn đạp chiến lược vĩ đại của nhà Tây Sơn. Tháng 6/1786, Nguyễn Huệ vượt ải Hải Vân hạ thành Phú Xuân, giải phóng toàn bộ Đàng Trong. Ngày 22/12/1788, khi hay tin 29 vạn quân Thanh xâm chiếm Thăng Long, Nguyễn Huệ cho đắp đàn Nam Giao tại Núi Bân (phường An Tây, TP. Huế), tế cáo Trời Đất, lên ngôi Hoàng đế lấy niên hiệu Quang Trung. Tại đây, Người dõng dạc tuyên đọc lời Hịch xuất quân thần thánh "Đánh cho để dài tóc, đánh cho để đen răng..." rồi chỉ huy toàn quân tiến thẳng ra Bắc đại phá quân giặc làm nên chiến thắng Kỷ Dậu 1789.',
    forcesComparison: {
      ourForces: {
        name: 'Nghĩa Quân Tây Sơn tại Phú Xuân',
        count: 'Hơn 6 vạn quân & thớt voi chiến',
        percent: 60,
        color: '#10B981',
        details: 'Hạm đội thuyền chiến sông Hương, voi chiến chiến lược, tinh thần quật khởi cứu quốc'
      },
      enemyForces: {
        name: 'Quân Xâm Lược & Cát Cứ Cũ',
        count: '29 vạn quân giặc Thanh (Bắc Hà)',
        percent: 40,
        color: '#EF4444',
        details: 'Thế lực chiếm đóng ngạo mạn đóng giữ các ngả đường thủy bộ'
      },
      ratioNote: 'Từ Kinh đô Phú Xuân (TP. Huế), toàn dân quy thuận dưới ngọn cờ Hoàng đế Quang Trung xuất quân cứu nước'
    },
    funFacts: [
      {
        icon: 'Sparkles',
        title: 'Đàn Nam Giao tại Núi Bân',
        desc: 'Được đắp thành 3 tầng hình tròn và vuông tượng trưng cho Trời và Đất, là nơi Hoàng đế Quang Trung chính vị hiệu triệu quốc dân.'
      },
      {
        icon: 'Swords',
        title: 'Lời hịch cứu quốc bất hủ',
        desc: '"Đánh cho để dài tóc / Đánh cho để đen răng / Đánh cho nó chích luân bất phản / Đánh cho nó phiến giáp bất hoàn...".'
      },
      {
        icon: 'Shield',
        title: 'Đô thị Di sản - TP. Huế',
        desc: 'Thành phố Huế (Thành phố trực thuộc Trung ương) lưu giữ trọn vẹn Di tích Quốc gia Núi Bân và Kinh thành Phú Xuân lịch sử.'
      }
    ],
    phases: [
      {
        label: 'Hạ thành Phú Xuân (1786)',
        phase: 'Giai đoạn 1: Vượt Hải Vân & Hạ thành Phú Xuân (1786)',
        tag: 'Giải phóng Đàng Trong',
        icon: '🏰',
        center: [16.470, 107.575],
        zoom: 13,
        modernLocation: 'Hoàng thành Phú Xuân (nay là Kinh thành Huế, sông Hương và cửa biển Thuận An, TP. Huế)',
        desc: 'Tháng 6/1786, Nguyễn Huệ bất ngờ chỉ huy quân thủy bộ vượt đèo Hải Vân đánh úp phòng tuyến quân Trịnh. Thủy quân Tây Sơn tiến thẳng vào cửa Thuận An, áp sát công phá thành Phú Xuân, bắt sống chủ tướng giặc, thu hồi toàn bộ đất cũ Đàng Trong.',
        miniQuiz: {
          question: 'Năm 1786, tướng quân Nguyễn Huệ đã giải phóng thành Phú Xuân khỏi thế lực nào?',
          options: ['Quân Mãn Thanh', 'Quân Trịnh (do Phạm Ngô Cầu giữ)', 'Quân Xiêm La', 'Quân Pháp'],
          correct: 1,
          explain: 'Năm 1786, Nguyễn Huệ thần tốc vượt Hải Vân đánh tan quân Trịnh do Phạm Ngô Cầu chỉ huy, thu hồi toàn bộ Phú Xuân.'
        }
      },
      {
        label: 'Lên ngôi tại Núi Bân (1788)',
        phase: 'Giai đoạn 2: Lập đàn Nam Giao đăng quang Hoàng đế (22/12/1788)',
        tag: 'Chính vị hiệu triệu non sông',
        icon: '👑',
        center: [16.4385, 107.5919],
        zoom: 14.5,
        modernLocation: 'Di tích Lịch sử cấp Quốc gia Núi Bân, phường An Tây, Thành phố Huế (trực thuộc Trung ương)',
        desc: 'Ngày 22/12/1788 (25 tháng 11 năm Mậu Thân), Nguyễn Huệ cho đắp đàn tế trời đất ở Núi Bân, làm lễ đăng quang Hoàng đế, lấy niên hiệu Quang Trung, danh chính ngôn thuận thống nhất lòng dân trước hiểm họa 29 vạn quân Mãn Thanh.',
        miniQuiz: {
          question: 'Ngọn núi lịch sử nào tại TP. Huế là nơi Nguyễn Huệ đắp đàn tế trời đất và lên ngôi Hoàng đế Quang Trung?',
          options: ['Núi Bân (Ba Tầng)', 'Núi Ngự Bình', 'Núi Bạch Mã', 'Đồi Vọng Cảnh'],
          correct: 0,
          explain: 'Núi Bân (nay thuộc phường An Tây, TP. Huế) là nơi Nguyễn Huệ đắp đàn 3 tầng đăng quang Hoàng đế trước ngày xuất quân ra Bắc.'
        }
      },
      {
        label: 'Hịch xuất quân thần tốc',
        phase: 'Giai đoạn 3: Tuyên thệ Hịch cứu quốc & Tiến quân ra Bắc',
        tag: 'Hành quân sấm sét',
        icon: '⚡',
        center: [16.455, 107.580],
        zoom: 12,
        modernLocation: 'Từ Kinh đô Phú Xuân (TP. Huế) vượt sông Gianh tiến ra Nghệ An, Thanh Hóa hội quân Tam Điệp',
        desc: 'Hoàng đế Quang Trung đích thân duyệt binh, đọc bài Hịch xuất quân hào hùng làm nức lòng tướng sĩ. Toàn quân lập tức nhổ trại, hành quân thần tốc đêm ngày ra Bắc, luân phiên 2 người cáng 1 người ngủ, chuẩn bị đại phá quân Thanh tại Thăng Long.',
        miniQuiz: {
          question: 'Bài Hịch xuất quân của vua Quang Trung tại Phú Xuân có câu nói nổi tiếng nào?',
          options: ['Đánh cho để dài tóc, đánh cho để đen răng', 'Nam quốc sơn hà nam đế cư', 'Bình Ngô đại cáo', 'Hịch tướng sĩ'],
          correct: 0,
          explain: 'Câu nói bất hủ "Đánh cho để dài tóc, đánh cho để đen răng, đánh cho nó chích luân bất phản..." thể hiện quyết tâm giữ gìn bản sắc và chủ quyền dân tộc.'
        }
      }
    ],
    tactics: [
      {
        id: 1,
        label: 'Hạ thành Phú Xuân (1786)',
        phase: 'Giai đoạn 1: Vượt Hải Vân & Hạ thành Phú Xuân (1786)',
        tag: 'Giải phóng Đàng Trong',
        icon: '🏰',
        center: [16.470, 107.575],
        zoom: 13,
        modernLocation: 'Hoàng thành Phú Xuân (nay là Kinh thành Huế, sông Hương và cửa biển Thuận An, TP. Huế)',
        desc: 'Tháng 6/1786, Nguyễn Huệ bất ngờ chỉ huy quân thủy bộ vượt đèo Hải Vân đánh úp phòng tuyến quân Trịnh. Thủy quân Tây Sơn tiến thẳng vào cửa Thuận An, áp sát công phá thành Phú Xuân, bắt sống chủ tướng giặc, thu hồi toàn bộ đất cũ Đàng Trong.',
        miniQuiz: {
          question: 'Năm 1786, tướng quân Nguyễn Huệ đã giải phóng thành Phú Xuân khỏi thế lực nào?',
          options: ['Quân Mãn Thanh', 'Quân Trịnh (do Phạm Ngô Cầu giữ)', 'Quân Xiêm La', 'Quân Pháp'],
          correct: 1,
          explain: 'Năm 1786, Nguyễn Huệ thần tốc vượt Hải Vân đánh tan quân Trịnh do Phạm Ngô Cầu chỉ huy, thu hồi toàn bộ Phú Xuân.'
        }
      },
      {
        id: 2,
        label: 'Lên ngôi tại Núi Bân (1788)',
        phase: 'Giai đoạn 2: Lập đàn Nam Giao đăng quang Hoàng đế (22/12/1788)',
        tag: 'Chính vị hiệu triệu non sông',
        icon: '👑',
        center: [16.4385, 107.5919],
        zoom: 14.5,
        modernLocation: 'Di tích Lịch sử cấp Quốc gia Núi Bân, phường An Tây, Thành phố Huế (trực thuộc Trung ương)',
        desc: 'Ngày 22/12/1788 (25 tháng 11 năm Mậu Thân), Nguyễn Huệ cho đắp đàn tế trời đất ở Núi Bân, làm lễ đăng quang Hoàng đế, lấy niên hiệu Quang Trung, danh chính ngôn thuận thống nhất lòng dân trước hiểm họa 29 vạn quân Mãn Thanh.',
        miniQuiz: {
          question: 'Ngọn núi lịch sử nào tại TP. Huế là nơi Nguyễn Huệ đắp đàn tế trời đất và lên ngôi Hoàng đế Quang Trung?',
          options: ['Núi Bân (Ba Tầng)', 'Núi Ngự Bình', 'Núi Bạch Mã', 'Đồi Vọng Cảnh'],
          correct: 0,
          explain: 'Núi Bân (nay thuộc phường An Tây, TP. Huế) là nơi Nguyễn Huệ đắp đàn 3 tầng đăng quang Hoàng đế trước ngày xuất quân ra Bắc.'
        }
      },
      {
        id: 3,
        label: 'Hịch xuất quân thần tốc',
        phase: 'Giai đoạn 3: Tuyên thệ Hịch cứu quốc & Tiến quân ra Bắc',
        tag: 'Hành quân sấm sét',
        icon: '⚡',
        center: [16.455, 107.580],
        zoom: 12,
        modernLocation: 'Từ Kinh đô Phú Xuân (TP. Huế) vượt sông Gianh tiến ra Nghệ An, Thanh Hóa hội quân Tam Điệp',
        desc: 'Hoàng đế Quang Trung đích thân duyệt binh, đọc bài Hịch xuất quân hào hùng làm nức lòng tướng sĩ. Toàn quân lập tức nhổ trại, hành quân thần tốc đêm ngày ra Bắc, luân phiên 2 người cáng 1 người ngủ, chuẩn bị đại phá quân Thanh tại Thăng Long.',
        miniQuiz: {
          question: 'Bài Hịch xuất quân của vua Quang Trung tại Phú Xuân có câu nói nổi tiếng nào?',
          options: ['Đánh cho để dài tóc, đánh cho để đen răng', 'Nam quốc sơn hà nam đế cư', 'Bình Ngô đại cáo', 'Hịch tướng sĩ'],
          correct: 0,
          explain: 'Câu nói bất hủ "Đánh cho để dài tóc, đánh cho để đen răng, đánh cho nó chích luân bất phản..." thể hiện quyết tâm giữ gìn bản sắc và chủ quyền dân tộc.'
        }
      }
    ],
    zones: [
      {
        id: 'zone-nui-ban',
        title: 'Khu Di tích Đàn tế Núi Bân (Nơi đăng quang Hoàng đế)',
        type: 'friendly',
        color: '#D4AF37',
        coords: [
          [16.442, 107.588],
          [16.442, 107.596],
          [16.434, 107.596],
          [16.434, 107.588],
          [16.442, 107.588]
        ],
        modernLocation: 'Di tích Lịch sử Quốc gia Núi Bân, phường An Tây, Thành phố Huế (trực thuộc Trung ương)',
        desc: 'Ngọn núi lịch sử nơi Nguyễn Huệ lập đàn 3 tầng tế Trời Đất, chính vị Hoàng đế Quang Trung ngày 22/12/1788.'
      },
      {
        id: 'zone-phu-xuan-citadel',
        title: 'Kinh thành Phú Xuân (Đại bản doanh Tây Sơn)',
        type: 'friendly',
        color: '#10B981',
        coords: [
          [16.478, 107.568],
          [16.480, 107.586],
          [16.464, 107.588],
          [16.462, 107.570],
          [16.478, 107.568]
        ],
        modernLocation: 'Khu vực Kinh thành Huế, bờ bắc sông Hương, TP. Huế',
        desc: 'Trung tâm chính trị, quân sự đầu não của triều đại Tây Sơn tại miền Trung, nơi hội tụ binh thuyền và đại bác.'
      }
    ],
    flows: [
      {
        id: 'flow-phuxuan-to-north',
        title: 'Tuyến hành quân thần tốc từ Kinh đô Phú Xuân ra Nghệ An – Tam Điệp',
        type: 'friendly',
        color: '#F59E0B',
        points: [
          [16.440, 107.590],
          [16.470, 107.575],
          [16.800, 107.100],
          [17.500, 106.600],
          [18.670, 105.680]
        ],
        modernLocation: 'Tuyến Quốc lộ 1A từ TP. Huế qua Quảng Trị, Quảng Bình đến TP. Vinh (Nghệ An)',
        desc: 'Đại quân Tây Sơn ngày đêm hành quân vượt hàng trăm cây số từ Huế ra Bắc với tốc độ sấm sét chưa từng có.'
      }
    ]
  }
};
