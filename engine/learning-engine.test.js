/* Run: node engine/learning-engine.test.js */
const assert = require('node:assert/strict');
const { test } = require('node:test');
const engine = require('./learning-engine-v0.1.js');
const item = {
  id: 'forces-01',
  rubric: {
    accepted: ['4 N'],
    misconceptions: [{ code: 'add-instead-of-subtract', answers: ['10 N'] }]
  }
};
test('correct response tolerates Unicode width and case', () => {
  assert.equal(engine.analyzeResponse(item, ' ４ n ').score, 1);
});
test('explicit wrong answer maps to a misconception', () => {
  assert.deepEqual(engine.analyzeResponse(item, '10 N').misconceptionCodes, ['add-instead-of-subtract']);
});
test('unknown answer requires teacher review', () => {
  const a = engine.analyzeResponse(item, '3 N');
  assert.equal(a.needsTeacherReview, true);
  assert.equal(a.confidence, 0);
});
test('blank is distinct from incorrect', () => {
  assert.equal(engine.analyzeResponse(item, ' ').verdict, 'blank');
});
test('first correct retrieval schedules tomorrow', () => {
  assert.equal(engine.scheduleReview(null, { score: 1 }, '2026-10-31T00:00:00Z').dueAt, '2026-11-01T00:00:00.000Z');
});
test('incorrect retrieval resets streak', () => {
  assert.equal(engine.scheduleReview({ streak: 4 }, { score: 0 }, '2026-10-31T00:00:00Z').streak, 0);
});
test('overdue review beats new question', () => {
  assert.equal(engine.selectNextQuestion(
    [{ id: 'new' }, { id: 'due' }],
    [{ itemId: 'due', review: { dueAt: '2026-10-30T00:00:00Z' } }],
    '2026-10-31T00:00:00Z'
  ).itemId, 'due');
});
test('not-due item is withheld', () => {
  assert.equal(engine.selectNextQuestion(
    [{ id: 'future' }],
    [{ itemId: 'future', review: { dueAt: '2026-11-30T00:00:00Z' } }],
    '2026-10-31T00:00:00Z'), null);
});
test('teacher allowed item filter is respected', () => {
  assert.equal(engine.selectNextQuestion([{ id: 'a' }, { id: 'b' }], [],
    '2026-10-31T00:00:00Z', { allowedIds: ['b'] }).itemId, 'b');
});
test('invalid datetime rejected', () => {
  assert.throws(() => engine.scheduleReview(null, { score: 1 }, 'not-a-time'), TypeError);
});
test('source item remains unchanged', () => {
  const before = JSON.stringify(item);
  engine.analyzeResponse(item, '4 N');
  assert.equal(JSON.stringify(item), before);
});
