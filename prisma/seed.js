const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding rich database...');

  // Clear existing data cleanly
  await prisma.review.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.tradeInQuote.deleteMany();

  // 1. MacBook Pro 14" (Laptops / MacBooks)
  await prisma.product.create({
    data: {
      name: 'MacBook Pro 14" M2',
      brand: 'Apple',
      category: 'MacBooks',
      basePrice: 1999.0,
      images: JSON.stringify(['/cinematic_macbook.jpg']),
      specs: JSON.stringify({ cpu: 'Apple M2 Pro (10-Core)', ram: '16GB Unified', storage: '512GB SSD', screen: '14.2" Liquid Retina XDR', battery: '96% capacity' }),
      inventories: {
        create: [
          {
            condition: 'Fair',
            color: 'Space Gray',
            storage: '512GB',
            price: 1399.0,
            stockQuantity: 4,
            reviews: {
              create: [
                {
                  userId: 'usr_mb1',
                  userName: 'Marcus Sterling',
                  rating: 4,
                  comment: 'Functions 100% like new. Light scuffs on bottom casing but screen is perfect!'
                }
              ]
            }
          },
          {
            condition: 'Good',
            color: 'Silver',
            storage: '512GB',
            price: 1549.0,
            stockQuantity: 6,
          },
          {
            condition: 'Excellent',
            color: 'Space Gray',
            storage: '1TB',
            price: 1749.0,
            stockQuantity: 3,
            reviews: {
              create: [
                {
                  userId: 'usr_mb2',
                  userName: 'Elena Rostova',
                  rating: 5,
                  comment: 'Flawless condition. Unbelievable savings compared to buying direct from retail.'
                }
              ]
            }
          }
        ]
      }
    }
  });

  // 2. iPhone 13 Pro (Smartphones)
  await prisma.product.create({
    data: {
      name: 'iPhone 13 Pro',
      brand: 'Apple',
      category: 'Smartphones',
      basePrice: 999.0,
      images: JSON.stringify(['/cinematic_iphone.jpg']),
      specs: JSON.stringify({ screen: '6.1" Super Retina XDR OLED', camera: 'Triple 12MP Pro system', storage: '128GB', battery: '92% capacity' }),
      inventories: {
        create: [
          {
            condition: 'Fair',
            color: 'Sierra Blue',
            storage: '128GB',
            price: 499.0,
            stockQuantity: 8,
            reviews: {
              create: [
                {
                  userId: 'usr_ip1',
                  userName: 'Damon Vance',
                  rating: 5,
                  comment: 'Battery health was at 94% upon arrival. Super responsive and fast dispatch!'
                }
              ]
            }
          },
          {
            condition: 'Good',
            color: 'Graphite',
            storage: '256GB',
            price: 589.0,
            stockQuantity: 5,
          },
          {
            condition: 'Excellent',
            color: 'Gold',
            storage: '256GB',
            price: 649.0,
            stockQuantity: 2,
          }
        ]
      }
    }
  });

  // 3. Apple Watch Series 8 (Smartwatches / Audio & Wearables)
  await prisma.product.create({
    data: {
      name: 'Apple Watch Series 8 (45mm GPS)',
      brand: 'Apple',
      category: 'Great deals',
      basePrice: 429.0,
      images: JSON.stringify(['/promo2.jpg']),
      specs: JSON.stringify({ display: 'Always-On Retina OLED', sensors: 'ECG, Blood Oxygen, Temp', waterResistance: '50m water resistant' }),
      inventories: {
        create: [
          {
            condition: 'Good',
            color: 'Midnight Blue',
            storage: '32GB',
            price: 249.0,
            stockQuantity: 7,
            reviews: {
              create: [
                {
                  userId: 'usr_aw1',
                  userName: 'Sarah Jenkins',
                  rating: 5,
                  comment: 'Came with pristine original magnetic charger. Very satisfied with battery!'
                }
              ]
            }
          },
          {
            condition: 'Excellent',
            color: 'Starlight',
            storage: '32GB',
            price: 289.0,
            stockQuantity: 4,
          }
        ]
      }
    }
  });

  // 4. iPad Air 5th Gen (iPads / Tablets)
  await prisma.product.create({
    data: {
      name: 'iPad Air 5th Gen M1',
      brand: 'Apple',
      category: 'iPads',
      basePrice: 599.0,
      images: JSON.stringify(['/ipad.jpg']),
      specs: JSON.stringify({ cpu: 'Apple M1 Chip', screen: '10.9" Liquid Retina', storage: '64GB / 256GB', applePencil: 'Gen 2 Compatible' }),
      inventories: {
        create: [
          {
            condition: 'Fair',
            color: 'Space Gray',
            storage: '64GB',
            price: 389.0,
            stockQuantity: 5,
          },
          {
            condition: 'Good',
            color: 'Blue',
            storage: '64GB',
            price: 439.0,
            stockQuantity: 3,
            reviews: {
              create: [
                {
                  userId: 'usr_ipd1',
                  userName: 'Kaelen Brody',
                  rating: 5,
                  comment: 'The M1 chip on this iPad handles Procreate like a dream. Not a single scratch on glass.'
                }
              ]
            }
          },
          {
            condition: 'Excellent',
            color: 'Purple',
            storage: '256GB',
            price: 519.0,
            stockQuantity: 2,
          }
        ]
      }
    }
  });

  // 5. AirPods Pro (2nd Gen) (Audio)
  await prisma.product.create({
    data: {
      name: 'AirPods Pro 2nd Gen with MagSafe',
      brand: 'Apple',
      category: 'Audio',
      basePrice: 249.0,
      images: JSON.stringify(['/airpods.jpg']),
      specs: JSON.stringify({ anc: 'Active Noise Cancellation 2x', audio: 'Adaptive Transparency & Spatial Audio', battery: 'Up to 30 hours with case' }),
      inventories: {
        create: [
          {
            condition: 'Good',
            color: 'White',
            storage: 'Standard',
            price: 159.0,
            stockQuantity: 9,
          },
          {
            condition: 'Excellent',
            color: 'White',
            storage: 'Standard',
            price: 179.0,
            stockQuantity: 4,
            reviews: {
              create: [
                {
                  userId: 'usr_ap1',
                  userName: 'Jessica Liang',
                  rating: 5,
                  comment: 'Professionally sanitized, pristine ear tips included. Noise cancellation is magic.'
                }
              ]
            }
          }
        ]
      }
    }
  });

  // 6. PlayStation 5 Digital Edition (Consoles)
  await prisma.product.create({
    data: {
      name: 'PlayStation 5 Digital Edition',
      brand: 'Sony',
      category: 'Consoles',
      basePrice: 449.0,
      images: JSON.stringify(['/console.jpg']),
      specs: JSON.stringify({ resolution: 'Up to 4K 120fps & 8K HDR', storage: '825GB Ultra-High Speed SSD', controller: 'DualSense Wireless included' }),
      inventories: {
        create: [
          {
            condition: 'Good',
            color: 'White/Black',
            storage: '825GB',
            price: 349.0,
            stockQuantity: 4,
            reviews: {
              create: [
                {
                  userId: 'usr_ps1',
                  userName: 'Carlos Mendes',
                  rating: 5,
                  comment: 'Whisper quiet fan, flawless DualSense controller. Saved $100 off MSRP.'
                }
              ]
            }
          },
          {
            condition: 'Excellent',
            color: 'White/Black',
            storage: '825GB',
            price: 389.0,
            stockQuantity: 2,
          }
        ]
      }
    }
  });

  // 7. Sony WH-1000XM5 (Audio)
  await prisma.product.create({
    data: {
      name: 'Sony WH-1000XM5 Wireless ANC',
      brand: 'Sony',
      category: 'Audio',
      basePrice: 399.0,
      images: JSON.stringify(['/headphones_xm5.jpg']),
      specs: JSON.stringify({ driver: '30mm Carbon Dome', anc: 'Auto NC Optimizer & 8 Mics', battery: '30h Playback w/ Quick Charge', weight: '250g Lightweight' }),
      inventories: {
        create: [
          {
            condition: 'Fair',
            color: 'Black',
            storage: 'N/A',
            price: 249.0,
            stockQuantity: 5,
          },
          {
            condition: 'Good',
            color: 'Black',
            storage: 'N/A',
            price: 279.0,
            stockQuantity: 7,
            reviews: {
              create: [
                {
                  userId: 'usr_xm5_1',
                  userName: 'Nadia Putri',
                  rating: 5,
                  comment: 'Noise cancelling luar biasa hening. Kondisi fisik mulus tanpa goresan sama sekali!'
                }
              ]
            }
          },
          {
            condition: 'Excellent',
            color: 'Black',
            storage: 'N/A',
            price: 319.0,
            stockQuantity: 3,
          }
        ]
      }
    }
  });

  // 8. Nintendo Switch OLED (Consoles)
  await prisma.product.create({
    data: {
      name: 'Nintendo Switch OLED Edition',
      brand: 'Nintendo',
      category: 'Consoles',
      basePrice: 349.0,
      images: JSON.stringify(['/switch_oled.jpg']),
      specs: JSON.stringify({ display: '7.0" Deep Contrast OLED', storage: '64GB Internal + LAN Dock', audio: 'Enhanced Stereo Speakers', battery: 'Up to 9h battery life' }),
      inventories: {
        create: [
          {
            condition: 'Good',
            color: 'White Joy-Con',
            storage: '64GB',
            price: 259.0,
            stockQuantity: 6,
            reviews: {
              create: [
                {
                  userId: 'usr_sw1',
                  userName: 'Bima Santoso',
                  rating: 5,
                  comment: 'Layar OLED-nya super tajam dan jernih. Joycon no-drift, tombol responsif 100%!'
                }
              ]
            }
          },
          {
            condition: 'Excellent',
            color: 'White Joy-Con',
            storage: '64GB',
            price: 289.0,
            stockQuantity: 4,
          }
        ]
      }
    }
  });

  // 9. Apple Watch Ultra 2 (Great deals / Wearables)
  await prisma.product.create({
    data: {
      name: 'Apple Watch Ultra 2 (49mm Titanium)',
      brand: 'Apple',
      category: 'Great deals',
      basePrice: 799.0,
      images: JSON.stringify(['/watch_ultra.jpg']),
      specs: JSON.stringify({ case: '49mm Aerospace Titanium', brightness: '3000 Nits Sapphire Glass', depth: '100m Water & EN13319 Dive', battery: '72h Low Power Mode' }),
      inventories: {
        create: [
          {
            condition: 'Good',
            color: 'Titanium Natural',
            storage: '64GB',
            price: 599.0,
            stockQuantity: 3,
            reviews: {
              create: [
                {
                  userId: 'usr_wult1',
                  userName: 'Reza Fahlevi',
                  rating: 5,
                  comment: 'Baterai masih 98% health. Sangat kokoh untuk outdoor dan olahraga berat.'
                }
              ]
            }
          },
          {
            condition: 'Excellent',
            color: 'Titanium Natural',
            storage: '64GB',
            price: 649.0,
            stockQuantity: 2,
          }
        ]
      }
    }
  });

  // 10. Samsung Galaxy S24 Ultra (Smartphones)
  await prisma.product.create({
    data: {
      name: 'Samsung Galaxy S24 Ultra 5G',
      brand: 'Samsung',
      category: 'Smartphones',
      basePrice: 1299.0,
      images: JSON.stringify(['/galaxy_s24.jpg']),
      specs: JSON.stringify({ screen: '6.8" QHD+ Dynamic AMOLED 2X', camera: '200MP Quad Zoom & Galaxy AI', chipset: 'Snapdragon 8 Gen 3 for Galaxy', stylus: 'Built-in S-Pen Titanium' }),
      inventories: {
        create: [
          {
            condition: 'Fair',
            color: 'Titanium Gray',
            storage: '256GB',
            price: 799.0,
            stockQuantity: 4,
          },
          {
            condition: 'Good',
            color: 'Titanium Gray',
            storage: '512GB',
            price: 889.0,
            stockQuantity: 5,
            reviews: {
              create: [
                {
                  userId: 'usr_s24_1',
                  userName: 'Arif Wibowo',
                  rating: 5,
                  comment: 'Hasil kamera zoom 100x jernih banget. Layar flat anti-reflective super mewah.'
                }
              ]
            }
          },
          {
            condition: 'Excellent',
            color: 'Titanium Black',
            storage: '512GB',
            price: 969.0,
            stockQuantity: 2,
          }
        ]
      }
    }
  });

  // 11. Steam Deck OLED (Consoles)
  await prisma.product.create({
    data: {
      name: 'Valve Steam Deck OLED (1TB)',
      brand: 'Valve',
      category: 'Consoles',
      basePrice: 649.0,
      images: JSON.stringify(['/steam_deck.jpg']),
      specs: JSON.stringify({ screen: '7.4" 90Hz HDR OLED Panel', apu: '6nm AMD Custom Zen 2 + RDNA 2', storage: '1TB High-Speed NVMe SSD', battery: '50Wh battery w/ 45W Type-C' }),
      inventories: {
        create: [
          {
            condition: 'Good',
            color: 'Matte Black',
            storage: '1TB',
            price: 499.0,
            stockQuantity: 4,
            reviews: {
              create: [
                {
                  userId: 'usr_sd1',
                  userName: 'Kevin Pratama',
                  rating: 5,
                  comment: 'Layar 90Hz OLED warna hitam pekat sempurna. Main Cyberpunk lancar jaya!'
                }
              ]
            }
          },
          {
            condition: 'Excellent',
            color: 'Matte Black',
            storage: '1TB',
            price: 549.0,
            stockQuantity: 2,
          }
        ]
      }
    }
  });

  // Seed sample Trade-In Quote
  await prisma.tradeInQuote.create({
    data: {
      deviceModel: 'iPhone 12 128GB',
      declaredCondition: 'Good',
      estimatedValue: 245.0,
    }
  });

  console.log('Seeding completed successfully with 11 certified products, multiple SKUs, and authentic reviews!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
