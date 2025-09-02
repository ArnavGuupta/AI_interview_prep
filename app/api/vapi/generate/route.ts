import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomImageCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
    return Response.json({ success: true, data: "Thank you" }, { status: 200 });
}

export async function POST(request: Request) {
    const { type, role, techstack, amount, userid, level } = await request.json();

    try {
        const { text: questions } = await generateText({
            model: google("gemini-2.0-flash-001"),
            prompt: `Prepare Questions for the Job interview 
        The job role is ${role},
        The job experience is ${level},
        The techstack used is ${techstack},
        The focus between behavioural and technical questions should lean towards ${type},
        The amount of questions is ${amount}.
        Please return ONLY the questions as a valid JSON array like:
        ["Question1", "Question2", "Question3"]
        No extra text, no symbols, no formatting.`,
        });

        let parsedQuestions: string[] = [];
        try {
            parsedQuestions = JSON.parse(questions);
        } catch (error) {
            console.error("Failed to parse questions:", error);
        }

        const interview = {
            role:role,
            type:type,
            techstack: techstack.split(","),
            level:level,
            questions: parsedQuestions,
            userId:userid,
            finalized: true,
            coverImage: getRandomImageCover(),
            createdAt: new Date().toISOString(),
        };

        await db.collection("interviews").add(interview);

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ success: false, error }, { status: 500 });
    }
}
