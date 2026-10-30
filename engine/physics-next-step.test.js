/* Run: node --test engine/physics-next-step.test.js */
const assert = require('node:assert/strict');
const { test } = require('node:test');
const { recommend } = require('./physics-next-step-v0.1.js');
test('target a known contact misconception', () => {
  const next = recommend({total:6,correctCount:5,results:{
    contact:{score:0,verdict:'incorrect',needsTeacherReview:false,misconceptionCodes:['contact-equals-applied-force']}
  }});
  assert.equal(next.kind,'targeted-retry');
  assert.equal(next.targetField,'contact');
  assert.equal(next.reason,'contact-equals-applied-force');
});
test('unknown error is not labeled as misconception', () => {
  const next = recommend({total:6,correctCount:5,results:{
    contact:{score:0,verdict:'incorrect',needsTeacherReview:true,misconceptionCodes:[]}
  }});
  assert.equal(next.kind,'diagnostic');
  assert.equal(next.reason,'insufficient-evidence');
});
test('blank answer receives a diagnostic prompt', () => {
  const next = recommend({total:6,correctCount:5,results:{
    acceleration:{score:0,verdict:'blank',needsTeacherReview:true,misconceptionCodes:[]}
  }});
  assert.equal(next.targetField,'acceleration');
  assert.equal(next.kind,'diagnostic');
});
test('full success leads to transfer problem', () => {
  const next = recommend({total:6,correctCount:6,results:{}});
  assert.equal(next.kind,'transfer');
  assert.equal(next.objective,'apply-to-new-values');
});
test('prioritize contact reasoning when several fields are wrong', () => {
  const next = recommend({total:6,correctCount:4,results:{
    acceleration:{score:0,verdict:'incorrect',needsTeacherReview:false,misconceptionCodes:[]},
    contact:{score:0,verdict:'incorrect',needsTeacherReview:false,misconceptionCodes:['contact-equals-applied-force']}
  }});
  assert.equal(next.targetField,'contact');
});
