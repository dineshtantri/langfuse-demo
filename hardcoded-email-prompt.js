/**
 * Hardcoded Email Prompt Example
 * 
 * This file demonstrates the "old way" of managing prompts - hardcoded in the application.
 * This shows what we're improving by moving prompts to Langfuse for dynamic management.
 */

// Hardcoded email prompt template
const EMAIL_PROMPT_TEMPLATE = `You are a professional email writing assistant. Write a {{tone}} email to {{recipient_name}} about {{email_purpose}}.

Guidelines:
- Keep it concise and professional
- Use appropriate greeting and closing
- Be clear about the purpose
- Match the requested tone

Email:`;

// Configuration hardcoded in the application
const EMAIL_PROMPT_CONFIG = {
  model: 'gpt-3.5-turbo',
  temperature: 0.7,
  max_tokens: 300
};

/**
 * Simple template variable replacement function
 * @param {string} template - The prompt template with {{variable}} placeholders
 * @param {object} variables - Key-value pairs for variable replacement
 * @returns {string} The compiled prompt with variables replaced
 */
function compileTemplate(template, variables) {
  let compiledPrompt = template;
  
  for (const [key, value] of Object.entries(variables)) {
    const placeholder = `{{${key}}}`;
    compiledPrompt = compiledPrompt.replace(new RegExp(placeholder, 'g'), value);
  }
  
  return compiledPrompt;
}

/**
 * Example usage of the hardcoded email prompt
 */
function demonstrateHardcodedApproach() {
  console.log('🔒 HARDCODED APPROACH DEMO');
  console.log('=' .repeat(50));
  
  console.log('\n📝 Original Template:');
  console.log(EMAIL_PROMPT_TEMPLATE);
  
  console.log('\n⚙️  Hardcoded Configuration:');
  console.log(JSON.stringify(EMAIL_PROMPT_CONFIG, null, 2));
  
  console.log('\n🔧 Example Variables:');
  const exampleVariables = {
    tone: 'friendly but professional',
    recipient_name: 'Sarah Johnson',
    email_purpose: 'following up on our meeting about the new project timeline'
  };
  console.log(JSON.stringify(exampleVariables, null, 2));
  
  console.log('\n✉️  Compiled Email Prompt:');
  const compiledPrompt = compileTemplate(EMAIL_PROMPT_TEMPLATE, exampleVariables);
  console.log(compiledPrompt);
  
  console.log('\n🚨 PROBLEMS WITH THIS APPROACH:');
  console.log('- Developers must change code to update prompts');
  console.log('- Requires code review, testing, and deployment');
  console.log('- No version history or easy rollback');
  console.log('- PM/Content writers can\'t iterate independently');
  console.log('- No A/B testing capabilities');
  console.log('- Downtime required for prompt changes');
}

// Export for use in demo
export {
  EMAIL_PROMPT_TEMPLATE,
  EMAIL_PROMPT_CONFIG,
  compileTemplate,
  demonstrateHardcodedApproach
};

// Run demo if this file is executed directly
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.argv[1] === __filename) {
  demonstrateHardcodedApproach();
}