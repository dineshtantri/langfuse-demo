/**
 * Interactive Pain Demonstration Script
 * 
 * This script helps demonstrate the pain of hardcoded prompts by walking through
 * a realistic scenario step by step.
 */

import { EMAIL_PROMPT_TEMPLATE, EMAIL_PROMPT_CONFIG, compileTemplate } from './hardcoded-email-prompt.js';

function showCurrentState() {
  console.log('🏢 CURRENT PRODUCTION STATE');
  console.log('=' .repeat(50));
  console.log('This is what\'s currently running in production:\n');
  
  console.log('📝 Current Email Prompt:');
  console.log(EMAIL_PROMPT_TEMPLATE);
  console.log();
  
  const variables = {
    tone: 'professional',
    recipient_name: 'Alex Chen',
    email_purpose: 'scheduling a follow-up meeting'
  };
  
  console.log('🔧 Sample Variables:');
  console.log(JSON.stringify(variables, null, 2));
  console.log();
  
  console.log('✉️  What gets sent to the LLM:');
  console.log(compileTemplate(EMAIL_PROMPT_TEMPLATE, variables));
  console.log();
}

function explainTheRequest() {
  console.log('📢 MARKETING TEAM REQUEST');
  console.log('=' .repeat(50));
  console.log('"Hey! Our A/B tests show casual emails get 23% better response rates.');
  console.log('Can we update the email prompt to be more casual and friendly?');
  console.log('We want to add some personality and maybe emojis! 😊"');
  console.log();
  console.log('🎯 What they want to change:');
  console.log('- More casual tone');
  console.log('- Add personality/warmth'); 
  console.log('- Include emojis');
  console.log('- Less corporate language');
  console.log('- Friendlier greetings/closings');
  console.log();
}

function showRequiredProcess() {
  console.log('⚙️  REQUIRED PROCESS (Traditional Approach)');
  console.log('=' .repeat(50));
  console.log('To make this "simple" text change, you need:');
  console.log();
  console.log('1. 👨‍💻 Developer modifies hardcoded-email-prompt.js');
  console.log('2. 🧪 Developer tests the changes locally');
  console.log('3. 🔍 Code review process (PR approval)');
  console.log('4. 🚀 Deploy to staging environment');
  console.log('5. ✅ QA testing in staging');
  console.log('6. 🚀 Production deployment');
  console.log('7. 📊 Monitor for issues');
  console.log();
  console.log('⏱️  Estimated time: 2-5 days (depending on your deployment cycle)');
  console.log('💰 Cost: Developer time + deployment resources + potential downtime');
  console.log();
}

function showWhatIfs() {
  console.log('🤔 WHAT IF SCENARIOS');
  console.log('=' .repeat(50));
  console.log('❓ What if marketing wants to A/B test both versions?');
  console.log('   → Need feature flags or complex deployment logic');
  console.log();
  console.log('❓ What if the new version performs worse?');
  console.log('   → Need another deployment to roll back');
  console.log();
  console.log('❓ What if they want to try 5 different variations?');
  console.log('   → 5 separate deployments or complex branching logic');
  console.log();
  console.log('❓ What if this needs to go live immediately for a campaign?');
  console.log('   → You\'re blocked by development/deployment schedule');
  console.log();
  console.log('❓ What if different regions need different tones?');
  console.log('   → Complex conditional logic in the code');
  console.log();
}

function showNextSteps() {
  console.log('🔧 YOUR TURN: MAKE THE CHANGE');
  console.log('=' .repeat(50));
  console.log('Now you\'ll make the actual code change to demonstrate the pain:');
  console.log();
  console.log('1. Open: hardcoded-email-prompt.js');
  console.log('2. Find the EMAIL_PROMPT_TEMPLATE constant');
  console.log('3. Replace it with the casual version (see demo-scenario.md)');
  console.log('4. Save the file');
  console.log('5. Run: node hardcoded-email-prompt.js');
  console.log();
  console.log('⏰ Time yourself - how long did this "simple" change take?');
  console.log('🎯 Remember: In production, this would need testing, review, deployment...');
  console.log();
}

// Run the pain demonstration
console.clear();
showCurrentState();
console.log('\n' + '='.repeat(80) + '\n');
explainTheRequest();
console.log('\n' + '='.repeat(80) + '\n');
showRequiredProcess();
console.log('\n' + '='.repeat(80) + '\n');
showWhatIfs();
console.log('\n' + '='.repeat(80) + '\n');
showNextSteps();