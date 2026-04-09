import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

*{margin:0;padding:0;box-sizing:border-box;}

:root{
  --bg:#020902;--bg2:#060d06;--bg3:#0a150a;
  --green:#00ff41;--green2:#00cc33;--green3:#006618;--green4:#001d08;
  --orange:#ff9500;--red:#ff3535;--blue:#4499ff;
  --text:#aaffb0;--text2:#5a9a5f;--text3:#2a5a2f;
  --border:#0a200a;--border2:#163016;
}

.db-app{background:var(--bg);min-height:100vh;font-family:'Share Tech Mono',monospace;color:var(--text);position:relative;overflow:hidden;}

/* scanlines */
.db-app::before{content:'';position:fixed;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,65,.018) 2px,rgba(0,255,65,.018) 4px);pointer-events:none;z-index:9999;}

/* dot grid */
.grid-bg{position:fixed;inset:0;background-image:linear-gradient(rgba(0,255,65,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,65,.05) 1px,transparent 1px);background-size:44px 44px;pointer-events:none;z-index:0;}

/* ── TOPBAR ── */
.topbar{height:52px;background:var(--bg2);border-bottom:1px solid var(--border2);display:flex;align-items:center;padding:0 20px;gap:18px;position:relative;z-index:100;}
.logo{font-family:'Orbitron',sans-serif;font-weight:900;font-size:17px;color:var(--green);letter-spacing:5px;text-shadow:0 0 22px rgba(0,255,65,.55);}
.logo span{color:var(--text2);font-weight:400;}
.vbar{width:1px;height:22px;background:var(--border2);}
.sys{display:flex;align-items:center;gap:5px;font-size:10px;color:var(--text2);letter-spacing:1px;}
.dot{width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 7px var(--green);animation:blink 2s infinite;}
.dot.o{background:var(--orange);box-shadow:0 0 7px var(--orange);}
.dot.r{background:var(--red);box-shadow:0 0 7px var(--red);}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
.ml-auto{margin-left:auto;}
.clock{font-family:'Orbitron',sans-serif;font-size:13px;color:var(--green);letter-spacing:3px;}
.badge-user{background:var(--green4);border:1px solid var(--green3);padding:4px 12px;font-size:10px;color:var(--green2);letter-spacing:1px;cursor:pointer;transition:all .15s;}
.badge-user:hover{border-color:var(--green);color:var(--green);}

/* ── LAYOUT ── */
.layout{display:flex;height:calc(100vh - 52px);position:relative;z-index:1;}
.sidebar{width:196px;background:var(--bg2);border-right:1px solid var(--border2);padding:16px 0;flex-shrink:0;display:flex;flex-direction:column;}
.ns{padding:0 14px 8px;font-size:9px;color:var(--text3);letter-spacing:3px;}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 16px;cursor:pointer;font-size:11px;color:var(--text2);letter-spacing:1px;border-left:2px solid transparent;transition:all .15s;}
.nav-item:hover{background:var(--bg3);color:var(--text);border-left-color:var(--green3);}
.nav-item.active{background:var(--green4);color:var(--green);border-left-color:var(--green);}
.nav-item .ni{font-size:13px;width:18px;text-align:center;}
.nb{margin-left:auto;background:var(--green);color:var(--bg);font-size:9px;padding:1px 5px;font-weight:bold;}
.main{flex:1;overflow-y:auto;padding:24px;scrollbar-width:thin;scrollbar-color:var(--green3) var(--bg);}

/* ── PAGE HEADER ── */
.ph-pre{font-size:9px;color:var(--text3);letter-spacing:3px;margin-bottom:4px;}
.ph-title{font-family:'Orbitron',sans-serif;font-size:19px;font-weight:700;color:var(--green);letter-spacing:3px;text-transform:uppercase;}
.ph-sub{margin-top:4px;font-size:11px;color:var(--text2);letter-spacing:1px;}
.ph{margin-bottom:22px;border-bottom:1px solid var(--border2);padding-bottom:14px;}

/* ── STAT CARD ── */
.card{background:var(--bg2);border:1px solid var(--border2);padding:18px;position:relative;}
.card::before{content:'';position:absolute;top:-1px;left:-1px;width:11px;height:11px;border-top:2px solid var(--green);border-left:2px solid var(--green);}
.card::after{content:'';position:absolute;bottom:-1px;right:-1px;width:11px;height:11px;border-bottom:2px solid var(--green);border-right:2px solid var(--green);}
.cl{font-size:9px;color:var(--text3);letter-spacing:2px;text-transform:uppercase;margin-bottom:7px;}
.cv{font-family:'Orbitron',sans-serif;font-size:30px;font-weight:700;color:var(--green);text-shadow:0 0 28px rgba(0,255,65,.35);}
.cv.o{color:var(--orange);text-shadow:0 0 28px rgba(255,149,0,.35);}
.cs{font-size:10px;color:var(--text2);margin-top:3px;}

/* ── GRIDS ── */
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}

/* ── SECTION TITLE ── */
.st{font-size:10px;color:var(--text2);letter-spacing:3px;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:7px;}
.st::before{content:'//';color:var(--green3);}

/* ── TABLE ── */
.tt{width:100%;border-collapse:collapse;font-size:11px;}
.tt th{background:var(--bg3);padding:7px 11px;text-align:left;font-size:9px;color:var(--text3);letter-spacing:2px;border-bottom:1px solid var(--border2);text-transform:uppercase;}
.tt td{padding:9px 11px;border-bottom:1px solid var(--border);color:var(--text);}
.tt tr:hover td{background:var(--bg3);}

/* ── STATUS ── */
.s{display:inline-flex;align-items:center;gap:4px;padding:2px 7px;font-size:9px;letter-spacing:1px;text-transform:uppercase;}
.s.active{background:rgba(0,255,65,.08);color:var(--green);border:1px solid var(--green3);}
.s.pending{background:rgba(255,149,0,.08);color:var(--orange);border:1px solid rgba(255,149,0,.3);}
.s.complete{background:rgba(68,153,255,.08);color:var(--blue);border:1px solid rgba(68,153,255,.3);}

/* ── PROGRESS ── */
.pbar{height:3px;background:var(--bg3);}
.pfill{height:100%;background:var(--green);box-shadow:0 0 7px var(--green);transition:width .5s ease;}

/* ── BTN ── */
.btn{padding:9px 18px;font-family:'Share Tech Mono',monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border:1px solid var(--green3);background:transparent;color:var(--green2);transition:all .15s;}
.btn:hover{background:var(--green4);color:var(--green);border-color:var(--green);box-shadow:0 0 18px rgba(0,255,65,.12);}
.btn.primary{background:var(--green);color:var(--bg);border-color:var(--green);font-weight:bold;}
.btn.primary:hover{background:#33ff66;box-shadow:0 0 28px rgba(0,255,65,.38);}

/* ── FORM ── */
.field{display:flex;flex-direction:column;gap:5px;margin-bottom:14px;}
.field label{font-size:9px;color:var(--text3);letter-spacing:2px;text-transform:uppercase;}
.field input,.field select,.field textarea{background:var(--bg3);border:1px solid var(--border2);color:var(--text);padding:9px 11px;font-family:'Share Tech Mono',monospace;font-size:11px;outline:none;transition:border-color .15s;}
.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--green3);}
.field select option{background:var(--bg3);}

