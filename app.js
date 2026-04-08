import React, { useState } from "https://esm.sh/react";

export default function App() {
  const [page, setPage] = useState("landing");
  const [role, setRole] = useState(null);
  const [tab, setTab] = useState("mission");
  const [selectedMission, setSelectedMission] = useState(null);

  const [missions, setMissions] = useState([]);

  // 미션 추가
  const addMission = (data) => {
    setMissions([
      ...missions,
      {
        ...data,
        status: "대기중",
        operator: null,
        x: Math.random() * 90,
        y: Math.random() * 90,
      },
    ]);
  };

  // 상태 변경
  const updateStatus = (i) => {
    const list = [...missions];
    const flow = ["대기중", "진행중", "완료"];
    let idx = flow.indexOf(list[i].status);
    if (idx < flow.length - 1) list[i].status = flow[idx + 1];
    setMissions(list);
  };

  // 파일럿 매칭
  const assignOperator = (i, name) => {
    const list = [...missions];
    list[i].operator = name;
    list[i].status = "배정완료";
    setMissions(list);
  };

  // 랜딩
  if (page === "landing") {
    return React.createElement(
      "div",
      { className: "h-screen flex flex-col justify-center items-center bg-black text-white" },
      React.createElement("h1", { className: "text-4xl text-green-400 mb-4" }, "Drone Force"),
      React.createElement("p", null, "전술 드론 운영 시스템"),
      React.createElement(
        "button",
        { onClick: () => setPage("signup"), className: "mt-6 px-6 py-3 bg-green-500 text-black rounded" },
        "START"
      )
    );
  }

  // 회원 선택
  if (page === "signup") {
    return React.createElement(
      "div",
      { className: "h-screen flex flex-col justify-center items-center bg-black text-white" },
      React.createElement("h2", { className: "mb-6" }, "ROLE SELECT"),
      ["Command", "Operator"].map((r) =>
        React.createElement(
          "button",
          {
            onClick: () => {
              setRole(r);
              setPage("dashboard");
            },
            className: "px-6 py-3 bg-gray-800 mb-3 rounded hover:bg-green-500 hover:text-black"
          },
          r
        )
      )
    );
  }

  // KPI 계산
  const kpi = {
    total: missions.length,
    active: missions.filter(m => m.status === "진행중").length,
    done: missions.filter(m => m.status === "완료").length,
  };

  // 콘텐츠
  const renderContent = () => {
    // Mission
    if (tab === "mission") {
      let location = "", altitude = "", security = "중";

      return React.createElement(
        "div",
        null,

        role === "Command" &&
        React.createElement(
          "div",
          { className: "mb-4" },
          React.createElement("input", { placeholder: "위치", className: "p-2 bg-gray-800 mr-2", onChange: e => location = e.target.value }),
          React.createElement("input", { placeholder: "고도", className: "p-2 bg-gray-800 mr-2", onChange: e => altitude = e.target.value }),
          React.createElement("select", { className: "p-2 bg-gray-800 mr-2", onChange: e => security = e.target.value },
            ["상","중","하"].map(s => React.createElement("option", null, s))
          ),
          React.createElement("button", {
            onClick: () => addMission({ location, altitude, security }),
            className: "px-3 py-2 bg-green-500 text-black"
          }, "추가")
        ),

        missions.map((m, i) =>
          React.createElement(
            "div",
            {
              key: i,
              className: "p-3 bg-gray-800 mb-2 cursor-pointer",
              onClick: () => setSelectedMission({ ...m, index: i })
            },
            `${m.location} | ${m.status} | 보안:${m.security}`
          )
        )
      );
    }

    // Map
    if (tab === "map") {
      return React.createElement(
        "div",
        { className: "relative h-64 bg-gray-800" },
        missions.map((m, i) =>
          React.createElement("div", {
            key: i,
            className: "absolute w-3 h-3 rounded-full",
            style: {
              top: m.y + "%",
              left: m.x + "%",
              background: m.status === "완료" ? "blue" : m.status === "진행중" ? "yellow" : "green"
            }
          })
        )
      );
    }

    // Force
    if (tab === "force") {
      const list = ["김태훈","박서준","이민호","최유진"];
      return React.createElement(
        "div",
        null,
        list.map(name =>
          React.createElement(
            "div",
            { className: "p-2 bg-gray-800 mb-2 flex justify-between" },
            name,
            selectedMission && role === "Command" &&
            React.createElement("button", {
              onClick: () => assignOperator(selectedMission.index, name),
              className: "text-green-400"
            }, "배정")
          )
        )
      );
    }

    // Intel
    if (tab === "intel") {
      return React.createElement(
        "div",
        null,
        React.createElement("p", null, "비행 금지 구역"),
        React.createElement("p", null, "법규"),
        React.createElement("p", null, "보고서")
      );
    }
  };

  // 상세 + 보고서
  const renderDetail = () => {
    if (!selectedMission) return null;

    return React.createElement(
      "div",
      { className: "p-4 bg-gray-900 mt-4" },
      React.createElement("h3", null, "Mission Detail"),
      React.createElement("p", null, "위치: " + selectedMission.location),
      React.createElement("p", null, "고도: " + selectedMission.altitude),
      React.createElement("p", null, "보안: " + selectedMission.security),
      React.createElement("p", null, "상태: " + selectedMission.status),
      selectedMission.operator && React.createElement("p", null, "파일럿: " + selectedMission.operator),

      role === "Operator" &&
      React.createElement("button", {
        onClick: () => updateStatus(selectedMission.index),
        className: "mt-2 px-3 py-2 bg-green-500 text-black"
      }, "상태 변경"),

      selectedMission.status === "완료" &&
      React.createElement(
        "div",
        { className: "mt-4 p-3 bg-black" },
        React.createElement("h4", null, "임무 보고서"),
        React.createElement("p", null, "지형 분석 완료"),
        React.createElement("p", null, "촬영 데이터 확보"),
        React.createElement("p", null, "이상 없음")
      )
    );
  };

  // 대시보드
  return React.createElement(
    "div",
    { className: "p-6 bg-black text-white min-h-screen" },

    React.createElement("h1", { className: "text-green-400 mb-4" }, "Drone Force (" + role + ")"),

    // KPI
    React.createElement(
      "div",
      { className: "flex gap-4 mb-4" },
      [`총:${kpi.total}`, `진행:${kpi.active}`, `완료:${kpi.done}`].map(v =>
        React.createElement("div", { className: "p-2 bg-gray-800" }, v)
      )
    ),

    // 메뉴
    React.createElement(
      "div",
      { className: "flex gap-3 mb-4" },
      ["mission","force","map","intel"].map(t =>
        React.createElement("button", {
          onClick: () => setTab(t),
          className: tab === t ? "bg-green-500 text-black px-3 py-2" : "bg-gray-800 px-3 py-2"
        }, t)
      )
    ),

    renderContent(),
    renderDetail()
  );
}
