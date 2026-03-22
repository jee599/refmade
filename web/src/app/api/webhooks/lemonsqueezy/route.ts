import { NextRequest } from "next/server";
import { verifyWebhookSignature } from "@/lib/lemonsqueezy";
import { CREDIT_PACKS } from "@/types/credits";

export async function POST(request: NextRequest) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-signature") ?? "";

  if (!verifyWebhookSignature(rawBody, signature, secret)) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const eventName = event.meta?.event_name;

  if (eventName === "order_created") {
    const customData = event.meta?.custom_data;
    const userId = customData?.user_id;
    const creditPackId = customData?.credit_pack_id;

    if (!userId || !creditPackId) {
      return Response.json(
        { error: "Missing custom data" },
        { status: 400 }
      );
    }

    const pack = CREDIT_PACKS.find((p) => p.id === creditPackId);
    if (!pack) {
      return Response.json(
        { error: "Unknown credit pack" },
        { status: 400 }
      );
    }

    // TODO: DB 연동 시 활성화
    // await db.user.update({
    //   where: { id: userId },
    //   data: { credits: { increment: pack.credits } },
    // });

    console.log(
      `[LemonSqueezy] Order created: userId=${userId}, pack=${creditPackId}, credits=${pack.credits}`
    );
  }

  return Response.json({ received: true });
}
