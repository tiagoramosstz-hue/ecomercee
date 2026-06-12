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
    img: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg',
    description: 'A camisa oficial da seleção francesa. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'europa',
  },
  {
    name: 'Camisa Alemanha',
    price: 35000,
    sku: 'AL-01',
    img: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
    description: 'A camisa oficial da seleção alemã. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'europa',
  },
  {
    name: 'Camisa Argentina',
    price: 32000,
    sku: 'AR-01',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg',
    description: 'A camisa oficial da seleção argentina. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'america',
  },
  {
    name: 'Camisa Brasil',
    price: 32000,
    sku: 'BR-01',
    img: 'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg',
    description: 'A camisa oficial da seleção brasileira. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'america',
  },
  {
    name: 'Camisa Japão',
    price: 40000,
    sku: 'JP-01',
    img: 'https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg',
    description: 'A camisa oficial da seleção japonesa. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'asia',
  },
  {
    name: 'Camisa Coreia do Sul',
    price: 28000,
    sku: 'KN-01',
    img: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg',
    description: 'A camisa oficial da seleção sul-coreana. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'asia',
  },
  {
    name: 'Camisa Nova Zelândia',
    price: 28000,
    sku: 'NZ-01',
    img: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg',
    description: 'A camisa oficial da seleção neozelandesa. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'oceania',
  },
  {
    name: 'Camisa Irã',
    price: 28000,
    sku: 'IR-01',
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg',
    description: 'A camisa oficial da seleção iraniana. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'asia',
  },
  {
    name: 'Camisa México',
    price: 30000,
    sku: 'MX-01',
    img: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg',
    description: 'A camisa oficial da seleção mexicana. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'america',
  },
  {
    name: 'Camisa EUA',
    price: 30000,
    sku: 'US-01',
    img: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    description: 'A camisa oficial da seleção norte-americana. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'america',
  },
  {
    name: 'Camisa Canadá',
    price: 28000,
    sku: 'CA-01',
    img: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg',
    description: 'A camisa oficial da seleção canadense. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'america',
  },
  {
    name: 'Camisa Portugal',
    price: 35000,
    sku: 'PT-01',
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg',
    description: 'A camisa oficial da seleção portuguesa. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'europa',
  },
  {
    name: 'Camisa República Tcheca',
    price: 32000,
    sku: 'CT-01',
    img: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg',
    description: 'A camisa oficial da seleção tcheca. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'europa',
  },
  {
    name: 'Camisa Croácia',
    price: 35000,
    sku: 'CR-01',
    img: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Flag_of_Croatia.svg',
    description: 'A camisa oficial da seleção croata. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'europa',
  },
  {
    name: 'Camisa Uruguai',
    price: 32000,
    sku: 'UR-01',
    img: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Uruguay.svg',
    description: 'A camisa oficial da seleção uruguaia. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'america',
  },
  {
    name: 'Camisa Paraguai',
    price: 30000,
    sku: 'PY-01',
    img: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_Paraguay.svg',
    description: 'A camisa oficial da seleção paraguaia. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'america',
  },
  {
    name: 'Camisa Colômbia',
    price: 32000,
    sku: 'CO-01',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg',
    description: 'A camisa oficial da seleção colombiana. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'america',
  },
  {
    name: 'Camisa Bélgica',
    price: 35000,
    sku: 'BE-01',
    img: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg',
    description: 'A camisa oficial da seleção belga. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'europa',
  },
  {
    name: 'Camisa Inglaterra',
    price: 35000,
    sku: 'EN-01',
    img: 'https://upload.wikimedia.org/wikipedia/en/b/be/Flag_of_England.svg',
    description: 'A camisa oficial da seleção inglesa. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'europa',
  },
  {
    name: 'Camisa Marrocos',
    price: 30000,
    sku: 'MA-01',
    img: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Flag_of_Morocco.svg',
    description: 'A camisa oficial da seleção marroquina. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'africa',
  },
  {
    name: 'Camisa África do Sul',
    price: 28000,
    sku: 'ZA-01',
    img: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg',
    description: 'A camisa oficial da seleção sul-africana. Modelo exclusivo com tecido tecnológico AeroFlow® para colecionadores e torcedores exigentes.',
    continent: 'africa',
  },
  {
    name: 'Camisa Haiti',
    price: 28000,
    sku: 'HT-01',
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Flag_of_Haiti.svg',
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
