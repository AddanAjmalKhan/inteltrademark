export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return Response.json({ error: "Valid email is required." }, { status: 400 });
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
    const server = process.env.MAILCHIMP_SERVER_PREFIX;

    if (!apiKey || !audienceId || !server || apiKey === "placeholder-us1") {
      return Response.json({ error: "Newsletter service not configured yet." }, { status: 503 });
    }

    const response = await fetch(
      `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
      {
        method: "POST",
        headers: {
          Authorization: `apikey ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
        }),
      }
    );

    const data = await response.json();

    /* already subscribed → treat as success */
    if (data.title === "Member Exists") {
      return Response.json({ success: true, message: "Already subscribed." });
    }

    if (!response.ok) {
      console.error("[subscribe/route] Mailchimp error:", data);
      return Response.json({ error: "Could not subscribe. Please try again." }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("[subscribe/route] error:", err);
    return Response.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
