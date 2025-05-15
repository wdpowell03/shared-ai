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
