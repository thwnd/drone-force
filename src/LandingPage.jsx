import { useState, useEffect } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');

*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --navy-950:#060C1A;--navy-900:#0B1527;--navy-800:#101E36;--navy-700:#152645;
  --navy-600:#1C3260;--navy-500:#22407A;
  --blue-600:#2563EB;--blue-500:#3B82F6;--blue-400:#60A5FA;--blue-300:#93C5FD;--blue-200:#BFDBFE;
  --white:#FFFFFF;--orange:#F97316;--green:#22C55E;--red:#EF4444;
  --text:#E2E8F0;--text2:#94A3B8;--text3:#475569;
  --border:rgba(28,50,96,.8);
}
html{scroll-behavior:smooth;}
body{font-family:'Inter',sans-serif;background:var(--navy-950);color:var(--text);overflow-x:hidden;}
.sg{font-family:'Space Grotesk',sans-serif;}

/* ── NAV ── */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;height:64px;display:flex;align-items:center;padding:0 48px;background:rgba(6,12,26,.85);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);transition:all .3s;}
.nav-logo{font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700;color:var(--white);}
.nav-logo em{color:var(--blue-400);font-style:normal;}
.nav-badge{background:var(--blue-500);color:var(--white);font-size:9px;font-weight:700;padding:2px 6px;border-radius:4px;margin-left:7px;vertical-align:middle;letter-spacing:.5px;}
.nav-links{display:flex;align-items:center;gap:28px;margin-left:48px;}
.nav-link{font-size:13px;color:var(--text2);cursor:pointer;transition:color .15s;font-weight:400;}
.nav-link:hover{color:var(--white);}
.nav-cta{margin-left:auto;display:flex;gap:10px;}
.btn-outline{padding:8px 18px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-weight:500;color:var(--text2);cursor:pointer;background:transparent;transition:all .15s;font-family:'Inter',sans-serif;}
.btn-outline:hover{border-color:var(--blue-500);color:var(--white);}
.btn-primary{padding:8px 20px;border-radius:8px;font-size:13px;font-weight:600;color:var(--white);cursor:pointer;background:var(--blue-500);border:none;transition:all .15s;font-family:'Inter',sans-serif;}
.btn-primary:hover{background:var(--blue-600);}

/* ── HERO ── */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:120px 24px 80px;position:relative;overflow:hidden;}
.hero-glow{position:absolute;top:20%;left:50%;transform:translate(-50%,-50%);width:900px;height:600px;background:radial-gradient(ellipse,rgba(59,130,246,.1) 0%,transparent 65%);pointer-events:none;}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(59,130,246,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.04) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;}
.hero-inner{position:relative;z-index:1;max-width:860px;margin:0 auto;}
.hero-eyebrow{display:inline-flex;align-items:center;gap:8px;background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.25);border-radius:100px;padding:6px 16px;font-size:12px;font-weight:600;color:var(--blue-300);letter-spacing:.5px;margin-bottom:28px;}
.hero-eyebrow-dot{width:6px;height:6px;border-radius:50%;background:var(--green);animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(34,197,94,.4)}70%{box-shadow:0 0 0 6px rgba(34,197,94,0)}}
.hero-title{font-family:'Space Grotesk',sans-serif;font-size:58px;font-weight:800;color:var(--white);line-height:1.1;letter-spacing:-1.5px;margin-bottom:20px;}
.hero-title .hl{color:var(--blue-400);}
.hero-sub{font-size:18px;color:var(--text2);line-height:1.7;max-width:560px;margin:0 auto 40px;font-weight:400;}
.hero-btns{display:flex;gap:12px;justify-content:center;margin-bottom:60px;}
.hero-btn-main{padding:14px 32px;border-radius:10px;font-size:15px;font-weight:600;color:var(--white);cursor:pointer;background:var(--blue-500);border:none;transition:all .2s;font-family:'Inter',sans-serif;}
.hero-btn-main:hover{background:var(--blue-600);transform:translateY(-1px);box-shadow:0 8px 30px rgba(59,130,246,.3);}
.hero-btn-sec{padding:14px 32px;border-radius:10px;font-size:15px;font-weight:500;color:var(--text);cursor:pointer;background:transparent;border:1px solid var(--border);transition:all .2s;font-family:'Inter',sans-serif;}
.hero-btn-sec:hover{border-color:var(--blue-500);color:var(--white);}

