// seed.mjs — run with: node seed.mjs
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// ✅ URLs públicas e permanentes — sem depender de arquivos locais
const products = [
  {
    name: 'Camisa França',
    price: 35000,
    sku: 'FR-01',
    img: '/images/camisa-franca.png',
    description: 'A camisa oficial da seleção francesa. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'europa',
  },
  {
    name: 'Camisa Alemanha',
    price: 35000,
    sku: 'AL-01',
    img: '/images/camisa-alemanha.png',
    description: 'A camisa oficial da seleção alemã. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'europa',
  },
  {
    name: 'Camisa Argentina',
    price: 32000,
    sku: 'AR-01',
    img: '/images/camisa-argentina.png',
    description: 'A camisa oficial da seleção argentina. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'america',
  },
  {
    name: 'Camisa Brasil',
    price: 32000,
    sku: 'BR-01',
    img: '/images/camisa-brasil.png',
    description: 'A camisa oficial da seleção brasileira. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'america',
  },
  {
    name: 'Camisa Japão',
    price: 40000,
    sku: 'JP-01',
    img: '/images/camisa-japao.png',
    description: 'A camisa oficial da seleção japonesa. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'asia',
  },
  {
    name: 'Camisa Coreia do Sul',
    price: 28000,
    sku: 'KN-01',
    img: '/images/camisa-coreia-norte.png',
    description: 'A camisa oficial da seleção sul-coreana. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'asia',
  },
  {
    name: 'Camisa Nova Zelândia',
    price: 28000,
    sku: 'NZ-01',
    img: '/images/camisa-nova-zelandia.png',
    description: 'A camisa oficial da seleção neozelandesa. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'oceania',
  },
  {
    name: 'Camisa Irã',
    price: 28000,
    sku: 'IR-01',
    img: '/images/camisa-ira.png',
    description: 'A camisa oficial da seleção iraniana. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'asia',
  },
  {
    name: 'Camisa México',
    price: 30000,
    sku: 'MX-01',
    img: '/images/camisa-mexico.png',
    description: 'A camisa oficial da seleção mexicana. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'america',
  },
  {
    name: 'Camisa EUA',
    price: 30000,
    sku: 'US-01',
    img: '/images/camisa-eua.png',
    description: 'A camisa oficial da seleção norte-americana. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'america',
  },
  {
    name: 'Camisa Canadá',
    price: 28000,
    sku: 'CA-01',
    img: '/images/camisa-canada.png',
    description: 'A camisa oficial da seleção canadense. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'america',
  },
  {
    name: 'Camisa Portugal',
    price: 35000,
    sku: 'PT-01',
    img: '/images/camisa-portugal.png',
    description: 'A camisa oficial da seleção portuguesa. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'europa',
  },
  {
    name: 'Camisa República Tcheca',
    price: 32000,
    sku: 'CT-01',
    img: '/images/camisa-republica-tcheca.png',
    description: 'A camisa oficial da seleção tcheca. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'europa',
  },
  {
    name: 'Camisa Croácia',
    price: 35000,
    sku: 'CR-01',
    img: '/images/camisa-croacia.png',
    description: 'A camisa oficial da seleção croata. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'europa',
  },
  {
    name: 'Camisa Uruguai',
    price: 32000,
    sku: 'UR-01',
    img: '/images/camisa-uruguai.png',
    description: 'A camisa oficial da seleção uruguaia. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'america',
  },
  {
    name: 'Camisa Paraguai',
    price: 30000,
    sku: 'PY-01',
    img: '/images/camisa-paraguai.png',
    description: 'A camisa oficial da seleção paraguaia. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'america',
  },
  {
    name: 'Camisa Colômbia',
    price: 32000,
    sku: 'CO-01',
    img: '/images/camisa-colombia.png',
    description: 'A camisa oficial da seleção colombiana. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'america',
  },
  {
    name: 'Camisa Bélgica',
    price: 35000,
    sku: 'BE-01',
    img: '/images/camisa-belgica.png',
    description: 'A camisa oficial da seleção belga. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'europa',
  },
  {
    name: 'Camisa Inglaterra',
    price: 35000,
    sku: 'EN-01',
    img: '/images/camisa-inglaterra.png',
    description: 'A camisa oficial da seleção inglesa. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'europa',
  },
  {
    name: 'Camisa Marrocos',
    price: 30000,
    sku: 'MA-01',
    img: '/images/camisa-marrocos.png',
    description: 'A camisa oficial da seleção marroquina. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'africa',
  },
  {
    name: 'Camisa África do Sul',
    price: 28000,
    sku: 'ZA-01',
    img: '/images/camisa-africa-sul.png',
    description: 'A camisa oficial da seleção sul-africana. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'africa',
  },
  {
    name: 'Camisa Haiti',
    price: 28000,
    sku: 'HT-01',
    img: '/images/camisa-haiti.png',
    description: 'A camisa oficial da seleção haitiana. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'caribe',
  },
];

const sizes = ['P', 'M', 'G', 'GG'];

async function main() {
  console.log('🌱 Starting seed...');

  // ── Admin user ────────────────────────────────────────────────
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const hashed = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: 'admin@ecomercee.com' },
    update: {},
    create: {
      email: 'admin@ecomercee.com',
      password_hash: hashed,
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user created');

  // ── Products + inventory ──────────────────────────────────────
  for (const p of products) {
    const product = await prisma.product.upsert({
      where: { sku: p.sku },
      update: {
        name: p.name,
        price_cents: p.price,
        image_url: p.img,
        description: p.description,
      },
      create: {
        name: p.name,
        description: p.description,
        price_cents: p.price,
        image_url: p.img,
        sku: p.sku,
      },
    });

    for (const size of sizes) {
      await prisma.inventory.upsert({
        where: {
          product_id_size: {
            product_id: product.id,
            size,
          },
        },
        update: { quantity: 50 },
        create: {
          product_id: product.id,
          size,
          quantity: 50,
        },
      });
    }
    console.log(`✅ Seeded: ${p.name}`);
  }

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
