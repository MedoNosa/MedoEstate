import { Webhook } from 'svix';

export async function POST(req) {
  const CLERK_WEBHOOK_SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!CLERK_WEBHOOK_SIGNING_SECRET) {
    throw new Error('CLERK_WEBHOOK_SIGNING_SECRET is not set in environment variables');
  }

  const wh = new Webhook(CLERK_WEBHOOK_SIGNING_SECRET);

  const svix_id = req.headers.get('svix-id');
  const svix_timestamp = req.headers.get('svix-timestamp');
  const svix_signature = req.headers.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing required headers', { status: 400 });
  }

  const body = await req.text();
  let evt;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return new Response('Invalid webhook signature', { status: 400 });
  }

  const payload = JSON.parse(body);
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === 'user.created') {
    console.log("User created");
  }

  if (eventType === 'user.deleted') {
    console.log("User deleted");
  }

  if (eventType === 'user.updated') {
    console.log("User updated");
  }

  return new Response('Webhook received', { status: 200 });
}
