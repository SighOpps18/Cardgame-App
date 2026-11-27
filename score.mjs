export function calculate(game, rows) {
 const {mode,rules,totals,bags}=game;
 const nextBags=[...bags];
 const valid=(n,max)=>Number.isInteger(n)&&n>=0&&n<=max;
 if(rows.length!==totals.length)throw Error('Missing scores');
 let delta;
 if(mode==='Hearts'){
  if(rows.some(([p])=>!valid(p,26))||rows.reduce((s,[p])=>s+p,0)!==26)throw Error('Round must total 26 points.');
  const moon=rows.findIndex(([p])=>p===26);
  delta=rows.map(([p],i)=>moon<0?p:rules.moon==='subtract'?(i===moon?-26:0):(i===moon?0:26));
 }else if(mode==='Spades'){
  if(rows.some(([b,t])=>!valid(b,13)||!valid(t,13))||rows.reduce((s,[,t])=>s+t,0)!==13)throw Error('Bids must be 0–13 and tricks must total 13.');
  delta=rows.map(([b,t],i)=>{if(t<b)return -10*b;const over=t-b;const n=nextBags[i]+over;nextBags[i]=n%10;return b*10+over-100*Math.floor(n/10)});
 }else{
  if(rows.some(([n])=>!Number.isSafeInteger(n)))throw Error('Enter a whole-number round score (positive or negative).');
  delta=rows.map(([n])=>n);
 }
 const scores=totals.map((t,i)=>{const n=t+delta[i];return mode==='Hearts'&&rules.reset&&n===rules.target?0:n});
 const ended=scores.some(s=>s>=rules.target);
 return {scores,bags:nextBags,delta:scores.map((s,i)=>s-totals[i]),ended};
}
export function winners(game){const best=game.mode==='Hearts'?Math.min(...game.totals):Math.max(...game.totals);return game.totals.flatMap((s,i)=>s===best?[i]:[])}
