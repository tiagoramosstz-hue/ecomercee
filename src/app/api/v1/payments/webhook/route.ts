import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2025-02-24.acacia',
  });
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const paymentIntentId = session.payment_intent as string;
      const metadata = session.metadata;
      let orderItems = [];
      
      if (metadata && metadata.orderItems) {
         orderItems = JSON.parse(metadata.orderItems);
      }

      // Tratamento de Idempotência
      const existingOrder = await prisma.order.findUnique({
        where: { stripe_payment_intent_id: paymentIntentId }
      });

      if (!existingOrder) {
        const customerEmail = session.customer_details?.email || 'guest@example.com';
        
        let user = await prisma.user.findUnique({ where: { email: customerEmail }});
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: customerEmail,
              password_hash: 'guest',
              role: 'CLIENT'
            }
          });
        }

        const newOrder = await prisma.order.create({
          data: {
            user_id: user.id,
            stripe_payment_intent_id: paymentIntentId,
            status: 'PAID',
            total_price_cents: session.amount_total || 0,
            items: {
              create: orderItems.map((item: any) => ({
                product_id: item.productId,
                size: item.size,
                quantity: item.quantity,
                custom_name: item.customName,
                custom_number: item.customNumber,
                price_at_purchase_cents: 0,
              }))
            }
          }
        });

        // Update inventory
        for (const item of orderItems) {
          const inv = await prisma.inventory.findFirst({
            where: { product_id: item.productId, size: item.size }
          });
          if (inv) {
            await prisma.inventory.update({
              where: { id: inv.id },
              data: { quantity: Math.max(0, inv.quantity - item.quantity) }
            });
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook handler error:', err);
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 });
  }
}
