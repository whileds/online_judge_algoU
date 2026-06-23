const AI_TIMEOUT_MS = 30000;
const DEFAULT_MODEL = "gemini-3.5-flash";

const getResponseText = (data) => data.candidates
    ?.flatMap((candidate) => candidate.content?.parts || [])
    .map((part) => part.text || "")
    .join("")
    .trim();

const reviewCode = async (req, res) => {
    const { code, language = "cpp" } = req.body;

    if (typeof code !== "string" || code.trim() === "") {
        return res.status(400).json({ message: "Code is required for AI review" });
    }

    if (!process.env.GEMINI_API_KEY) {
        return res.status(503).json({
            message: "AI review is not configured. Add GEMINI_API_KEY to backend/.env."
        });
    }

    const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": process.env.GEMINI_API_KEY
                },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{
                            text: [
                                "You are a concise expert code reviewer.",
                                "Review correctness, complexity, edge cases, security, and readability.",
                                "Use Markdown with short sections.",
                                "Do not rewrite the entire program unless a small corrected snippet is necessary."
                            ].join(" ")
                        }]
                    },
                    contents: [{
                        role: "user",
                        parts: [{
                            text: `Review this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.2,
                        maxOutputTokens: 1200
                    }
                }),
                signal: controller.signal
            }
        );

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            console.error("Gemini API error:", response.status, data.error?.message);
            return res.status(502).json({
                message: data.error?.message || "AI review service returned an error"
            });
        }

        const review = getResponseText(data);
        if (!review) {
            return res.status(502).json({ message: "AI review service returned no review" });
        }

        return res.status(200).json({ review });
    } catch (error) {
        if (error.name === "AbortError") {
            return res.status(504).json({ message: "AI review timed out" });
        }

        console.error("AI review failed:", error.message);
        return res.status(502).json({ message: "Could not connect to the AI review service" });
    } finally {
        clearTimeout(timeout);
    }
};

module.exports = { reviewCode };
