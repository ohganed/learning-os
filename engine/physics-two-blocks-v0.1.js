/* Physics domain adapter v0.1: two touching blocks on a horizontal frictionless surface.
 * The external force is applied to A, directed right. Contact force magnitude C acts
 * leftward on A and rightward on B. No vertical acceleration.
 */
(function (root, factory) {
  const api = factory(root.LearningEngine || (typeof require === 'function' ? require('./learning-engine-v0.1.js') : null));
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PhysicsTwoBlocks = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (engine) {
  'use strict';
  if (!engine || !engine.analyzeResponse) throw new Error('LearningEngine required');
  function createProblem(mA, mB, force, id) {
    if (![mA, mB, force].every(x => typeof x === 'number' && Number.isFinite(x) && x > 0)) {
      throw new TypeError('mA, mB and applied force must be positive finite numbers');
    }
    if (!Number.isSafeInteger(mA * 100) || !Number.isSafeInteger(mB * 100) || !Number.isSafeInteger(force * 100)) {
      throw new RangeError('inputs require at most two decimal places');
    }
    const acceleration = force / (mA + mB);
    const contact = mB * acceleration;
    const netA = mA * acceleration;
    const netB = mB * acceleration;
    const fmt = n => String(Number(n.toFixed(5)));
    const numericItem = (field, expected, unit, misconception) => ({
      id: (id || 'two-blocks-01') + ':' + field,
      rubric: {
        accepted: [fmt(expected), fmt(expected) + ' ' + unit],
        misconceptions: misconception || []
      }
    });
    const items = {
      acceleration: numericItem('acceleration', acceleration, 'm/s²'),
      contact: numericItem('contact', contact, 'N', [{ code: 'contact-equals-applied-force', answers: [fmt(force)] }]),
      netA: numericItem('netA', netA, 'N', [{ code: 'net-force-equals-applied-force', answers: [fmt(force)] }]),
      netB: numericItem('netB', netB, 'N'),
      equationA: { id: (id || 'two-blocks-01') + ':equationA',
        rubric: { accepted: ['F-C=mA*a'] } },
      equationB: { id: (id || 'two-blocks-01') + ':equationB',
        rubric: { accepted: ['C=mB*a'] } }
    };
    return {
      id: id || 'two-blocks-01', mA, mB, force,
      solution: { acceleration, contact, netA, netB },
      items
    };
  }
  function grade(problem, answers) {
    if (!problem || !problem.items || !answers || typeof answers !== 'object') throw new TypeError('problem and answers required');
    const results = {};
    for (const [field, item] of Object.entries(problem.items)) {
      results[field] = engine.analyzeResponse(item, String(answers[field] ?? ''));
    }
    const values = Object.values(results);
    return { results, correctCount: values.filter(r => r.score === 1).length, total: values.length };
  }
  return Object.freeze({ createProblem, grade });
});