/* ── OPERATOR CARD ── */
.op-card{background:var(--bg2);border:1px solid var(--border2);padding:15px;cursor:pointer;transition:all .2s;position:relative;overflow:hidden;}
.op-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--green),transparent);}
.op-card:hover{border-color:var(--green3);background:var(--bg3);transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,.5),0 0 18px rgba(0,255,65,.05);}
.callsign{font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;color:var(--green);letter-spacing:2px;}
.op-branch{font-size:10px;color:var(--orange);letter-spacing:1px;margin-top:2px;}
.spec-wrap{display:flex;flex-wrap:wrap;gap:4px;margin-top:8px;}
.spec{padding:2px 5px;font-size:8px;letter-spacing:1px;background:var(--green4);color:var(--green2);border:1px solid var(--green3);text-transform:uppercase;}
.op-stats{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:10px;padding-top:10px;border-top:1px solid var(--border);}
.osl{font-size:8px;color:var(--text3);letter-spacing:1px;text-transform:uppercase;}
.osv{font-family:'Orbitron',sans-serif;font-size:15px;color:var(--text);margin-top:1px;}

/* ── STEPS ── */
.steps{display:flex;align-items:center;margin-bottom:28px;}
.step{display:flex;align-items:center;gap:8px;flex:1;}
.sn{width:27px;height:27px;border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;font-family:'Orbitron',sans-serif;font-size:10px;color:var(--text3);flex-shrink:0;}
.step.active .sn{border-color:var(--green);color:var(--green);box-shadow:0 0 12px rgba(0,255,65,.25);}
.step.done .sn{background:var(--green);border-color:var(--green);color:var(--bg);}
.sl{font-size:9px;color:var(--text3);letter-spacing:1px;text-transform:uppercase;}
.step.active .sl{color:var(--green);}
.step.done .sl{color:var(--text2);}
.sline{height:1px;background:var(--border2);flex:1;max-width:36px;}
.step.done~.sline{background:var(--green3);}

/* ── FEED ── */
.fi{display:flex;gap:10px;padding:9px 0;border-bottom:1px solid var(--border);font-size:11px;}
.ft{font-size:9px;color:var(--text3);min-width:70px;letter-spacing:1px;}
.fm{color:var(--text2);flex:1;line-height:1.6;}
.fm strong{color:var(--green);}

/* ── MISSION TYPE ── */
.mt-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:18px;}
.mt{border:1px solid var(--border2);padding:15px 10px;text-align:center;cursor:pointer;transition:all .15s;}
.mt:hover{border-color:var(--green3);background:var(--bg3);}
.mt.sel{border-color:var(--green);background:var(--green4);}
.mt-icon{font-size:22px;margin-bottom:7px;}
.mt-label{font-size:10px;color:var(--text2);letter-spacing:1px;text-transform:uppercase;}
.mt.sel .mt-label{color:var(--green);}

/* ── SEC LEVELS ── */
.sec-wrap{display:flex;gap:7px;margin-bottom:14px;}
.sl-btn{flex:1;padding:7px;border:1px solid var(--border2);text-align:center;cursor:pointer;font-size:9px;letter-spacing:1px;font-family:'Share Tech Mono',monospace;transition:all .15s;background:transparent;color:var(--text2);}
.sl-btn:hover{border-color:var(--green3);}
.sl-btn.sel{border-color:var(--green);background:var(--green4);color:var(--green);}
.sl-btn.o.sel{border-color:var(--orange);background:rgba(255,149,0,.08);color:var(--orange);}
.sl-btn.r.sel{border-color:var(--red);background:rgba(255,53,53,.08);color:var(--red);}

/* ── INTEL ── */
.ic{background:var(--bg2);border:1px solid var(--border2);padding:14px;margin-bottom:10px;cursor:pointer;transition:all .15s;display:flex;gap:14px;align-items:flex-start;}
.ic:hover{border-color:var(--green3);background:var(--bg3);}
.ii{width:38px;height:38px;background:var(--green4);border:1px solid var(--green3);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
.it{font-size:12px;color:var(--text);letter-spacing:.5px;margin-bottom:3px;}
.id-{font-size:10px;color:var(--text2);line-height:1.6;}
.itag{display:inline-block;padding:2px 5px;font-size:8px;letter-spacing:1px;margin-top:5px;font-family:'Share Tech Mono',monospace;}

/* ── MAP ── */
.map-c{background:var(--bg3);border:1px solid var(--border2);position:relative;height:440px;overflow:hidden;}
.map-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(0,255,65,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,65,.05) 1px,transparent 1px);background-size:30px 30px;}
.scan{position:absolute;inset:0;background:linear-gradient(transparent 0%,rgba(0,255,65,.025) 50%,transparent 100%);background-size:100% 6px;animation:scanmove 5s linear infinite;pointer-events:none;}
@keyframes scanmove{0%{transform:translateY(-100%)}100%{transform:translateY(100%)}}

/* ── LOGIN ── */
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;}
.login-box{width:460px;background:var(--bg2);border:1px solid var(--border2);padding:38px;position:relative;}
.login-box::before{content:'';position:absolute;top:-1px;left:-1px;width:18px;height:18px;border-top:2px solid var(--green);border-left:2px solid var(--green);}
.login-box::after{content:'';position:absolute;bottom:-1px;right:-1px;width:18px;height:18px;border-bottom:2px solid var(--green);border-right:2px solid var(--green);}
.role-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:22px 0;}
.rc{border:1px solid var(--border2);padding:18px;text-align:center;cursor:pointer;transition:all .2s;}
.rc:hover{border-color:var(--green3);background:var(--bg3);}
.rc.sel{border-color:var(--green);background:var(--green4);}
.ri{font-size:26px;margin-bottom:7px;}
.rt{font-family:'Orbitron',sans-serif;font-size:10px;color:var(--green);letter-spacing:2px;text-transform:uppercase;}
.rd{font-size:9px;color:var(--text2);margin-top:3px;letter-spacing:1px;}

