# Project Plan: Real-Time Collaborative AI Chat Workspace

## Backend: API Routes & OpenAI Integration

- Implement API routes in Next.js to handle chat requests and call the OpenAI API
- Authenticate users via Supabase JWT
- Query Supabase for relevant context documents (using pgvector)
- Send prompt and context to OpenAI, then return the result

## Supabase Setup & Persona Prompts (Rachel)

### 1. Supabase Project Setup

- Enable authentication (email and Google login)
- Create `docs` table with fields:
  - `id` (uuid)
  - `content` (text)
  - `embedding` (vector)
- (Optional) Create `personas` table for prompt management

### 2. Persona Base Prompts

- Swell Copywriter
- Code Reviewer
- Meeting Summarizer
- Client Support Rewriter

### 3. Seed Context Documents

- Insert 5-10 context docs (e.g., company values, brand guidelines, etc.) into Supabase

## Next.js Frontend & GPT API (Dalton)

### 1. Next.js Project Setup

- Deploy on Vercel
- Integrate Supabase client for authentication
- Create UI with tabbed interface or dropdown for persona selection
- (Optional) Implement chat history per session

### 2. `/api/chat` Route

- Accepts user input and selected persona
- Authenticates user via Supabase JWT
- Queries Supabase for top 2 context docs using pgvector
- Sends prompt + context to OpenAI
- Returns the response

### 3. Deployment & Auth Protection

- Deploy to Vercel
- Protect all routes behind Supabase auth

## Final Integration & Testing

- Confirm authentication flow works for all team members
- Test Swell Copywriter persona with real input
- Tune prompts and store updates in Supabase
- Add feedback logging or 'rate this response' feature

## Must Do

- need a message queue so the AI agent doesn't get overwhelmed and not know what to answer
