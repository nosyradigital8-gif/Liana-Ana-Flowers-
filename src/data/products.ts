// Import images from assets
import roses40 from '@/assets/products/roses-40.jpg';
import roses30 from '@/assets/products/roses-30.jpg';
import roses25 from '@/assets/products/roses-25.jpg';
import roses100 from '@/assets/products/roses-100.jpg';
import roses6 from '@/assets/products/roses-6.jpg';
import roses10 from '@/assets/products/roses-10.jpg';
import roseBox1 from '@/assets/products/rose-box-1.jpg';
import roseBox2 from '@/assets/products/rose-box-2.jpg';
import heartBox from '@/assets/products/heart-box.jpg';
import mixed30 from '@/assets/products/mixed-30.jpg';
import mixedColorful from '@/assets/products/mixed-colorful.jpg';
import mixedStandard from '@/assets/products/mixed-standard.jpg';
import mixedBox from '@/assets/products/mixed-box.jpg';
import pinkBabyBreath from '@/assets/products/pink-baby-breath.jpg';
import roses20Baby from '@/assets/products/roses-20-baby.jpg';
import elegantLush from '@/assets/products/elegant-lush.jpg';
import miniMixed from '@/assets/products/mini-mixed.jpg';
import elegantMixed from '@/assets/products/elegant-mixed-bouquet.jpg';
import miniRed from '@/assets/products/mini-red.jpg';
import dozenMixed from '@/assets/products/dozen-mixed.jpg';
import miniRedRoses from '@/assets/products/mini-red-roses.jpg';
import luxuryMini from '@/assets/products/luxury-mini.jpg';
import ferreroRocher from '@/assets/products/ferrero-rocher.jpg';
import champagne from '@/assets/products/champagne.jpg';
import mixedBoxBalloon from '@/assets/products/mixed-box-balloon.jpg';
import luxuryCombo from '@/assets/products/luxury-combo.jpg';
import wine from '@/assets/products/wine.jpg';
import specialCakes from '@/assets/products/special-cakes.jpg';
import luxuryCakes from '@/assets/products/luxury-cakes.jpg';
import pinkMixed50 from '@/assets/products/pink-mixed-50.jpg';

export interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  category: 'roses' | 'mixed' | 'boxes' | 'extras';
  image: string;
  description: string;
  featured?: boolean;
  sale?: boolean;
  note?: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: '40 Stems Lush Red Roses',
    price: '276000',
    category: 'roses',
    image: roses40,
    description: 'Luxurious bouquet of 40 fresh, premium red roses perfectly arranged',
  },
  {
    id: '2',
    name: '30 Stems Red Roses',
    price: '241500',
    category: 'roses',
    image: roses30,
    description: 'Beautiful arrangement of 30 fresh red roses',
  },
  {
    id: '3',
    name: '25 Stem Red Roses',
    price: '175000',
    category: 'roses',
    image: roses25,
    description: 'Classic bouquet of 25 stunning red roses',
  },
  {
    id: '4',
    name: '100 Stem Red Roses',
    price: '700000',
    category: 'roses',
    image: roses100,
    description: 'Grand arrangement of 100 premium red roses for special occasions',
    featured: true,
  },
  {
    id: '5',
    name: '6 Stem Red Roses',
    price: '45000',
    category: 'roses',
    image: roses6,
    description: 'Perfect small bouquet of 6 red roses',
  },
  {
    id: '6',
    name: '10 Stem Red Roses',
    price: '70000',
    category: 'roses',
    image: roses10,
    description: 'Elegant 10 red roses arrangement',
  },
  {
    id: '7',
    name: 'Red Rose Box',
    price: '182500',
    category: 'boxes',
    image: roseBox1,
    description: 'Luxurious red roses in an elegant box',
  },
  {
    id: '8',
    name: 'Red Rose Box 2',
    price: '217000',
    category: 'boxes',
    image: roseBox2,
    description: 'Premium red rose box arrangement',
  },
  {
    id: '9',
    name: 'Heartshape Box',
    price: '188000',
    category: 'boxes',
    image: heartBox,
    description: 'Romantic heart-shaped box filled with fresh roses',
    featured: true,
  },
  {
    id: '10',
    name: '30 Mixed Rose Bouquet',
    price: '215000',
    category: 'mixed',
    image: mixed30,
    description: 'Beautiful mix of 30 colorful roses',
  },
  {
    id: '11',
    name: 'Colorful Mixed Rose Bouquet',
    price: '355000',
    category: 'mixed',
    image: mixedColorful,
    description: 'Vibrant collection of mixed color roses',
    featured: true,
  },
  {
    id: '12',
    name: 'Mixed Standard Bouquet',
    price: '190000',
    category: 'mixed',
    image: mixedStandard,
    description: 'Standard mixed flower arrangement',
  },
  {
    id: '13',
    name: 'Mixed Box Flower Arrangement',
    price: '185000',
    category: 'boxes',
    image: mixedBox,
    description: 'Mixed flowers beautifully arranged in a box',
  },
  {
    id: '14',
    name: "Pink Roses and Baby's Breath Mix",
    price: '170500',
    category: 'mixed',
    image: pinkBabyBreath,
    description: "Delicate pink roses with baby's breath",
  },
  {
    id: '15',
    name: "20 Roses as Baby's Breath",
    price: '179500',
    category: 'mixed',
    image: roses20Baby,
    description: "20 roses paired with soft baby's breath",
  },
  {
    id: '16',
    name: 'Elegant Lush Red Rose',
    price: '74000',
    category: 'roses',
    image: elegantLush,
    description: 'Elegant red rose arrangement',
  },
  {
    id: '17',
    name: 'Elegant Mini Bouquet',
    price: '45000',
    category: 'mixed',
    image: miniMixed,
    description: 'Charming mini mixed bouquet',
  },
  {
    id: '18',
    name: 'Elegant Mixed Bouquet of Flowers',
    price: '150000',
    category: 'mixed',
    image: elegantMixed,
    description: 'Sophisticated mixed flower bouquet',
  },
  {
    id: '19',
    name: 'Elegant Lush Mini Red Roses',
    price: '69000',
    category: 'roses',
    image: miniRed,
    description: 'Lush mini red rose arrangement',
  },
  {
    id: '20',
    name: 'Elegant Dozen Mixed Roses',
    price: '89000',
    category: 'mixed',
    image: dozenMixed,
    description: 'A dozen mixed roses elegantly arranged',
  },
  {
    id: '21',
    name: 'Elegant Mini Red Roses',
    price: '50000',
    category: 'roses',
    image: miniRedRoses,
    description: 'Cute mini red roses bouquet',
  },
  {
    id: '22',
    name: 'Luxury Mini Red Rose',
    price: '85000',
    category: 'roses',
    image: luxuryMini,
    description: 'Luxury mini red rose arrangement',
  },
  {
    id: '23',
    name: 'Ferrero Rocher Chocolate Cakes',
    price: '20000',
    category: 'extras',
    image: ferreroRocher,
    description: 'Delicious Ferrero Rocher chocolate cakes',
  },
  {
    id: '24',
    name: 'Gold Champagne',
    price: '14000',
    category: 'extras',
    note: 'per bottle',
    image: champagne,
    description: 'Premium gold champagne to celebrate',
  },
  {
    id: '25',
    name: 'Elegant Mixed Box of Rose with Balloon',
    price: '202000',
    category: 'boxes',
    image: mixedBoxBalloon,
    description: 'Mixed roses in elegant box with balloon',
  },
  {
    id: '26',
    name: 'Elegant Luxury Combo 100, 50 and 25 Stems',
    price: '1132000',
    originalPrice: '1232000',
    category: 'roses',
    sale: true,
    image: luxuryCombo,
    description: 'Ultimate luxury combo with 100, 50, and 25 stem arrangements',
    featured: true,
  },
  {
    id: '27',
    name: 'Luxury Latina Wine',
    price: '18500',
    category: 'extras',
    image: wine,
    description: 'Fine Luxury Latina wine',
  },
  {
    id: '28',
    name: 'Special Mini Cakes',
    price: '3500',
    category: 'extras',
    image: specialCakes,
    description: 'Special mini cakes for celebrations',
  },
  {
    id: '29',
    name: 'Luxury Mini Cakes',
    price: '3000',
    category: 'extras',
    image: luxuryCakes,
    description: 'Luxury mini cakes',
  },
  {
    id: '30',
    name: '50 Mixed Pink Rose Bouquet',
    price: '335000',
    category: 'mixed',
    image: pinkMixed50,
    description: 'Stunning bouquet of 50 mixed pink roses',
  },
];

export const categories = [
  { id: 'all', name: 'All Products', count: products.length },
  { id: 'roses', name: 'Red Roses', count: products.filter(p => p.category === 'roses').length },
  { id: 'mixed', name: 'Mixed Bouquets', count: products.filter(p => p.category === 'mixed').length },
  { id: 'boxes', name: 'Box Arrangements', count: products.filter(p => p.category === 'boxes').length },
  { id: 'extras', name: 'Extras', count: products.filter(p => p.category === 'extras').length },
];