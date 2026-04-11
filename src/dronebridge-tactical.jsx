import { useState, useEffect } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

*{margin:0;padding:0;box-sizing:border-box;}

:root{
  --navy-950:#060C1A;--navy-900:#0B1527;--navy-800:#101E36;--navy-700:#152645;
  --navy-600:#1C3260;--navy-500:#22407A;
  --blue-500:#3B82F6;--blue-400:#60A5FA;--blue-300:#93C5FD;--blue-200:#BFDBFE;--blue-100:#DBEAFE;
  --slate-400:#94A3B8;--slate-300:#CBD5E1;--slate-200:#E2E8F0;--slate-100:#F1F5F9;
  --white:#FFFFFF;--orange:#F97316;--green:#22C55E;--red:#EF4444;
  --border:#1C3260;--border2:#152645;
  --text:#E2E8F0;--text2:#94A3B8;--text3:#475569;
}

body{font-family:'Inter',sans-serif;background:var(--navy-950);color:var(--text);}

.app{min-height:100vh;background:var(--navy-950);}

/* subtle noise texture */
.app::before{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:0;opacity:.5;}

/* ── TOPBAR ── */
.topbar{height:60px;background:var(--navy-900);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 28px;gap:20px;position:relative;z-index:100;}
.logo{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:18px;color:var(--white);letter-spacing:-0.3px;}
.logo em{color:var(--blue-400);font-style:normal;}
.logo-badge{background:var(--blue-500);color:var(--white);font-size:9px;font-weight:600;padding:2px 6px;border-radius:4px;letter-spacing:.5px;margin-left:6px;vertical-align:middle;}
.divider{width:1px;height:20px;background:var(--border);}
.status-dot{width:7px;height:7px;border-radius:50%;background:var(--green);box-shadow:0 0 0 2px rgba(34,197,94,.2);animation:pulse 2.5s infinite;}
@keyframes pulse{0%,100%{box-shadow:0 0 0 2px rgba(34,197,94,.2)}50%{box-shadow:0 0 0 4px rgba(34,197,94,.08)}}
.status-text{font-size:12px;color:var(--text2);letter-spacing:.3px;}
.topbar-right{margin-left:auto;display:flex;align-items:center;gap:12px;}
.clock-badge{background:var(--navy-800);border:1px solid var(--border);padding:5px 12px;border-radius:6px;font-size:12px;font-family:'Space Grotesk',sans-serif;color:var(--blue-300);letter-spacing:.5px;}
.user-btn{display:flex;align-items:center;gap:8px;background:var(--navy-800);border:1px solid var(--border);padding:5px 12px;border-radius:6px;cursor:pointer;transition:all .15s;font-size:12px;color:var(--text);}
.user-btn:hover{border-color:var(--blue-500);color:var(--white);}
.avatar{width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,var(--blue-500),var(--blue-400));display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:var(--white);}

/* ── LAYOUT ── */
.layout{display:flex;height:calc(100vh - 60px);position:relative;z-index:1;}
.sidebar{width:220px;background:var(--navy-900);border-right:1px solid var(--border);padding:20px 0;flex-shrink:0;display:flex;flex-direction:column;}
.nav-section{padding:0 16px 6px;font-size:10px;font-weight:600;color:var(--text3);letter-spacing:1.2px;text-transform:uppercase;}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 16px;margin:1px 8px;cursor:pointer;font-size:13px;color:var(--text2);border-radius:8px;transition:all .15s;font-weight:400;}
.nav-item:hover{background:var(--navy-800);color:var(--text);}
.nav-item.active{background:rgba(59,130,246,.12);color:var(--blue-400);font-weight:500;}
.nav-item.active .nav-icon{color:var(--blue-400);}
.nav-icon{width:16px;text-align:center;font-size:14px;color:var(--text3);}
.nav-badge{margin-left:auto;background:var(--blue-500);color:var(--white);font-size:10px;font-weight:600;padding:1px 6px;border-radius:10px;min-width:18px;text-align:center;}
.nav-badge.orange{background:var(--orange);}
.sidebar-footer{margin-top:auto;padding:16px;}
.plan-card{background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);border-radius:10px;padding:12px;}
.plan-label{font-size:10px;color:var(--blue-300);font-weight:600;letter-spacing:.5px;margin-bottom:4px;}
.plan-val{font-size:12px;color:var(--text2);}
.pbar{height:4px;background:var(--navy-700);border-radius:2px;margin-top:8px;}
.pfill{height:100%;border-radius:2px;background:var(--blue-500);transition:width .4s ease;}

.main{flex:1;overflow-y:auto;padding:28px;scrollbar-width:thin;scrollbar-color:var(--border) transparent;}

/* ── PAGE HEADER ── */
.ph{margin-bottom:24px;}
.ph-eyebrow{font-size:11px;font-weight:600;color:var(--blue-400);letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;}
.ph-title{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:700;color:var(--white);letter-spacing:-.3px;}
.ph-sub{margin-top:4px;font-size:13px;color:var(--text2);}

/* ── STAT CARDS ── */
.stat-card{background:var(--navy-800);border:1px solid var(--border);border-radius:12px;padding:20px;}
.stat-card.accent{border-color:rgba(59,130,246,.3);background:rgba(59,130,246,.06);}
.stat-label{font-size:11px;font-weight:500;color:var(--text3);letter-spacing:.3px;text-transform:uppercase;margin-bottom:8px;}
.stat-val{font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:700;color:var(--white);}
.stat-val.blue{color:var(--blue-400);}
.stat-val.orange{color:var(--orange);}
.stat-val.green{color:var(--green);}
.stat-change{font-size:12px;color:var(--text2);margin-top:4px;display:flex;align-items:center;gap:4px;}
.stat-change .up{color:var(--green);font-weight:500;}
.stat-change .down{color:var(--red);font-weight:500;}

/* ── GRID ── */
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.g21{display:grid;grid-template-columns:1fr 1.7fr;gap:14px;}

/* ── CARD ── */
.card{background:var(--navy-800);border:1px solid var(--border);border-radius:12px;padding:20px;}
.card-title{font-size:13px;font-weight:600;color:var(--text);margin-bottom:14px;display:flex;align-items:center;gap:8px;}
.card-title .ct-icon{width:20px;height:20px;border-radius:6px;background:rgba(59,130,246,.15);display:flex;align-items:center;justify-content:center;font-size:11px;}

/* ── TABLE ── */
.tbl{width:100%;border-collapse:collapse;font-size:13px;}
.tbl th{padding:8px 12px;text-align:left;font-size:10px;font-weight:600;color:var(--text3);letter-spacing:.8px;text-transform:uppercase;border-bottom:1px solid var(--border);}
.tbl td{padding:11px 12px;border-bottom:1px solid rgba(21,38,69,.6);color:var(--text);vertical-align:middle;}
.tbl tr:last-child td{border-bottom:none;}
.tbl tr:hover td{background:rgba(59,130,246,.04);}

