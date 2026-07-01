export const demoSettings = {
  siteName: 'SugarNest Cookie Co.',
  announcementText: 'Portfolio demo bakery — no real orders or payments.',
  freeShippingThreshold: 35,
  instagramUrl: '#',
  address: '123 Sugar Street, Winnipeg, Manitoba R3C 0A1',
  phone: '(204) 555-0198',
  email: 'hello@sugarnestdemo.ca',
}

export const demoProducts = [
  { id: 1, shopifyHandle: 'brown-butter-chocolate-chip', title: 'Brown Butter Chocolate Chip', descriptor: 'Browned butter, dark chocolate, soft centre.', description: 'A classic cookie with nutty browned butter, generous chocolate chips, and a chewy golden edge.', price: 6.25, isFeatured: true, isCultureDrop: false, allergens: ['Milk','Wheat','Eggs'], tags: ['bestseller'] },
  { id: 2, shopifyHandle: 'hazelnut-crunch', title: 'Hazelnut Crunch', descriptor: 'Toasted hazelnut, chocolate chips, creamy swirl.', description: 'Brown butter dough loaded with toasted hazelnuts and chocolate chips, finished with a creamy chocolate swirl.', price: 6.25, isFeatured: true, isCultureDrop: false, allergens: ['Milk','Wheat','Eggs','Tree Nuts'], tags: ['original'] },
  { id: 3, shopifyHandle: 'babas-big-apple', title: "Baba's Big Apple", descriptor: 'Apple filling, cinnamon sugar, streusel.', description: 'A cozy apple pie inspired cookie with cinnamon sugar, soft apple filling, and crisp streusel topping.', price: 6.25, isFeatured: true, isCultureDrop: false, allergens: ['Milk','Wheat','Eggs'], tags: ['comfort'] },
  { id: 4, shopifyHandle: 'the-pb-cup', title: 'The PB Cup', descriptor: 'Peanut butter dough, PB cups, vanilla icing.', description: 'Peanut butter dough with a soft centre, chopped peanut butter cups, and a sweet vanilla finish.', price: 6.25, isFeatured: false, isCultureDrop: false, allergens: ['Milk','Wheat','Eggs','Peanuts'], tags: ['rich'] },
  { id: 5, shopifyHandle: 'the-churro', title: 'The Churro', descriptor: 'Cinnamon sugar, dulce de leche, vanilla icing.', description: 'A warm churro-inspired cookie with cinnamon sugar, dulce de leche, and vanilla icing.', price: 6.25, isFeatured: false, isCultureDrop: false, allergens: ['Milk','Wheat','Eggs'], tags: ['sweet'] },
  { id: 6, shopifyHandle: 'crack-brulee', title: 'Crack Brulee', descriptor: 'Caramelized sugar, vanilla custard, crunch.', description: 'A crème brûlée inspired cookie with a crackly caramelized top and soft vanilla centre.', price: 6.25, isFeatured: false, isCultureDrop: true, cultureOrigin: 'France', allergens: ['Milk','Wheat','Eggs'], tags: ['drop'] },
  { id: 7, shopifyHandle: 'ube-coconut-cloud', title: 'Ube Coconut Cloud', descriptor: 'Ube, white chocolate, toasted coconut.', description: 'Purple ube cookie dough with white chocolate and toasted coconut for a soft tropical finish.', price: 6.25, isFeatured: false, isCultureDrop: true, cultureOrigin: 'Philippines', allergens: ['Milk','Wheat','Eggs','Coconut'], tags: ['drop'] },
  { id: 8, shopifyHandle: 'saskatoon-cheesecake', title: 'Saskatoon Cheesecake', descriptor: 'Saskatoon berry, cream cheese, graham.', description: 'A Manitoba-inspired cheesecake cookie with Saskatoon berry, cream cheese, and graham crumble.', price: 6.25, isFeatured: false, isCultureDrop: true, cultureOrigin: 'Manitoba', allergens: ['Milk','Wheat','Eggs'], tags: ['local'] },
]

export const demoReviews = [
  { id: 1, name: 'Avery M.', rating: 5, title: 'So fresh!', body: 'The cart and checkout flow felt smooth and realistic for a demo website.' },
  { id: 2, name: 'Jordan K.', rating: 5, title: 'Beautiful design', body: 'The product pages are clean, warm, and easy to browse.' },
  { id: 3, name: 'Mina S.', rating: 5, title: 'Great SEO project', body: 'Clear pages, strong structure, and a polished local bakery concept.' },
]

export const demoDrop = {
  id: 1,
  title: 'Demo Cookie Drop',
  description: 'Limited-time portfolio promotion for the fake bakery site.',
  discountPercent: 15,
  isActive: true,
}

export function getDemoProduct(handle) {
  return demoProducts.find((p) => p.shopifyHandle === handle || p.handle === handle) || null
}
