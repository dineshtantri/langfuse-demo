#!/usr/bin/env node

/**
 * Setup Script for Langfuse Prompt Management Demo
 * 
 * This script creates the sample prompts needed for the demo.
 * Run this after starting Langfuse and creating API keys.
 */

import { Langfuse } from 'langfuse';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const langfuse = new Langfuse({
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  baseUrl: process.env.LANGFUSE_HOST || 'http://localhost:3000',
});

const SAMPLE_PROMPTS = [
  {
    name: 'email-writer-v1',
    type: 'text',
    labels: ['production'],
    prompt: `You are a professional email writing assistant. Write a {{tone}} email to {{recipient_name}} about {{email_purpose}}.

Guidelines:
- Keep it concise and professional
- Use appropriate greeting and closing
- Be clear about the purpose
- Match the requested tone

Email:`,
    config: {
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 300
    },
    tags: ['demo', 'email', 'communication'],
    commitMessage: 'Initial email writer prompt for demo'
  },
  {
    name: 'product-description-v1',
    type: 'text',
    labels: ['production'],
    prompt: `Write a compelling product description for {{target_audience}} for the following product:

Product Name: {{product_name}}
Key Features: {{key_features}}

Requirements:
- Highlight the main benefits for {{target_audience}}
- Use persuasive but authentic language
- Include a clear call-to-action
- Keep it under 150 words

Product Description:`,
    config: {
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
      max_tokens: 200
    },
    tags: ['demo', 'marketing', 'ecommerce'],
    commitMessage: 'Initial product description prompt for demo'
  },
  {
    name: 'code-reviewer-v1',
    type: 'text',
    labels: ['production'],
    prompt: `You are an experienced {{programming_language}} developer. Please review the following code and provide constructive feedback focusing on {{review_focus}}:

\`\`\`{{programming_language}}
{{code_snippet}}
\`\`\`

Please provide:
1. Overall assessment
2. Specific suggestions for improvement
3. Best practices recommendations
4. Any potential issues or bugs

Review:`,
    config: {
      model: 'gpt-4',
      temperature: 0.3,
      max_tokens: 500
    },
    tags: ['demo', 'code-review', 'development'],
    commitMessage: 'Initial code reviewer prompt for demo'
  }
];

async function createPrompt(promptData) {
  try {
    console.log(`Creating prompt: ${promptData.name}...`);
    
    const response = await fetch(`${process.env.LANGFUSE_HOST || 'http://localhost:3000'}/api/public/v2/prompts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(process.env.LANGFUSE_PUBLIC_KEY + ':' + process.env.LANGFUSE_SECRET_KEY).toString('base64')}`
      },
      body: JSON.stringify(promptData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Successfully created: ${promptData.name} (version ${result.version})`);
      return result;
    } else {
      const error = await response.text();
      console.error(`❌ Failed to create ${promptData.name}: ${response.status} - ${error}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error creating prompt ${promptData.name}:`, error.message);
    return null;
  }
}

async function setupPrompts() {
  console.log('🚀 Setting up sample prompts for Langfuse demo...\n');
  
  if (!process.env.LANGFUSE_SECRET_KEY || !process.env.LANGFUSE_PUBLIC_KEY) {
    console.error('❌ Missing required environment variables:');
    console.error('   LANGFUSE_SECRET_KEY and LANGFUSE_PUBLIC_KEY must be set');
    console.error('   Get these from your Langfuse Settings -> API Keys page');
    process.exit(1);
  }

  console.log(`📍 Target Langfuse instance: ${process.env.LANGFUSE_HOST || 'http://localhost:3000'}`);
  console.log(`🔑 Using public key: ${process.env.LANGFUSE_PUBLIC_KEY?.substring(0, 12)}...`);
  console.log('');

  const results = [];
  
  for (const promptData of SAMPLE_PROMPTS) {
    const result = await createPrompt(promptData);
    results.push(result);
    
    // Wait a bit between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n📊 Setup Summary:');
  console.log(`✅ Successful: ${results.filter(r => r !== null).length}`);
  console.log(`❌ Failed: ${results.filter(r => r === null).length}`);
  
  if (results.every(r => r !== null)) {
    console.log('\n🎉 All prompts created successfully!');
    console.log('\nNext steps:');
    console.log('1. Run the demo: npm start');
    console.log('2. Explore prompt management in the Langfuse UI');
    console.log('3. Try updating prompts and see changes reflected immediately');
  } else {
    console.log('\n⚠️  Some prompts failed to create. Check the errors above.');
    console.log('Common issues:');
    console.log('- Langfuse not running (check http://localhost:3000)');
    console.log('- Invalid API keys');
    console.log('- Prompts with same name already exist');
  }

  await langfuse.shutdownAsync();
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n👋 Shutting down gracefully...');
  await langfuse.shutdownAsync();
  process.exit(0);
});

setupPrompts().catch(console.error);