/* ── BADGE ── */
.badge{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:6px;font-size:11px;font-weight:500;}
.badge.active{background:rgba(34,197,94,.1);color:#4ADE80;border:1px solid rgba(34,197,94,.2);}
.badge.pending{background:rgba(249,115,22,.1);color:#FB923C;border:1px solid rgba(249,115,22,.2);}
.badge.complete{background:rgba(59,130,246,.1);color:var(--blue-300);border:1px solid rgba(59,130,246,.2);}
.badge.dot::before{content:'';width:5px;height:5px;border-radius:50%;background:currentColor;display:inline-block;}

/* ── BTN ── */
.btn{padding:8px 16px;font-family:'Inter',sans-serif;font-size:12px;font-weight:500;cursor:pointer;border-radius:8px;border:1px solid var(--border);background:transparent;color:var(--text2);transition:all .15s;letter-spacing:.2px;}
.btn:hover{background:var(--navy-700);color:var(--text);border-color:var(--slate-400);}
.btn.primary{background:var(--blue-500);color:var(--white);border-color:var(--blue-500);}
.btn.primary:hover{background:#2563EB;}
.btn.sm{padding:5px 12px;font-size:11px;}
.btn.ghost{border-color:transparent;background:transparent;}
.btn.ghost:hover{background:var(--navy-800);}

/* ── FORM ── */
.field{display:flex;flex-direction:column;gap:5px;margin-bottom:14px;}
.field label{font-size:11px;font-weight:500;color:var(--text2);letter-spacing:.3px;}
.field input,.field select,.field textarea{background:var(--navy-900);border:1px solid var(--border);color:var(--text);padding:9px 12px;font-family:'Inter',sans-serif;font-size:13px;outline:none;border-radius:8px;transition:border-color .15s;}
.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--blue-500);box-shadow:0 0 0 3px rgba(59,130,246,.1);}
.field select option{background:var(--navy-900);}

/* ── OPERATOR CARD ── */
.op-card{background:var(--navy-800);border:1px solid var(--border);border-radius:12px;padding:18px;cursor:pointer;transition:all .2s;}
.op-card:hover{border-color:rgba(59,130,246,.4);box-shadow:0 4px 24px rgba(0,0,0,.3),0 0 0 1px rgba(59,130,246,.1);}
.op-avatar{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,var(--navy-600),var(--blue-500));display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;color:var(--white);flex-shrink:0;}
.callsign{font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:700;color:var(--white);}
.op-branch{font-size:11px;color:var(--blue-300);font-weight:500;margin-top:2px;}
.spec{display:inline-block;padding:2px 7px;font-size:10px;font-weight:500;background:rgba(59,130,246,.1);color:var(--blue-300);border:1px solid rgba(59,130,246,.2);border-radius:4px;}
.op-stat-label{font-size:10px;color:var(--text3);font-weight:500;text-transform:uppercase;letter-spacing:.5px;}
.op-stat-val{font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:600;color:var(--white);margin-top:2px;}

/* ── STEPS ── */
.steps{display:flex;align-items:center;margin-bottom:28px;gap:0;}
.step{display:flex;align-items:center;gap:8px;flex:1;}
.step-num{width:28px;height:28px;border-radius:50%;border:1.5px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:var(--text3);flex-shrink:0;transition:all .2s;}
.step.active .step-num{border-color:var(--blue-500);color:var(--blue-400);background:rgba(59,130,246,.1);}
.step.done .step-num{background:var(--blue-500);border-color:var(--blue-500);color:var(--white);}
.step-label{font-size:11px;font-weight:500;color:var(--text3);white-space:nowrap;}
.step.active .step-label{color:var(--blue-400);}
.step.done .step-label{color:var(--text2);}
.step-line{height:1.5px;flex:1;background:var(--border);transition:background .2s;max-width:40px;}
.step.done+.step-line,.done-line{background:var(--blue-500);}

/* ── FEED ── */
.feed-item{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid rgba(21,38,69,.6);}
.feed-item:last-child{border-bottom:none;}
.feed-time{font-size:11px;color:var(--text3);min-width:64px;font-family:'Space Grotesk',sans-serif;}
.feed-text{font-size:12px;color:var(--text2);flex:1;line-height:1.6;}
.feed-text strong{color:var(--blue-300);font-weight:500;}

/* ── MISSION TYPE ── */
.mt-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px;}
.mt-card{border:1.5px solid var(--border);border-radius:10px;padding:16px 12px;text-align:center;cursor:pointer;transition:all .15s;background:var(--navy-900);}
.mt-card:hover{border-color:rgba(59,130,246,.4);background:var(--navy-800);}
.mt-card.sel{border-color:var(--blue-500);background:rgba(59,130,246,.08);}
.mt-icon{font-size:24px;margin-bottom:8px;}
.mt-label{font-size:11px;font-weight:500;color:var(--text2);}
.mt-card.sel .mt-label{color:var(--blue-400);}

/* ── SEC LEVEL ── */
.sec-wrap{display:flex;gap:8px;margin-bottom:14px;}
.sec-btn{flex:1;padding:8px;border:1.5px solid var(--border);border-radius:8px;text-align:center;cursor:pointer;font-size:11px;font-weight:500;font-family:'Inter',sans-serif;transition:all .15s;background:transparent;color:var(--text2);}
.sec-btn:hover{border-color:var(--slate-400);}
.sec-btn.sel{border-color:var(--blue-500);background:rgba(59,130,246,.1);color:var(--blue-400);}
.sec-btn.sel.o{border-color:var(--orange);background:rgba(249,115,22,.08);color:#FB923C;}
.sec-btn.sel.r{border-color:var(--red);background:rgba(239,68,68,.08);color:#F87171;}

/* ── INTEL ── */
.intel-card{background:var(--navy-800);border:1px solid var(--border);border-radius:10px;padding:16px;cursor:pointer;transition:all .15s;display:flex;gap:14px;align-items:flex-start;margin-bottom:10px;}
.intel-card:hover{border-color:rgba(59,130,246,.3);}
.intel-icon{width:40px;height:40px;border-radius:10px;background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.2);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
.intel-title{font-size:13px;font-weight:600;color:var(--white);margin-bottom:4px;}
.intel-desc{font-size:12px;color:var(--text2);line-height:1.6;}
.intel-tag{display:inline-block;padding:2px 7px;font-size:10px;font-weight:500;border-radius:4px;margin-top:6px;}

/* ── MAP ── */
.map-wrap{background:var(--navy-900);border:1px solid var(--border);border-radius:12px;overflow:hidden;position:relative;height:420px;}
.map-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(59,130,246,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.06) 1px,transparent 1px);background-size:36px 36px;}
.map-scan{position:absolute;inset:0;background:linear-gradient(to bottom,transparent,rgba(59,130,246,.03) 50%,transparent);animation:scan 4s ease-in-out infinite;pointer-events:none;}
@keyframes scan{0%,100%{transform:translateY(-60%)}50%{transform:translateY(60%)}}
.map-label{position:absolute;font-size:10px;color:var(--text3);font-family:'Space Grotesk',sans-serif;letter-spacing:.5px;}