/* HERO STATS */
.hero-stats{display:flex;justify-content:center;gap:0;border:1px solid var(--border);border-radius:14px;overflow:hidden;background:var(--navy-900);}
.hstat{padding:20px 36px;text-align:center;border-right:1px solid var(--border);}
.hstat:last-child{border-right:none;}
.hstat-val{font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:800;color:var(--white);}
.hstat-val span{color:var(--blue-400);}
.hstat-label{font-size:11px;color:var(--text3);margin-top:3px;font-weight:500;text-transform:uppercase;letter-spacing:.5px;}

/* ── SECTIONS ── */
.section{padding:96px 48px;max-width:1100px;margin:0 auto;}
.section-eyebrow{font-size:12px;font-weight:700;color:var(--blue-400);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px;}
.section-title{font-family:'Space Grotesk',sans-serif;font-size:38px;font-weight:800;color:var(--white);letter-spacing:-1px;line-height:1.15;margin-bottom:14px;}
.section-sub{font-size:16px;color:var(--text2);line-height:1.7;max-width:560px;}
.divider-line{height:1px;background:var(--border);max-width:1100px;margin:0 auto;}

/* ── PROBLEM ── */
.problem-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:52px;}
.prob-card{background:var(--navy-900);border:1px solid var(--border);border-radius:14px;padding:28px;}
.prob-icon{font-size:28px;margin-bottom:16px;}
.prob-title{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:700;color:var(--white);margin-bottom:10px;}
.prob-desc{font-size:14px;color:var(--text2);line-height:1.8;}
.prob-list{margin-top:14px;display:flex;flex-direction:column;gap:7px;}
.prob-li{display:flex;align-items:flex-start;gap:8px;font-size:13px;color:var(--text2);}
.prob-li::before{content:'·';color:var(--red);font-size:18px;line-height:1;flex-shrink:0;}

/* QUOTE BLOCK */
.quote-block{background:rgba(59,130,246,.05);border:1px solid rgba(59,130,246,.2);border-left:3px solid var(--blue-500);border-radius:0 12px 12px 0;padding:20px 24px;margin-top:20px;}
.quote-text{font-size:15px;color:var(--blue-200);line-height:1.7;font-style:italic;}
.quote-src{font-size:11px;color:var(--text3);margin-top:8px;font-weight:500;}

/* ── HOW ── */
.how-wrap{margin-top:52px;}
.steps-row{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;position:relative;}
.steps-row::before{content:'';position:absolute;top:36px;left:16%;right:16%;height:1px;background:linear-gradient(90deg,transparent,var(--border),var(--border),transparent);}
.step-card{background:var(--navy-900);border:1px solid var(--border);border-radius:14px;padding:28px;position:relative;}
.step-num{width:40px;height:40px;border-radius:10px;background:rgba(59,130,246,.15);border:1px solid rgba(59,130,246,.3);display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:700;color:var(--blue-400);margin-bottom:18px;}
.step-title{font-family:'Space Grotesk',sans-serif;font-size:17px;font-weight:700;color:var(--white);margin-bottom:8px;}
.step-desc{font-size:13px;color:var(--text2);line-height:1.7;}
.step-tag{display:inline-block;margin-top:12px;padding:3px 9px;background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.2);border-radius:5px;font-size:11px;color:var(--blue-300);font-weight:500;}

/* ── DIFF TABLE ── */
.diff-wrap{margin-top:52px;overflow:hidden;border:1px solid var(--border);border-radius:14px;}
.diff-table{width:100%;border-collapse:collapse;}
.diff-table th{padding:14px 20px;text-align:center;font-size:12px;font-weight:600;color:var(--text3);letter-spacing:.5px;text-transform:uppercase;background:var(--navy-900);border-bottom:1px solid var(--border);}
.diff-table th.hl-col{color:var(--blue-300);background:rgba(59,130,246,.06);}
.diff-table th:first-child{text-align:left;}
.diff-table td{padding:13px 20px;border-bottom:1px solid rgba(21,38,69,.6);font-size:13px;color:var(--text2);text-align:center;background:var(--navy-800);}
.diff-table td.hl-col{background:rgba(59,130,246,.04);color:var(--white);font-weight:500;}
.diff-table td:first-child{text-align:left;color:var(--text);font-weight:500;}
.diff-table tr:last-child td{border-bottom:none;}
.icon-yes{color:var(--green);font-size:16px;font-weight:700;}
.icon-no{color:var(--red);font-size:16px;}
.icon-part{color:var(--orange);font-size:13px;}