/* ── UTILS ── */
.sep{height:1px;background:var(--border2);margin:18px 0;}
.flex{display:flex;}.flex-c{display:flex;align-items:center;}.flex-b{display:flex;align-items:center;justify-content:space-between;}
.gap8{gap:8px;}.gap12{gap:12px;}.gap16{gap:16px;}
.mb8{margin-bottom:8px;}.mb16{margin-bottom:16px;}.mb22{margin-bottom:22px;}.mt16{margin-top:16px;}
.tg{color:var(--green);}.to{color:var(--orange);}.td{color:var(--text2);}.ts{font-size:10px;}
.orb{font-family:'Orbitron',sans-serif;}
::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:var(--bg);}::-webkit-scrollbar-thumb{background:var(--green3);}
`;

// ─────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────
const OPERATORS = [
  { id:1, callsign:"GHOST-7",  name:"황찬희", branch:"특전사 드론봇",   specs:["전술정찰","야간촬영","수색"], hours:847,  rating:4.9, missions:62,  status:"available", region:"서울/경기" },
  { id:2, callsign:"IRON-2",   name:"김도현", branch:"드론봇전투단",    specs:["시설점검","측량","3D맵핑"],   hours:1240, rating:4.8, missions:98,  status:"mission",   region:"수도권" },
  { id:3, callsign:"EAGLE-5",  name:"박지수", branch:"육군항공",        specs:["항공촬영","지형분석","행사"], hours:560,  rating:4.7, missions:41,  status:"available", region:"부산/경남" },
  { id:4, callsign:"HAWK-3",   name:"이민준", branch:"해병대 수색대",   specs:["해안촬영","보안시설","정찰"], hours:920,  rating:5.0, missions:77,  status:"standby",   region:"인천/경기" },
  { id:5, callsign:"VIPER-1",  name:"최성호", branch:"공군정보단",      specs:["정밀측량","3D맵핑","보안"],   hours:1540, rating:4.9, missions:134, status:"available", region:"전국" },
  { id:6, callsign:"SCOUT-9",  name:"정우진", branch:"드론봇전투단",    specs:["농업방제","농지측량","산림"], hours:730,  rating:4.6, missions:55,  status:"mission",   region:"전북/전남" },
];

const MISSIONS = [
  { id:"MSN-0047", type:"측량", title:"강남구 건설현장 측량",    client:"(주)대건건설",      op:"IRON-2",  status:"active",   budget:850000,  date:"2026.04.09", region:"서울 강남구" },
  { id:"MSN-0046", type:"촬영", title:"해운대 행사 항공촬영",    client:"부산시청",           op:"-",       status:"pending",  budget:500000,  date:"2026.04.12", region:"부산 해운대" },
  { id:"MSN-0045", type:"점검", title:"인천항 시설 보안점검",    client:"인천항만공사",       op:"GHOST-7", status:"complete", budget:1200000, date:"2026.04.07", region:"인천 중구" },
  { id:"MSN-0044", type:"방제", title:"김제 농지 방제작업",      client:"김제시 농업기술센터",op:"SCOUT-9", status:"complete", budget:320000,  date:"2026.04.06", region:"전북 김제" },
  { id:"MSN-0043", type:"촬영", title:"용인 드론 레이싱 행사",   client:"K-드론리그",         op:"EAGLE-5", status:"active",   budget:450000,  date:"2026.04.09", region:"경기 용인" },
];

const FEED = [
  { time:"14:23:07", text:"GHOST-7 — 서울 강남 측량 미션 수락 확인",          bold:"GHOST-7" },
  { time:"14:18:42", text:"새 미션 등록: 부산 해운대 항공촬영 (예산 50만원)",  bold:"부산 해운대 항공촬영" },
  { time:"13:55:21", text:"IRON-2 — 인천 보안시설 미션 완료 (★4.8)",          bold:"IRON-2" },
  { time:"13:41:09", text:"HAWK-3 파일럿 인증 승인 완료",                      bold:"HAWK-3" },
  { time:"13:20:33", text:"새 미션 등록: 경기 용인 레이싱 촬영 (예산 30만원)", bold:"경기 용인 레이싱 촬영" },
  { time:"12:47:15", text:"VIPER-1 — B2B 계약 협의 중 (지자체 측량 프로젝트)",bold:"VIPER-1" },
];

function FeedMsg({ text, bold }) {
  if (!bold || !text.includes(bold)) return <span style={{color:"var(--text2)"}}>{text}</span>;
  const [before, after] = text.split(bold);
  return <span style={{color:"var(--text2)"}}>{before}<strong style={{color:"var(--green)"}}>{bold}</strong>{after}</span>;
}

// ─────────────────────────────────────────────
// COMMAND CENTER
// ─────────────────────────────────────────────
function CommandCenter() {
  const stats = [
    { label:"ACTIVE OPERATORS", value:"24",   sub:"↑ 3 vs yesterday",      col:"" },
    { label:"ONGOING MISSIONS",  value:"07",   sub:"2건 오늘 완료 예정",    col:"o" },
    { label:"TOTAL MISSIONS",    value:"847",  sub:"이번 달 +63건",         col:"" },
    { label:"PLATFORM UPTIME",   value:"99.7%",sub:"Last 30 days",         col:"" },
  ];

  return (
    <div>
      <div className="ph">
        <div className="ph-pre">DRONEBRIDGE // TACTICAL OPERATIONS CENTER</div>
        <div className="ph-title">⬡ COMMAND CENTER</div>
        <div className="ph-sub">실시간 플랫폼 현황 모니터링</div>
      </div>

      {/* STAT CARDS */}
      <div className="g4 mb22">
        {stats.map((s,i) => (
          <div key={i} className="card">
            <div className="cl">{s.label}</div>
            <div className={`cv ${s.col}`}>{s.value}</div>
            <div className="cs">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* FEED + FORCE READINESS */}
      <div className="g2 mb22">
        <div>
          <div className="st">LIVE ACTIVITY FEED</div>
          <div style={{background:"var(--bg2)",border:"1px solid var(--border2)",padding:"14px"}}>
            {FEED.map((f,i) => (
              <div key={i} className="fi">
                <div className="ft">{f.time}</div>
                <div className="fm"><FeedMsg text={f.text} bold={f.bold} /></div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="st">FORCE READINESS</div>
          <div style={{background:"var(--bg2)",border:"1px solid var(--border2)",padding:"14px"}}>
            {OPERATORS.map(op => {
              const col = op.status==="available" ? "var(--green)" : op.status==="mission" ? "var(--orange)" : "#666";
              const lbl = op.status==="available" ? "READY" : op.status==="mission" ? "ON MISSION" : "STANDBY";
              return (
                <div key={op.id} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:"1px solid var(--border)"}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:col,flexShrink:0,boxShadow:`0 0 6px ${col}`}} />
                  <div style={{flex:1}}>
                    <div className="orb" style={{fontSize:10,color:"var(--green)",letterSpacing:1}}>{op.callsign}</div>
                    <div style={{fontSize:9,color:"var(--text3)",marginTop:1}}>{op.branch}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:9,color:col,letterSpacing:1,textTransform:"uppercase"}}>{lbl}</div>
                    <div style={{fontSize:8,color:"var(--text3)",marginTop:1}}>{op.hours}H LOGGED</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MISSIONS TABLE */}
      <div className="st">RECENT MISSIONS</div>
      <div style={{background:"var(--bg2)",border:"1px solid var(--border2)"}}>
        <table className="tt">
          <thead>
            <tr>
              <th>MISSION ID</th><th>TYPE</th><th>DESIGNATION</th>
              <th>CLIENT</th><th>OPERATOR</th><th>BUDGET</th><th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {MISSIONS.map(m => (
              <tr key={m.id}>
                <td className="orb" style={{fontSize:10,color:"var(--green)"}}>{m.id}</td>
                <td><span style={{fontSize:9,padding:"2px 5px",background:"var(--green4)",color:"var(--green2)",border:"1px solid var(--green3)"}}>{m.type}</span></td>
                <td>{m.title}</td>
                <td className="ts td">{m.client}</td>
                <td className="orb" style={{fontSize:10,color:m.op==="-"?"var(--text3)":"var(--text)"}}>{m.op}</td>
                <td className="to">₩{m.budget.toLocaleString()}</td>
                <td>
                  <span className={`s ${m.status==="active"?"active":m.status==="pending"?"pending":"complete"}`}>
                    {m.status==="active"?"● 진행중":m.status==="pending"?"◌ 견적대기":"✓ 완료"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MISSION BRIEFING
// ─────────────────────────────────────────────
function MissionBriefing() {
  const [step, setStep]         = useState(1);
  const [mType, setMType]       = useState(null);
  const [sec, setSec]           = useState("general");
  const [submitted, setSubmit]  = useState(false);

  const STEPS = [
    {n:1,l:"MISSION TYPE"},
    {n:2,l:"LOCATION / DATE"},
    {n:3,l:"BUDGET / SPECS"},
    {n:4,l:"CONFIRM"},
  ];

  const TYPES = [
    {id:"photo",   icon:"📷", label:"항공촬영"},
    {id:"survey",  icon:"📐", label:"측량·맵핑"},
    {id:"inspect", icon:"🔍", label:"시설점검"},
    {id:"other",   icon:"⚡", label:"기타임무"},
  ];

  if (submitted) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:400,gap:20,textAlign:"center"}}>
      <div style={{fontFamily:"Orbitron",fontSize:40,color:"var(--green)",textShadow:"0 0 30px rgba(0,255,65,.5)"}}>✓</div>
      <div className="orb" style={{fontSize:18,color:"var(--green)",letterSpacing:3}}>MISSION SUBMITTED</div>
      <div className="ts td">인증된 파일럿들에게 알림이 발송되었습니다.</div>
      <div style={{fontSize:11,color:"var(--text2)"}}>새 미션 ID: <span className="tg orb">MSN-0048</span></div>
      <button className="btn primary" onClick={() => { setSubmit(false); setStep(1); setMType(null); }}>+ NEW MISSION</button>
    </div>
  );

  return (
    <div>
      <div className="ph">
        <div className="ph-pre">DRONEBRIDGE // COMMAND</div>
        <div className="ph-title">✦ MISSION BRIEFING</div>
        <div className="ph-sub">임무 의뢰 등록 — 소요시간 약 5분</div>
      </div>

      {/* STEP BAR */}
      <div className="steps">
        {STEPS.map((s,i) => (
          <div key={s.n} style={{display:"flex",alignItems:"center",flex:1,gap:0}}>
            <div style={{display:"flex",alignItems:"center",gap:7,flex:1}}>
              <div className={`sn ${step===s.n?"active":""} ${step>s.n?"done":""}`}>{step>s.n?"✓":s.n}</div>
              <div className={`sl ${step===s.n?"active":""} ${step>s.n?"done":""}`}>{s.l}</div>
            </div>
            {i<STEPS.length-1 && <div className="sline" style={{background:step>s.n?"var(--green3)":"var(--border2)"}} />}
          </div>
        ))}
      </div>

      {/* STEP 1 */}
      {step===1 && (
        <div>
          <div className="st">임무 유형 선택</div>
          <div className="mt-grid">
            {TYPES.map(t => (
              <div key={t.id} className={`mt ${mType===t.id?"sel":""}`} onClick={() => setMType(t.id)}>
                <div className="mt-icon">{t.icon}</div>
                <div className="mt-label">{t.label}</div>
              </div>
            ))}
          </div>
          <div className="sep" />
          <div className="flex-b">
            <div />
            <button className="btn primary" style={{opacity:mType?1:.4}} onClick={() => mType && setStep(2)}>NEXT: LOCATION ▶</button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step===2 && (
        <div>
          <div className="st">임무 위치 및 일정</div>
          <div className="g2">
            <div>
              <div className="field"><label>임무 명칭 (MISSION DESIGNATION)</label><input type="text" placeholder="예: 강남구 건설현장 측량 작업" /></div>
              <div className="field"><label>임무 위치 (GRID REFERENCE)</label><input type="text" placeholder="주소 또는 좌표" /></div>
              <div className="field"><label>임무 일자 (D-DAY)</label><input type="date" /></div>
              <div className="field">
                <label>작전 시간 (OPERATION WINDOW)</label>
                <div style={{display:"flex",gap:8}}>
                  <input type="time" style={{flex:1,background:"var(--bg3)",border:"1px solid var(--border2)",color:"var(--text)",padding:"9px 11px",fontFamily:"Share Tech Mono",fontSize:11,outline:"none"}} />
                  <input type="time" style={{flex:1,background:"var(--bg3)",border:"1px solid var(--border2)",color:"var(--text)",padding:"9px 11px",fontFamily:"Share Tech Mono",fontSize:11,outline:"none"}} />
                </div>
              </div>
            </div>
            <div>
              <div className="field">
                <label>고도 요구사항 (ALTITUDE REQ)</label>
                <select>
                  <option>제한 없음</option>
                  <option>150m 이하 (일반)</option>
                  <option>150~300m (허가 필요)</option>
                  <option>300m 이상 (특수 허가)</option>
                </select>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:9,color:"var(--text3)",letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>보안 등급 (SECURITY CLEARANCE)</div>
                <div className="sec-wrap">
                  {[{id:"general",label:"GENERAL",cls:""},{id:"restricted",label:"RESTRICTED",cls:"o"},{id:"classified",label:"CLASSIFIED",cls:"r"}].map(s => (
                    <button key={s.id} className={`sl-btn ${s.cls} ${sec===s.id?"sel":""}`} onClick={() => setSec(s.id)}>{s.label}</button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label>특이사항 (SPECIAL NOTES)</label>
                <textarea rows={4} placeholder="접근 제한, 장비 요구사항, 기타 임무 특이사항" style={{resize:"none"}} />
              </div>
            </div>
          </div>
          <div className="sep" />
          <div className="flex-b">
            <button className="btn" onClick={() => setStep(1)}>◀ BACK</button>
            <button className="btn primary" onClick={() => setStep(3)}>NEXT: BUDGET ▶</button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step===3 && (
        <div>
          <div className="st">예산 및 장비 요구사항</div>
          <div className="g2">
            <div>
              <div className="field"><label>최대 예산 (MAX BUDGET)</label><input type="number" placeholder="예: 500000 (원)" /></div>
              <div className="field">
                <label>매칭 방식 (MATCHING MODE)</label>
                <select>
                  <option>공개 입찰 (오픈 비딩)</option>
                  <option>파일럿 지정 초대</option>
                  <option>AI 자동 추천 매칭</option>
                </select>
              </div>
              <div className="field">
                <label>결과물 형식 (DELIVERABLE FORMAT)</label>
                <select>
                  <option>4K 영상 + 사진</option>
                  <option>정사영상 + 포인트클라우드</option>
                  <option>디지털 임무 완료 보고서</option>
                  <option>실시간 스트리밍 + 녹화본</option>
                </select>
              </div>
            </div>
            <div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:9,color:"var(--text3)",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>장비 요구사항 (REQUIRED EQUIPMENT)</div>
                {["DJI Mavic 3 이상급","측량용 RTK 드론","열화상 카메라 탑재","방수/방진 IP43+ 등급","페이로드 500g 이상"].map((eq,i) => (
                  <label key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",cursor:"pointer"}}>
                    <input type="checkbox" style={{accentColor:"var(--green)"}} />
                    <span style={{fontSize:11,color:"var(--text2)"}}>{eq}</span>
                  </label>
                ))}
              </div>
              <div style={{padding:12,background:"var(--bg3)",border:"1px solid var(--border2)",fontSize:10,color:"var(--text2)",lineHeight:1.8}}>
                <div style={{color:"var(--orange)",fontSize:9,letterSpacing:2,marginBottom:5}}>// 보안 이수자 전용 매칭</div>
                <label style={{display:"flex",alignItems:"flex-start",gap:8,cursor:"pointer"}}>
                  <input type="checkbox" style={{accentColor:"var(--green)",marginTop:2}} />
                  <span>보안 교육 이수 파일럿만 매칭 (군 보안 서약서 제출자 우선 배정)</span>
                </label>
              </div>
            </div>
          </div>
          <div className="sep" />
          <div className="flex-b">
            <button className="btn" onClick={() => setStep(2)}>◀ BACK</button>
            <button className="btn primary" onClick={() => setStep(4)}>NEXT: CONFIRM ▶</button>
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {step===4 && (
        <div>
          <div className="st">임무 확인 및 제출</div>
          <div style={{background:"var(--bg2)",border:"1px solid var(--border2)",padding:20,marginBottom:18,position:"relative"}}>
            <div style={{position:"absolute",top:-1,left:-1,width:14,height:14,borderTop:"2px solid var(--green)",borderLeft:"2px solid var(--green)"}} />
            <div style={{position:"absolute",bottom:-1,right:-1,width:14,height:14,borderBottom:"2px solid var(--green)",borderRight:"2px solid var(--green)"}} />
            <div style={{fontSize:9,color:"var(--text3)",letterSpacing:3,marginBottom:14}}>MISSION BRIEFING SUMMARY</div>
            {[
              ["MISSION TYPE",     mType?.toUpperCase() || "-"],
              ["SECURITY LEVEL",   sec?.toUpperCase() || "-"],
              ["MATCHING MODE",    "공개 입찰"],
              ["ESTIMATED BUDGET", "₩500,000"],
              ["DELIVERABLE",      "디지털 임무 완료 보고서"],
              ["STATUS",           "대기 중 → 제출 후 ACTIVE"],
            ].map(([k,v]) => (
              <div key={k} style={{display:"flex",padding:"7px 0",borderBottom:"1px solid var(--border)",fontSize:11}}>
                <div style={{width:190,fontSize:9,color:"var(--text3)",letterSpacing:1,textTransform:"uppercase"}}>{k}</div>
                <div className="tg">{v}</div>
              </div>
            ))}
          </div>
          <div style={{padding:12,background:"rgba(255,149,0,.05)",border:"1px solid rgba(255,149,0,.2)",fontSize:10,color:"var(--orange)",marginBottom:18,lineHeight:1.7}}>
            ⚠ 제출 후 인증된 파일럿들에게 즉시 알림이 발송됩니다. 견적 수령까지 평균 2시간 소요.
          </div>
          <div className="flex-b">
            <button className="btn" onClick={() => setStep(3)}>◀ BACK</button>
            <button className="btn primary" style={{padding:"12px 32px"}} onClick={() => setSubmit(true)}>▶ MISSION SUBMIT</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// FORCE LIST
// ─────────────────────────────────────────────
function ForceList() {
  const [filter, setFilter] = useState("ALL");
  const FILTERS = ["ALL","정찰","측량","촬영","점검","보안"];

  const filtered = filter==="ALL" ? OPERATORS : OPERATORS.filter(o => o.specs.some(s => s.includes(filter)));

  return (
    <div>
      <div className="ph">
        <div className="ph-pre">DRONEBRIDGE // OPERATORS</div>
        <div className="ph-title">◆ FORCE LIST</div>
        <div className="ph-sub">인증된 군 출신 드론 오퍼레이터 — {OPERATORS.length}명 등록</div>
      </div>

      <div style={{display:"flex",gap:7,marginBottom:18,flexWrap:"wrap"}}>
        {FILTERS.map(f => (
          <button key={f} className="btn" style={{fontSize:9,padding:"5px 12px",...(filter===f?{background:"var(--green4)",color:"var(--green)",borderColor:"var(--green)"}:{})}} onClick={() => setFilter(f)}>{f}</button>
        ))}
        <input type="text" placeholder="콜사인 또는 전문 분야 검색..." style={{marginLeft:"auto",background:"var(--bg2)",border:"1px solid var(--border2)",color:"var(--text)",padding:"5px 13px",fontFamily:"Share Tech Mono",fontSize:10,outline:"none",width:220}} />
      </div>

      <div className="g3">
        {filtered.map(op => {
          const col = op.status==="available"?"var(--green)":op.status==="mission"?"var(--orange)":"#666";
          const stlbl = op.status==="available"?"● READY":op.status==="mission"?"● ON MISSION":"○ STANDBY";
          return (
            <div key={op.id} className="op-card">
              <div className="flex-b mb8">
                <div>
                  <div className="callsign">{op.callsign}</div>
                  <div style={{fontSize:10,color:"var(--text2)",marginTop:2}}>{op.name}</div>
                </div>
                <div style={{fontSize:8,color:col,border:`1px solid ${col === "var(--green)" ? "var(--green3)" : col==="var(--orange)"?"rgba(255,149,0,.3)":"#333"}`,padding:"2px 7px",letterSpacing:1,textTransform:"uppercase"}}>{stlbl}</div>
              </div>

              <div className="op-branch">{op.branch}</div>
              <div style={{fontSize:9,color:"var(--text3)",marginTop:2}}>📍 {op.region}</div>

              <div className="spec-wrap">{op.specs.map(s => <span key={s} className="spec">{s}</span>)}</div>

              <div className="op-stats">
                <div><div className="osl">FLIGHT HRS</div><div className="osv">{op.hours}<span style={{fontSize:9,color:"var(--text3)"}}>H</span></div></div>
                <div><div className="osl">MISSIONS</div><div className="osv">{op.missions}</div></div>
                <div><div className="osl">RATING</div><div className="osv" style={{color:"var(--orange)"}}>{op.rating}<span style={{fontSize:9,color:"var(--text3)"}}>★</span></div></div>
                <div><div className="osl">CERT</div><div className="orb" style={{fontSize:9,color:"var(--green2)",marginTop:3}}>✓ VERIFIED</div></div>
              </div>

              <div style={{marginTop:10}}><div className="pbar"><div className="pfill" style={{width:`${op.rating*20}%`}} /></div></div>

              <div style={{display:"flex",gap:7,marginTop:10}}>
                <button className="btn" style={{flex:1,fontSize:9,padding:"6px"}}>프로필 보기</button>
                {op.status==="available" && <button className="btn primary" style={{flex:1,fontSize:9,padding:"6px"}}>미션 제안</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TACTICAL MAP
// ─────────────────────────────────────────────
function TacticalMap() {
  const [hovered, setHovered] = useState(null);

  const MARKERS = [
    { x:"51%", y:"27%", id:"MSN-0047", label:"서울 강남",  color:"var(--orange)",  status:"active" },
    { x:"46%", y:"30%", id:"MSN-0043", label:"경기 용인",  color:"var(--orange)",  status:"active" },
    { x:"40%", y:"25%", id:"MSN-0046", label:"인천",       color:"var(--green2)",  status:"pending" },
    { x:"72%", y:"72%", id:"MSN-0045", label:"부산",       color:"var(--blue)",    status:"complete" },
    { x:"27%", y:"60%", id:"MSN-0044", label:"전북 김제",  color:"var(--blue)",    status:"complete" },
    { x:"63%", y:"43%", id:"ZONE-A",   label:"대구",       color:"var(--text3)",   status:"standby" },
  ];

  return (
    <div>
      <div className="ph">
        <div className="ph-pre">DRONEBRIDGE // REAL-TIME</div>
        <div className="ph-title">◉ TACTICAL MAP</div>
        <div className="ph-sub">실시간 임무 현황 지도 (Supabase Realtime 연동 예정)</div>
      </div>

      <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:10}}>
        {[{col:"var(--orange)",lbl:"진행중 (2)"},{col:"var(--green2)",lbl:"견적대기 (1)"},{col:"var(--blue)",lbl:"완료 (2)"},{col:"var(--text3)",lbl:"대기 (1)"}].map(l => (
          <div key={l.lbl} style={{display:"flex",alignItems:"center",gap:5,fontSize:9,color:"var(--text2)"}}>
            <div style={{width:8,height:8,background:l.col,transform:"rotate(45deg)"}} />{l.lbl}
          </div>
        ))}
        <div style={{marginLeft:"auto",fontSize:9,color:"var(--text3)",letterSpacing:1}}>
          LAST UPDATE: {new Date().toTimeString().slice(0,8)} KST
        </div>
      </div>

      <div className="map-c">
        <div className="map-grid" />
        <div className="scan" />

        {/* Korea SVG outline */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.12}} viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet">
          <path d="M155,30 L168,22 L182,26 L198,22 L214,28 L228,38 L238,52 L244,68 L242,84 L252,100 L258,118 L262,138 L256,158 L266,174 L272,194 L268,214 L262,232 L256,248 L246,264 L240,280 L228,296 L216,308 L222,324 L226,340 L218,356 L206,370 L196,386 L192,402 L196,416 L186,424 L176,428 L168,418 L162,400 L152,384 L146,366 L150,350 L140,336 L136,320 L140,306 L134,292 L122,278 L112,264 L106,250 L100,236 L96,220 L100,204 L96,188 L92,172 L96,156 L100,140 L106,124 L112,110 L118,96 L124,82 L132,66 L142,48 Z" fill="none" stroke="var(--green)" strokeWidth="1.2" />
        </svg>

        {/* Coordinate labels */}
        {["127°E","128°E","129°E"].map((c,i) => (
          <div key={c} style={{position:"absolute",top:8,left:`${26+i*23}%`,fontSize:8,color:"var(--text3)",letterSpacing:1}}>{c}</div>
        ))}
        {["38°N","36°N","34°N"].map((c,i) => (
          <div key={c} style={{position:"absolute",left:10,top:`${18+i*24}%`,fontSize:8,color:"var(--text3)",letterSpacing:1}}>{c}</div>
        ))}

        {/* Mission markers */}
        {MARKERS.map(m => (
          <div key={m.id} style={{position:"absolute",left:m.x,top:m.y,transform:"translate(-50%,-50%)"}}
            onMouseEnter={() => setHovered(m.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={{width:13,height:13,border:`2px solid ${m.color}`,transform:"rotate(45deg)",position:"relative",cursor:"pointer",transition:"transform .2s",...(hovered===m.id?{transform:"rotate(45deg) scale(1.4)"}:{})}}>
              <div style={{position:"absolute",inset:2,background:m.color,opacity:.8,animation:m.status==="active"?"blink 1.5s infinite":"none"}} />
            </div>
            <div style={{position:"absolute",top:-18,left:14,fontSize:8,color:m.color,whiteSpace:"nowrap",letterSpacing:1,pointerEvents:"none"}}>
              {m.label}
            </div>
            {hovered===m.id && (
              <div style={{position:"absolute",top:-50,left:15,background:"var(--bg2)",border:`1px solid ${m.color}`,padding:"5px 10px",fontSize:9,color:m.color,whiteSpace:"nowrap",letterSpacing:1,zIndex:10}}>
                {m.id}
              </div>
            )}
          </div>
        ))}

        {/* Corner info */}
        <div style={{position:"absolute",bottom:12,left:14,fontSize:8,color:"var(--text3)",letterSpacing:1,lineHeight:1.9}}>
          <div>GRID REF: KR-TACTICAL-01</div>
          <div>DATUM: WGS84</div>
          <div style={{color:"var(--green)"}}>● LIVE FEED ACTIVE</div>
        </div>
        <div style={{position:"absolute",bottom:12,right:14,fontSize:8,color:"var(--text3)",letterSpacing:1,textAlign:"right",lineHeight:1.9}}>
          <div>SCALE: 1:2,500,000</div>
          <div>ZONES: 6</div>
          <div style={{color:"var(--orange)"}}>⚠ 2 ACTIVE OPS</div>
        </div>
        <div style={{position:"absolute",top:12,right:14,fontSize:8,color:"var(--text3)",letterSpacing:1,textAlign:"right"}}>
          [PROTOTYPE — Supabase Realtime 연동 예정]
        </div>
      </div>

      <div className="g3 mt16">
        {MISSIONS.slice(0,3).map(m => (
          <div key={m.id} style={{background:"var(--bg2)",border:"1px solid var(--border2)",padding:13}}>
            <div className="flex-b mb8">
              <div className="orb" style={{fontSize:10,color:"var(--green)"}}>{m.id}</div>
              <span className={`s ${m.status==="active"?"active":m.status==="pending"?"pending":"complete"}`} style={{fontSize:8}}>
                {m.status==="active"?"진행중":m.status==="pending"?"대기":"완료"}
              </span>
            </div>
            <div style={{fontSize:11,color:"var(--text)",marginBottom:4}}>{m.title}</div>
            <div style={{fontSize:9,color:"var(--text3)"}}>📍 {m.region}</div>
            {m.op!=="-" && <div style={{marginTop:5,fontSize:9,color:"var(--green2)"}} className="orb">OPR: {m.op}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// INTEL CENTER
// ─────────────────────────────────────────────
function IntelCenter() {
  const INTELS = [
    { icon:"⚖️", title:"항공안전법 드론 운용 규정",           desc:"초경량비행장치 신고 의무, 조종자 자격증 기준, 비행 승인 절차. 250g 이상 기체 신고 필수.",                            tag:"법규 · 필수",     tcol:"orange" },
    { icon:"🚫", title:"비행금지구역 (NFZ) 데이터베이스",     desc:"전국 비행금지구역·제한구역 실시간 현황. 군사시설, 청와대, 원전 반경 내 비행 절대 금지.",                            tag:"규제 · 실시간",   tcol:"red" },
    { icon:"🔒", title:"개인정보보호법 드론 촬영 가이드",     desc:"공공장소 드론 촬영 시 개인정보 처리 기준. 동의 획득 방법 및 영상 보관·파기 규정.",                                  tag:"법규 · 권고",     tcol:"green" },
    { icon:"📋", title:"항공사업법 드론 사업자 등록",         desc:"드론 촬영·측량·배달 등 유상 비행 서비스 제공 시 필수 사업자 등록 절차 및 요건.",                                   tag:"사업 · 필수",     tcol:"orange" },
    { icon:"🛡️", title:"드론 배상책임보험 가이드",           desc:"드론 사고 발생 시 손해배상 의무. 파일럿 개인 가입 의무 및 추천 보험사 목록 (메리츠, DB, 현대).",                    tag:"보험 · 권고",     tcol:"green" },
    { icon:"📄", title:"디지털 임무 완료 보고서 템플릿",     desc:"DroneBridge 표준 보고서 양식. 비행 로그, 지형 분석, 결과물, 안전 체크리스트 포함. 지자체 납품 가능 포맷.",           tag:"문서 · 플랫폼",   tcol:"green" },
  ];

  const REPORTS = [
    { id:"RPT-0045", mission:"인천항 시설 보안점검",     op:"GHOST-7", date:"2026.04.07", status:"완료" },
    { id:"RPT-0044", mission:"김제 농지 방제작업",       op:"SCOUT-9", date:"2026.04.06", status:"완료" },
    { id:"RPT-0042", mission:"수원 태양광 시설 점검",   op:"IRON-2",  date:"2026.04.03", status:"검토중" },
  ];

  const tagStyle = (tcol) => ({
    background: tcol==="red"?"rgba(255,53,53,.08)":tcol==="green"?"rgba(0,255,65,.05)":"rgba(255,149,0,.08)",
    color: tcol==="red"?"var(--red)":tcol==="green"?"var(--green2)":"var(--orange)",
    border: `1px solid ${tcol==="red"?"rgba(255,53,53,.3)":tcol==="green"?"var(--green3)":"rgba(255,149,0,.3)"}`,
  });

  return (
    <div>
      <div className="ph">
        <div className="ph-pre">DRONEBRIDGE // KNOWLEDGE BASE</div>
        <div className="ph-title">▣ INTEL CENTER</div>
        <div className="ph-sub">법규 정보 · 비행금지구역 · 임무 보고서 보관함</div>
      </div>

      {/* CRITICAL NOTICE */}
      <div style={{background:"rgba(255,53,53,.04)",border:"1px solid rgba(255,53,53,.2)",padding:14,marginBottom:20,display:"flex",gap:12,alignItems:"flex-start"}}>
        <div style={{color:"var(--red)",fontSize:17,flexShrink:0}}>⚠</div>
        <div>
          <div style={{fontSize:10,color:"var(--red)",letterSpacing:1,marginBottom:4}}>CRITICAL NOTICE — 2026년 항공안전법 개정</div>
          <div style={{fontSize:10,color:"var(--text2)",lineHeight:1.8}}>
            25kg 이상 기체 사용 시 별도 운용자 격증 필요. 비행 계획 신고는 비행 24시간 전까지
            드론원스톱 시스템(drone.onestop.go.kr) 제출 필수. 위반 시 200만원 이하 과태료.
          </div>
        </div>
      </div>

      <div className="g2">
        {INTELS.map((item,i) => (
          <div key={i} className="ic">
            <div className="ii">{item.icon}</div>
            <div>
              <div className="it">{item.title}</div>
              <div className="id-">{item.desc}</div>
              <div className="itag" style={tagStyle(item.tcol)}>{item.tag}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="sep" />
      <div className="st">최근 임무 완료 보고서</div>
      <div style={{background:"var(--bg2)",border:"1px solid var(--border2)"}}>
        <table className="tt">
          <thead><tr><th>보고서 ID</th><th>임무명</th><th>오퍼레이터</th><th>완료일</th><th>상태</th><th>액션</th></tr></thead>
          <tbody>
            {REPORTS.map(r => (
              <tr key={r.id}>
                <td className="orb" style={{fontSize:10,color:"var(--green)"}}>{r.id}</td>
                <td>{r.mission}</td>
                <td className="orb" style={{fontSize:10}}>{r.op}</td>
                <td className="ts td">{r.date}</td>
                <td><span className={`s ${r.status==="완료"?"complete":"pending"}`}>{r.status}</span></td>
                <td><button className="btn" style={{fontSize:9,padding:"4px 10px"}}>다운로드</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// OPERATOR DASHBOARD  (파일럿 전용)
// ─────────────────────────────────────────────
function OperatorDash() {
  const me = OPERATORS[0]; // GHOST-7 as logged-in operator

  return (
    <div>
      <div className="ph">
        <div className="ph-pre">DRONEBRIDGE // OPERATOR HQ</div>
        <div className="ph-title orb">⬢ {me.callsign} — OPERATOR HQ</div>
        <div className="ph-sub">{me.branch} · {me.region}</div>
      </div>

      {/* PILOT STATS */}
      <div className="g4 mb22">
        {[
          {l:"TOTAL FLIGHT HRS", v:me.hours+"H", col:""},
          {l:"MISSIONS COMPLETED", v:me.missions, col:""},
          {l:"RATING", v:me.rating+"★", col:"o"},
          {l:"TRUST LEVEL", v:"78%", col:""},
        ].map((s,i) => (
          <div key={i} className="card">
            <div className="cl">{s.l}</div>
            <div className={`cv ${s.col}`}>{s.v}</div>
          </div>
        ))}
      </div>

      <div className="g2 mb22">
        {/* 추천 일감 */}
        <div>
          <div className="st">추천 일감 (RECOMMENDED MISSIONS)</div>
          {MISSIONS.filter(m => m.status==="pending" || m.status==="active").map(m => (
            <div key={m.id} style={{background:"var(--bg2)",border:"1px solid var(--border2)",padding:14,marginBottom:8,transition:"all .15s",cursor:"pointer"}}>
              <div className="flex-b mb8">
                <div className="orb" style={{fontSize:10,color:"var(--green)"}}>{m.id}</div>
                <div style={{fontSize:10,color:"var(--orange)"}}>₩{m.budget.toLocaleString()}</div>
              </div>
              <div style={{fontSize:12,color:"var(--text)",marginBottom:4}}>{m.title}</div>
              <div style={{fontSize:9,color:"var(--text3)"}}>📍 {m.region} · {m.date}</div>
              <div style={{display:"flex",gap:7,marginTop:10}}>
                <button className="btn" style={{fontSize:9,padding:"5px 10px"}}>상세 보기</button>
                <button className="btn primary" style={{fontSize:9,padding:"5px 14px"}}>견적 제안</button>
              </div>
            </div>
          ))}
        </div>

        {/* 내 프로필 / 장비 */}
        <div>
          <div className="st">OPERATOR PROFILE</div>
          <div style={{background:"var(--bg2)",border:"1px solid var(--border2)",padding:16}}>
            <div className="callsign mb8">{me.callsign}</div>
            <div className="op-branch mb8">{me.branch}</div>
            <div style={{fontSize:9,color:"var(--text3)",letterSpacing:2,marginBottom:8}}>// 전문 분야</div>
            <div className="spec-wrap mb16">{me.specs.map(s => <span key={s} className="spec">{s}</span>)}</div>

            <div style={{fontSize:9,color:"var(--text3)",letterSpacing:2,marginBottom:8}}>// 인증 현황</div>
            {[
              {lbl:"초경량비행장치 조종자 (1종)",  ok:true},
              {lbl:"군 경력 증명서",                ok:true},
              {lbl:"드론 배상책임보험",              ok:true},
              {lbl:"보안 교육 이수",                 ok:false},
            ].map(c => (
              <div key={c.lbl} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",borderBottom:"1px solid var(--border)",fontSize:10}}>
                <div style={{color:c.ok?"var(--green)":"var(--orange)",fontFamily:"Orbitron",fontSize:10}}>{c.ok?"✓":"○"}</div>
                <div style={{color:c.ok?"var(--text)":"var(--text3)"}}>{c.lbl}</div>
                {!c.ok && <div style={{marginLeft:"auto",fontSize:8,color:"var(--orange)"}}>미완료</div>}
              </div>
            ))}

            <div style={{marginTop:14}}>
              <div className="pbar"><div className="pfill" style={{width:"78%"}} /></div>
              <div style={{fontSize:8,color:"var(--text3)",marginTop:4}}>프로필 완성도 78%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function DroneBridge() {
  const [screen,  setScreen]  = useState("login");
  const [nav,     setNav]     = useState("command");
  const [role,    setRole]    = useState(null);
  const [selRole, setSelRole] = useState(null);
  const [time,    setTime]    = useState(new Date());

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fmt = (d) => d.toTimeString().slice(0,8);
  const fmtD = (d) => d.toISOString().slice(0,10);

  // ── LOGIN ──
  if (screen==="login") return (
    <div className="db-app">
      <div className="grid-bg" />
      <div className="login-wrap">
        <div className="login-box">
          <div style={{textAlign:"center",marginBottom:28}}>
            <div style={{fontSize:9,color:"var(--text3)",letterSpacing:4,marginBottom:10}}>▶ SYSTEM INITIALIZE ◀</div>
            <div className="logo" style={{fontSize:26,letterSpacing:6,display:"block"}}>DRONE<span>BRIDGE</span></div>
            <div style={{fontSize:10,color:"var(--text2)",letterSpacing:2,marginTop:8}}>TACTICAL OPERATIONS PLATFORM v2.6.0</div>
          </div>

          <div style={{fontSize:9,color:"var(--text3)",letterSpacing:3,marginBottom:10}}>▸ SELECT CLEARANCE LEVEL</div>
          <div className="role-grid">
            <div className={`rc ${selRole==="command"?"sel":""}`} onClick={() => setSelRole("command")}>
              <div className="ri">🎯</div>
              <div className="rt">COMMAND</div>
              <div className="rd">의뢰인 / 클라이언트</div>
            </div>
            <div className={`rc ${selRole==="operator"?"sel":""}`} onClick={() => setSelRole("operator")}>
              <div className="ri">🚁</div>
              <div className="rt">OPERATOR</div>
              <div className="rd">드론 파일럿 / 전역 군인</div>
            </div>
          </div>

          <div className="field" style={{marginBottom:10}}>
            <label>IDENTIFICATION CODE</label>
            <input type="text" placeholder="아이디 또는 이메일" />
          </div>
          <div className="field" style={{marginBottom:18}}>
            <label>AUTHENTICATION KEY</label>
            <input type="password" placeholder="비밀번호" />
          </div>

          <button className="btn primary" style={{width:"100%",padding:13}} onClick={() => { if(selRole){ setRole(selRole); setScreen("app"); }}}>
            ▶ SYSTEM ACCESS
          </button>

          <div style={{textAlign:"center",marginTop:14,fontSize:10,color:"var(--text3)"}}>
            신규 등록 → <span style={{color:"var(--green2)",cursor:"pointer"}}>PRE-REGISTRATION</span>
          </div>

          <div style={{marginTop:22,padding:12,background:"var(--bg3)",border:"1px solid var(--border2)",fontSize:9,color:"var(--text3)",letterSpacing:1,lineHeight:2}}>
            <div style={{color:"var(--green3)",marginBottom:4}}>// LIVE SYSTEM STATUS</div>
            <div>ACTIVE OPERATORS ................. 24</div>
            <div>ONGOING MISSIONS ................. 07</div>
            <div>PLATFORM UPTIME ........... 99.7%</div>
            <div style={{color:"var(--green)",marginTop:4}}>● ALL SYSTEMS NOMINAL</div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── NAV ITEMS ──
  const NAV = [
    { id:"command",  icon:"◈", label:"COMMAND CTR",  badge:null },
    { id:"mission",  icon:"✦", label:"MISSION BRIEF", badge:"3" },
    { id:"force",    icon:"◆", label:"FORCE LIST",    badge:null },
    { id:"map",      icon:"◉", label:"TACTICAL MAP",  badge:null },
    { id:"intel",    icon:"▣", label:"INTEL CENTER",  badge:null },
    ...(role==="operator" ? [{ id:"opdash", icon:"⬢", label:"OPERATOR HQ", badge:"!" }] : []),
  ];

  const PAGE = {
    command:  <CommandCenter />,
    mission:  <MissionBriefing />,
    force:    <ForceList />,
    map:      <TacticalMap />,
    intel:    <IntelCenter />,
    opdash:   <OperatorDash />,
  };

  return (
    <div className="db-app">
      <div className="grid-bg" />

      {/* TOP BAR */}
      <div className="topbar">
        <div className="logo">DRONE<span>BRIDGE</span></div>
        <div className="vbar" />
        <div className="sys"><div className="dot" /> SYS ONLINE</div>
        <div className="sys"><div className="dot" /> DB CONNECTED</div>
        <div className="sys"><div className="dot o" /> 7 ACTIVE MISSIONS</div>
        <div className="ml-auto flex gap12" style={{alignItems:"center"}}>
          <div className="clock">{fmt(time)}</div>
          <div className="sys">{fmtD(time)}</div>
          <div className="badge-user" onClick={() => setScreen("login")}>
            [{role==="command"?"CMD":"OPR"}] ▸ LOGOUT
          </div>
        </div>
      </div>

      <div className="layout">
        {/* SIDEBAR */}
        <div className="sidebar">
          <div className="ns" style={{marginBottom:6}}>NAVIGATION</div>
          {NAV.map(item => (
            <div key={item.id} className={`nav-item ${nav===item.id?"active":""}`} onClick={() => setNav(item.id)}>
              <span className="ni">{item.icon}</span>
              <span style={{fontSize:10,letterSpacing:1,textTransform:"uppercase"}}>{item.label}</span>
              {item.badge && <span className="nb">{item.badge}</span>}
            </div>
          ))}

          <div style={{marginTop:"auto",padding:"14px 14px"}}>
            <div className="ns" style={{marginBottom:7}}>CLEARANCE</div>
            <div style={{fontSize:11,color:"var(--green2)",letterSpacing:1,padding:"0 2px"}}>
              {role==="command"?"🎯 COMMAND":"🚁 OPERATOR"}
            </div>
            <div style={{marginTop:8}}>
              <div className="pbar"><div className="pfill" style={{width:"78%"}} /></div>
              <div style={{fontSize:8,color:"var(--text3)",marginTop:4}}>TRUST LVL: 78%</div>
            </div>
            <div style={{marginTop:12,fontSize:8,color:"var(--text3)",letterSpacing:1,lineHeight:1.9}}>
              <div>VER: v2.6.0-PROTO</div>
              <div style={{color:"var(--green3)"}}>● VERCEL DEPLOYED</div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="main">
          {PAGE[nav] || PAGE.command}
        </div>
      </div>
    </div>
  );
}