/* ── LOGIN ── */
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--navy-950);position:relative;}
.login-glow{position:absolute;top:30%;left:50%;transform:translate(-50%,-50%);width:600px;height:400px;background:radial-gradient(ellipse,rgba(59,130,246,.08) 0%,transparent 70%);pointer-events:none;}
.login-box{width:440px;background:var(--navy-900);border:1px solid var(--border);border-radius:16px;padding:36px;position:relative;z-index:1;}
.login-logo{font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:700;color:var(--white);text-align:center;margin-bottom:6px;}
.login-logo em{color:var(--blue-400);font-style:normal;}
.login-sub{font-size:13px;color:var(--text2);text-align:center;margin-bottom:28px;}
.role-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:20px 0;}
.role-card{border:1.5px solid var(--border);border-radius:10px;padding:16px;text-align:center;cursor:pointer;transition:all .2s;background:var(--navy-800);}
.role-card:hover{border-color:rgba(59,130,246,.4);}
.role-card.sel{border-color:var(--blue-500);background:rgba(59,130,246,.08);}
.role-icon{font-size:28px;margin-bottom:8px;}
.role-title{font-size:13px;font-weight:600;color:var(--white);}
.role-desc{font-size:11px;color:var(--text2);margin-top:3px;}
.role-card.sel .role-title{color:var(--blue-400);}

