/* Run: node --test engine/physics-two-blocks.test.js */
const assert = require('node:assert/strict');
const { test } = require('node:test');
const {createProblem, grade} = require('./physics-two-blocks-v0.1.js');
const p = createProblem(2, 3, 10);
test('Newtonian reference solution for both blocks', () => {
  assert.deepEqual(p.solution, {acceleration:2,contact:6,netA:4,netB:6});
});
test('all six fields are graded independently', () => {
  const result=grade(p,{acceleration:'2',contact:'6 N',netA:'4',netB:'6',equationA:'F-C=mA*a',equationB:'C=mB*a'});
  assert.equal(result.correctCount,6);
  assert.equal(result.total,6);
});
test('contact force is not the whole applied force', () => {
  const result=grade(p,{contact:'10'});
  assert.deepEqual(result.results.contact.misconceptionCodes,['contact-equals-applied-force']);
});
test('empty fields are explicitly blank', () => {
  const result=grade(p,{});
  assert.equal(result.correctCount,0);
  assert.equal(result.results.acceleration.verdict,'blank');
});
test('reject nonphysical input', () => {
  assert.throws(()=>createProblem(0,3,10),TypeError);
  assert.throws(()=>createProblem(2,3,-10),TypeError);
});
test('alternate masses remain consistent', () => {
  const q=createProblem(1,1,4);
  assert.equal(q.solution.acceleration,2);
  assert.equal(q.solution.contact,2);
  assert.equal(q.solution.netA+q.solution.netB,q.force);
});
