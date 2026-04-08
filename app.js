import React, { useMemo, useState } from "react";


const kpis = [
  {
    label: "현재 투입 가능 오퍼레이터",
    value: "18",
    change: "+4",
    icon: Users,
  },
  {
    label: "진행 중인 미션",
    value: "7",
    change: "+2",
    icon: Activity,
  },
  {
    label: "승인 대기 인증",
    value: "12",
    change: "+3",
    icon: ShieldCheck,
  },
  {
    label: "이번 달 완료 미션",
    value: "31",
    change: "+9",
    icon: CheckCircle2,
  },
];

const operators = [
  {
    name: "김태훈 중사",
    region: "수도권",
    badge: "군 경력 증명 완료",
    score: 4.9,
    tags: ["수색", "정찰", "야간비행"],
    rate: "₩180,000 / 건",
    available: true,
  },
  {
    name: "박서준 상사",
    region: "강원권",
    badge: "자격증 + 장비 인증",
    score: 4.8,
    tags: ["측량", "시설점검"],
    rate: "₩220,000 / 건",
    available: true,
  },
  {
    name: "이민호 병장",
    region: "충청권",
    badge: "보안 이수 완료",
    score: 4.7,
    tags: ["보안시설", "정밀촬영"],
    rate: "₩200,000 / 건",
    available: false,
  },
  {
    name: "최유진 하사",
    region: "경상권",
    badge: "특수임무 수행",
    score: 5.0,
    tags: ["재난대응", "항공촬영"],
    rate: "₩250,000 / 건",
    available: true,
  },
];

const missions = [
  {
    id: "MS-2401",
    title: "산업단지 외곽 보안 점검",
    status: "진행중",
    region: "평택",
    security: "상",
    altitude: "120m",
    progress: 68,
  },
  {
    id: "MS-2402",
    title: "하천 범람 구역 정밀 촬영",
    status: "견적대기",
    region: "춘천",
    security: "중",
    altitude: "80m",
    progress: 22,
  },
  {
    id: "MS-2403",
    title: "공공시설 외벽 균열 점검",
    status: "배정완료",
    region: "성남",
    security: "상",
    altitude: "50m",
    progress: 91,
  },
];

const intelItems = [
  {
    title: "드론 관련 법규 업데이트",
    desc: "비행 승인, 야간 비행, 비가시권 운용 기준을 확인하세요.",
    icon: BookOpen,
  },
  {
    title: "비행 금지 구역",
    desc: "군사시설, 공항 주변, 제한 공역을 자동 필터링합니다.",
    icon: ShieldAlert,
  },
  {
    title: "임무 보고서 보관함",
    desc: "디지털 임무 완료 보고서, 정산 자료, 결과 파일을 저장합니다.",
    icon: ClipboardList,
  },
];

const navItems = [
  { key: "briefing", label: "Mission Briefing", icon: Radar },
  { key: "force", label: "Force List", icon: Users },
  { key: "map", label: "Tactical Map", icon: MapPinned },
  { key: "intel", label: "Intel Center", icon: BookOpen },
];