/* ── UTILS ── */
.flex{display:flex;}.fc{display:flex;align-items:center;}.fb{display:flex;align-items:center;justify-content:space-between;}
.gap6{gap:6px;}.gap8{gap:8px;}.gap12{gap:12px;}
.mb8{margin-bottom:8px;}.mb14{margin-bottom:14px;}.mb20{margin-bottom:20px;}.mt12{margin-top:12px;}.mt16{margin-top:16px;}
.text-blue{color:var(--blue-400);}.text-muted{color:var(--text2);}.text-white{color:var(--white);}
.sg{font-family:'Space Grotesk',sans-serif;}
.sep{height:1px;background:var(--border);margin:18px 0;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px;}
`;

// ─── DATA ───
const OPERATORS = [
  { id:1, callsign:"GHOST-7", name:"황찬희", branch:"특전사 드론봇", specs:["전술정찰","야간촬영","수색"], hours:847,  rating:4.9, missions:62,  status:"available", region:"서울/경기", initials:"황찬" },
  { id:2, callsign:"IRON-2",  name:"김도현", branch:"드론봇전투단", specs:["시설점검","측량","3D맵핑"],  hours:1240, rating:4.8, missions:98,  status:"mission",   region:"수도권",   initials:"김도" },
  { id:3, callsign:"EAGLE-5", name:"박지수", branch:"육군항공",     specs:["항공촬영","지형분석","행사"],hours:560,  rating:4.7, missions:41,  status:"available", region:"부산/경남",initials:"박지" },
  { id:4, callsign:"HAWK-3",  name:"이민준", branch:"해병대 수색대",specs:["해안촬영","보안시설","정찰"],hours:920,  rating:5.0, missions:77,  status:"standby",   region:"인천/경기",initials:"이민" },
  { id:5, callsign:"VIPER-1", name:"최성호", branch:"공군정보단",   specs:["정밀측량","3D맵핑","보안"],  hours:1540, rating:4.9, missions:134, status:"available", region:"전국",     initials:"최성" },
  { id:6, callsign:"SCOUT-9", name:"정우진", branch:"드론봇전투단", specs:["농업방제","농지측량","산림"],hours:730,  rating:4.6, missions:55,  status:"mission",   region:"전북/전남",initials:"정우" },
];

const MISSIONS = [
  { id:"MSN-0047", type:"측량", title:"강남구 건설현장 측량",   client:"(주)대건건설",    op:"IRON-2",  status:"active",   budget:850000,  date:"2026.04.09", region:"서울 강남" },
  { id:"MSN-0046", type:"촬영", title:"해운대 행사 항공촬영",   client:"부산시청",         op:"-",       status:"pending",  budget:500000,  date:"2026.04.12", region:"부산 해운대" },
  { id:"MSN-0045", type:"점검", title:"인천항 시설 보안점검",   client:"인천항만공사",     op:"GHOST-7", status:"complete", budget:1200000, date:"2026.04.07", region:"인천 중구" },
  { id:"MSN-0044", type:"방제", title:"김제 농지 방제작업",     client:"김제시 농업기술센터",op:"SCOUT-9",status:"complete", budget:320000,  date:"2026.04.06", region:"전북 김제" },
  { id:"MSN-0043", type:"촬영", title:"용인 드론 레이싱 행사", client:"K-드론리그",       op:"EAGLE-5", status:"active",   budget:450000,  date:"2026.04.09", region:"경기 용인" },
];

const FEED = [
  { time:"14:23", text:"GHOST-7 — 서울 강남 측량 미션 수락",      bold:"GHOST-7" },
  { time:"14:18", text:"새 의뢰 등록: 부산 해운대 항공촬영 50만원", bold:"부산 해운대" },
  { time:"13:55", text:"IRON-2 — 인천 보안점검 완료 (★4.8)",      bold:"IRON-2" },
  { time:"13:41", text:"HAWK-3 파일럿 인증 승인",                   bold:"HAWK-3" },
  { time:"13:20", text:"새 의뢰 등록: 용인 레이싱 촬영 30만원",    bold:"용인 레이싱" },
  { time:"12:47", text:"VIPER-1 — 지자체 측량 계약 협의 중",       bold:"VIPER-1" },
];

// ─── COMMAND CENTER ───
function CommandCenter() {
  const stats = [
    { label:"투입 가능 파일럿", val:"24명",   change:"+3 어제 대비", up:true,   blue:true },
    { label:"진행 중 미션",      val:"7건",    change:"오늘 2건 완료 예정", up:false, blue:false },
    { label:"이달 총 거래",      val:"₩18.4M", change:"+23% 전월 대비", up:true,  blue:false },
    { label:"플랫폼 업타임",     val:"99.7%",  change:"최근 30일",      up:true,  blue:false },
  ];

  return (
    <div>
      <div className="ph">
        <div className="ph-eyebrow">Dashboard</div>
        <div className="ph-title sg">운영 현황 Overview</div>
        <div className="ph-sub">실시간 플랫폼 상태 모니터링</div>
      </div>

      <div className="g4 mb20">
        {stats.map((s,i) => (
          <div key={i} className={`stat-card ${s.blue?"accent":""}`}>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-val ${s.blue?"blue":""}`}>{s.val}</div>
            <div className="stat-change">
              <span className={s.up?"up":"down"}>{s.up?"↑":"↓"}</span>
              {s.change}
            </div>
          </div>
        ))}
      </div>

      <div className="g21 mb20">
        {/* 활동 피드 */}
        <div className="card">
          <div className="card-title"><div className="ct-icon">📡</div>실시간 활동</div>
          {FEED.map((f,i) => (
            <div key={i} className="feed-item">
              <div className="feed-time">{f.time}</div>
              <div className="feed-text">
                {f.bold && f.text.includes(f.bold)
                  ? <>{f.text.split(f.bold)[0]}<strong>{f.bold}</strong>{f.text.split(f.bold)[1]}</>
                  : f.text
                }
              </div>
            </div>
          ))}
        </div>

        {/* 파일럿 현황 */}
        <div className="card">
          <div className="card-title"><div className="ct-icon">👨‍✈️</div>파일럿 현황</div>
          {OPERATORS.map(op => {
            const col = op.status==="available" ? "var(--green)" : op.status==="mission" ? "var(--orange)" : "var(--text3)";
            const lbl = op.status==="available" ? "대기" : op.status==="mission" ? "미션 중" : "준비 중";
            return (
              <div key={op.id} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:"1px solid rgba(21,38,69,.6)"}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:col,flexShrink:0}} />
                <div style={{flex:1}}>
                  <div className="sg" style={{fontSize:13,color:"var(--white)",fontWeight:600}}>{op.callsign}</div>
                  <div style={{fontSize:11,color:"var(--text3)",marginTop:1}}>{op.branch}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:11,color:col,fontWeight:500}}>{lbl}</div>
                  <div style={{fontSize:10,color:"var(--text3)",marginTop:1}}>{op.hours}H</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 미션 테이블 */}
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <div style={{padding:"16px 20px 12px",borderBottom:"1px solid var(--border)"}}>
          <div className="card-title" style={{margin:0}}><div className="ct-icon">📋</div>최근 미션</div>
        </div>
        <table className="tbl">
          <thead>
            <tr><th>ID</th><th>유형</th><th>미션명</th><th>클라이언트</th><th>파일럿</th><th>예산</th><th>상태</th></tr>
          </thead>
          <tbody>
            {MISSIONS.map(m => (
              <tr key={m.id}>
                <td className="sg" style={{fontSize:12,color:"var(--blue-300)",fontWeight:600}}>{m.id}</td>
                <td><span className="spec">{m.type}</span></td>
                <td style={{fontWeight:500}}>{m.title}</td>
                <td style={{color:"var(--text2)",fontSize:12}}>{m.client}</td>
                <td className="sg" style={{fontSize:12,fontWeight:600,color:m.op==="-"?"var(--text3)":"var(--white)"}}>{m.op}</td>
                <td style={{color:"var(--orange)",fontWeight:500,fontSize:12}}>₩{m.budget.toLocaleString()}</td>
                <td>
                  <span className={`badge dot ${m.status==="active"?"active":m.status==="pending"?"pending":"complete"}`}>
                    {m.status==="active"?"진행중":m.status==="pending"?"견적대기":"완료"}
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

// ─── MISSION BRIEFING ───
function MissionBriefing() {
  const [step, setStep]       = useState(1);
  const [mType, setMType]     = useState(null);
  const [sec, setSec]         = useState("general");
  const [submitted, setSubmit]= useState(false);

  const STEPS = [{n:1,l:"미션 유형"},{n:2,l:"위치/일정"},{n:3,l:"예산/장비"},{n:4,l:"최종 확인"}];
  const TYPES = [{id:"photo",icon:"📷",label:"항공촬영"},{id:"survey",icon:"📐",label:"측량·맵핑"},{id:"inspect",icon:"🔍",label:"시설점검"},{id:"other",icon:"⚡",label:"기타"}];

  if (submitted) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:400,gap:16,textAlign:"center"}}>
      <div style={{width:60,height:60,borderRadius:"50%",background:"rgba(34,197,94,.1)",border:"1.5px solid var(--green)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>✓</div>
      <div className="sg" style={{fontSize:20,fontWeight:700,color:"var(--white)"}}>의뢰 등록 완료</div>
      <div style={{fontSize:13,color:"var(--text2)"}}>인증된 파일럿들에게 알림이 발송되었습니다</div>
      <div style={{padding:"8px 20px",background:"rgba(59,130,246,.08)",border:"1px solid rgba(59,130,246,.2)",borderRadius:8,fontSize:12,color:"var(--blue-300)"}}>미션 ID: MSN-0048</div>
      <button className="btn primary" style={{marginTop:8}} onClick={() => { setSubmit(false); setStep(1); setMType(null); }}>+ 새 의뢰 등록</button>
    </div>
  );

  return (
    <div>
      <div className="ph">
        <div className="ph-eyebrow">Mission Briefing</div>
        <div className="ph-title sg">드론 서비스 의뢰</div>
        <div className="ph-sub">총 4단계 · 소요 시간 약 5분</div>
      </div>

      {/* STEPS */}
      <div className="steps">
        {STEPS.map((s,i) => (
          <div key={s.n} style={{display:"flex",alignItems:"center",flex:1,gap:0}}>
            <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
              <div className={`step-num ${step===s.n?"active":""} ${step>s.n?"done":""}`}>{step>s.n?"✓":s.n}</div>
              <div className={`step-label ${step===s.n?"active":""} ${step>s.n?"done":""}`}>{s.l}</div>
            </div>
            {i<STEPS.length-1 && <div className="step-line" style={{background:step>s.n?"var(--blue-500)":"var(--border)"}} />}
          </div>
        ))}
      </div>

      {/* STEP 1 */}
      {step===1 && (
        <div className="card">
          <div className="card-title mb14"><div className="ct-icon">🎯</div>서비스 유형 선택</div>
          <div className="mt-grid">
            {TYPES.map(t => (
              <div key={t.id} className={`mt-card ${mType===t.id?"sel":""}`} onClick={() => setMType(t.id)}>
                <div className="mt-icon">{t.icon}</div>
                <div className="mt-label">{t.label}</div>
              </div>
            ))}
          </div>
          <div className="sep" />
          <div className="fb"><div /><button className="btn primary" style={{opacity:mType?1:.4}} onClick={() => mType&&setStep(2)}>다음 단계 →</button></div>
        </div>
      )}

      {/* STEP 2 */}
      {step===2 && (
        <div className="card">
          <div className="card-title mb14"><div className="ct-icon">📍</div>위치 및 일정</div>
          <div className="g2">
            <div>
              <div className="field"><label>의뢰 제목</label><input type="text" placeholder="예: 강남구 건설현장 측량" /></div>
              <div className="field"><label>위치</label><input type="text" placeholder="주소 또는 지역명" /></div>
              <div className="field"><label>작업 일자</label><input type="date" /></div>
            </div>
            <div>
              <div className="field"><label>고도 요구사항</label>
                <select>
                  <option>제한 없음 (150m 이하)</option>
                  <option>150~300m (허가 필요)</option>
                  <option>300m 이상 (특수 허가)</option>
                </select>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:11,fontWeight:500,color:"var(--text2)",marginBottom:8}}>보안 등급</div>
                <div className="sec-wrap">
                  {[{id:"general",l:"일반",cls:""},{id:"restricted",l:"제한",cls:"o"},{id:"classified",l:"기밀",cls:"r"}].map(s => (
                    <button key={s.id} className={`sec-btn ${sec===s.id?"sel "+s.cls:""}`} onClick={() => setSec(s.id)}>{s.l}</button>
                  ))}
                </div>
              </div>
              <div className="field"><label>특이사항</label><textarea rows={3} placeholder="접근 제한, 장비 요구사항 등" style={{resize:"none"}} /></div>
            </div>
          </div>
          <div className="sep" />
          <div className="fb">
            <button className="btn" onClick={() => setStep(1)}>← 이전</button>
            <button className="btn primary" onClick={() => setStep(3)}>다음 단계 →</button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step===3 && (
        <div className="card">
          <div className="card-title mb14"><div className="ct-icon">💰</div>예산 및 장비</div>
          <div className="g2">
            <div>
              <div className="field"><label>최대 예산 (원)</label><input type="number" placeholder="500000" /></div>
              <div className="field"><label>매칭 방식</label>
                <select>
                  <option>공개 입찰 (오픈 비딩)</option>
                  <option>파일럿 지정 초대</option>
                  <option>AI 자동 추천</option>
                </select>
              </div>
              <div className="field"><label>결과물 형식</label>
                <select>
                  <option>4K 영상 + 사진</option>
                  <option>정사영상 + 포인트클라우드</option>
                  <option>디지털 임무 완료 보고서</option>
                </select>
              </div>
            </div>
            <div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:11,fontWeight:500,color:"var(--text2)",marginBottom:8}}>장비 요구사항</div>
                {["DJI Mavic 3 이상급","측량용 RTK 드론","열화상 카메라 탑재","방수/방진 IP43+ 등급"].map((eq,i) => (
                  <label key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",cursor:"pointer",fontSize:12,color:"var(--text2)"}}>
                    <input type="checkbox" style={{accentColor:"var(--blue-500)"}} />{eq}
                  </label>
                ))}
              </div>
              <div style={{padding:12,background:"rgba(59,130,246,.06)",border:"1px solid rgba(59,130,246,.15)",borderRadius:8}}>
                <div style={{fontSize:11,fontWeight:600,color:"var(--blue-300)",marginBottom:6}}>보안 이수자 전용 매칭</div>
                <label style={{display:"flex",alignItems:"flex-start",gap:8,cursor:"pointer",fontSize:12,color:"var(--text2)"}}>
                  <input type="checkbox" style={{accentColor:"var(--blue-500)",marginTop:2}} />
                  군 보안 서약서 제출 파일럿만 매칭
                </label>
              </div>
            </div>
          </div>
          <div className="sep" />
          <div className="fb">
            <button className="btn" onClick={() => setStep(2)}>← 이전</button>
            <button className="btn primary" onClick={() => setStep(4)}>다음 단계 →</button>
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {step===4 && (
        <div className="card">
          <div className="card-title mb14"><div className="ct-icon">✅</div>최종 확인</div>
          <div style={{background:"var(--navy-900)",border:"1px solid var(--border)",borderRadius:10,padding:20,marginBottom:16}}>
            {[["서비스 유형",mType?.toUpperCase()||"-"],["보안 등급",sec?.toUpperCase()||"-"],["매칭 방식","공개 입찰"],["예상 예산","₩500,000"],["결과물","디지털 임무 완료 보고서"],["상태","등록 후 → 진행중"]].map(([k,v]) => (
              <div key={k} style={{display:"flex",padding:"8px 0",borderBottom:"1px solid rgba(21,38,69,.6)",fontSize:13}}>
                <div style={{width:160,fontSize:11,color:"var(--text3)",fontWeight:500}}>{k}</div>
                <div style={{color:"var(--blue-300)",fontWeight:500}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{padding:12,background:"rgba(249,115,22,.06)",border:"1px solid rgba(249,115,22,.2)",borderRadius:8,fontSize:12,color:"#FB923C",marginBottom:16,lineHeight:1.7}}>
            ⚠ 제출 후 인증된 파일럿들에게 즉시 알림이 발송됩니다. 평균 견적 수령 2시간 소요.
          </div>
          <div className="fb">
            <button className="btn" onClick={() => setStep(3)}>← 이전</button>
            <button className="btn primary" style={{padding:"10px 28px"}} onClick={() => setSubmit(true)}>의뢰 등록 완료</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── FORCE LIST ───
function ForceList() {
  const [filter, setFilter] = useState("ALL");
  const FILTERS = ["ALL","정찰","측량","촬영","점검","보안"];
  const filtered = filter==="ALL" ? OPERATORS : OPERATORS.filter(o => o.specs.some(s => s.includes(filter)));

  return (
    <div>
      <div className="ph">
        <div className="ph-eyebrow">Operators</div>
        <div className="ph-title sg">파일럿 목록</div>
        <div className="ph-sub">인증된 군 출신 드론 전문가 {OPERATORS.length}명</div>
      </div>

      <div className="fb mb20">
        <div className="fc gap6" style={{flexWrap:"wrap"}}>
          {FILTERS.map(f => (
            <button key={f} className="btn sm" style={filter===f?{background:"rgba(59,130,246,.1)",color:"var(--blue-400)",borderColor:"rgba(59,130,246,.3)"}:{}} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <input type="text" placeholder="이름 또는 콜사인 검색" style={{background:"var(--navy-800)",border:"1px solid var(--border)",color:"var(--text)",padding:"7px 14px",fontFamily:"Inter",fontSize:12,outline:"none",borderRadius:8,width:220}} />
      </div>

      <div className="g3">
        {filtered.map(op => {
          const col = op.status==="available" ? "var(--green)" : op.status==="mission" ? "var(--orange)" : "var(--text3)";
          const stlbl = op.status==="available" ? "대기중" : op.status==="mission" ? "미션중" : "준비중";
          return (
            <div key={op.id} className="op-card">
              <div className="fb mb14">
                <div className="fc gap8">
                  <div className="op-avatar">{op.initials}</div>
                  <div>
                    <div className="callsign">{op.callsign}</div>
                    <div style={{fontSize:11,color:"var(--text2)",marginTop:1}}>{op.name}</div>
                  </div>
                </div>
                <div style={{fontSize:10,fontWeight:600,color:col,padding:"3px 8px",border:`1px solid ${col==="var(--green)"?"rgba(34,197,94,.3)":col==="var(--orange)"?"rgba(249,115,22,.3)":"rgba(148,163,184,.2)"}`,borderRadius:6}}>{stlbl}</div>
              </div>

              <div className="op-branch">{op.branch}</div>
              <div style={{fontSize:11,color:"var(--text3)",marginTop:2,marginBottom:10}}>📍 {op.region}</div>

              <div className="fc gap6" style={{flexWrap:"wrap",marginBottom:12}}>
                {op.specs.map(s => <span key={s} className="spec">{s}</span>)}
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,padding:"12px 0",borderTop:"1px solid var(--border)",marginBottom:12}}>
                {[["비행시간",op.hours+"H"],["미션",op.missions+"건"],["평점",op.rating+"★"]].map(([l,v]) => (
                  <div key={l}>
                    <div className="op-stat-label">{l}</div>
                    <div className="op-stat-val" style={{fontSize:13}}>{v}</div>
                  </div>
                ))}
              </div>

              <div style={{height:3,background:"var(--navy-700)",borderRadius:2,marginBottom:12}}>
                <div style={{height:"100%",width:`${op.rating*20}%`,background:"var(--blue-500)",borderRadius:2}} />
              </div>

              <div className="fc gap8">
                <button className="btn sm" style={{flex:1}}>프로필</button>
                {op.status==="available" && <button className="btn primary sm" style={{flex:1}}>미션 제안</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── TACTICAL MAP ───
function TacticalMap() {
  const [hov, setHov] = useState(null);
  const MARKERS = [
    { x:"51%",y:"27%",id:"MSN-0047",label:"서울 강남",  col:"var(--orange)", status:"active" },
    { x:"46%",y:"30%",id:"MSN-0043",label:"경기 용인",  col:"var(--orange)", status:"active" },
    { x:"40%",y:"25%",id:"MSN-0046",label:"인천",       col:"var(--blue-400)",status:"pending" },
    { x:"72%",y:"72%",id:"MSN-0045",label:"부산",       col:"var(--green)",  status:"complete" },
    { x:"27%",y:"60%",id:"MSN-0044",label:"전북 김제",  col:"var(--green)",  status:"complete" },
  ];

  return (
    <div>
      <div className="ph">
        <div className="ph-eyebrow">Tactical Map</div>
        <div className="ph-title sg">실시간 미션 지도</div>
        <div className="ph-sub">Supabase Realtime 연동 예정</div>
      </div>

      <div className="fc gap12 mb14">
        {[{col:"var(--orange)",l:"진행중 2건"},{col:"var(--blue-400)",l:"견적대기 1건"},{col:"var(--green)",l:"완료 2건"}].map(item => (
          <div key={item.l} className="fc gap6">
            <div style={{width:8,height:8,borderRadius:2,background:item.col,transform:"rotate(45deg)"}} />
            <span style={{fontSize:12,color:"var(--text2)"}}>{item.l}</span>
          </div>
        ))}
        <div style={{marginLeft:"auto",fontSize:11,color:"var(--text3)"}}>마지막 업데이트: {new Date().toTimeString().slice(0,8)} KST</div>
      </div>

      <div className="map-wrap">
        <div className="map-grid-bg" />
        <div className="map-scan" />

        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.1}} viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet">
          <path d="M155,30 L168,22 L182,26 L198,22 L214,28 L228,38 L238,52 L244,68 L242,84 L252,100 L258,118 L262,138 L256,158 L266,174 L272,194 L268,214 L262,232 L256,248 L246,264 L240,280 L228,296 L216,308 L222,324 L226,340 L218,356 L206,370 L196,386 L192,402 L196,416 L186,424 L176,428 L168,418 L162,400 L152,384 L146,366 L150,350 L140,336 L136,320 L140,306 L134,292 L122,278 L112,264 L106,250 L100,236 L96,220 L100,204 L96,188 L92,172 L96,156 L100,140 L106,124 L112,110 L118,96 L124,82 L132,66 L142,48 Z"
            fill="none" stroke="var(--blue-500)" strokeWidth="1.5" />
        </svg>

        {MARKERS.map(m => (
          <div key={m.id} style={{position:"absolute",left:m.x,top:m.y,transform:"translate(-50%,-50%)"}}
            onMouseEnter={() => setHov(m.id)} onMouseLeave={() => setHov(null)}>
            <div style={{width:14,height:14,border:`2px solid ${m.col}`,transform:"rotate(45deg)",cursor:"pointer",position:"relative",transition:"transform .2s",...(hov===m.id?{transform:"rotate(45deg) scale(1.5)"}:{})}}>
              <div style={{position:"absolute",inset:2,background:m.col,opacity:.7}} />
            </div>
            <div style={{position:"absolute",top:-18,left:15,fontSize:10,color:m.col,whiteSpace:"nowrap",fontWeight:500,pointerEvents:"none"}}>{m.label}</div>
            {hov===m.id && (
              <div style={{position:"absolute",top:-44,left:16,background:"var(--navy-800)",border:`1px solid ${m.col}`,padding:"4px 10px",borderRadius:6,fontSize:11,color:m.col,whiteSpace:"nowrap",zIndex:10}}>{m.id}</div>
            )}
          </div>
        ))}

        <div style={{position:"absolute",bottom:14,left:16,fontSize:10,color:"var(--text3)",lineHeight:1.9}}>
          <div>WGS84 · KR</div>
          <div style={{color:"var(--green)",fontWeight:500}}>● Live Feed Active</div>
        </div>
        <div style={{position:"absolute",top:14,right:16,fontSize:10,color:"var(--text3)"}}>Prototype — Supabase 연동 예정</div>
      </div>

      <div className="g3 mt16">
        {MISSIONS.slice(0,3).map(m => (
          <div key={m.id} className="card" style={{padding:14}}>
            <div className="fb mb8">
              <span className="sg" style={{fontSize:11,color:"var(--blue-300)",fontWeight:600}}>{m.id}</span>
              <span className={`badge ${m.status==="active"?"active":m.status==="pending"?"pending":"complete"}`} style={{fontSize:10}}>
                {m.status==="active"?"진행중":m.status==="pending"?"대기":"완료"}
              </span>
            </div>
            <div style={{fontSize:12,fontWeight:500,color:"var(--white)",marginBottom:4}}>{m.title}</div>
            <div style={{fontSize:11,color:"var(--text3)"}}>📍 {m.region}</div>
            {m.op!=="-" && <div style={{marginTop:6,fontSize:11,color:"var(--blue-300)",fontWeight:500}} className="sg">{m.op}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── INTEL CENTER ───
function IntelCenter() {
  const INTELS = [
    { icon:"⚖️", title:"항공안전법 드론 운용 규정",      desc:"250g 이상 기체 신고 의무, 조종자 자격 기준, 비행 승인 절차.",       tag:"법규 · 필수",   tcol:"blue" },
    { icon:"🚫", title:"비행금지구역 (NFZ) 데이터베이스",desc:"전국 비행금지·제한구역 현황. 군사시설, 원전 반경 내 절대 금지.",      tag:"규제 · 실시간", tcol:"red" },
    { icon:"🔒", title:"개인정보보호법 촬영 가이드",      desc:"공공장소 드론 촬영 시 개인정보 처리 기준 및 동의 획득 방법.",        tag:"법규 · 권고",   tcol:"blue" },
    { icon:"📋", title:"항공사업법 사업자 등록",          desc:"유상 드론 서비스 제공 시 필수 사업자 등록 절차 및 요건.",            tag:"사업 · 필수",   tcol:"orange" },
    { icon:"🛡️", title:"드론 배상책임보험 가이드",       desc:"파일럿 개인 가입 의무 및 추천 보험사 목록 (메리츠, DB, 현대).",       tag:"보험 · 권고",   tcol:"blue" },
    { icon:"📄", title:"디지털 임무 완료 보고서 템플릿", desc:"비행 로그, 지형 분석, 결과물 포함. 지자체 납품 가능 표준 포맷.",      tag:"문서 · 플랫폼", tcol:"blue" },
  ];

  const tagColors = {blue:{bg:"rgba(59,130,246,.1)",color:"var(--blue-300)",border:"rgba(59,130,246,.2)"},red:{bg:"rgba(239,68,68,.08)",color:"#F87171",border:"rgba(239,68,68,.2)"},orange:{bg:"rgba(249,115,22,.08)",color:"#FB923C",border:"rgba(249,115,22,.2)"}};

  return (
    <div>
      <div className="ph">
        <div className="ph-eyebrow">Intel Center</div>
        <div className="ph-title sg">규정 · 법규 · 보고서</div>
        <div className="ph-sub">드론 운용 관련 필수 정보 허브</div>
      </div>

      <div style={{background:"rgba(249,115,22,.05)",border:"1px solid rgba(249,115,22,.2)",borderRadius:10,padding:14,marginBottom:20,display:"flex",gap:12}}>
        <span style={{fontSize:16}}>⚠️</span>
        <div>
          <div style={{fontSize:12,fontWeight:600,color:"#FB923C",marginBottom:4}}>2026년 항공안전법 개정 안내</div>
          <div style={{fontSize:12,color:"var(--text2)",lineHeight:1.7}}>25kg 이상 기체 별도 운용 자격 필요. 비행 24시간 전 드론원스톱 시스템 신고 필수. 위반 시 200만원 이하 과태료.</div>
        </div>
      </div>

      <div className="g2">
        {INTELS.map((item,i) => (
          <div key={i} className="intel-card">
            <div className="intel-icon">{item.icon}</div>
            <div>
              <div className="intel-title">{item.title}</div>
              <div className="intel-desc">{item.desc}</div>
              <div className="intel-tag" style={{background:tagColors[item.tcol].bg,color:tagColors[item.tcol].color,border:`1px solid ${tagColors[item.tcol].border}`}}>{item.tag}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="sep" />
      <div style={{fontSize:13,fontWeight:600,color:"var(--text)",marginBottom:12}}>최근 임무 완료 보고서</div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <table className="tbl">
          <thead><tr><th>보고서 ID</th><th>임무명</th><th>파일럿</th><th>완료일</th><th>상태</th><th></th></tr></thead>
          <tbody>
            {[{id:"RPT-0045",mission:"인천항 시설 보안점검",op:"GHOST-7",date:"2026.04.07",status:"complete"},
              {id:"RPT-0044",mission:"김제 농지 방제작업",op:"SCOUT-9",date:"2026.04.06",status:"complete"},
              {id:"RPT-0042",mission:"수원 태양광 시설 점검",op:"IRON-2",date:"2026.04.03",status:"pending"}].map(r => (
              <tr key={r.id}>
                <td className="sg" style={{fontSize:12,color:"var(--blue-300)",fontWeight:600}}>{r.id}</td>
                <td style={{fontWeight:500}}>{r.mission}</td>
                <td className="sg" style={{fontSize:12,fontWeight:600}}>{r.op}</td>
                <td style={{color:"var(--text2)",fontSize:12}}>{r.date}</td>
                <td><span className={`badge ${r.status==="complete"?"complete":"pending"}`}>{r.status==="complete"?"완료":"검토중"}</span></td>
                <td><button className="btn sm">다운로드</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── OPERATOR HQ ───
function OperatorHQ() {
  const me = OPERATORS[0];
  return (
    <div>
      <div className="ph">
        <div className="ph-eyebrow">Operator HQ</div>
        <div className="ph-title sg">{me.callsign} 대시보드</div>
        <div className="ph-sub">{me.branch} · {me.region}</div>
      </div>

      <div className="g4 mb20">
        {[["비행 시간",me.hours+"H",""],["완료 미션",me.missions+"건",""],["평점",me.rating+"★","orange"],["신뢰도","78%","blue"]].map(([l,v,c]) => (
          <div key={l} className="stat-card">
            <div className="stat-label">{l}</div>
            <div className={`stat-val ${c}`}>{v}</div>
          </div>
        ))}
      </div>

      <div className="g2">
        <div>
          <div style={{fontSize:13,fontWeight:600,color:"var(--text)",marginBottom:12}}>추천 의뢰</div>
          {MISSIONS.filter(m => m.status==="pending").map(m => (
            <div key={m.id} className="card" style={{padding:14,marginBottom:8}}>
              <div className="fb mb8">
                <span className="sg" style={{fontSize:11,color:"var(--blue-300)",fontWeight:600}}>{m.id}</span>
                <span style={{color:"var(--orange)",fontWeight:600,fontSize:13}}>₩{m.budget.toLocaleString()}</span>
              </div>
              <div style={{fontSize:13,fontWeight:500,color:"var(--white)",marginBottom:4}}>{m.title}</div>
              <div style={{fontSize:11,color:"var(--text3)",marginBottom:10}}>📍 {m.region} · {m.date}</div>
              <div className="fc gap8">
                <button className="btn sm" style={{flex:1}}>상세 보기</button>
                <button className="btn primary sm" style={{flex:1}}>견적 제안</button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div style={{fontSize:13,fontWeight:600,color:"var(--text)",marginBottom:12}}>인증 현황</div>
          <div className="card">
            <div className="fc gap8 mb14">
              <div className="op-avatar">{me.initials}</div>
              <div>
                <div className="callsign">{me.callsign}</div>
                <div style={{fontSize:11,color:"var(--text2)"}}>{me.name} · {me.branch}</div>
              </div>
            </div>
            {[
              {l:"초경량비행장치 조종자 (1종)", ok:true},
              {l:"군 경력 증명서", ok:true},
              {l:"드론 배상책임보험", ok:true},
              {l:"보안 교육 이수", ok:false},
            ].map(c => (
              <div key={c.l} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:"1px solid var(--border)",fontSize:12}}>
                <div style={{color:c.ok?"var(--green)":"var(--orange)",fontWeight:600}}>{c.ok?"✓":"○"}</div>
                <div style={{color:c.ok?"var(--text)":"var(--text3)",flex:1}}>{c.l}</div>
                {!c.ok && <span className="badge pending" style={{fontSize:10}}>미완료</span>}
              </div>
            ))}
            <div style={{marginTop:14}}>
              <div style={{height:4,background:"var(--navy-700)",borderRadius:2}}>
                <div style={{height:"100%",width:"78%",background:"var(--blue-500)",borderRadius:2}} />
              </div>
              <div style={{fontSize:11,color:"var(--text3)",marginTop:5}}>프로필 완성도 78%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ───
export default function DroneForce({ onHome }) {
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

  // LOGIN
  if (screen==="login") return (
    <div className="app login-wrap">
      <div className="login-glow" />
      <div className="login-box">
        <div style={{textAlign:"center",marginBottom:28}}>
          <div className="login-logo">Drone<em>Force</em></div>
          <div style={{fontSize:12,color:"var(--text2)",marginTop:6}}>군 출신 드론 전문가 매칭 플랫폼</div>
        </div>

        <div style={{fontSize:11,fontWeight:500,color:"var(--text2)",marginBottom:10}}>역할 선택</div>
        <div className="role-grid">
          <div className={`role-card ${selRole==="command"?"sel":""}`} onClick={() => setSelRole("command")}>
            <div className="role-icon">🎯</div>
            <div className="role-title">클라이언트</div>
            <div className="role-desc">드론 서비스 의뢰</div>
          </div>
          <div className={`role-card ${selRole==="operator"?"sel":""}`} onClick={() => setSelRole("operator")}>
            <div className="role-icon">🚁</div>
            <div className="role-title">파일럿</div>
            <div className="role-desc">전역 군인 / 전문가</div>
          </div>
        </div>

        <div className="field" style={{marginBottom:10}}>
          <label>이메일</label>
          <input type="email" placeholder="name@email.com" />
        </div>
        <div className="field" style={{marginBottom:20}}>
          <label>비밀번호</label>
          <input type="password" placeholder="••••••••" />
        </div>

        <button className="btn primary" style={{width:"100%",padding:11,fontSize:14}} onClick={() => { if(selRole){ setRole(selRole); setScreen("app"); }}}>
          로그인
        </button>
        <div style={{textAlign:"center",marginTop:14,fontSize:12,color:"var(--text3)"}}>
          계정이 없으신가요? <span style={{color:"var(--blue-400)",cursor:"pointer",fontWeight:500}}>사전 등록하기</span>
        </div>

        <div style={{marginTop:24,padding:14,background:"var(--navy-800)",border:"1px solid var(--border)",borderRadius:10}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,textAlign:"center"}}>
            {[["24명","대기 파일럿"],["7건","진행 미션"],["99.7%","업타임"]].map(([v,l]) => (
              <div key={l}>
                <div className="sg" style={{fontSize:16,fontWeight:700,color:"var(--white)"}}>{v}</div>
                <div style={{fontSize:10,color:"var(--text3)",marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const NAV_ITEMS = [
    {id:"command", icon:"◈", label:"대시보드"},
    {id:"mission", icon:"✦", label:"의뢰 등록", badge:"3"},
    {id:"force",   icon:"◆", label:"파일럿 목록"},
    {id:"map",     icon:"◉", label:"실시간 지도"},
    {id:"intel",   icon:"▣", label:"정보 센터"},
    ...(role==="operator"?[{id:"ophq",icon:"⬢",label:"내 대시보드",badge:"!",badgeOrange:true}]:[]),
  ];

  const PAGE = {command:<CommandCenter/>,mission:<MissionBriefing/>,force:<ForceList/>,map:<TacticalMap/>,intel:<IntelCenter/>,ophq:<OperatorHQ/>};

  return (
    <div className="app">
      <div className="topbar">
        <div className="logo" onClick={onHome}style={{cursor:"pointer"}}> Drone<em>Force</em>
          <span className="logo-badge">BETA</span>
        </div>
        <div className="divider" />
        <div className="fc gap6">
          <div className="status-dot" />
          <div className="status-text">시스템 정상</div>
        </div>
        <div className="fc gap6">
          <div style={{width:6,height:6,borderRadius:"50%",background:"var(--orange)"}} />
          <div className="status-text">미션 7건 진행중</div>
        </div>
        <div className="topbar-right">
          <div className="clock-badge">{time.toTimeString().slice(0,8)}</div>
          <div className="user-btn" onClick={() => setScreen("login")}>
            <div className="avatar">{role==="command"?"C":"O"}</div>
            <span>{role==="command"?"클라이언트":"파일럿"}</span>
            <span style={{color:"var(--text3)"}}>↗</span>
          </div>
        </div>
      </div>

      <div className="layout">
        <div className="sidebar">
          <div style={{padding:"0 16px 14px"}}>
            <div className="nav-section" style={{marginBottom:8}}>메뉴</div>
          </div>
          {NAV_ITEMS.map(item => (
            <div key={item.id} className={`nav-item ${nav===item.id?"active":""}`} onClick={() => setNav(item.id)}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className={`nav-badge ${item.badgeOrange?"orange":""}`}>{item.badge}</span>}
            </div>
          ))}

          <div className="sidebar-footer">
            <div className="plan-card">
              <div className="plan-label">TRUST LEVEL</div>
              <div className="plan-val">Level 3 · Verified</div>
              <div className="pbar"><div className="pfill" style={{width:"78%"}} /></div>
            </div>
          </div>
        </div>

        <div className="main">
          {PAGE[nav] || PAGE.command}
        </div>
      </div>
    </div>
  );
}
