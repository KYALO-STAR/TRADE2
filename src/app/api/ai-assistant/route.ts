import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful AI trading assistant for TradePro, a synthetic trading platform. You help users with:

1. Trading strategies and market analysis
2. Understanding synthetic indices (Volatility indices, Jump indices, etc.)
3. Risk management and position sizing
4. Platform features and navigation
5. Educational content about trading

Keep responses concise, helpful, and focused on trading. Always prioritize risk management and responsible trading practices. If users ask about specific trades, remind them to do their own research and never risk more than they can afford to lose.

Current platform features:
- Dashboard with portfolio overview
- Synthetic indices trading (Volatility 10, 25, 50, 75, 100, etc.)
- Bot automation and strategies
- Market analysis tools
- Educational courses and tips
- Referral program

Be friendly, professional, and always emphasize the importance of risk management.`
        },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    return NextResponse.json({
      message: completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response."
    })

  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    )
  }
}