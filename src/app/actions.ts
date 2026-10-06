'use server';

import { prisma } from "@/lib/db/prisma";

export async function getProducts(category?: string, query?: string) {
  try {
    const whereClause: Record<string, unknown> = {};

    if (category && category !== 'All' && category !== 'Great deals') {
      whereClause.category = {
        equals: category,
      };
    }

    if (query && query.trim() !== '') {
      whereClause.OR = [
        { name: { contains: query } },
        { brand: { contains: query } },
        { category: { contains: query } },
      ];
    }

    return await prisma.product.findMany({
      where: whereClause,
      include: {
        inventories: {
          include: {
            reviews: true,
          }
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    return await prisma.product.findUnique({
      where: { id },
      include: {
        inventories: {
          include: {
            reviews: true,
          }
        }
      }
    });
  } catch (error) {
    console.error("Failed to get product:", error);
    return null;
  }
}

export async function getReviews() {
  try {
    return await prisma.review.findMany({
      include: {
        inventory: {
          include: {
            product: true
          }
        }
      },
      take: 10,
      orderBy: { date: 'desc' }
    });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return [];
  }
}

export async function createTradeInQuote(formData: {
  deviceModel: string;
  declaredCondition: string;
  estimatedValue: number;
}) {
  try {
    const quote = await prisma.tradeInQuote.create({
      data: {
        deviceModel: formData.deviceModel,
        declaredCondition: formData.declaredCondition,
        estimatedValue: formData.estimatedValue,
      }
    });
    return { success: true, quote };
  } catch (error) {
    console.error("Failed to save trade-in quote:", error);
    return { success: false, error: "Could not create quote" };
  }
}

export async function subscribeNewsletter(email: string) {
  if (!email || !email.includes('@')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }
  // Simulate database or marketing provider storage
  return { 
    success: true, 
    message: 'Selamat datang di BaruLagi! Gunakan kode kupon WELCOME20 untuk potongan hemat $20 pada gawai pertama Anda.' 
  };
}

export async function submitReview(data: {
  inventoryId: string;
  userName: string;
  rating: number;
  comment: string;
}) {
  try {
    const newReview = await prisma.review.create({
      data: {
        userId: 'guest_user_' + Math.random().toString(36).substring(7),
        userName: data.userName || 'Verified Buyer',
        inventoryId: data.inventoryId,
        rating: Math.min(5, Math.max(1, data.rating)),
        comment: data.comment,
      },
      include: {
        inventory: {
          include: {
            product: true,
          }
        }
      }
    });
    return { success: true, review: newReview };
  } catch (error) {
    console.error("Failed to submit review:", error);
    return { success: false, error: "Failed to submit review" };
  }
}
