// src/components/skincare/skincareProductMockData.js

// This is creating mock data for skincare products to be used in the application
// The data is exported as a default export, not a named export

const skincareProductMockData = [
  {
    id: 'product1',
    name: 'Hydrating Facial Cleanser',
    brand: 'CeraVe',
    category: 'Cleanser',
    skinType: ['Normal', 'Dry', 'Sensitive'],
    concerns: ['Dryness', 'Sensitivity'],
    price: 14.99,
    ingredients: ['Ceramides', 'Hyaluronic Acid', 'Glycerin'],
    description: 'A gentle, hydrating cleanser that removes dirt and makeup without disrupting the skin barrier.',
    imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZSUyMGNsZWFuc2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    rating: 4.8,
    reviews: 1245
  },
  {
    id: 'product2',
    name: 'Vitamin C Serum',
    brand: 'Timeless',
    category: 'Serum',
    skinType: ['All', 'Combination', 'Oily'],
    concerns: ['Dark Spots', 'Anti-aging', 'Dullness'],
    price: 24.99,
    ingredients: ['Vitamin C (20%)', 'Vitamin E', 'Ferulic Acid'],
    description: 'A potent antioxidant serum that brightens skin, reduces dark spots, and protects against environmental damage.',
    imageUrl: 'https://images.unsplash.com/photo-1615366105533-88abbf763bd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2VydW18ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    rating: 4.6,
    reviews: 957
  },
  {
    id: 'product3',
    name: 'Niacinamide 10% + Zinc 1%',
    brand: 'The Ordinary',
    category: 'Serum',
    skinType: ['Combination', 'Oily', 'Acne-Prone'],
    concerns: ['Acne', 'Pores', 'Oil Control'],
    price: 5.90,
    ingredients: ['Niacinamide', 'Zinc PCA', 'Glycerin'],
    description: 'A high-strength vitamin and mineral formula that reduces the appearance of blemishes and congestion.',
    imageUrl: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNlcnVtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    rating: 4.7,
    reviews: 1876
  },
  {
    id: 'product4',
    name: 'Moisturizing Cream',
    brand: 'La Roche-Posay',
    category: 'Moisturizer',
    skinType: ['Dry', 'Very Dry', 'Sensitive'],
    concerns: ['Dryness', 'Irritation', 'Redness'],
    price: 19.99,
    ingredients: ['Thermal Spring Water', 'Ceramide-3', 'Niacinamide'],
    // Fixed: Escaped the apostrophe with a backslash
    description: 'A daily face and body moisturizer that provides up to 48-hour hydration and helps restore the skin\'s protective barrier.',
    imageUrl: 'https://images.unsplash.com/photo-1617993069821-d59e436e0bef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fG1vaXN0dXJpemVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    rating: 4.9,
    reviews: 2043
  },
  {
    id: 'product5',
    name: 'Chemical Exfoliant',
    brand: 'Paula\'s Choice', // This apostrophe is already escaped correctly
    category: 'Exfoliant',
    skinType: ['All', 'Combination', 'Oily'],
    concerns: ['Texture', 'Blackheads', 'Acne'],
    price: 29.50,
    ingredients: ['2% BHA (Salicylic Acid)', 'Green Tea Extract', 'Methylpropanediol'],
    description: 'A leave-on exfoliant that removes built-up dead skin cells and unclogs pores for clearer, smoother skin.',
    imageUrl: 'https://images.unsplash.com/photo-1572006234483-4c66f176f511?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNraW5jYXJlJTIwcHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    rating: 4.5,
    reviews: 1532
  },
  {
    id: 'product6',
    name: 'Mineral Sunscreen SPF 50',
    brand: 'EltaMD',
    category: 'Sunscreen',
    skinType: ['All', 'Sensitive', 'Acne-Prone'],
    concerns: ['Sun Protection', 'Anti-aging', 'Acne'],
    price: 36.00,
    ingredients: ['Zinc Oxide', 'Titanium Dioxide', 'Niacinamide'],
    description: 'A lightweight, oil-free face sunscreen that helps calm and protect sensitive skin types prone to acne, rosacea and discoloration.',
    imageUrl: 'https://images.unsplash.com/photo-1521634663641-61223afcb268?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3Vuc2NyZWVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    rating: 4.7,
    reviews: 1876
  }
];

// Fix: Export the data as default
export default skincareProductMockData;

// You can also add a named export if needed
export { skincareProductMockData };