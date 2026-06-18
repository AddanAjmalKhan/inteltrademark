import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message, formType = "Contact Form" } = body;

    if (!name || !email) {
      return Response.json({ error: "Name and email are required." }, { status: 400 });
    }

    const to = process.env.CONTACT_EMAIL;
    const from = process.env.RESEND_FROM || "onboarding@resend.dev";

    if (!to) {
      return Response.json({ error: "Server misconfiguration: CONTACT_EMAIL not set." }, { status: 500 });
    }

    /* ── Notify the firm ── */
    const { error: firmError } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[Intel Trademark] New ${formType} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #121943; padding: 24px; text-align: center;">
            <h1 style="color: #EAB308; margin: 0; font-size: 20px; letter-spacing: 1px;">INTEL TRADEMARK</h1>
            <p style="color: #9ca3af; margin: 4px 0 0; font-size: 12px;">New ${formType} Submission</p>
          </div>
          <div style="padding: 32px; background: #f9fafb; border: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; width: 120px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #111827;">${name}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #111827;"><a href="mailto:${email}" style="color: #EAB308;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #111827;">${phone}</td></tr>` : ""}
              ${service ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Service</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #111827;">${service}</td></tr>` : ""}
              ${message ? `<tr><td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Message</td><td style="padding: 10px 0; color: #374151; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td></tr>` : ""}
            </table>
          </div>
          <div style="padding: 16px 32px; background: #fff; border: 1px solid #e5e7eb; border-top: none; text-align: right;">
            <a href="mailto:${email}" style="background: #EAB308; color: #fff; padding: 10px 20px; text-decoration: none; font-weight: bold; font-size: 13px;">Reply to ${name}</a>
          </div>
        </div>
      `,
    });

    if (firmError) {
      console.error("[contact/route] Resend error (firm email):", firmError);
      return Response.json({ error: firmError.message }, { status: 500 });
    }

    /* ── Auto-reply to the client ── */
    const { error: replyError } = await resend.emails.send({
      from,
      to: email,
      subject: "We received your enquiry — Intel Trademark",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #121943; padding: 24px; text-align: center;">
            <h1 style="color: #EAB308; margin: 0; font-size: 20px; letter-spacing: 1px;">INTEL TRADEMARK</h1>
          </div>
          <div style="padding: 32px; background: #f9fafb; border: 1px solid #e5e7eb;">
            <h2 style="color: #121943; margin-top: 0;">Thank you, ${name}!</h2>
            <p style="color: #374151; line-height: 1.7;">We have received your enquiry and one of our IP attorneys will get back to you within <strong>24 business hours</strong>.</p>
            <p style="color: #374151; line-height: 1.7;">If your matter is urgent, please call us directly at the number on our website.</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">Intel Trademark &mdash; Protecting your ideas since 2019.</p>
          </div>
        </div>
      `,
    });

    if (replyError) {
      // Auto-reply failed but the main notification succeeded — still a partial success
      console.error("[contact/route] Resend error (auto-reply):", replyError);
    }

    /* ── Save lead to dashboard ── */
    try {
      await fetch(`${process.env.DASHBOARD_URL}/api/public/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-secret": process.env.CONTACT_API_SECRET ?? "",
        },
        body: JSON.stringify({ name, email, phone: phone ?? null, source: "IntelTrademark" }),
      });
    } catch {
      // Non-fatal — email already sent successfully
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("[contact/route] unexpected error:", err);
    return Response.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
