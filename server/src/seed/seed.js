import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    brand: "Apple",
    category: "Smartphones",
    description:
      "iPhone 17 Pro with powerful performance, advanced camera system and premium design.",
    mrp: 134900,
    price: 127400,

    images: [
      "https://images.unsplash.com/photo-1592286927505-2fdc2b0e9f77",
    ],

    variants: [
      {
        name: "Storage",
        value: "256GB",
        image:
          "https://images.unsplash.com/photo-1592286927505-2fdc2b0e9f77",
      },
      {
        name: "Storage",
        value: "512GB",
        image:
          "https://images.unsplash.com/photo-1592286927505-2fdc2b0e9f77",
      },
      {
        name: "Color",
        value: "Silver",
        image:
          "https://images.unsplash.com/photo-1592286927505-2fdc2b0e9f77",
      },
    ],

    emiPlans: [
      {
        tenure: 3,
        monthlyAmount: 42467,
        interestRate: 0,
        cashback: 1500,
      },
      {
        tenure: 6,
        monthlyAmount: 21233,
        interestRate: 0,
        cashback: 1500,
      },
      {
        tenure: 12,
        monthlyAmount: 10617,
        interestRate: 0,
        cashback: 2000,
      },
      {
        tenure: 24,
        monthlyAmount: 5721,
        interestRate: 10.5,
        cashback: 2500,
      },
      {
        tenure: 36,
        monthlyAmount: 4095,
        interestRate: 10.5,
        cashback: 2500,
      },
    ],
  },

  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    brand: "Samsung",
    category: "Smartphones",
    description:
      "Samsung Galaxy S24 Ultra with a premium display, powerful processor and advanced camera.",
    mrp: 134999,
    price: 119999,

    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
    ],

    variants: [
      {
        name: "Storage",
        value: "256GB",
        image:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
      },
      {
        name: "Storage",
        value: "512GB",
        image:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
      },
      {
        name: "Color",
        value: "Titanium Black",
        image:
          "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
      },
    ],

    emiPlans: [
      {
        tenure: 3,
        monthlyAmount: 40000,
        interestRate: 0,
        cashback: 1000,
      },
      {
        tenure: 6,
        monthlyAmount: 20000,
        interestRate: 0,
        cashback: 1500,
      },
      {
        tenure: 12,
        monthlyAmount: 10000,
        interestRate: 0,
        cashback: 2000,
      },
      {
        tenure: 24,
        monthlyAmount: 5395,
        interestRate: 10.5,
        cashback: 2000,
      },
      {
        tenure: 36,
        monthlyAmount: 3860,
        interestRate: 10.5,
        cashback: 2500,
      },
    ],
  },

  {
    name: "OnePlus 13",
    slug: "oneplus-13",
    brand: "OnePlus",
    category: "Smartphones",
    description:
      "OnePlus 13 featuring flagship performance, a high refresh-rate display and fast charging.",
    mrp: 74999,
    price: 69999,

    images: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
    ],

    variants: [
      {
        name: "Storage",
        value: "256GB",
        image:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      },
      {
        name: "Storage",
        value: "512GB",
        image:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      },
      {
        name: "Color",
        value: "Black",
        image:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      },
    ],

    emiPlans: [
      {
        tenure: 3,
        monthlyAmount: 23333,
        interestRate: 0,
        cashback: 500,
      },
      {
        tenure: 6,
        monthlyAmount: 11667,
        interestRate: 0,
        cashback: 750,
      },
      {
        tenure: 12,
        monthlyAmount: 5833,
        interestRate: 0,
        cashback: 1000,
      },
      {
        tenure: 24,
        monthlyAmount: 3150,
        interestRate: 10.5,
        cashback: 1000,
      },
      {
        tenure: 36,
        monthlyAmount: 2250,
        interestRate: 10.5,
        cashback: 1500,
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("✅ Products seeded successfully");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();