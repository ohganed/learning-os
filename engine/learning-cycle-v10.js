/* Learning Cycle v10 preview: local-only, deterministic and privacy-preserving.
 * This module is not a multi-user school service; no identity or cloud storage.
 */
(function(root,factory){
 const api=factory(root.LearningEngine || (typeof require==='function' ? require('./learning-engine-v0.1.js') : null),
                   root.PhysicsTwoBlocks || (typeof require==='function' ? require('./physics-two-blocks-v0.1.js') : null),
                   root.PhysicsNextStep || (typeof require==='function' ? require('./physics-next-step-v0.1.js') : null));
 if(typeof module==='object'&&module.exports) module.exports=api;
 else root.LearningCycleV10=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(engine,physics,next){
 'use strict';
 if(!engine||!physics||!next) throw new Error('Learning Engine, Physics adapter and Next Step required');
 const SCHEMA=10, FIELDS=['acceleration','contact','netA','netB','equationA','equationB'];
 const iso=value=>{const n=Date.parse(value);if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}T/.test(value)||!Number.isFinite(n))throw new TypeError('valid ISO datetime required');return new Date(n).toISOString();};
 const copy=x=>JSON.parse(JSON.stringify(x));
 const normalize=x=>String(x).trim().normalize('NFKC').toLocaleLowerCase('en-US').replace(/\s+/g,' ');
 function createSession(id,problem,createdAt){
   if(typeof id!=='string'||!id.trim()||!problem||!problem.items) throw new TypeError('session id and problem required');
   return {schemaVersion:SCHEMA,id,problemId:problem.id,createdAt:iso(createdAt),status:'new',attempts:[],reviews:{},currentNext:null};
 }
 function submitInitial(session,problem,answers,attemptId,at){
   if(session.status!=='new') throw new Error('initial response already submitted');
   if(typeof attemptId!=='string'||!attemptId.trim()) throw new TypeError('attempt id required');
   const grade=physics.grade(problem,answers);
   const recommendation=next.recommend(grade), stamp=iso(at);
   const reviews={...session.reviews};
   for(const field of FIELDS) reviews[field]=engine.scheduleReview(reviews[field],grade.results[field],stamp);
   const attempt={id:attemptId,kind:'initial',at:stamp,answers:copy(answers),grade:copy(grade)};
   return {...session,status:'followup',attempts:[...session.attempts,attempt],reviews,currentNext:recommendation};
 }
 function assessFollowup(recommendation,response){
   const expected=normalize(recommendation.expected);
   const actual=normalize(response);
   if(!actual) return {correct:false,verdict:'blank',needsReview:true};
   const correct=actual===expected;
   return {correct,verdict:correct?'correct':'needs-review',needsReview:!correct};
 }
 function submitFollowup(session,response,attemptId,at){
   if(session.status!=='followup'||!session.currentNext) throw new Error('no followup available');
   if(typeof attemptId!=='string'||!attemptId.trim()) throw new TypeError('attempt id required');
   if(typeof response!=='string') throw new TypeError('response must be string');
   const stamp=iso(at), assessment=assessFollowup(session.currentNext,response);
   const attempt={id:attemptId,kind:'followup',at:stamp,response,assessment,recommendation:copy(session.currentNext)};
   return {...session,status:'complete',attempts:[...session.attempts,attempt],currentNext:null};
 }
 function dueReviews(session,now){
   const t=Date.parse(iso(now));return Object.entries(session.reviews).filter(([,v])=>Date.parse(v.dueAt)<=t)
     .map(([field,review])=>({field,dueAt:review.dueAt,reason:review.reason}))
     .sort((a,b)=>a.dueAt.localeCompare(b.dueAt)||a.field.localeCompare(b.field));
 }
 function teacherSummary(sessions){
   if(!Array.isArray(sessions)) throw new TypeError('sessions array required');
   const initial=sessions.flatMap(s=>s.attempts.filter(a=>a.kind==='initial'));
   const fields=Object.fromEntries(FIELDS.map(field=>[field,{
     answered:initial.length,correct:initial.filter(a=>a.grade.results[field]?.score===1).length
   }]));
   return {schemaVersion:SCHEMA,sessions:sessions.length,initialAttempts:initial.length,
      completed:sessions.filter(s=>s.status==='complete').length,fields};
 }
 function exportData(sessions){
   if(!Array.isArray(sessions)) throw new TypeError('sessions array required');
   return JSON.stringify({schemaVersion:SCHEMA,exportedSessions:sessions.map(copy)},null,2);
 }
 function importData(json){
   const data=JSON.parse(json);
   if(!data||data.schemaVersion!==SCHEMA||!Array.isArray(data.exportedSessions)) throw new TypeError('incompatible backup');
   const ids=new Set();
   for(const s of data.exportedSessions){
     if(!s||s.schemaVersion!==SCHEMA||typeof s.id!=='string'||!s.id.trim()||ids.has(s.id)||!Array.isArray(s.attempts)||!s.reviews||!['new','followup','complete'].includes(s.status)) throw new TypeError('invalid session in backup');
     ids.add(s.id);
   }
   return data.exportedSessions.map(copy);
 }
 return Object.freeze({SCHEMA,FIELDS,createSession,submitInitial,assessFollowup,submitFollowup,dueReviews,teacherSummary,exportData,importData});
});
