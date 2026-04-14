const RESPONSES = {
  'What is ChatKit?': `ChatKit is a framework for building custom chat-based user interfaces (UIs) and workflows. It provides developers with components and APIs to create chat applications that go beyond simple messaging—enabling integration with forms, data visualization, workflows, bot interactions, and more.

With ChatKit, you can:

- **Build chat UIs** that include not just text, but rich widgets (like cards, forms, images, charts, or custom blocks).
- **Orchestrate conversations** between users, bots, and external systems.
- **Handle complex workflows** by integrating actions, status updates, and even server-side logic.

There are SDKs available for both JavaScript (ChatKit.js) and Python, making it easy to use in web and backend environments.

Want to see a demo of a sample widget?`,

  'Show me an example widget': `Here's a simple example of how you could use ChatKit to render a custom card widget inside a chat message:

\`\`\`jsx
import { ChatWidget, Message, Card } from 'chatkit';

function App() {
  return (
    <ChatWidget>
      <Message role="assistant">
        <Card
          title="Welcome!"
          description="This is a custom card widget."
          actions={[
            { label: 'Learn More', onClick: () => {} },
            { label: 'Dismiss', variant: 'secondary' }
          ]}
        />
      </Message>
    </ChatWidget>
  );
}
\`\`\`

This demonstrates how ChatKit lets you embed **rich interactive components** directly within the conversation flow. You can create cards, forms, image galleries, and much more!`,

  'What can I customize?': `ChatKit offers extensive customization options:

### Theming
- **Color scheme** — Light and dark mode support
- **Accent colors** — Fully customizable primary colors
- **Typography** — Custom font families and sizes
- **Border radius** — From sharp corners to pill shapes
- **Density** — Compact, default, or spacious layouts

### Components
- **Start screen** — Custom greetings and starter prompts
- **Composer** — Placeholder text, disclaimers, attachments
- **Model picker** — Classic or persona-based selection
- **Tool menu** — Add custom tools with icons and labels
- **Message actions** — Feedback, retry, and custom actions

### Advanced
- **Surface colors** — Fine-grained background and foreground control
- **Tinted grayscale** — Add subtle color tints to neutral tones
- **Custom CSS** — Override any style with CSS variables

All settings can be configured through the Playground UI or programmatically via the SDK.`,

  'How do I use client side tools?': `Client-side tools in ChatKit let you execute functions directly in the browser during a conversation. Here's how to set them up:

\`\`\`javascript
const tools = [
  {
    name: 'search_docs',
    description: 'Search documentation',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' }
      },
      required: ['query']
    },
    execute: async ({ query }) => {
      const results = await searchDocs(query);
      return { results };
    }
  }
];
\`\`\`

Then pass the tools to your ChatKit instance:

\`\`\`javascript
<ChatWidget tools={tools} />
\`\`\`

When the AI decides to use a tool, ChatKit will:
1. Call your \`execute\` function with the parameters
2. Send the result back to the AI
3. Display the final response to the user

This enables powerful integrations like search, calculations, API calls, and more — all running client-side!`,

  'Server side tools': `Server-side tools run on your backend and are useful for operations that require:

- **Database access** — Query or update data securely
- **API integrations** — Connect to third-party services
- **Authentication** — Operations requiring server credentials
- **Heavy computation** — Tasks too intensive for the browser

### Setup

Define tools on your server:

\`\`\`python
from chatkit import Tool

@Tool(name="get_weather", description="Get current weather")
async def get_weather(location: str):
    data = await weather_api.fetch(location)
    return {"temperature": data.temp, "condition": data.condition}
\`\`\`

### How it works

1. User sends a message
2. AI decides to use a server-side tool
3. ChatKit sends the tool call to your backend
4. Your server executes the function and returns results
5. AI incorporates the results into its response

Server-side tools are the recommended approach for any operation involving sensitive data or external service integrations.`,
}

const FALLBACK_RESPONSE = `That's an interesting question! I'd be happy to help you explore that topic.

ChatKit provides a flexible framework for building conversational interfaces. Here are some things I can help with:

- **Getting started** with ChatKit setup and configuration
- **Building custom widgets** for rich message content
- **Integrating tools** for enhanced functionality
- **Customizing themes** and visual appearance

Feel free to ask me anything specific about these topics, or try one of the starter prompts for a guided tour!`

export function getMockResponse(userMessage) {
  const lower = userMessage.toLowerCase().trim()
  for (const [key, value] of Object.entries(RESPONSES)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return value
    }
  }
  return FALLBACK_RESPONSE
}

export function generateTitle(userMessage) {
  const titles = {
    'chatkit': 'ChatKit Basics',
    'widget': 'Widget Examples',
    'customize': 'Customization Guide',
    'client side': 'Client-Side Tools',
    'server': 'Server-Side Tools',
  }
  const lower = userMessage.toLowerCase()
  for (const [key, value] of Object.entries(titles)) {
    if (lower.includes(key)) return value
  }
  if (userMessage.length > 30) {
    return userMessage.slice(0, 30) + '...'
  }
  return userMessage
}
