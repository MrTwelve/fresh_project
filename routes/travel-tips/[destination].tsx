import { defineRoute } from "$fresh/server.ts";


export default defineRoute(async (req, ctx) => {

    const tip = await fetchCulturalTips(ctx.params.destination);

    return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="font-bold mb-2">Travelling Tip for {ctx.params.destination}</div>
        <div>{tip}</div>
    </div>
    );
});

async function fetchCulturalTips(destination: string) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
        },
        body: JSON.stringify({
            model: "gpt-5-nano",
            messages: [{
                role: "user",
                content: `Give me a travel tip about ${destination}`,
            }],
        }),
    });

    const data = await response.json();
    console.log(data.choices[0].message.content);
    return data.choices[0].message.content;
}


