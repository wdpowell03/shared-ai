## Conversation Context & AI Improvement

To ensure the AI assistant always improves and maintains relevant context for every conversation, the following structure is used:

### 1. Storing Conversation Context

- **messages table:**

  - Stores all user and AI messages for each project (chat room).
  - Acts as persistent chat history and the primary source of context for the AI.

- **docs table (context documents):**

  - Stores important reference materials, company values, guidelines, and other static context.
  - Used to ground AI responses with project- or company-specific knowledge.

- **personas table (optional):**
  - Stores custom prompts or instructions for different AI personas (e.g., Swell Copywriter, Code Reviewer).

### 2. How the AI Uses Context

When a user sends a message:

1. **Fetch recent chat history** from the messages table for the project (e.g., last 20 messages).
2. **Query the docs table** for the most relevant static documents (using pgvector or keyword search).
3. **Retrieve the selected persona’s base prompt** (from personas table).
4. **Combine all this context** and send it to OpenAI as part of the prompt.

### 3. Improving Over Time

- As conversations grow, the messages table accumulates more context, allowing the AI to reference more project-specific history.
- Important conversations can be summarized or embedded into the docs table for long-term memory.
- Persona prompts in the personas table can be tuned to improve the AI’s style and behavior.

### 4. Implementation Example

- In the `/api/chat` route:
  - Retrieve the last N messages for the project from messages.
  - Query docs for top K relevant documents.
  - Get the persona prompt.
  - Build the OpenAI prompt with all of the above.
  - Save both user and AI messages to messages for future context.

**Summary:**

- Short-term context = recent messages from messages table
- Long-term/project/company context = docs table
- Persona/behavior context = personas table

This setup ensures the AI always has access to the latest and most relevant information, and its performance improves as more data is added.

---

## Project Cemented Context Table

To give each project its own persistent, always-included context, you can add a `project_contexts` table linked to `projects`.

### Database Design

- **project_contexts table:**
  - `id` (uuid, primary key)
  - `project_id` (uuid, references projects.id, unique)
  - `content` (text) — the cemented context for this project
  - `created_at` (timestamp, default now())
  - `updated_at` (timestamp, default now())

Each project can have a single row (or more, if you want) in this table, storing context that is always included when building prompts for that project’s AI.

### Usage in App/API

- When preparing a prompt for OpenAI, always pull the project’s context from `project_contexts` (in addition to recent messages, docs, personas, etc).
- This context could include project goals, team values, key instructions, or any info you want the AI to always know for that project.
- Project admins can edit this context via the UI.

### Example Prompt-Building Flow

1. Fetch the project’s cemented context from `project_contexts`.
2. Fetch recent messages from `messages`.
3. Fetch relevant docs from `docs`.
4. Fetch persona prompt.
5. Combine all of the above for the OpenAI prompt.

---

## Project-Specific Personas for Advanced Prompting

You can allow each project to have its own persona, enabling highly tailored AI behavior and style for different teams or use cases.

### How It Works

- Add a `project_persona` field to the `projects` table, or create a join table (`project_personas`) linking projects to personas.
- Each persona can have a unique base prompt, instructions, and configuration.
- When building the AI prompt, pull the persona assigned to the project and use its prompt as the foundation for all AI responses.
- This allows for:
  - Custom tone, style, or expertise per project (e.g., "SaaS Copywriter" vs. "Legal Advisor")
  - Project-specific rules or constraints
  - Easy switching or updating of AI behavior per project

### Example

- Project A uses a "Technical Reviewer" persona with strict code review prompts.
- Project B uses a "Creative Brainstormer" persona for marketing ideas.
- Each project’s AI responses are always grounded in their assigned persona's prompt, plus their cemented context and chat history.

---
