/* Explainable, deterministic next-step recommendations for the two-blocks exercise.
 * Low-confidence answers yield a neutral diagnostic question, not learner labeling.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PhysicsNextStep = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const objectives = {
    acceleration: { concept: 'system-as-one', prompt: 'AとBをひとつの物体とみなしたとき、合計質量は何kgですか？', answer: '5 kg', hint: 'Aの質量とBの質量を足します。' },
    contact: { concept: 'internal-contact', prompt: 'Bだけに注目します。Bを右向きに押しているのは、10 Nの外力ですか、それともAからの接触力ですか？', answer: 'Aからの接触力', hint: '10 Nの外力が直接作用するのはAです。' },
    netA: { concept: 'net-versus-applied', prompt: 'Aには右向き10 Nのほかに、Bから左向きの接触力が働きます。Aの合力は10 Nより大きいですか、小さいですか？', answer: '小さい', hint: '右向きを正にして力を足し合わせます。' },
    netB: { concept: 'force-on-B', prompt: 'Bに働く水平方向の力を、すべて挙げてみましょう。', answer: 'Aから受ける右向きの接触力', hint: '摩擦はありません。' },
    equationA: { concept: 'equation-for-A', prompt: 'Aに働く接触力Cは、右向きですか、左向きですか？', answer: '左向き', hint: '作用・反作用を考えてください。' },
    equationB: { concept: 'equation-for-B', prompt: 'Bに直接10 Nの力が働いていますか？', answer: 'いいえ', hint: 'BはAに押されて動きます。' }
  };
  const order = ['contact', 'equationA', 'equationB', 'netA', 'netB', 'acceleration'];
  function recommend(grade) {
    if (!grade || !grade.results || !Number.isInteger(grade.total)) throw new TypeError('grade results required');
    if (grade.correctCount === grade.total && grade.total > 0) {
      return {
        kind: 'transfer', objective: 'apply-to-new-values', targetField: null,
        prompt: '次の問題：A=1 kg、B=1 kg、右向きの力4 N。加速度と接触力を求めてください。',
        expected: '加速度2 m/s²、接触力2 N',
        reason: 'all-objectives-correct'
      };
    }
    const key = order.find(field => grade.results[field] && grade.results[field].score !== 1);
    if (!key) throw new TypeError('missing physics learning objective');
    const result = grade.results[key];
    const obj = objectives[key];
    const uncertain = result.needsTeacherReview || result.verdict === 'blank';
    return {
      kind: uncertain ? 'diagnostic' : 'targeted-retry',
      objective: obj.concept, targetField: key,
      prompt: obj.prompt, expected: obj.answer, hint: obj.hint,
      reason: uncertain ? 'insufficient-evidence' : (result.misconceptionCodes[0] || 'incorrect-answer')
    };
  }
  return Object.freeze({ recommend });
});
