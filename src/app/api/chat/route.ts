import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, userContext } = await req.json();

    const clientApiKey = req.headers.get("x-groq-api-key");
    const apiKey = process.env.GROQ_API_KEY || clientApiKey;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "GROQ_API_KEY_MISSING",
          message:
            "Groq API Key is not configured yet. Add GROQ_API_KEY to your .env.local file or enter it in the AI widget settings.",
        },
        { status: 400 }
      );
    }

    const patientContextStr = userContext
      ? `Patient Profile Context:
- Name: ${userContext.name || "Patient"}
- Blood Pressure: ${userContext.bp || "Not recorded"}
- Fasting Glucose: ${userContext.glucose ? `${userContext.glucose} mg/dL` : "Not recorded"}
- Body Weight: ${userContext.weight ? `${userContext.weight} kg` : "Not recorded"}
- Health Score: ${userContext.score ? `${userContext.score}/100` : "Not recorded"}`
      : "Patient Profile Context: No active biometrics logged yet.";

    const systemPrompt = `You are AuraHealth's Clinical AI Assistant.
Provide clear, concise, and direct health guidance.

${patientContextStr}

Strict Response Rules:
1. KEEP RESPONSES SHORT & CLEAR: Limit answers to 1-2 brief paragraphs or 3-4 bullet points (under 120 words total). Never generate giant tables or long essays.
2. Be Direct: Answer the user's specific question immediately with practical steps (e.g., for PCOS: 3-4 key dietary swaps like low-GI carbs, lean proteins, anti-inflammatory fats).
3. If relevant, briefly mention their recorded vitals.
4. Format: Use clean, short bullet points with bold keywords for easy scanning.
5. End with a 1-sentence medical disclaimer: "Consult your doctor for specific clinical diagnosis and treatment."`;

    const groqPayload = {
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m: { role: string; text: string }) => ({
          role: m.role === "ai" ? "assistant" : "user",
          content: m.text,
        })),
      ],
      temperature: 0.5,
      max_tokens: 350,
    };

    let groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey.trim()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groqPayload),
    });

    // Fallback model if 120b has availability issue
    if (!groqRes.ok && groqRes.status === 404) {
      groqPayload.model = "openai/gpt-oss-20b";
      groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey.trim()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groqPayload),
      });
    }

    if (!groqRes.ok) {
      const errData = await groqRes.json().catch(() => ({}));
      const errorDetail = errData?.error?.message || `Groq API responded with status ${groqRes.status}`;
      return NextResponse.json(
        { error: "GROQ_API_ERROR", message: errorDetail },
        { status: groqRes.status }
      );
    }

    const data = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content || "I was unable to generate a response at this time.";

    return NextResponse.json({ reply });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "An unexpected server error occurred.";
    return NextResponse.json({ error: "INTERNAL_ERROR", message: msg }, { status: 500 });
  }
}
