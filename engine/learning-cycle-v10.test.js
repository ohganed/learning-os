const assert=require('node:assert/strict');
const {test}=require('node:test');
const physics=require('./physics-two-blocks-v0.1.js');
const cycle=require('./learning-cycle-v10.js');
const p=physics.createProblem(2,3,10);
const at='2026-10-31T00:00:00Z';
function initial(){return cycle.submitInitial(cycle.createSession('s1',p,at),p,
 {acceleration:'2',contact:'10',netA:'4',netB:'6',equationA:'F-C=mA*a',equationB:'C=mB*a'},'a1',at);}
test('v1 session starts empty',()=>assert.equal(cycle.createSession('x',p,at).status,'new'));
test('v2 initial submission stores six separate judgments',()=>assert.equal(initial().attempts[0].grade.total,6));
test('v3 follow-up targets contact misconception',()=>assert.equal(initial().currentNext.targetField,'contact'));
test('v4 known follow-up answer can be assessed',()=>assert.equal(cycle.assessFollowup(initial().currentNext,'Aからの接触力').correct,true));
test('v5 uncertain follow-up does not count as confirmed wrong',()=>assert.equal(cycle.assessFollowup(initial().currentNext,'接触力です').needsReview,true));
test('v6 complete retry recorded without replacing initial attempt',()=>{
 const s=cycle.submitFollowup(initial(),'Aからの接触力','a2',at);
 assert.equal(s.status,'complete');assert.equal(s.attempts.length,2);
});
test('v7 due list is chronological and teacher visible',()=>{
 const due=cycle.dueReviews(initial(),'2026-11-01T00:00:00Z');
 assert.equal(due.length,6);assert.ok(due.every(d=>d.dueAt.startsWith('2026-11-01')));
});
test('v8 summary counts observable correct responses, not inferred motivation',()=>{
 const r=cycle.teacherSummary([initial()]);
 assert.equal(r.fields.contact.correct,0);assert.equal(r.fields.acceleration.correct,1);
});
test('v9 export/import round trip preserves identity and evidence',()=>{
 const before=initial(),after=cycle.importData(cycle.exportData([before]))[0];
 assert.deepEqual(after,before);
});
test('v9 rejects duplicate session identifiers in backup',()=>{
 const one=initial();assert.throws(()=>cycle.importData(JSON.stringify({schemaVersion:10,exportedSessions:[one,one]})),TypeError);
});
test('v10 one submission per stage',()=>{
 assert.throws(()=>cycle.submitInitial(initial(),p,{},'a2',at),/already submitted/);
 const done=cycle.submitFollowup(initial(),'Aからの接触力','a2',at);
 assert.throws(()=>cycle.submitFollowup(done,'x','a3',at),/no followup/);
});
