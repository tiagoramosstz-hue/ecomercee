import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2025-02-24.acacia',
    });
    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Calcular taxa de personalização extra
    const lineItems = items.map((item: any) => {
      const isCustomized = item.customName || item.customNumber;
      const unitAmount = isCustomized ? item.price + 2000 : item.price; // Adiciona 20,00 se personalizado
      
      return {
        price_data: {
          currency: 'brl',
          product_data: {
            name: `${item.name} (Tamanho: ${item.size})`,
            description: isCustomized ? `Personalizado: ${item.customName || ''} ${item.customNumber || ''}` : undefined,
            images: item.image ? [new URL(item.image, process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').toString()] : [],
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    });

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'boleto'], // Added boleto for Brazil
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/cart`,
      metadata: {
        orderItems: JSON.stringify(items.map((i: any) => ({
          productId: i.productId,
          size: i.size,
          quantity: i.quantity,
          customName: i.customName,
          customNumber: i.customNumber
        })))
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Checkout Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
