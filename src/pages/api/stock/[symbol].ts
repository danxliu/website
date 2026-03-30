import YahooFinance from 'yahoo-finance2';
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const symbol = params.symbol;

  try {
    const yf = new YahooFinance();
    const result = await yf.quote(symbol as string);
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500
    });
  }
}