function Badge({ children, tone = "default" }) {
  const tones = {
    default: "border-white/10 bg-white/5 text-white/80",
    green: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    amber: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    red: "border-red-400/30 bg-red-400/10 text-red-300",
    blue: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${tones[tone] || tones.default}`}>
      {children}
    </span>
  );
}

function SectionCard({ title, subtitle, children, action }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </motion.section>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("briefing");
  const [form, setForm] = useState({
    missionType: "정밀 촬영",
    location: "서울 강남구",
    altitude: "120m",
    security: "상",
    budget: "300000",
    date: "2026-04-15",
    note: "보안이 필요한 시설로, 인증 완료 파일럿 우선 매칭 요청",
  });

  const selectedTab = useMemo(
    () => navItems.find((item) => item.key === activeTab) || navItems[0],
    [activeTab]
  );

  const renderContent = () => {
    if (activeTab === "briefing") {
      return (
        <SectionCard
          title="Mission Briefing"
          subtitle="임무 위치, 고도 요구사항, 보안 등급을 입력하는 정밀 폼"
          action={<Badge tone="green">보안 등급 필터 적용</Badge>}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["임무 유형", "missionType", "정밀 촬영"],
              ["임무 위치", "location", "예: 서울 강남구"],
              ["고도 요구사항", "altitude", "120m"],
              ["보안 등급", "security", "상"],
              ["예산", "budget", "300000"],
              ["희망 일정", "date", "2026-04-15"],
            ].map(([label, name, placeholder]) => (
              <label key={name} className="space-y-2">
                <span className="text-sm text-slate-300">{label}</span>
                <input
                  value={form[name]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [name]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-600 focus:border-emerald-400/50"
                />
              </label>
            ))}
          </div>

          <label className="mt-4 block space-y-2">
            <span className="text-sm text-slate-300">임무 메모</span>
            <textarea
              rows={4}
              value={form.note}
              onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-emerald-400/50"
            />
          </label>

          <div className="mt-5 flex flex-wrap gap-3">
            <button className="rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
              임무 등록
            </button>
            <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10">
              초안 저장
            </button>
          </div>
        </SectionCard>
      );
    }

    if (activeTab === "force") {
      return (
        <SectionCard
          title="Force List"
          subtitle="군 복무 이력, 특수 임무 경험, 인증 상태를 중심으로 한 전문가 리스트"
          action={<Badge tone="blue">실시간 후보 정렬</Badge>}
        >
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-400">
            <Search className="h-4 w-4" />
            <span>군 경력, 수색, 정찰, 보안시설, 측량 키워드 검색</span>
          </div>
          <div className="grid gap-4 xl:grid-cols-2">
            {operators.map((op) => (
              <div
                key={op.name}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition hover:border-emerald-400/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-white">{op.name}</h3>
                      {op.available ? (
                        <Badge tone="green">투입 가능</Badge>
                      ) : (
                        <Badge tone="red">출동 중</Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{op.region} · {op.badge}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-amber-300">
                      <Star className="h-4 w-4 fill-amber-300" />
                      <span className="text-sm font-semibold text-white">{op.score}</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">{op.rate}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {op.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-300">
                    매칭 요청
                  </button>
                  <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
                    프로필 보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      );
    }

    if (activeTab === "map") {
      return (
        <SectionCard
          title="Tactical Map"
          subtitle="Supabase Realtime을 활용한 임무 진행 상황 모니터링 화면"
          action={<Badge tone="amber">LIVE SYNC</Badge>}
        >
          <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
            <div className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_40%),linear-gradient(180deg,rgba(2,6,23,0.95),rgba(15,23,42,0.92))] p-5">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/80">Operational View</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">실시간 임무 분포도</h3>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-300">
                  <Signal className="h-4 w-4" /> Realtime
                </div>
              </div>

              <div className="relative z-10 mt-8 grid gap-4 md:grid-cols-2">
                {missions.map((m, idx) => (
                  <div key={m.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-lg shadow-black/20">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-slate-400">{m.id}</p>
                        <h4 className="mt-1 font-semibold text-white">{m.title}</h4>
                      </div>
                      <Badge tone={idx === 0 ? "green" : idx === 1 ? "amber" : "blue"}>{m.status}</Badge>
                    </div>

                    <div className="mt-4 space-y-3 text-sm text-slate-300">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2"><MapPinned className="h-4 w-4 text-emerald-300" /> 위치</span>
                        <span>{m.region}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-300" /> 보안</span>
                        <span>{m.security}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2"><Waves className="h-4 w-4 text-emerald-300" /> 고도</span>
                        <span>{m.altitude}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                        <span>진행률</span>
                        <span>{m.progress}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-lime-300"
                          style={{ width: `${m.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Radar className="h-4 w-4" />
                  <span className="text-sm font-semibold">Live Signals</span>
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <div className="flex items-center justify-between"><span>새 견적 수신</span><Badge tone="green">+3</Badge></div>
                  <div className="flex items-center justify-between"><span>배정 대기 미션</span><Badge tone="amber">2</Badge></div>
                  <div className="flex items-center justify-between"><span>보안 이수자 필요</span><Badge tone="red">1</Badge></div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex items-center gap-2 text-emerald-300">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm font-semibold">Command Chat</span>
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  <p className="rounded-2xl bg-white/5 p-3">Command: 보안 이수 완료 파일럿 우선 배정 바랍니다.</p>
                  <p className="rounded-2xl bg-emerald-400/10 p-3 text-emerald-100">Operator: 장비 점검 완료, 20분 내 출동 가능.</p>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      );
    }

    return (
      <SectionCard
        title="Intel Center"
        subtitle="드론 법규, 비행 금지 구역, 디지털 임무 보고서 보관함"
        action={<Badge tone="blue">Reference Hub</Badge>}
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {intelItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <h3 className="flex items-center gap-2 font-semibold text-white">
              <ShieldAlert className="h-4 w-4 text-amber-300" /> 비행 금지 구역 자동 체크
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="flex items-center justify-between"><span>군사시설 반경</span><Badge tone="red">차단</Badge></li>
              <li className="flex items-center justify-between"><span>공항 주변 공역</span><Badge tone="red">차단</Badge></li>
              <li className="flex items-center justify-between"><span>허가 임무 구역</span><Badge tone="green">허용</Badge></li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <h3 className="flex items-center gap-2 font-semibold text-white">
              <BriefcaseBusiness className="h-4 w-4 text-emerald-300" /> 디지털 임무 완료 보고서
            </h3>
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-300">
              <p className="font-medium text-white">보고서 번호: DRB-2026-0415</p>
              <p className="mt-2">지형 분석, 고도 데이터, 촬영 결과물, 위험 구간 기록을 포함한 PDF/웹 리포트 형태로 제공됩니다.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone="green">PDF Export</Badge>
                <Badge tone="blue">Terrain Analysis</Badge>
                <Badge tone="amber">Client Archive</Badge>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    );
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.2),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.15),transparent_30%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <header className="mb-6 rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-300">
                <Drone className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">DroneBridge Tactical Dashboard</p>
                <h1 className="mt-1 text-2xl font-semibold md:text-3xl">전술 지휘실형 드론 매칭 플랫폼</h1>
                <p className="mt-2 text-sm text-slate-400">군 출신 파일럿과 임무를 연결하는 Tactical & Professional UI</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs text-slate-400">시스템 상태</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-emerald-300"><Bell className="h-4 w-4" /> ONLINE</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs text-slate-400">매칭 엔진</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-white"><Gauge className="h-4 w-4 text-emerald-300" /> ACTIVE</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs text-slate-400">보안 인증</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-white"><BadgeCheck className="h-4 w-4 text-emerald-300" /> VERIFIED</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs text-slate-400">실시간 동기화</p>
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-white"><Signal className="h-4 w-4 text-emerald-300" /> LIVE</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
          <main className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {kpis.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-lg shadow-black/20"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-400">{item.label}</p>
                        <h2 className="mt-3 text-3xl font-semibold text-white">{item.value}</h2>
                        <p className="mt-2 text-xs text-emerald-300">전일 대비 {item.change}</p>
                      </div>
                      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-300">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid gap-4 xl:grid-cols-[220px_1fr]">
              <aside className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl">
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-white">
                  <CircleSlash2 className="h-4 w-4 text-emerald-300" />
                  Command Menu
                </div>
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = activeTab === item.key;
                    return (
                      <button
                        key={item.key}
                        onClick={() => setActiveTab(item.key)}
                        className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${
                          active
                            ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                            : "border border-transparent bg-white/5 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  <p className="flex items-center gap-2 text-white"><AlertTriangle className="h-4 w-4 text-amber-300" /> 보안 미션 우선 처리</p>
                  <p className="mt-2 text-slate-400">보안 이수 완료 파일럿 전용 매칭 옵션을 적용할 수 있습니다.</p>
                </div>
              </aside>

              <div>{renderContent()}</div>
            </div>
          </main>

          <aside className="space-y-4">
            <SectionCard
              title="Situation Board"
              subtitle="현재 운영 현황 요약"
              action={<Badge tone="green">{selectedTab.label}</Badge>}
            >
              <div className="space-y-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <span>매칭 성공률</span>
                    <span className="font-semibold text-white">86%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/5">
                    <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-emerald-400 to-lime-300" />
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <span>평균 응답 시간</span>
                    <span className="font-semibold text-white">4.2분</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <span>보안 미션 비중</span>
                    <span className="font-semibold text-white">39%</span>
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard
              title="Command Notes"
              subtitle="기획 핵심 문구를 바로 보여주는 영역"
              action={<Badge tone="amber">Pitch Ready</Badge>}
            >
              <div className="space-y-3 text-sm text-slate-300">
                <p className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="text-emerald-300">핵심 포인트:</span> 단순 O2O가 아니라 <span className="font-semibold text-white">데이터와 보안</span> 중심의 전술 지휘실 UX.
                </p>
                <p className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="text-emerald-300">기술 강점:</span> Supabase Realtime 기반 상태 추적, 향후 디지털 임무 보고서 자동화.
                </p>
              </div>
            </SectionCard>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