/* ── MARKET ── */
.market-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:52px;}
.market-card{border-radius:14px;padding:28px;border:1px solid var(--border);}
.market-card.tam{background:var(--navy-900);}
.market-card.sam{background:var(--navy-800);}
.market-card.som{background:rgba(59,130,246,.08);border-color:rgba(59,130,246,.3);}
.market-label{font-size:11px;font-weight:700;color:var(--text3);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px;}
.market-label.som{color:var(--blue-300);}
.market-val{font-family:'Space Grotesk',sans-serif;font-size:34px;font-weight:800;color:var(--white);margin-bottom:6px;}
.market-val.som{color:var(--blue-400);}
.market-desc{font-size:13px;color:var(--text2);line-height:1.6;}
.market-growth{display:inline-flex;align-items:center;gap:5px;margin-top:10px;padding:3px 9px;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:5px;font-size:11px;color:#4ADE80;font-weight:600;}

/* ── CTA ── */
.cta-section{padding:96px 48px;text-align:center;position:relative;overflow:hidden;}
.cta-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:700px;height:400px;background:radial-gradient(ellipse,rgba(59,130,246,.08) 0%,transparent 65%);pointer-events:none;}
.cta-inner{position:relative;z-index:1;max-width:600px;margin:0 auto;}
.cta-title{font-family:'Space Grotesk',sans-serif;font-size:42px;font-weight:800;color:var(--white);letter-spacing:-1px;line-height:1.15;margin-bottom:16px;}
.cta-sub{font-size:16px;color:var(--text2);line-height:1.7;margin-bottom:36px;}
.cta-btns{display:flex;gap:12px;justify-content:center;}
.cta-input-wrap{display:flex;gap:10px;max-width:420px;margin:0 auto 16px;}
.cta-input{flex:1;padding:12px 16px;background:var(--navy-800);border:1px solid var(--border);border-radius:9px;color:var(--text);font-family:'Inter',sans-serif;font-size:14px;outline:none;transition:border-color .15s;}
.cta-input:focus{border-color:var(--blue-500);}
.cta-note{font-size:12px;color:var(--text3);}

/* ── FOOTER ── */
.footer{border-top:1px solid var(--border);padding:32px 48px;display:flex;align-items:center;justify-content:space-between;}
.footer-logo{font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:700;color:var(--white);}
.footer-logo em{color:var(--blue-400);font-style:normal;}
.footer-links{display:flex;gap:24px;}
.footer-link{font-size:13px;color:var(--text3);cursor:pointer;transition:color .15s;}
.footer-link:hover{color:var(--text);}
.footer-copy{font-size:12px;color:var(--text3);}

/* ── HIGHLIGHT BAR ── */
.highlight-bar{background:rgba(59,130,246,.08);border-top:1px solid rgba(59,130,246,.2);border-bottom:1px solid rgba(59,130,246,.2);padding:18px 48px;display:flex;align-items:center;justify-content:center;gap:48px;}
.hb-item{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--text2);}
.hb-icon{font-size:18px;}
.hb-val{font-family:'Space Grotesk',sans-serif;font-size:15px;font-weight:700;color:var(--white);}

