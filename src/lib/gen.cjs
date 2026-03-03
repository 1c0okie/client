// generateBooks.js

const fs = require("fs");

const CATEGORIES = [
  "Fantasy",
  "Young Adult",
  "Mystery & Thriller",
  "Action & Adventure",
  "Science Fiction",
  "Non-Fiction",
  "Literary Fiction",
  "Horror",
  "Historical Fiction",
  "Children's",
  "Biographies & History",
  "Romance"
];

const TITLE_WORDS = [
  "Shadow", "Light", "Empire", "Secret", "Legend",
  "Chronicle", "Dream", "Fire", "Storm", "Moon",
  "Star", "Blood", "Sword", "Memory", "Time"
];

const AUTHORS = [
  "John Smith", "Emily Carter", "Michael Brown",
  "Sophia Wilson", "David Miller", "Anna Taylor",
  "James Anderson", "Olivia Thomas", "Daniel Moore"
];

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const books = [];

for (let i = 1; i <= 1000; i++) {
  const category = CATEGORIES[i % CATEGORIES.length];
  const title = `${TITLE_WORDS[random(0, 14)]} of the ${TITLE_WORDS[random(0, 14)]} ${i}`;
  const author = AUTHORS[random(0, AUTHORS.length - 1)];

  const price = random(90000, 350000);
  const originalPrice = price + random(20000, 100000);

  books.push({
    id: i,
    title,
    author,
    price,
    originalPrice,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    sold: random(100, 80000),
    image: `https://images.unsplash.com/photo-15${random(10000000,99999999)}?auto=format&fit=crop&q=80&w=800`,
    category,
    description: `Một tác phẩm thuộc thể loại ${category}, kể về ${title.toLowerCase()}.`
  });
}

// Xuất ra file JSON
fs.writeFileSync(
  "books-data.js",
  `export const BOOKS = ${JSON.stringify(books, null, 2)};`
);

console.log("✅ Đã tạo 1000 sách thành công!");
