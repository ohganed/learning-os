/* Learning Engine v0.1 — pure, dependency-free functions.
 * Experimental: no student data, authentication, or persistence.
 * All timestamps are explicit ISO strings; no hidden clock access.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.LearningEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const VERSION = '0.1.0';
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  function requireString(x, field) {
    if (typeof x !== 'string' || !x.trim()) throw new TypeError(field + ' must be non-empty');
    return x;
  }
  function parseTime(value, field) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T/.test(value)) throw new TypeError(field + ' must be an ISO datetime');
    const t = Date.parse(value);
    if (!Number.isFinite(t)) throw new TypeError(field + ' invalid datetime');
    return t;
  }
  function analyzeResponse(item, response) {
    if (!item || typeof item !== 'object') throw new TypeError('item required');
    requireString(item.id, 'item.id');
    if (!item.rubric || !Array.isArray(item.rubric.accepted) || !item.rubric.accepted.length) {
      throw new TypeError('item.rubric.accepted required');
    }
    if (typeof response !== 'string') throw new TypeError('response must be text');
    const norm = x => x.trim().normalize('NFKC').toLocaleLowerCase('en-US').replace(/\s+/g, ' ');
    const actual = norm(response);
    const accepted = item.rubric.accepted.map(x => norm(requireString(x, 'rubric answer')));
    const correct = accepted.includes(actual);
    const misconceptionRules = Array.isArray(item.rubric.misconceptions) ? item.rubric.misconceptions : [];
    const matched = correct ? [] : misconceptionRules
      .filter(r => r && typeof r.code === 'string' && Array.isArray(r.answers) &&
        r.answers.some(a => typeof a === 'string' && norm(a) === actual))
      .map(r => r.code);
    return {
      schemaVersion: VERSION, itemId: item.id, score: correct ? 1 : 0,
      verdict: correct ? 'correct' : (actual ? 'incorrect' : 'blank'),
      misconceptionCodes: [...new Set(matched)],
      method: 'exact-normalized-match', confidence: correct || matched.length ? 1 : 0,
      needsTeacherReview: !correct && matched.length === 0
    };
  }
  function scheduleReview(state, analysis, answeredAt) {
    const stamp = parseTime(answeredAt, 'answeredAt');
    if (!analysis || ![0, 1].includes(analysis.score)) throw new TypeError('analysis.score must be 0 or 1');
    const previous = state && Number.isInteger(state.streak) && state.streak >= 0 ? state.streak : 0;
    const streak = analysis.score === 1 ? Math.min(previous + 1, 6) : 0;
    const intervalDays = analysis.score === 1 ? [0, 1, 3, 7, 14, 30, 60][streak] : 1;
    return {
      schemaVersion: VERSION, streak, intervalDays, lastAnsweredAt: new Date(stamp).toISOString(),
      dueAt: new Date(stamp + intervalDays * 86400000).toISOString(),
      reason: analysis.score === 1 ? 'retrieval-success' : 'retrieval-error'
    };
  }
  function selectNextQuestion(items, history, now, options) {
    if (!Array.isArray(items) || !Array.isArray(history)) throw new TypeError('items and history arrays required');
    const nowMs = parseTime(now, 'now');
    const allowed = options && Array.isArray(options.allowedIds) ? new Set(options.allowedIds) : null;
    const map = new Map(history.map(h => [h.itemId, h]));
    const candidates = items.filter(i => i && typeof i.id === 'string' && (!allowed || allowed.has(i.id)))
      .map(i => {
        const h = map.get(i.id);
        const due = h && h.review && h.review.dueAt ? parseTime(h.review.dueAt, 'review.dueAt') : null;
        return { item: i, priority: due === null ? 1 : (due <= nowMs ? 2 : 0),
          dueAt: due, reason: due === null ? 'new' : (due <= nowMs ? 'review-due' : 'not-due') };
      }).filter(x => x.priority > 0)
      .sort((a, b) => b.priority - a.priority || ((a.dueAt || Infinity) - (b.dueAt || Infinity)) || a.item.id.localeCompare(b.item.id));
    if (!candidates.length) return null;
    const first = candidates[0];
    return { schemaVersion: VERSION, itemId: first.item.id, reason: first.reason, method: 'due-first-deterministic' };
  }
  return Object.freeze({ VERSION, analyzeResponse, scheduleReview, selectNextQuestion });
});