/* ── UTIL ── */
.fc{display:flex;align-items:center;}
.fb{display:flex;align-items:center;justify-content:space-between;}
`;

// ── DATA ──
const DIFF_ROWS = [
  { label:"드론 전용 플랫폼",     kmong:"✗", naerida:"△", df:"✓" },
  { label:"파일럿 자격 인증",      kmong:"✗", naerida:"△", df:"✓" },
  { label:"군 출신 인력 연계",     kmong:"✗", naerida:"✗", df:"✓" },
  { label:"실시간 견적 입찰",      kmong:"✗", naerida:"△", df:"✓" },
  { label:"디지털 임무 보고서",    kmong:"✗", naerida:"✗", df:"✓" },
  { label:"보안 이수자 매칭",      kmong:"✗", naerida:"✗", df:"✓" },
  { label:"B2G 공공기관 공략",     kmong:"✗", naerida:"△", df:"✓" },
];

function IconCell({ val }) {
  if (val==="✓") return <span className="icon-yes">✓</span>;
  if (val==="✗") return <span className="icon-no">✗</span>;
  return <span className="icon-part">△ 일부</span>;
}

export default function LandingPage({ onEnter }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);
  }, []);

  const handleRegister = () => {
    if (email) setSubmitted(true);
  };

  return (
    <div style={{background:"var(--navy-950)",minHeight:"100vh"}}>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">Drone<em>Force</em><span className="nav-badge">BETA</span></div>
        <div className="nav-links">
          <a className="nav-link" href="#problem">문제 정의</a>
          <a className="nav-link" href="#how">서비스 소개</a>
          <a className="nav-link" href="#diff">경쟁 우위</a>
          <a className="nav-link" href="#market">시장 규모</a>
        </div>
        <div className="nav-cta">
          <button className="btn-outline" onClick={onEnter}>데모 보기</button>
          <button className="btn-primary" onClick={onEnter}>사전 등록</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-grid" />
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-dot" />
            군 창업경진대회 출품작 · 2026
          </div>
          <h1 className="hero-title sg">
            군 출신 드론 전문가를<br />
            <span className="hl">필요한 곳에 연결</span>합니다
          </h1>
          <p className="hero-sub">
            드론봇전투단, 특전사 출신 전문 파일럿과<br />
            드론 서비스가 필요한 기업·기관을 연결하는<br />
            국내 최초 군 특화 드론 매칭 플랫폼
          </p>
          <div className="hero-btns">
            <button className="hero-btn-main" onClick={onEnter}>플랫폼 데모 보기 →</button>
            <button className="hero-btn-sec" onClick={onEnter}>파일럿 사전 등록</button>
          </div>

          {/* STATS */}
          <div className="hero-stats">
            <div className="hstat">
              <div className="hstat-val">14<span>만+</span></div>
              <div className="hstat-label">드론 자격증 보유자</div>
            </div>
            <div className="hstat">
              <div className="hstat-val">1.4<span>조</span></div>
              <div className="hstat-label">국내 드론 시장 규모</div>
            </div>
            <div className="hstat">
              <div className="hstat-val">18<span>%</span></div>
              <div className="hstat-label">연평균 성장률</div>
            </div>
            <div className="hstat">
              <div className="hstat-val">0<span>개</span></div>
              <div className="hstat-label">군 특화 드론 플랫폼</div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHT BAR */}
      <div className="highlight-bar">
        {[
          {icon:"🏆",val:"국내 최초",desc:"군 출신 드론 파일럿 전문 매칭"},
          {icon:"🔐",desc:"자격증·군 경력 인증 기반 신뢰 구조"},
          {icon:"📊",desc:"디지털 임무 완료 보고서 자동 생성"},
          {icon:"🏛️",desc:"B2G 지자체·공공기관 매칭 특화"},
        ].map((h,i) => (
          <div key={i} className="hb-item">
            <span className="hb-icon">{h.icon}</span>
            {h.val && <span className="hb-val">{h.val}</span>}
            <span>{h.desc}</span>
          </div>
        ))}
      </div>

      {/* PROBLEM */}
      <div className="divider-line" />
      <section className="section" id="problem">
        <div className="section-eyebrow">Problem</div>
        <h2 className="section-title sg">해결하는 문제</h2>
        <p className="section-sub">군에서 전문적으로 드론을 운용했지만, 전역 후 이 경력을 활용할 곳이 없습니다.</p>

        <div className="problem-grid">
          <div className="prob-card">
            <div className="prob-icon">🎯</div>
            <div className="prob-title">수요자의 문제</div>
            <div className="prob-desc">드론 촬영·측량·점검 수요는 급증하지만, 신뢰할 수 있는 파일럿을 찾는 전용 플랫폼이 없습니다.</div>
            <div className="prob-list">
              <div className="prob-li">크몽·숨고 등 기존 플랫폼에 드론 전문 카테고리 부재</div>
              <div className="prob-li">자격증·장비 검증 없이 파일럿을 선택해야 하는 구조</div>
              <div className="prob-li">견적·계약·결제 전 과정 수동 처리</div>
              <div className="prob-li">결과물 품질 보장 수단 없음</div>
            </div>
          </div>

          <div className="prob-card">
            <div className="prob-icon">🪖</div>
            <div className="prob-title">공급자(파일럿)의 문제</div>
            <div className="prob-desc">드론봇전투단, 각 부대 드론 운용병 — 전문 인력이 전역 후 경력을 활용하지 못하고 있습니다.</div>
            <div className="prob-list">
              <div className="prob-li">전역 후 드론 자격증·실전 경험 보유에도 민간 연결 플랫폼 전무</div>
              <div className="prob-li">14만 자격증 보유자 중 플랫폼 수주 비율 극히 낮음</div>
              <div className="prob-li">대다수가 드론과 무관한 직종으로 취업 → 국가 자원 낭비</div>
            </div>
            <div className="quote-block">
              <div className="quote-text">"군에서 드론을 전문적으로 운용했지만, 전역 후 이 경력을 활용할 곳이 없습니다."</div>
              <div className="quote-src">— 드론봇전투단 전역 예정 병사 인터뷰</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <div className="divider-line" />
      <section className="section" id="how">
        <div className="section-eyebrow">How It Works</div>
        <h2 className="section-title sg">3단계 매칭 시스템</h2>
        <p className="section-sub">의뢰 등록부터 결과물 전달까지, 플랫폼이 전 과정을 관리합니다.</p>

        <div className="how-wrap">
          <div className="steps-row">
            {[
              { n:"01", title:"미션 브리핑", desc:"목적·날짜·위치·예산·보안 등급 입력. 공개 입찰 또는 파일럿 지정 초대 선택. 소요 시간 5분.", tag:"소요 5분" },
              { n:"02", title:"견적 비교 & 매칭", desc:"인증된 파일럿들이 견적을 제안합니다. 평점·장비·단가를 비교하고 채팅으로 조율. AI 자동 추천 지원.", tag:"평균 2시간 내 견적" },
              { n:"03", title:"임무 완료 보고서", desc:"촬영·측량·점검 완료 후 지형 분석이 포함된 디지털 임무 완료 보고서 제공. 상호 리뷰 등록.", tag:"지자체 납품 가능 포맷" },
            ].map(s => (
              <div key={s.n} className="step-card">
                <div className="step-num">{s.n}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
                <div className="step-tag">{s.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFF */}
      <div className="divider-line" />
      <section className="section" id="diff">
        <div className="section-eyebrow">Competitive Advantage</div>
        <h2 className="section-title sg">경쟁 플랫폼 대비 차별점</h2>
        <p className="section-sub">기존 플랫폼이 하지 못하는 것을 DroneForce가 합니다.</p>

        <div className="diff-wrap">
          <table className="diff-table">
            <thead>
              <tr>
                <th style={{textAlign:"left"}}>핵심 기능</th>
                <th>크몽·숨고</th>
                <th>날리다</th>
                <th className="hl-col">DroneForce ⭐</th>
              </tr>
            </thead>
            <tbody>
              {DIFF_ROWS.map(row => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td><IconCell val={row.kmong} /></td>
                  <td><IconCell val={row.naerida} /></td>
                  <td className="hl-col"><IconCell val={row.df} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* KEY DIFF CARDS */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginTop:24}}>
          {[
            {icon:"🪖",title:"군 인력 연계",desc:"국내 최초 군 출신 드론 파일럿 민간 연결"},
            {icon:"🔐",title:"인증 기반 신뢰",desc:"자격증·군 경력 관리자 승인 후 등록"},
            {icon:"📊",title:"디지털 보고서",desc:"지형 분석 포함 납품 가능 보고서"},
            {icon:"🏛️",title:"B2G 특화",desc:"지자체·공공기관 전용 보안 매칭"},
          ].map(c => (
            <div key={c.title} style={{background:"var(--navy-900)",border:"1px solid var(--border)",borderRadius:12,padding:20}}>
              <div style={{fontSize:24,marginBottom:10}}>{c.icon}</div>
              <div style={{fontFamily:"Space Grotesk",fontSize:15,fontWeight:700,color:"var(--white)",marginBottom:6}}>{c.title}</div>
              <div style={{fontSize:12,color:"var(--text2)",lineHeight:1.6}}>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MARKET */}
      <div className="divider-line" />
      <section className="section" id="market">
        <div className="section-eyebrow">Market Size</div>
        <h2 className="section-title sg">시장 규모</h2>
        <p className="section-sub">국내 드론 서비스 시장은 매년 18% 성장 중입니다.</p>

        <div className="market-grid">
          <div className="market-card tam">
            <div className="market-label">TAM — 전체 시장</div>
            <div className="market-val">1.4조</div>
            <div className="market-desc">국내 드론 서비스 전체 시장 (2025, 국토교통부). 촬영·측량·점검·방제 전 분야 포함.</div>
            <div className="market-growth">↑ 연 18% 성장</div>
          </div>
          <div className="market-card sam">
            <div className="market-label">SAM — 플랫폼 가능 시장</div>
            <div className="market-val">3,500억</div>
            <div className="market-desc">B2C 개인·소상공인, B2B 중소 건설사·시설 관리, B2G 지자체·공공기관 수요.</div>
          </div>
          <div className="market-card som">
            <div className="market-label som">SOM — 1~2년 목표</div>
            <div className="market-val som">35억</div>
            <div className="market-desc">수도권 집중 공략. 군 전역 파일럿 50명 확보 → 수도권 의뢰 매칭 목표.</div>
            <div className="market-growth">SAM의 1%</div>
          </div>
        </div>

        {/* REVENUE MODEL */}
        <div style={{marginTop:32,background:"var(--navy-900)",border:"1px solid var(--border)",borderRadius:14,padding:28}}>
          <div style={{fontFamily:"Space Grotesk",fontSize:17,fontWeight:700,color:"var(--white)",marginBottom:20}}>2트랙 수익 모델</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
            {[
              {track:"TRACK 01",title:"거래 수수료 (B2C)",desc:"의뢰 성사 시 거래액의 10~15% 수수료. 월 100건 성사 시 약 375만원 수익.",highlight:"₩375만 / 월"},
              {track:"TRACK 02",title:"B2B 프로젝트 수수료",desc:"건설사·지자체 대형 프로젝트 중개. 건당 단가 높아 초기 매출 창출에 유리.",highlight:"₩250만 / 월"},
            ].map(t => (
              <div key={t.track} style={{background:"var(--navy-800)",border:"1px solid var(--border)",borderRadius:10,padding:20}}>
                <div style={{fontSize:10,fontWeight:700,color:"var(--text3)",letterSpacing:1.5,textTransform:"uppercase",marginBottom:8}}>{t.track}</div>
                <div style={{fontFamily:"Space Grotesk",fontSize:15,fontWeight:700,color:"var(--white)",marginBottom:6}}>{t.title}</div>
                <div style={{fontSize:13,color:"var(--text2)",lineHeight:1.6,marginBottom:12}}>{t.desc}</div>
                <div style={{fontFamily:"Space Grotesk",fontSize:22,fontWeight:800,color:"var(--blue-400)"}}>{t.highlight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="divider-line" />
      <section className="cta-section">
        <div className="cta-glow" />
        <div className="cta-inner">
          <div className="section-eyebrow" style={{marginBottom:14}}>지금 바로 시작하세요</div>
          <h2 className="cta-title sg">
            드론 전문가로<br />새 출발을 시작하세요
          </h2>
          <p className="cta-sub">전역 후 드론 경력을 살리고 싶은 파일럿, 신뢰할 수 있는 드론 서비스가 필요한 기업 모두를 환영합니다.</p>

          {!submitted ? (
            <>
              <div className="cta-input-wrap">
                <input className="cta-input" type="email" placeholder="이메일 주소 입력" value={email} onChange={e => setEmail(e.target.value)} />
                <button className="btn-primary" style={{padding:"12px 20px",borderRadius:9,fontSize:14,whiteSpace:"nowrap"}} onClick={handleRegister}>사전 등록</button>
              </div>
              <div className="cta-note">현재 파일럿 사전 등록 진행 중 · 목표 20명</div>
            </>
          ) : (
            <div style={{padding:"16px 32px",background:"rgba(34,197,94,.08)",border:"1px solid rgba(34,197,94,.2)",borderRadius:12,display:"inline-block"}}>
              <div style={{fontSize:15,fontWeight:600,color:"#4ADE80"}}>✓ 사전 등록이 완료되었습니다</div>
              <div style={{fontSize:13,color:"var(--text2)",marginTop:4}}>빠른 시일 내에 연락드리겠습니다</div>
            </div>
          )}

          <div style={{marginTop:36,display:"flex",gap:12,justifyContent:"center"}}>
            <button className="hero-btn-main" onClick={onEnter}>플랫폼 데모 보기 →</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">Drone<em>Force</em></div>
        <div className="footer-links">
          <span className="footer-link">서비스 소개</span>
          <span className="footer-link">파일럿 등록</span>
          <span className="footer-link">이용약관</span>
          <span className="footer-link">개인정보처리방침</span>
        </div>
        <div className="footer-copy">© 2026 DroneForce. All rights reserved.</div>
      </footer>
    </div>
  );
}
