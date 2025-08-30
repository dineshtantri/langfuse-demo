# Langfuse Prompt Management Demo

This demo showcases how **Product Managers and Content Writers** can update prompts without requiring code changes or application rebuilds. By decoupling prompts from code using Langfuse, non-technical team members can iterate on prompts quickly and safely.

## 🎯 What This Demo Demonstrates

### Core Benefits

- **Decoupled Prompts**: Prompts are stored in Langfuse, not in your codebase
- **No Code Changes**: PMs/Writers update prompts through the Langfuse UI
- **Zero Downtime**: Changes take effect immediately without rebuilds or deployments
- **Version Control**: Track all prompt changes with full version history
- **A/B Testing**: Use labels to test different prompt versions in production

### Demo Scenarios

1. **Email Writer Assistant** - Generate professional emails
2. **Product Description Generator** - Create compelling e-commerce content
3. **Code Review Assistant** - Provide constructive code feedback

Each scenario demonstrates how prompts with variables are fetched from Langfuse at runtime and compiled dynamically.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Langfuse running locally (see setup instructions below)

### 1. Set Up Langfuse using Docker

https://langfuse.com/self-hosting/deployment/docker-compose
Open http://localhost:3000 in your browser to access the Langfuse UI

### 2. Create Sample Prompts

In the Langfuse UI, create these prompts with the "production" label:

#### **email-writer-v1**

```
You are a professional email writing assistant. Write a {{tone}} email to {{recipient_name}} about {{email_purpose}}.

Guidelines:
- Keep it concise and professional
- Use appropriate greeting and closing
- Be clear about the purpose
- Match the requested tone

Email:
```

#### **product-description-v1**

```
Write a compelling product description for {{target_audience}} for the following product:

Product Name: {{product_name}}
Key Features: {{key_features}}

Requirements:
- Highlight the main benefits for {{target_audience}}
- Use persuasive but authentic language
- Include a clear call-to-action
- Keep it under 150 words

Product Description:
```

#### **code-reviewer-v1**

````
You are an experienced {{programming_language}} developer. Please review the following code and provide constructive feedback focusing on {{review_focus}}:

```{{programming_language}}
{{code_snippet}}
````

Please provide:

1. Overall assessment
2. Specific suggestions for improvement
3. Best practices recommendations
4. Any potential issues or bugs

Review:

````

### 3. Configure the Demo

```bash
# Navigate to demo directory
cd demo

# Copy environment template
cp .env.example .env

# Edit .env with your Langfuse API keys (get from Langfuse Settings page)
# LANGFUSE_SECRET_KEY=sk-lf-...
# LANGFUSE_PUBLIC_KEY=pk-lf-...
````

### 4. Run the Demo

```bash
# Install dependencies
npm install

# Start the demo
npm start
```

## 🎭 Using the Demo

1. **Select a Scenario**: Choose from email writing, product descriptions, or code review
2. **Choose Prompt Version**: Select which label to use (default: "production")
3. **View the Prompt Template**: See how variables are defined with `{{variable_name}}`
4. **Provide Variable Values**: Enter values for the prompt variables
5. **See Compiled Prompt**: Watch how variables are dynamically replaced
6. **Simulate LLM Call**: See how the prompt would be sent to an LLM
7. **View Langfuse Trace**: Check the trace logged in Langfuse with full context

## 🔄 Demonstrating the PM/Writer Workflow

### Scenario: Product Manager Wants to Change Email Tone

1. **Current State**: Demo shows professional email generation
2. **PM Updates Prompt**:
   - Goes to Langfuse UI
   - Finds "email-writer-v1" prompt
   - Creates new version with more casual tone
   - Labels it as "experimental"
3. **Test New Version**:
   - Run demo again
   - Choose "experimental" label instead of "production"
   - See immediate changes without any code modifications
4. **Deploy to Production**:
   - If satisfied, PM relabels "experimental" version as "production"
   - All applications automatically use the new version

### Benefits Highlighted

- ✅ **No Developer Involvement**: PM made changes independently
- ✅ **No Code Changes**: Application code never touched
- ✅ **No Rebuilds**: Changes take effect immediately
- ✅ **Safe Testing**: Can test with different labels before production
- ✅ **Easy Rollback**: Can revert to previous version instantly
- ✅ **Full Audit Trail**: All changes tracked in Langfuse

## 📊 Observability Features

The demo also showcases:

- **Trace Logging**: Every prompt execution logged to Langfuse
- **Version Tracking**: Know exactly which prompt version was used
- **Performance Monitoring**: Track how different prompts perform
- **Usage Analytics**: Understand prompt usage patterns

## 🔧 Advanced Features

### Environment-Specific Prompts

```bash
# Use different prompts for different environments
# Production
const prodPrompt = await langfuse.getPrompt('email-writer-v1', { label: 'production' });

# Staging
const stagingPrompt = await langfuse.getPrompt('email-writer-v1', { label: 'staging' });

# A/B Testing
const experimentPrompt = await langfuse.getPrompt('email-writer-v1', { label: 'experiment-v2' });
```

### Version-Specific Retrieval

```bash
# Get specific version number
const prompt = await langfuse.getPrompt('email-writer-v1', 3);

# Get latest production
const prompt = await langfuse.getPrompt('email-writer-v1', { label: 'production' });
```

## 🎓 Key Takeaways

1. **Decoupling is Powerful**: Separating prompts from code enables non-technical team members
2. **Faster Iteration**: Changes happen in minutes, not days
3. **Safer Deployments**: Test changes safely before production
4. **Better Collaboration**: PMs and Writers can work independently
5. **Full Observability**: Every change and execution is tracked

## 🛠️ Next Steps

After running this demo, try:

1. Creating your own prompt templates
2. Setting up A/B testing with different labels
3. Integrating with your actual LLM applications
4. Exploring Langfuse's prompt analytics and performance metrics

## 📞 Support

For questions about this demo or Langfuse prompt management:

- [Langfuse Documentation](https://langfuse.com/docs)
- [GitHub Repository](https://github.com/langfuse/langfuse)
- [Community Discord](https://discord.gg/7NXusRtqYU)
