// src/lib/fake-data.js

export const BOOKS = [
  // --- 1. FANTASY (Giả tưởng) ---
  {
    id: 1,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    price: 150000,
    originalPrice: 200000,
    rating: 4.9,
    sold: 55000, // Best Seller
    image: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&q=80&w=800",
    category: "Fantasy",
    description: "Khởi đầu của huyền thoại cậu bé phù thủy Harry Potter tại trường Hogwarts."
  },
  {
    id: 2,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 180000,
    originalPrice: 220000,
    rating: 4.8,
    sold: 28000,
    image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?auto=format&fit=crop&q=80&w=800",
    category: "Fantasy",
    description: "Cuộc phiêu lưu của Bilbo Baggins giành lại kho báu từ rồng Smaug."
  },
  {
    id: 3,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    price: 350000,
    originalPrice: 450000,
    rating: 5.0,
    sold: 32000,
    image: "https://images.unsplash.com/photo-1463320726281-696a41370377?auto=format&fit=crop&q=80&w=800",
    category: "Fantasy",
    description: "Bộ tiểu thuyết giả tưởng vĩ đại nhất mọi thời đại về chiếc nhẫn quyền lực."
  },
  {
    id: 4,
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    price: 210000,
    originalPrice: 260000,
    rating: 4.7,
    sold: 19000,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800",
    category: "Fantasy",
    description: "Cuộc chiến tranh giành ngai vàng sắt đẫm máu và các gia tộc."
  },
  {
    id: 5,
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    price: 195000,
    originalPrice: 230000,
    rating: 4.8,
    sold: 8500,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800",
    category: "Fantasy",
    description: "Câu chuyện về Kvothe, một huyền thoại sống, tự kể lại cuộc đời mình."
  },

  // --- 2. YOUNG ADULT (Thiếu niên) ---
  {
    id: 6,
    title: "The Fault in Our Stars",
    author: "John Green",
    price: 90000,
    originalPrice: 110000,
    rating: 4.7,
    sold: 21000,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
    category: "Young Adult",
    description: "Câu chuyện tình yêu cảm động của hai bệnh nhân ung thư."
  },
  {
    id: 7,
    title: "The Hunger Games",
    author: "Suzanne Collins",
    price: 115000,
    originalPrice: 140000,
    rating: 4.6,
    sold: 40000,
    image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&q=80&w=800",
    category: "Young Adult",
    description: "Đấu trường sinh tử nơi chỉ có một người sống sót."
  },
  {
    id: 8,
    title: "Divergent",
    author: "Veronica Roth",
    price: 105000,
    originalPrice: 130000,
    rating: 4.4,
    sold: 15000,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    category: "Young Adult",
    description: "Xã hội phân chia theo 5 phẩm chất, và những kẻ dị biệt bị săn đuổi."
  },
  {
    id: 9,
    title: "Twilight",
    author: "Stephenie Meyer",
    price: 95000,
    originalPrice: 120000,
    rating: 4.2,
    sold: 35000,
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=800",
    category: "Young Adult",
    description: "Chuyện tình lãng mạn nhưng nguy hiểm giữa cô gái loài người và chàng ma cà rồng."
  },

  // --- 3. MYSTERY & THRILLER (Trinh thám & Ly kỳ) ---
  {
    id: 10,
    title: "Sherlock Holmes Toàn Tập",
    author: "Arthur Conan Doyle",
    price: 120000,
    originalPrice: 150000,
    rating: 5.0,
    sold: 30000,
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=800",
    category: "Mystery & Thriller",
    description: "Những vụ án ly kỳ và khả năng suy luận phi thường của thám tử lừng danh."
  },
  {
    id: 11,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    price: 160000,
    originalPrice: 190000,
    rating: 4.6,
    sold: 22000,
    image: "https://images.unsplash.com/photo-1587876931566-1a8796371458?auto=format&fit=crop&q=80&w=800",
    category: "Mystery & Thriller",
    description: "Bí mật động trời ẩn giấu sau các tác phẩm nghệ thuật tôn giáo."
  },
  {
    id: 12,
    title: "Gone Girl",
    author: "Gillian Flynn",
    price: 130000,
    originalPrice: 160000,
    rating: 4.4,
    sold: 13000,
    image: "https://images.unsplash.com/photo-1610842775677-173873919e83?auto=format&fit=crop&q=80&w=800",
    category: "Mystery & Thriller",
    description: "Vụ mất tích bí ẩn của người vợ trong ngày kỷ niệm cưới."
  },
  {
    id: 13,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 145000,
    originalPrice: 170000,
    rating: 4.8,
    sold: 9000,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
    category: "Mystery & Thriller",
    description: "Tại sao một nữ họa sĩ tài năng lại bắn chồng mình rồi im lặng mãi mãi?"
  },
  {
    id: 14,
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    price: 150000,
    originalPrice: 180000,
    rating: 4.7,
    sold: 11000,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800",
    category: "Mystery & Thriller",
    description: "Cuộc điều tra về sự mất tích bí ẩn kéo dài 40 năm của một cô gái trẻ."
  },

  // --- 4. ACTION & ADVENTURE (Hành động & Phiêu lưu) ---
  {
    id: 15,
    title: "Life of Pi",
    author: "Yann Martel",
    price: 110000,
    originalPrice: 140000,
    rating: 4.7,
    sold: 11000,
    image: "https://images.unsplash.com/photo-1518373714866-3f14799638aa?auto=format&fit=crop&q=80&w=800",
    category: "Action & Adventure",
    description: "Hành trình lênh đênh trên biển của Pi và con hổ Richard Parker."
  },
  {
    id: 16,
    title: "The Three Musketeers",
    author: "Alexandre Dumas",
    price: 120000,
    originalPrice: 150000,
    rating: 4.6,
    sold: 8000,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800",
    category: "Action & Adventure",
    description: "Tình bạn và lòng dũng cảm của ba chàng lính ngự lâm."
  },
  {
    id: 17,
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    price: 180000,
    originalPrice: 220000,
    rating: 5.0,
    sold: 10000,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    category: "Action & Adventure",
    description: "Câu chuyện báo thù vĩ đại nhất văn học thế giới."
  },
  {
    id: 18,
    title: "The Call of the Wild",
    author: "Jack London",
    price: 85000,
    originalPrice: 100000,
    rating: 4.5,
    sold: 12000,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
    category: "Action & Adventure",
    description: "Hành trình trở về với thiên nhiên hoang dã của chú chó Buck."
  },

  // --- 5. SCIENCE FICTION (Khoa học viễn tưởng) ---
  {
    id: 19,
    title: "Dune",
    author: "Frank Herbert",
    price: 220000,
    originalPrice: 250000,
    rating: 4.9,
    sold: 12000,
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800",
    category: "Science Fiction",
    description: "Cuộc chiến giành quyền lực và tài nguyên trên hành tinh sa mạc Arrakis."
  },
  {
    id: 20,
    title: "The Martian",
    author: "Andy Weir",
    price: 130000,
    originalPrice: 150000,
    rating: 4.8,
    sold: 8000,
    image: "https://images.unsplash.com/photo-1614726365723-49cfae96a6d6?auto=format&fit=crop&q=80&w=800",
    category: "Science Fiction",
    description: "Hành trình sinh tồn đơn độc trên sao Hỏa bằng khoa học."
  },
  {
    id: 21,
    title: "1984",
    author: "George Orwell",
    price: 90000,
    originalPrice: 110000,
    rating: 4.9,
    sold: 45000,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800",
    category: "Science Fiction",
    description: "Một xã hội giả tưởng nơi mọi hành động đều bị giám sát."
  },
  {
    id: 22,
    title: "Ender's Game",
    author: "Orson Scott Card",
    price: 140000,
    originalPrice: 160000,
    rating: 4.7,
    sold: 9500,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
    category: "Science Fiction",
    description: "Trường học quân sự ngoài không gian đào tạo trẻ em chống lại người ngoài hành tinh."
  },
  {
    id: 23,
    title: "Brave New World",
    author: "Aldous Huxley",
    price: 100000,
    originalPrice: 120000,
    rating: 4.5,
    sold: 14000,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800",
    category: "Science Fiction",
    description: "Một thế giới tương lai nơi con người được sinh ra từ ống nghiệm."
  },

  // --- 6. NON-FICTION (Phi hư cấu/Kiến thức) ---
  {
    id: 24,
    title: "Sapiens: Lược Sử Loài Người",
    author: "Yuval Noah Harari",
    price: 180000,
    originalPrice: 220000,
    rating: 4.8,
    sold: 45000,
    image: "https://images.unsplash.com/photo-1555252586-d716387d1696?auto=format&fit=crop&q=80&w=800",
    category: "Non-Fiction",
    description: "Một cái nhìn bao quát về lịch sử hình thành và phát triển của loài người."
  },
  {
    id: 25,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 85000,
    originalPrice: 120000,
    rating: 4.7,
    sold: 50000,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800",
    category: "Non-Fiction",
    description: "Nghệ thuật thu phục lòng người và đối nhân xử thế."
  },
  {
    id: 26,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    price: 200000,
    originalPrice: 250000,
    rating: 4.6,
    sold: 7000,
    image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=800",
    category: "Non-Fiction",
    description: "Khám phá hai hệ thống tư duy chi phối cách chúng ta suy nghĩ."
  },
  {
    id: 27,
    title: "Quiet: The Power of Introverts",
    author: "Susan Cain",
    price: 135000,
    originalPrice: 160000,
    rating: 4.8,
    sold: 12000,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800",
    category: "Non-Fiction",
    description: "Sức mạnh của người hướng nội trong một thế giới không ngừng nói."
  },

  // --- 7. LITERARY FICTION (Văn học đương đại) ---
  {
    id: 28,
    title: "Rừng Na Uy",
    author: "Haruki Murakami",
    price: 110000,
    originalPrice: 130000,
    rating: 4.5,
    sold: 9500,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
    category: "Literary Fiction",
    description: "Một câu chuyện tình yêu đầy ám ảnh, mất mát và u buồn của tuổi trẻ."
  },
  {
    id: 29,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 80000,
    originalPrice: 100000,
    rating: 4.4,
    sold: 25000,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
    category: "Literary Fiction",
    description: "Sự phù hoa và sụp đổ của giấc mơ Mỹ qua bi kịch của Gatsby."
  },
  {
    id: 30,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 95000,
    originalPrice: 110000,
    rating: 4.3,
    sold: 20000,
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=800",
    category: "Literary Fiction",
    description: "Tâm tư nổi loạn và cô đơn của một thiếu niên giữa New York."
  },
  {
    id: 31,
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    price: 125000,
    originalPrice: 150000,
    rating: 4.9,
    sold: 18000,
    image: "https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?auto=format&fit=crop&q=80&w=800",
    category: "Literary Fiction",
    description: "Câu chuyện về tình bạn, sự phản bội và chuộc lỗi ở Afghanistan."
  },

  // --- 8. HORROR (Kinh dị) ---
  {
    id: 32,
    title: "It (Gã Hề Ma Quái)",
    author: "Stephen King",
    price: 250000,
    originalPrice: 300000,
    rating: 4.6,
    sold: 9000,
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800",
    category: "Horror",
    description: "Nỗi ám ảnh kinh hoàng của thị trấn Derry dưới hình hài gã hề."
  },
  {
    id: 33,
    title: "The Shining",
    author: "Stephen King",
    price: 140000,
    originalPrice: 170000,
    rating: 4.7,
    sold: 10000,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800",
    category: "Horror",
    description: "Khách sạn Overlook bị ma ám và sự điên loạn của người cha."
  },
  {
    id: 34,
    title: "Dracula",
    author: "Bram Stoker",
    price: 85000,
    originalPrice: 100000,
    rating: 4.5,
    sold: 15000,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800",
    category: "Horror",
    description: "Cội nguồn của huyền thoại ma cà rồng bá tước Dracula."
  },
  {
    id: 35,
    title: "Frankenstein",
    author: "Mary Shelley",
    price: 80000,
    originalPrice: 95000,
    rating: 4.4,
    sold: 13000,
    image: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=800",
    category: "Horror",
    description: "Câu chuyện bi kịch về con quái vật được tạo ra từ khoa học."
  },

  // --- 9. HISTORICAL FICTION (Tiểu thuyết lịch sử) ---
  {
    id: 36,
    title: "All the Light We Cannot See",
    author: "Anthony Doerr",
    price: 170000,
    originalPrice: 200000,
    rating: 4.8,
    sold: 8500,
    image: "https://images.unsplash.com/photo-1474932434381-faad1ade28d3?auto=format&fit=crop&q=80&w=800",
    category: "Historical Fiction",
    description: "Định mệnh của cô gái mù Pháp và chàng lính Đức trong Thế chiến II."
  },
  {
    id: 37,
    title: "The Book Thief",
    author: "Markus Zusak",
    price: 135000,
    originalPrice: 160000,
    rating: 4.9,
    sold: 14000,
    image: "https://images.unsplash.com/photo-1555252586-d716387d1696?auto=format&fit=crop&q=80&w=800",
    category: "Historical Fiction",
    description: "Câu chuyện về cô bé ăn trộm sách ở Đức thời Đức Quốc xã, được kể bởi Tử thần."
  },
  {
    id: 38,
    title: "The Pillars of the Earth",
    author: "Ken Follett",
    price: 280000,
    originalPrice: 350000,
    rating: 4.8,
    sold: 6000,
    image: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?auto=format&fit=crop&q=80&w=800",
    category: "Historical Fiction",
    description: "Âm mưu, tình yêu và tham vọng xoay quanh việc xây dựng nhà thờ lớn."
  },
  {
    id: 39,
    title: "Wolf Hall",
    author: "Hilary Mantel",
    price: 190000,
    originalPrice: 230000,
    rating: 4.5,
    sold: 4000,
    image: "https://images.unsplash.com/photo-1518373714866-3f14799638aa?auto=format&fit=crop&q=80&w=800",
    category: "Historical Fiction",
    description: "Sự trỗi dậy của Thomas Cromwell trong triều đình vua Henry VIII."
  },

  // --- 10. CHILDREN'S (Thiếu nhi) ---
  {
    id: 40,
    title: "Dế Mèn Phiêu Lưu Ký",
    author: "Tô Hoài",
    price: 50000,
    originalPrice: 60000,
    rating: 4.9,
    sold: 15000,
    image: "https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?auto=format&fit=crop&q=80&w=800",
    category: "Children's",
    description: "Tác phẩm văn học thiếu nhi kinh điển của Việt Nam về chú Dế Mèn dũng cảm."
  },
  {
    id: 41,
    title: "Kính Vạn Hoa",
    author: "Nguyễn Nhật Ánh",
    price: 80000,
    originalPrice: 90000,
    rating: 4.9,
    sold: 16000,
    image: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=800",
    category: "Children's",
    description: "Những câu chuyện tuổi học trò hồn nhiên, tinh nghịch và đáng nhớ."
  },
  {
    id: 42,
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    price: 70000,
    originalPrice: 90000,
    rating: 5.0,
    sold: 60000,
    image: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?auto=format&fit=crop&q=80&w=800",
    category: "Children's",
    description: "Hoàng tử bé và bài học về tình yêu thương dành cho cả người lớn."
  },
  {
    id: 43,
    title: "Charlotte's Web",
    author: "E.B. White",
    price: 65000,
    originalPrice: 80000,
    rating: 4.7,
    sold: 12000,
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800",
    category: "Children's",
    description: "Tình bạn cảm động giữa chú lợn Wilbur và cô nhện Charlotte."
  },

  // --- 11. BIOGRAPHIES & HISTORY (Tiểu sử & Lịch sử) ---
  {
    id: 44,
    title: "Steve Jobs",
    author: "Walter Isaacson",
    price: 250000,
    originalPrice: 300000,
    rating: 4.9,
    sold: 14000,
    image: "https://images.unsplash.com/photo-1531297461136-82lwjq93b9?auto=format&fit=crop&q=80&w=800",
    category: "Biographies & History",
    description: "Cuốn tiểu sử chính thức duy nhất về nhà sáng lập Apple."
  },
  {
    id: 45,
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    price: 90000,
    originalPrice: 110000,
    rating: 4.8,
    sold: 22000,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=800",
    category: "Biographies & History",
    description: "Nhật ký của cô bé Do Thái ẩn náu trong thời kỳ Đức Quốc xã chiếm đóng."
  },
  {
    id: 46,
    title: "Alexander Hamilton",
    author: "Ron Chernow",
    price: 300000,
    originalPrice: 380000,
    rating: 4.7,
    sold: 5000,
    image: "https://images.unsplash.com/photo-1555449372-2337d6a5e1c0?auto=format&fit=crop&q=80&w=800",
    category: "Biographies & History",
    description: "Cuộc đời đầy sóng gió của một trong những người cha lập quốc Hoa Kỳ."
  },
  {
    id: 47,
    title: "Becoming",
    author: "Michelle Obama",
    price: 180000,
    originalPrice: 220000,
    rating: 4.8,
    sold: 25000,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    category: "Biographies & History",
    description: "Hồi ký đầy cảm hứng của cựu Đệ nhất phu nhân Hoa Kỳ."
  },

  // --- 12. ROMANCE (Lãng mạn) ---
  {
    id: 48,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 95000,
    originalPrice: 120000,
    rating: 4.8,
    sold: 21000,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800",
    category: "Romance",
    description: "Câu chuyện kinh điển về tình yêu và định kiến trong xã hội Anh."
  },
  {
    id: 49,
    title: "The Notebook",
    author: "Nicholas Sparks",
    price: 110000,
    originalPrice: 140000,
    rating: 4.6,
    sold: 18000,
    image: "https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?auto=format&fit=crop&q=80&w=800",
    category: "Romance",
    description: "Một câu chuyện tình yêu bất diệt vượt qua thời gian và thử thách."
  },
  {
    id: 50,
    title: "Me Before You",
    author: "Jojo Moyes",
    price: 120000,
    originalPrice: 150000,
    rating: 4.5,
    sold: 16000,
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800",
    category: "Romance",
    description: "Tình yêu bất ngờ giữa cô gái lạc quan và chàng trai liệt nửa người."
  }
];
// ... (Code cũ giữ nguyên)

// THÊM ĐOẠN NÀY VÀO CUỐI FILE
export const AUTHORS = [
  {
    name: "J.K. Rowling",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/J._K._Rowling_2010.jpg",
    birth: "31 tháng 7, 1965",
    nationality: "Anh",
    bio: "J.K. Rowling là tác giả của bộ truyện Harry Potter nổi tiếng thế giới. Bà đã nhận được nhiều giải thưởng danh giá và bán được hơn 500 triệu bản sách trên toàn cầu.",
    awards: ["Huân chương Đế quốc Anh", "Giải Hugo", "Giải Locus"]
  },
  {
    name: "Nguyễn Nhật Ánh",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Nguyen_Nhat_Anh_2018.jpg/800px-Nguyen_Nhat_Anh_2018.jpg",
    birth: "7 tháng 5, 1955",
    nationality: "Việt Nam",
    bio: "Nguyễn Nhật Ánh là nhà văn Việt Nam chuyên viết cho tuổi mới lớn. Các tác phẩm của ông được yêu thích bởi giọng văn trong sáng, dí dỏm và đầy cảm xúc.",
    awards: ["Giải thưởng Văn học ASEAN", "Giải Mai Vàng"]
  },
  // Bạn có thể thêm các tác giả khác tương tự...
];