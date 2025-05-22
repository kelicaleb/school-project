/**
 * NOTE: Set CONSUMERKEY and CONSUMERSECRET as environment variables
 * in your Vercel dashboard. Never commit secrets to your codebase.
 */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const consumerKey = process.env.CONSUMERKEY;
  const consumerSecret = process.env.CONSUMERSECRET;

  if (!consumerKey || !consumerSecret) {
    return res
      .status(500)
      .json({ error: "Missing CONSUMERKEY or CONSUMERSECRET env vars" });
  }

  try {
    // Step 1: Get access token
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
      "base64"
    );
    const tokenResponse = await fetch(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error("Failed to acquire M-Pesa access token");
    }
    const accessToken = tokenData.access_token;

    // Step 2: Make STK Push
    const {
      Amount,
      PhoneNumber,
      Product // Could add other optional fields
    } = req.body;

    // (The following fields should eventually come from req.body or a helper; hardcoded here for demo compatibility with old code)
    const stkBody = {
      BusinessShortCode: 174379,
      Password: "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjUwMzE1MTgzNjIy",
      Timestamp: "20250315183622", // should be now in prod!
      TransactionType: "CustomerPayBillOnline",
      Amount,
      PartyA: PhoneNumber,
      PartyB: 174379,
      PhoneNumber,
      CallBackURL: "https://mydomain.com/path",
      AccountReference: "Bloo",
      TransactionDesc: `Payment of ${Product}`,
    };

    const stkResponse = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(stkBody),
      }
    );
    const stkResult = await stkResponse.json();

    return res.status(200).json({ message: "Posted", result: stkResult });
  } catch (error) {
    console.error("STK push error:", error.message || error);
    return res.status(500).json({ error: "Failed to initiate payment" });
  }
}

