/* Learning OS · Retrieval-first v3.1. No external AI/API calls. */
(()=>{
'use strict';
const D=window.LearningDB;
if(!D)return;
const css=document.createElement('style');
css.textContent=`
.rf-card{margin-top:18px;padding:16px;border:1px solid #c9d6d0;border-radius:16px;background:#f3f8f5;color:#24362e}
.rf-card h3{margin:0 0 6px;font-size:1.08rem}.rf-card p{margin:5px 0 12px;font-size:.85rem;line-height:1.5}
.rf-card label{display:block;margin:10px 0 4px;font-size:.82rem;font-weight:600}
.rf-card textarea,.rf-card select,.rf-card input{display:block;box-sizing:border-box;width:100%;padding:9px;margin:2px 0 6px;border:1px solid #a9bdb2;border-radius:9px;background:white;color:#192c22;font:inherit}
.rf-card textarea{min-height:55px}.rf-card button{padding:9px 12px;border:1px solid #71897b;border-radius:9px;margin:4px 4px 4px 0;background:#fff;color:#1d3b29;cursor:pointer}
.rf-card .rf-primary{background:#205a40;color:white}.rf-muted{color:#4f6658;font-size:.8rem}.rf-steps{font-size:.82rem;margin:8px 0}
.rf-card [hidden]{display:none!important}
`;
document.head.append(css);
const host=document.querySelector('#session .studybox');
if(!host)return;
const root=document.createElement('div');
root.className='rf-card';
root.innerHTML=`
<h3>🧠 Retrieval Lab <small>v3.1</small></h3>
<p>説明より先に、自分の頭から取り出す。答えが出ない場合も、その試行を残します。</p>
<div class="rf-steps" id="rf-status">場面を決めて開始</div>
<label for="rf-situation">目標の場面・使えるようになりたいこと</label>
<textarea id="rf-situation" placeholder="例：駅の窓口で、明日のモスクワ行きの切符を1枚求める"></textarea>
<label for="rf-attempt">今の自分の表現（不完全でOK）</label>
<textarea id="rf-attempt" placeholder="最初に思いついたこと。空欄でも可"></textarea>
<button type="button" class="rf-primary" id="rf-begin">① 試行を保存</button>
<div id="rf-after" hidden>
<label for="rf-hypothesis">Gapの仮説（断定しない）</label>
<select id="rf-hypothesis">
<option value="unknown">未判定</option><option value="missing">知識がまだない可能性</option>
<option value="retrieval">知っているが想起できない可能性</option>
<option value="competition">類似表現と競合した可能性</option>
<option value="mapping">場面との結びつきが弱い可能性</option>
</select>
<label for="rf-hint">与えられたHint（答えそのものはなるべく避ける）</label>
<textarea id="rf-hint" placeholder="例：『移動する』場面か『そこにいる』場面か"></textarea>
<label for="rf-retry">Hint後の自分の再試行</label>
<textarea id="rf-retry" placeholder="新たに自分で考えた表現"></textarea>
<button type="button" id="rf-save-retry">② Hintと再試行を保存</button>
<label for="rf-transfer-situation">別の場面（Transfer）</label>
<textarea id="rf-transfer-situation" placeholder="例：友人に『私は今モスクワに向かっています』と言う"></textarea>
<label for="rf-transfer-attempt">別場面で、ヒントなしに想起した表現</label>
<textarea id="rf-transfer-attempt" placeholder="正解を見る前の表現"></textarea>
<select id="rf-transfer-result" aria-label="転移の自己評価">
<option value="unverified">未検証</option><option value="independent">ヒントなしで想起</option>
<option value="assisted">ヒントありで想起</option><option value="not_yet">まだ想起できない</option>
</select>
<button type="button" id="rf-save-transfer">③ 別場面での想起を保存</button>
</div>
<div><button type="button" id="rf-copy">📋 ChatGPT / Claude共通指示をコピー</button><button type="button" id="rf-reset">新しい試行</button></div>
<p class="rf-muted" id="rf-feedback" role="status">記録は既存Learning OSのバックアップにも含まれます。AIの返信は自動解析せず、手動で残します。</p>`;
host.insertAdjacentElement('afterend',root);
const $=id=>root.querySelector('#'+id);
let sid=null,attemptId=null;
function context(){try{return JSON.parse(localStorage.getItem(D.ACTIVE_KEY)||'null')}catch{return null}}
function current(){const a=context();return a&&D.db.sessions[a.sessionId]?a:null}
function feedback(s){$('rf-feedback').textContent=s}
function refresh(){
 const a=current(),newSid=a?.sessionId||null;
 if(newSid===sid)return;
 sid=newSid;attemptId=null;
 const recs=D.db.records.filter(r=>r.sessionId===sid&&r.type==='retrieval_attempt');
 const last=recs[recs.length-1];
 if(last){attemptId=last.id;$('rf-situation').value=last.metadata?.situation||'';$('rf-attempt').value=last.content||''}
 else{$('rf-situation').value='';$('rf-attempt').value=''}
 $('rf-hint').value='';$('rf-retry').value='';$('rf-transfer-situation').value='';$('rf-transfer-attempt').value='';
 $('rf-after').hidden=!attemptId;
 $('rf-status').textContent=attemptId?'試行済み：Hint → 再試行 → Transfer':'場面を決めて開始';
 root.hidden=!a;
}
function add(type,content,metadata){
 const a=current();if(!a){feedback('学習セッションを開始してください');return null}
 return D.addRecord(type,{nodeId:a.nodeId,sessionId:a.sessionId,content,metadata});
}
$('rf-begin').onclick=()=>{
 refresh();const situation=$('rf-situation').value.trim(),attempt=$('rf-attempt').value.trim();
 if(!situation){feedback('まず、目標の場面を記入してください');return}
 const r=add('retrieval_attempt',attempt,{situation,independent:true,status:'unverified'});
 if(!r)return;attemptId=r.id;$('rf-after').hidden=false;$('rf-status').textContent='初回試行を保存しました。次はGapの仮説と最小のHintへ';feedback('正誤は未判定です。試行そのものを記録しました');
};
$('rf-save-retry').onclick=()=>{
 refresh();if(!attemptId){feedback('初回試行を先に保存してください');return}
 const hint=$('rf-hint').value.trim(),retry=$('rf-retry').value.trim();
 if(!retry){feedback('再試行を入力してください');return}
 add('retrieval_retry',retry,{attemptId,hint,gapHypothesis:$('rf-hypothesis').value,assessment:'unverified'});
 $('rf-hint').value='';$('rf-retry').value='';feedback('再試行を保存しました。正解の理解と自力想起は分けて扱います');
};
$('rf-save-transfer').onclick=()=>{
 refresh();if(!attemptId){feedback('初回試行を先に保存してください');return}
 const situation=$('rf-transfer-situation').value.trim(),attempt=$('rf-transfer-attempt').value.trim();
 if(!situation||!attempt){feedback('別の場面と、そこでの自分の表現を入力してください');return}
 add('retrieval_transfer',attempt,{attemptId,situation,selfAssessment:$('rf-transfer-result').value,verified:false});
 $('rf-transfer-situation').value='';$('rf-transfer-attempt').value='';feedback('別場面の想起を保存。自己評価と客観的な検証結果は区別します');
};
$('rf-copy').onclick=async()=>{
 refresh();
 const situation=$('rf-situation').value.trim()||'（まだ未入力：会話で場面を決める）';
 const attempt=$('rf-attempt').value.trim()||'（まず私の初回試行を待つ）';
 const prompt=`あなたはKnowledge Tentacle / Learning OSの学習支援役です。
目標場面：${situation}
学習者の初回表現：${attempt}
以下を守ってください。
1. 意味の意図を確認し、正誤一覧や完成文を先に提示しない。誤記や発音由来の試行も、まず意味を受け止める。
2. Gapは「知識不足・想起失敗・競合・場面結合」の仮説として扱い、1つの回答で決めつけない。
3. 一度に焦点化するGapは原則1つ。Hintは最小限から与え、学習者の再試行を待つ。まだ生成できる余地がある限り、完成形や正解を明かさない。
4. 例外：学習者が明示的に正解を求める、繰り返し行き詰まる、実用上の誤解が危険な場合は正答と理由を示す。
5. 元の目的場面を維持。途中の文法練習が本来の発話目的に合っているか確認する。
6. 学習者が自力で再試行した後、異なる場面から同じ知識をヒントなしで想起させる。正解を見て分かったことを、独立した想起成功と数えない。
7. 文法用語は英語で説明し、日本語の説明は必要時だけ。毎回最後は学習者が答えられる短い問いを1つ。
8. 観察された発話、AIの推定、未検証事項を区別する。`;
 try{await navigator.clipboard.writeText(prompt);feedback('共通指示をコピーしました')}catch{feedback('コピーできませんでした。ブラウザの権限をご確認ください')}
};
$('rf-reset').onclick=()=>{
 attemptId=null;['rf-situation','rf-attempt','rf-hint','rf-retry','rf-transfer-situation','rf-transfer-attempt'].forEach(id=>$(id).value='');
 $('rf-after').hidden=true;$('rf-status').textContent='新しい試行';feedback('フォームをリセットしました。過去の記録は保持されます');
};
document.addEventListener('click',()=>setTimeout(refresh,0));
setInterval(refresh,1500);
refresh();
})();