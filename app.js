(function () {
  "use strict";

  const STORAGE_KEY = "hl-study-workbench-v1";
  const NAV_ITEMS = [
    { id: "dashboard", label: "今日", icon: "dashboard" },
    { id: "schedule", label: "课表", icon: "calendar" },
    { id: "courses", label: "课程", icon: "book" },
    { id: "plan", label: "计划", icon: "target" },
    { id: "review", label: "复盘", icon: "chart" },
    { id: "settings", label: "设置", icon: "settings" }
  ];

  const ICONS = {
    dashboard: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
    calendar: '<path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 16h18"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    chart: '<path d="M3 3v18h18"/><path d="M7 16v-4M12 16V7M17 16v-7"/>',
    settings: '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.1A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.14.37.36.7.65.98.3.28.67.42 1.08.42H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5.6Z"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 15H6L5 6"/>',
    play: '<path d="M8 5v14l11-7z"/>',
    pause: '<path d="M10 4H6v16h4zM18 4h-4v16h4z"/>',
    reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>'
  };

  const COURSE_PROFILES = {
    "高等数学A-1": {
      tier: "S",
      weeklyHours: 9,
      focus: "极限、导数、微分、积分的基本推导与题型体系",
      strategy: "每次课后当天完成例题重做，周日集中做错题回炉。所有公式亲手推导，不只背结论。"
    },
    "线性代数A": {
      tier: "S",
      weeklyHours: 6,
      focus: "矩阵、行列式、向量组与线性方程组",
      strategy: "按“定义、判定、计算、几何意义”四栏整理，每周至少完成两轮例题复现。"
    },
    "大学英语-1": {
      tier: "A",
      weeklyHours: 5,
      focus: "四级词汇、听力、阅读速度与段落翻译",
      strategy: "每天词汇和听力不断线，周中完成阅读精练，周末整理错题和作文句型。"
    },
    "C/C++语言程序设计A": {
      tier: "A",
      weeklyHours: 6,
      focus: "语法基础、流程控制、函数、数组与调试能力",
      strategy: "课堂代码当天重敲，先独立写再对照；每周做两道小型编程题建立问题拆解能力。"
    },
    "工程图学": {
      tier: "A",
      weeklyHours: 4,
      focus: "投影规律、三视图、尺寸标注与空间想象",
      strategy: "每次作图限时完成，错误位置用不同颜色标记，隔天重新画一次。"
    },
    "中国近现代史纲要": {
      tier: "B",
      weeklyHours: 3,
      focus: "时间线、重大事件因果关系与核心表述",
      strategy: "课堂当天补全时间线，考前按主题做问答提纲，不临时突击。"
    },
    "体育-1": {
      tier: "B",
      weeklyHours: 2,
      focus: "出勤、体质测试与运动习惯",
      strategy: "不缺席、不迟到，每周额外完成两次 30 分钟有氧或力量训练。"
    },
    "军事理论": {
      tier: "B",
      weeklyHours: 2,
      focus: "课堂重点、平时作业与结课考核",
      strategy: "当堂记关键词，课后 20 分钟整理成问答卡片，结课前完成两轮回忆。"
    },
    "形势与政策1": {
      tier: "B",
      weeklyHours: 2,
      focus: "出勤、课堂参与和课程要求",
      strategy: "按老师给出的主题整理提纲，保留课堂材料，避免遗漏考核通知。"
    },
    "大学生健康素养大讲堂": {
      tier: "C",
      weeklyHours: 1,
      focus: "出勤与课程要求",
      strategy: "按时参加并保留笔记，结课前按要求完成提交。"
    },
    "校园导论": {
      tier: "C",
      weeklyHours: 1,
      focus: "校园资源、专业认知与适应任务",
      strategy: "把课程中的资源信息整理成清单，尽快建立图书馆、实验室和竞赛信息来源。"
    },
    "心灵导航": {
      tier: "C",
      weeklyHours: 1,
      focus: "心理适应与课堂参与",
      strategy: "按时参加，记录压力来源和调整办法，睡眠低于 7 小时时主动降负。"
    },
    "学科导论": {
      tier: "C",
      weeklyHours: 1,
      focus: "能源动力专业方向与后续课程地图",
      strategy: "重点记录专业分流、科研方向、竞赛和导师信息，建立后续访谈问题清单。"
    }
  };

  const WEEKLY_PLAN = {
    1: [
      { start: "16:00", end: "17:40", title: "高等数学题型复盘", course: "高等数学A-1", note: "先重做课堂例题，再做 6 道变式题" },
      { start: "19:00", end: "20:30", title: "英语词汇与听力", course: "大学英语-1", note: "词汇 50 个，精听一段材料" },
      { start: "20:40", end: "21:40", title: "线性代数预复习", course: "线性代数A", note: "整理定义与一个典型例题" }
    ],
    2: [
      { start: "14:00", end: "15:40", title: "工程图学补图", course: "工程图学", note: "限时重画当天内容" },
      { start: "18:00", end: "19:30", title: "C++ 代码重敲", course: "C/C++语言程序设计A", note: "课堂代码独立复现并补注释" },
      { start: "19:40", end: "21:20", title: "高等数学作业", course: "高等数学A-1", note: "当天完成，错题立刻标记" },
      { start: "21:30", end: "22:00", title: "英语阅读精练", course: "大学英语-1", note: "一篇阅读，分析错因" }
    ],
    3: [
      { start: "18:10", end: "19:30", title: "高数错题回炉", course: "高等数学A-1", note: "不看答案重做，写清关键步骤" },
      { start: "19:40", end: "21:00", title: "C++ 练习", course: "C/C++语言程序设计A", note: "两题基础题，重点检查边界条件" },
      { start: "21:10", end: "21:50", title: "英语词汇复习", course: "大学英语-1", note: "滚动复习昨日和本周词汇" }
    ],
    4: [
      { start: "13:30", end: "15:40", title: "线性代数推导", course: "线性代数A", note: "矩阵与行列式题型各一组" },
      { start: "18:00", end: "19:40", title: "高等数学作业", course: "高等数学A-1", note: "先做题，再用一句话总结方法" },
      { start: "19:50", end: "20:50", title: "英语长难句", course: "大学英语-1", note: "精读五句，整理句型" },
      { start: "21:00", end: "21:40", title: "工程图学回顾", course: "工程图学", note: "重新检查尺寸与投影关系" }
    ],
    5: [
      { start: "13:30", end: "15:40", title: "C++ 周练", course: "C/C++语言程序设计A", note: "独立完成两题并记录调试过程" },
      { start: "18:00", end: "19:40", title: "高等数学周整理", course: "高等数学A-1", note: "补齐本周公式、题型和错题" },
      { start: "19:50", end: "21:10", title: "周复盘", course: "", note: "核对任务、课程进度与作息" },
      { start: "21:20", end: "22:00", title: "英语词汇", course: "大学英语-1", note: "本周词汇总复习" }
    ],
    6: [
      { start: "13:30", end: "15:30", title: "数学综合训练", course: "高等数学A-1", note: "限时做题，训练计算稳定性" },
      { start: "15:40", end: "17:00", title: "线性代数训练", course: "线性代数A", note: "例题、课后题混合训练" },
      { start: "18:00", end: "19:30", title: "C++ 或工程图学补弱", course: "", note: "按本周薄弱项二选一" },
      { start: "20:00", end: "21:00", title: "英语四级专项", course: "大学英语-1", note: "听力或阅读专项一套" }
    ],
    0: [
      { start: "08:30", end: "10:30", title: "错题本回炉", course: "高等数学A-1", note: "只重做仍会错的题" },
      { start: "10:45", end: "12:00", title: "线性代数总结", course: "线性代数A", note: "画知识结构并补一个典型例题" },
      { start: "14:00", end: "16:00", title: "下周课程预习", course: "", note: "高数、线代、C++各预习一节" },
      { start: "16:20", end: "17:00", title: "运动", course: "体育-1", note: "有氧或力量训练" },
      { start: "19:00", end: "20:30", title: "周复盘与下周计划", course: "", note: "完成复盘，排下周任务" }
    ]
  };

  const MILESTONES = [
    { date: "2026-09-23", title: "建立稳定执行节奏", detail: "连续两周完成每日打卡；高数、线代、C++ 各建立一本独立笔记。" },
    { date: "2026-10-05", title: "完成第一轮课程摸底", detail: "确认各科平时分构成；英语完成四级词汇第一轮，C++ 能独立写基础程序。" },
    { date: "2026-11-01", title: "形成优势科目", detail: "高数和线代稳定在 85+；每周至少一次数学限时训练，英语开始整套真题。" },
    { date: "2026-12-01", title: "进入期末复习状态", detail: "所有课程补齐课堂笔记；数学、线代和工程图学完成两轮错题复习。" },
    { date: "2027-01-01", title: "守住绩点和排名", detail: "核心课不低于 85；无挂科、无违纪；完成本学期学习复盘和寒假计划。" }
  ];

  const defaultState = {
    version: 1,
    settings: {
      dailyTarget: 240,
      weeklyTarget: 1500,
      displayName: "",
      major: "能源动力类"
    },
    days: {},
    courseProgress: {},
    reviews: {}
  };

  let state = loadState();
  let activeView = "dashboard";
  let currentWeekStart = startOfWeek(new Date());
  let planDay = new Date().getDay();
  let timerDuration = 45;
  let timerRemaining = timerDuration * 60;
  let timerRunning = false;
  let timerInterval = null;
  let toastTimer = null;

  const calendarData = window.HL_CALENDAR_DATA;
  const courseEvents = calendarData
    ? calendarData.createSeedEvents().filter((event) => event.type === "course")
    : [];
  const allCourseTitles = Array.from(new Set(courseEvents.map((event) => event.title))).sort(
    (a, b) => priorityRank(a) - priorityRank(b) || a.localeCompare(b, "zh-CN")
  );

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(defaultState);
      return normalizeState(JSON.parse(raw));
    } catch (error) {
      console.warn("Failed to load study data", error);
      return clone(defaultState);
    }
  }

  function normalizeState(value) {
    const next = clone(defaultState);
    if (!value || typeof value !== "object") return next;
    next.version = 1;
    next.settings = Object.assign(next.settings, value.settings || {});
    next.days = value.days && typeof value.days === "object" ? value.days : {};
    next.courseProgress =
      value.courseProgress && typeof value.courseProgress === "object" ? value.courseProgress : {};
    next.reviews = value.reviews && typeof value.reviews === "object" ? value.reviews : {};
    return next;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function icon(name) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.check}</svg>`;
  }

  function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function parseDateKey(key) {
    const [year, month, day] = key.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function addDays(date, amount) {
    const copy = new Date(date);
    copy.setDate(copy.getDate() + amount);
    return copy;
  }

  function addWeeks(date, amount) {
    return addDays(date, amount * 7);
  }

  function startOfWeek(date) {
    const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const day = copy.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    copy.setDate(copy.getDate() + diff);
    return copy;
  }

  function sameDate(a, b) {
    return formatDateKey(a) === formatDateKey(b);
  }

  function isBeforeDate(a, b) {
    return formatDateKey(a) < formatDateKey(b);
  }

  function weekKey(date) {
    return formatDateKey(startOfWeek(date));
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function formatShortDate(date) {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  function formatDateLong(date) {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }

  function weekdayName(day) {
    return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][day];
  }

  function minutesFromTime(time) {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
  }

  function eventDateTime(event) {
    const date = parseDateKey(event.date);
    const [hour, minute] = event.start.split(":").map(Number);
    date.setHours(hour, minute, 0, 0);
    return date;
  }

  function nowMinutes() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }

  function getDayState(dateKey) {
    if (!state.days[dateKey]) {
      state.days[dateKey] = {
        minutes: 0,
        subjectMinutes: {},
        tasks: {},
        customTasks: [],
        note: "",
        mood: "",
        checkedInAt: ""
      };
    }
    const day = state.days[dateKey];
    if (!day.subjectMinutes) day.subjectMinutes = {};
    if (!day.tasks) day.tasks = {};
    if (!Array.isArray(day.customTasks)) day.customTasks = [];
    return day;
  }

  function priorityRank(title) {
    const tier = COURSE_PROFILES[title]?.tier || "C";
    return { S: 0, A: 1, B: 2, C: 3 }[tier];
  }

  function courseProfile(title) {
    return (
      COURSE_PROFILES[title] || {
        tier: "C",
        weeklyHours: 1,
        focus: "按课程要求完成学习与考核",
        strategy: "按时出勤、完成作业，保留课堂资料并及时复习。"
      }
    );
  }

  function sessionsForDate(dateKey) {
    return courseEvents
      .filter((event) => event.date === dateKey)
      .sort((a, b) => minutesFromTime(a.start) - minutesFromTime(b.start));
  }

  function nextCourseSession(dateKey, title) {
    const today = parseDateKey(dateKey);
    return courseEvents
      .filter((event) => event.title === title && !isBeforeDate(parseDateKey(event.date), today))
      .sort((a, b) => `${a.date} ${a.start}`.localeCompare(`${b.date} ${b.start}`))[0];
  }

  function getAutomaticTasks(dateKey) {
    const tasks = [];
    const sessions = sessionsForDate(dateKey);
    const scheduledTitles = new Set(sessions.map((event) => event.title));

    for (const session of sessions) {
      tasks.push({
        id: `lecture-${session.id}`,
        title: `复习 ${session.title}`,
        detail: `${session.start}-${session.end} 课后整理`,
        course: session.title,
        automatic: true
      });
    }

    const spacedReviewOffsets = [
      { days: 1, label: "24 小时回顾" },
      { days: 3, label: "第 3 天回忆" },
      { days: 7, label: "第 7 天检测" }
    ];
    const dueReviews = courseEvents
      .map((event) => {
        const delta = Math.round(
          (parseDateKey(dateKey) - parseDateKey(event.date)) / 86400000
        );
        const offset = spacedReviewOffsets.find((item) => item.days === delta);
        const tier = courseProfile(event.title).tier;
        return offset && ["S", "A"].includes(tier) ? { event, offset, tier } : null;
      })
      .filter(Boolean)
      .sort((a, b) => priorityRank(a.event.title) - priorityRank(b.event.title));

    for (const review of dueReviews.slice(0, 3)) {
      tasks.push({
        id: `spaced-${review.offset.days}-${review.event.id}`,
        title: `${review.offset.label}：${review.event.title}`,
        detail: `${review.event.date} 课次，先闭卷回忆，再查笔记`,
        course: review.event.title,
        automatic: true
      });
    }

    tasks.push({
      id: "daily-english",
      title: "英语词汇与听力",
      detail: "30-40 分钟，保持连续输入",
      course: "大学英语-1",
      automatic: true
    });
    tasks.push({
      id: "daily-exercise",
      title: "运动与拉伸",
      detail: "30 分钟，优先保护体力和睡眠",
      course: "体育-1",
      automatic: true
    });

    if (scheduledTitles.has("高等数学A-1") || [1, 3, 5, 0].includes(parseDateKey(dateKey).getDay())) {
      tasks.push({
        id: "math-errors",
        title: "高数错题回炉",
        detail: "重做 3-5 道仍不稳定的题",
        course: "高等数学A-1",
        automatic: true
      });
    }

    if (scheduledTitles.has("C/C++语言程序设计A")) {
      tasks.push({
        id: "cpp-practice",
        title: "C++ 上机补练",
        detail: "重敲课堂代码或独立完成 2 道题",
        course: "C/C++语言程序设计A",
        automatic: true
      });
    }

    if (scheduledTitles.has("线性代数A")) {
      tasks.push({
        id: "linear-practice",
        title: "线代例题二次推导",
        detail: "不看答案完成一组典型题",
        course: "线性代数A",
        automatic: true
      });
    }

    if (scheduledTitles.has("工程图学")) {
      tasks.push({
        id: "drawing-practice",
        title: "工程图学限时作图",
        detail: "完成后隔天再检查一次",
        course: "工程图学",
        automatic: true
      });
    }

    if (parseDateKey(dateKey).getDay() === 0) {
      tasks.push({
        id: "weekly-review",
        title: "完成周复盘与下周排程",
        detail: "记录睡眠、任务率和下周三件大事",
        course: "",
        automatic: true
      });
    }

    return tasks;
  }

  function taskPriority(task, dateKey) {
    const tierScore = { S: 55, A: 45, B: 30, C: 18 }[courseProfile(task.course).tier] || 15;
    const scheduled = task.course && sessionsForDate(dateKey).some((event) => event.title === task.course);
    let score = tierScore;

    if (task.id.startsWith("lecture-")) score += 18;
    if (task.id.startsWith("spaced-")) score += 22;
    if (task.id === "math-errors") score += 16;
    if (task.id === "cpp-practice") score += 14;
    if (task.id === "linear-practice") score += 14;
    if (task.id === "daily-english") score += 8;
    if (task.id === "weekly-review") score += 10;
    if (scheduled) score += 8;
    if (!task.automatic) score += 10;
    return score;
  }

  function getAllTasks(dateKey) {
    const day = getDayState(dateKey);
    const custom = day.customTasks.map((task) => ({ ...task, automatic: false }));
    return [...getAutomaticTasks(dateKey), ...custom].sort(
      (a, b) => taskPriority(b, dateKey) - taskPriority(a, dateKey)
    );
  }

  function taskCompletion(dateKey) {
    const day = getDayState(dateKey);
    const tasks = getAllTasks(dateKey);
    const done = tasks.filter((task) => day.tasks[task.id]).length;
    return { done, total: tasks.length, rate: tasks.length ? Math.round((done / tasks.length) * 100) : 0 };
  }

  function calculateStreak() {
    let streak = 0;
    let cursor = new Date();
    for (let i = 0; i < 365; i += 1) {
      const key = formatDateKey(cursor);
      const day = state.days[key];
      const active = day && (day.minutes > 0 || day.checkedInAt);
      if (active) {
        streak += 1;
      } else if (i > 0) {
        break;
      }
      cursor = addDays(cursor, -1);
    }
    return streak;
  }

  function weeklyMinutes(weekStart) {
    return Array.from({ length: 7 }, (_, index) => {
      const key = formatDateKey(addDays(weekStart, index));
      return state.days[key]?.minutes || 0;
    }).reduce((sum, value) => sum + value, 0);
  }

  function currentSessionInfo() {
    const now = new Date();
    const todayKey = formatDateKey(now);
    const sessions = sessionsForDate(todayKey);
    const currentMinute = nowMinutes();

    const active = sessions.find(
      (event) => currentMinute >= minutesFromTime(event.start) && currentMinute <= minutesFromTime(event.end)
    );
    if (active) return { state: "active", session: active };

    const upcoming = sessions.find((event) => minutesFromTime(event.start) > currentMinute);
    if (upcoming) return { state: "upcoming", session: upcoming };

    for (let offset = 1; offset <= 7; offset += 1) {
      const date = addDays(now, offset);
      const next = sessionsForDate(formatDateKey(date))[0];
      if (next) return { state: "later", session: next };
    }

    return { state: "none", session: null };
  }

  function navigationHtml(mobile) {
    return NAV_ITEMS.map(
      (item) =>
        `<button class="nav-button${activeView === item.id ? " is-active" : ""}" type="button" data-view="${item.id}" aria-label="${item.label}"${mobile ? ` title="${item.label}"` : ""}>${icon(item.icon)}<span>${item.label}</span></button>`
    ).join("");
  }

  function renderNavigation() {
    document.getElementById("desktop-nav").innerHTML = navigationHtml(false);
    document.getElementById("mobile-nav").innerHTML = navigationHtml(true);
  }

  function setView(view) {
    if (!NAV_ITEMS.some((item) => item.id === view)) view = "dashboard";
    activeView = view;
    document.querySelectorAll(".view").forEach((section) => {
      section.classList.toggle("is-active", section.dataset.view === view);
    });
    document.querySelectorAll("[data-view]").forEach((button) => {
      if (button.closest("nav")) button.classList.toggle("is-active", button.dataset.view === view);
    });
    document.getElementById("view-title").textContent =
      NAV_ITEMS.find((item) => item.id === view)?.label || "今日执行";
    location.hash = view === "dashboard" ? "" : view;
    renderAll();
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  function renderGlobal() {
    const now = new Date();
    document.getElementById("live-weekday").textContent = weekdayName(now.getDay());
    document.getElementById("live-date").textContent = `${pad(now.getMonth() + 1)}/${pad(now.getDate())}`;
    document.getElementById("term-label").textContent = calendarData?.term?.name || "2026-2027 第一学期";

    const weekStart = startOfWeek(now);
    const minutes = weeklyMinutes(weekStart);
    const target = Number(state.settings.weeklyTarget) || 1500;
    const percent = Math.min(100, Math.round((minutes / target) * 100));
    document.getElementById("sidebar-week-minutes").textContent = `${minutes} / ${target} 分钟`;
    document.getElementById("sidebar-week-bar").style.width = `${percent}%`;
    document.getElementById("sidebar-rank-note").textContent = `目标：稳住专业前 10% · ${state.settings.major || "能源动力类"}`;
  }

  function renderDashboard() {
    const todayKey = formatDateKey(new Date());
    const day = getDayState(todayKey);
    const taskStats = taskCompletion(todayKey);
    const dailyTarget = Number(state.settings.dailyTarget) || 240;
    const weekStart = startOfWeek(new Date());
    const weekMinutes = weeklyMinutes(weekStart);
    const weeklyTarget = Number(state.settings.weeklyTarget) || 1500;

    document.getElementById("metric-minutes").textContent = day.minutes;
    document.getElementById("metric-minutes-note").textContent = `目标 ${dailyTarget} 分钟`;
    document.getElementById("metric-tasks").textContent = `${taskStats.done} / ${taskStats.total}`;
    document.getElementById("metric-streak").textContent = `${calculateStreak()} 天`;
    document.getElementById("metric-week").textContent = `${Math.min(100, Math.round((weekMinutes / weeklyTarget) * 100))}%`;
    document.getElementById("metric-week-note").textContent = `${weekMinutes} / ${weeklyTarget} 分钟`;

    renderCurrentCourse();
    renderTimer();
    renderTasks(todayKey);
    renderTodayTimeline(todayKey);
    renderTrend();
    renderTopCheckIn(todayKey);
  }

  function renderTopCheckIn(todayKey) {
    const day = getDayState(todayKey);
    const button = document.getElementById("top-checkin");
    const label = button.querySelector("span");
    const checked = Boolean(day.checkedInAt);
    label.textContent = checked ? "已打卡" : "今日打卡";
    button.disabled = checked;
    button.style.opacity = checked ? "0.72" : "";
  }

  function renderCurrentCourse() {
    const info = currentSessionInfo();
    const title = document.getElementById("current-course-title");
    const meta = document.getElementById("current-course-meta");
    const time = document.getElementById("current-course-time");
    const status = document.getElementById("class-status");

    if (!info.session) {
      title.textContent = "今天没有课程";
      meta.textContent = "从最重要的核心课开始";
      time.textContent = "--:--";
      status.textContent = "无课";
      status.className = "status-pill";
      return;
    }

    const sessionDate = parseDateKey(info.session.date);
    const isToday = sameDate(sessionDate, new Date());
    title.textContent = info.session.title;
    meta.textContent = `${isToday ? "今天" : formatShortDate(sessionDate)} · ${info.session.location || "地点待确认"} · ${info.session.teacher || "教师待确认"}`;
    time.textContent = `${info.session.start}-${info.session.end}`;

    if (info.state === "active") {
      status.textContent = "进行中";
      status.className = "status-pill";
    } else if (info.state === "upcoming") {
      status.textContent = "下一节";
      status.className = "status-pill is-warning";
    } else {
      status.textContent = "下一课";
      status.className = "status-pill";
    }
  }

  function renderTimer() {
    const display = document.getElementById("timer-display");
    const caption = document.getElementById("timer-caption");
    const ring = document.getElementById("timer-ring");
    const button = document.getElementById("timer-toggle");
    const total = timerDuration * 60;
    const elapsed = total - timerRemaining;
    const percent = total ? Math.max(0, Math.min(1, elapsed / total)) : 0;
    const minutes = Math.floor(timerRemaining / 60);
    const seconds = timerRemaining % 60;

    display.textContent = `${pad(minutes)}:${pad(seconds)}`;
    caption.textContent = timerRunning ? "专注进行中" : "准备专注";
    ring.style.setProperty("--progress", `${Math.round(percent * 360)}deg`);
    button.innerHTML = `${icon(timerRunning ? "pause" : "play")}<span>${timerRunning ? "暂停" : "开始"}</span>`;
    document.querySelectorAll("#duration-options button").forEach((option) => {
      option.classList.toggle("is-selected", Number(option.dataset.duration) === timerDuration);
    });
  }

  function renderTasks(dateKey) {
    const container = document.getElementById("today-task-list");
    const day = getDayState(dateKey);
    const tasks = getAllTasks(dateKey);
    if (!tasks.length) {
      container.innerHTML = '<div class="empty-state">今天暂无任务</div>';
      return;
    }

    container.innerHTML = tasks
      .map((task, index) => {
        const done = Boolean(day.tasks[task.id]);
        const priority = index < 3 ? '<span class="priority-tag">关键</span>' : "";
        return `
          <div class="task-row${done ? " is-done" : ""}" data-task-row="${escapeAttribute(task.id)}">
            <button class="task-check" type="button" data-task-toggle="${escapeAttribute(task.id)}" aria-label="${done ? "取消完成" : "标记完成"}">
              ${icon("check")}
            </button>
            <div class="task-copy">
              <strong>${priority}${escapeHtml(task.title)}</strong>
              <span>${escapeHtml(task.course ? `${task.course} · ${task.detail}` : task.detail)}</span>
            </div>
            ${
              task.automatic
                ? "<span></span>"
                : `<button class="task-remove" type="button" data-task-remove="${escapeAttribute(task.id)}" aria-label="删除任务" title="删除任务">${icon("trash")}</button>`
            }
          </div>
        `;
      })
      .join("");
  }

  function renderTodayTimeline(dateKey) {
    const container = document.getElementById("today-timeline");
    const sessions = sessionsForDate(dateKey);
    if (!sessions.length) {
      container.innerHTML = '<div class="empty-state">今天没有课程，安排一段深度学习</div>';
      return;
    }

    const now = new Date();
    const currentMinute = nowMinutes();
    container.innerHTML = sessions
      .map((session) => {
        const active = sameDate(now, parseDateKey(dateKey)) &&
          currentMinute >= minutesFromTime(session.start) &&
          currentMinute <= minutesFromTime(session.end);
        return `
          <div class="timeline-row${active ? " is-now" : ""}">
            <div class="timeline-time">${session.start}<br>${session.end}</div>
            <div class="timeline-line"></div>
            <div class="timeline-copy">
              <strong>${escapeHtml(session.title)}</strong>
              <span>${escapeHtml(session.location || "地点待确认")} · ${escapeHtml(session.teacher || "教师待确认")}</span>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function renderTrend() {
    const chart = document.getElementById("trend-chart");
    const target = Number(state.settings.dailyTarget) || 240;
    const days = Array.from({ length: 14 }, (_, index) => addDays(new Date(), index - 13));
    const values = days.map((date) => state.days[formatDateKey(date)]?.minutes || 0);
    const max = Math.max(target, ...values, 60);
    const average = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);

    document.getElementById("trend-summary").textContent = `近 14 天日均 ${average} 分钟`;
    chart.innerHTML = days
      .map((date, index) => {
        const value = values[index];
        const height = Math.max(3, Math.round((value / max) * 100));
        const today = sameDate(date, new Date());
        return `
          <div class="bar-column" title="${formatDateKey(date)} ${value} 分钟">
            <div class="bar-track"><span class="bar-fill${today ? " is-today" : ""}" style="height:${height}%"></span></div>
            <span class="bar-label">${formatShortDate(date)}</span>
          </div>
        `;
      })
      .join("");
  }

  function renderSchedule() {
    const grid = document.getElementById("schedule-grid");
    const weekEnd = addDays(currentWeekStart, 6);
    const weekEvents = courseEvents.filter((event) => {
      const date = parseDateKey(event.date);
      return date >= currentWeekStart && date <= weekEnd;
    });
    const termWeek = Math.max(1, Math.floor((currentWeekStart - parseDateKey(calendarData?.term?.startDate || "2026-09-21")) / 604800000) + 1);

    document.getElementById("week-label").textContent = `${formatDateLong(currentWeekStart)} - ${formatDateLong(weekEnd)}`;
    document.getElementById("week-count").textContent = `第 ${termWeek} 教学周 · ${weekEvents.length} 节课`;

    grid.innerHTML = Array.from({ length: 7 }, (_, index) => {
      const date = addDays(currentWeekStart, index);
      const key = formatDateKey(date);
      const sessions = sessionsForDate(key);
      const isToday = sameDate(date, new Date());
      return `
        <section class="schedule-day${isToday ? " is-today" : ""}">
          <div class="schedule-day-head">
            <span>${weekdayName(date.getDay())}</span>
            <strong>${date.getMonth() + 1}月${date.getDate()}日</strong>
          </div>
          ${
            sessions.length
              ? sessions
                  .map(
                    (session) => `
                      <button class="schedule-session" type="button" data-course="${escapeAttribute(session.title)}" style="--course-color:${escapeAttribute(session.color || "#1d8a80")}">
                        <strong>${escapeHtml(session.title)}</strong>
                        <span>${session.start}-${session.end}</span>
                        <small>${escapeHtml(session.location || "地点待确认")}</small>
                      </button>
                    `
                  )
                  .join("")
              : '<div class="schedule-empty">无课</div>'
          }
        </section>
      `;
    }).join("");
  }

  function renderCourses() {
    const grid = document.getElementById("course-grid");
    const titles = allCourseTitles;
    const weeklyHours = titles.reduce((sum, title) => sum + courseProfile(title).weeklyHours, 0);
    const coreCount = titles.filter((title) => ["S", "A"].includes(courseProfile(title).tier)).length;
    const scoredCourses = titles
      .map((title) => getCourseProgress(title))
      .filter((progress) => progress.hasScore && progress.credits > 0);
    const weightedScore = scoredCourses.length
      ? Math.round(
          (scoredCourses.reduce((sum, progress) => sum + progress.score * progress.credits, 0) /
            scoredCourses.reduce((sum, progress) => sum + progress.credits, 0)) *
            10
        ) / 10
      : null;

    document.getElementById("course-count").textContent = titles.length;
    document.getElementById("course-weekly-target").textContent = `${weeklyHours}h`;
    document.getElementById("course-core-count").textContent = coreCount;
    document.getElementById("course-weighted-score").textContent =
      weightedScore === null ? "--" : weightedScore;

    grid.innerHTML = titles
      .map((title) => {
        const profile = courseProfile(title);
        const progress = getCourseProgress(title);
        const next = nextCourseSession(formatDateKey(new Date()), title);
        return `
          <button class="course-card" type="button" data-course="${escapeAttribute(title)}">
            <div class="course-card-head">
              <h3>${escapeHtml(title)}</h3>
              <span class="tier-badge tier-${profile.tier.toLowerCase()}">${profile.tier}</span>
            </div>
            <div class="course-card-meta">
              <span>计划周投入 ${profile.weeklyHours}h</span>
              <span>目标 ${progress.target}${progress.hasScore ? ` · 当前 ${progress.score}` : ""}</span>
              <span>${next ? `下次 ${next.date.slice(5)} ${next.start}` : "本学期无后续课次"}</span>
            </div>
            <p>${escapeHtml(profile.focus)}</p>
            <div class="course-progress">
              <div class="course-progress-bar"><span style="width:${progress.overall}%"></span></div>
              <strong>${progress.overall}%</strong>
            </div>
          </button>
        `;
      })
      .join("");
  }

  function getCourseProgress(title) {
    const stored = state.courseProgress[title] || {};
    const profile = courseProfile(title);
    const defaultTarget = { S: 90, A: 85, B: 85, C: 80 }[profile.tier] || 80;
    const progress = {
      review: Number(stored.review ?? 0),
      homework: Number(stored.homework ?? 0),
      mistakes: Number(stored.mistakes ?? 0),
      credits: Number(stored.credits ?? 0),
      target: Number(stored.target ?? defaultTarget),
      score: Number(stored.score ?? 0),
      hasScore: stored.score !== undefined && stored.score !== "" && Number(stored.score) > 0
    };
    progress.overall = Math.round((progress.review + progress.homework + progress.mistakes) / 3);
    return progress;
  }

  function renderPlan() {
    const tabs = document.getElementById("plan-day-tabs");
    const order = [1, 2, 3, 4, 5, 6, 0];
    tabs.innerHTML = order
      .map(
        (day) =>
          `<button type="button" data-plan-day="${day}" class="${planDay === day ? "is-selected" : ""}">${weekdayName(day).replace("星期", "周")}</button>`
      )
      .join("");

    const blocks = WEEKLY_PLAN[planDay] || [];
    document.getElementById("plan-blocks").innerHTML = blocks
      .map(
        (block) => `
          <div class="plan-block">
            <time>${block.start}-${block.end}</time>
            <div>
              <strong>${escapeHtml(block.title)}</strong>
              <span>${escapeHtml(block.note)}</span>
            </div>
            <em>${escapeHtml(block.course || "自主安排")}</em>
          </div>
        `
      )
      .join("");

    const today = new Date();
    document.getElementById("milestone-list").innerHTML = MILESTONES.map(
      (item) => `
        <li class="milestone-item${parseDateKey(item.date) <= today ? " is-done" : ""}">
          <time>${item.date.slice(5).replace("-", ".")}</time>
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.detail)}</p>
        </li>
      `
    ).join("");
  }

  function renderReview() {
    const start = startOfWeek(new Date());
    const end = addDays(start, 6);
    const reviewKey = formatDateKey(start);
    const review = state.reviews[reviewKey] || {};
    let minutes = 0;
    let done = 0;
    let total = 0;

    const rows = Array.from({ length: 7 }, (_, index) => {
      const date = addDays(start, index);
      const key = formatDateKey(date);
      const dayMinutes = state.days[key]?.minutes || 0;
      const taskStats = taskCompletion(key);
      minutes += dayMinutes;
      done += taskStats.done;
      total += taskStats.total;
      return { date, dayMinutes, taskStats };
    });

    const taskRate = total ? Math.round((done / total) * 100) : 0;
    document.getElementById("review-week-label").textContent = `${formatShortDate(start)} - ${formatShortDate(end)}`;
    document.getElementById("review-minutes").value = minutes;
    document.getElementById("review-task-rate").value = taskRate;
    document.getElementById("review-sleep").value = review.sleep || "";
    document.getElementById("review-mastery").value = review.mastery || "";
    document.getElementById("review-win").value = review.win || "";
    document.getElementById("review-fix").value = review.fix || "";

    const max = Math.max(Number(state.settings.dailyTarget) || 240, ...rows.map((row) => row.dayMinutes), 60);
    document.getElementById("week-bars").innerHTML = rows
      .map(
        (row) => `
          <div class="week-bar-row${sameDate(row.date, new Date()) ? " is-today" : ""}">
            <span>${weekdayName(row.date.getDay()).replace("星期", "周")}</span>
            <div class="week-bar-track"><span style="width:${Math.round((row.dayMinutes / max) * 100)}%"></span></div>
            <strong>${row.dayMinutes}m</strong>
          </div>
        `
      )
      .join("");

    const dailyTarget = Number(state.settings.dailyTarget) || 240;
    const hitDays = rows.filter((row) => row.dayMinutes >= dailyTarget).length;
    document.getElementById("review-insight").textContent =
      minutes >= (Number(state.settings.weeklyTarget) || 1500)
        ? `本周已达到目标，其中 ${hitDays} 天完成日目标。下周重点是保持节奏，不额外堆时间。`
        : `本周还差 ${(Number(state.settings.weeklyTarget) || 1500) - minutes} 分钟达到目标。优先补数学、线代、英语和 C++，不用平均加到每门课。`;
  }

  function renderSettings() {
    document.getElementById("setting-daily-target").value = state.settings.dailyTarget;
    document.getElementById("setting-weekly-target").value = state.settings.weeklyTarget;
    document.getElementById("setting-display-name").value = state.settings.displayName || "";
    document.getElementById("setting-major").value = state.settings.major || "能源动力类";
  }

  function renderFocusSubjects() {
    const select = document.getElementById("focus-subject");
    const previous = select.value;
    select.innerHTML = allCourseTitles
      .map((title) => `<option value="${escapeAttribute(title)}">${escapeHtml(title)}</option>`)
      .join("");
    if (previous && allCourseTitles.includes(previous)) select.value = previous;
  }

  function renderTaskCourseOptions() {
    const select = document.getElementById("task-course");
    select.innerHTML =
      '<option value="">不关联课程</option>' +
      allCourseTitles
        .map((title) => `<option value="${escapeAttribute(title)}">${escapeHtml(title)}</option>`)
        .join("");
  }

  function renderAll() {
    renderGlobal();
    renderDashboard();
    renderSchedule();
    renderCourses();
    renderPlan();
    renderReview();
    renderSettings();
  }

  function toggleTask(taskId) {
    const dateKey = formatDateKey(new Date());
    const day = getDayState(dateKey);
    day.tasks[taskId] = !day.tasks[taskId];
    saveState();
    renderDashboard();
    renderGlobal();
  }

  function removeTask(taskId) {
    const dateKey = formatDateKey(new Date());
    const day = getDayState(dateKey);
    day.customTasks = day.customTasks.filter((task) => task.id !== taskId);
    delete day.tasks[taskId];
    saveState();
    renderDashboard();
    showToast("任务已删除");
  }

  function markCheckIn() {
    const dateKey = formatDateKey(new Date());
    const day = getDayState(dateKey);
    day.checkedInAt = day.checkedInAt || new Date().toISOString();
    saveState();
    renderDashboard();
    renderGlobal();
    showToast(day.minutes > 0 ? "今日打卡完成" : "已记录打卡，继续完成学习任务");
  }

  function saveSettings(event) {
    if (event) event.preventDefault();
    state.settings.dailyTarget = Math.max(60, Number(document.getElementById("setting-daily-target").value) || 240);
    state.settings.weeklyTarget = Math.max(300, Number(document.getElementById("setting-weekly-target").value) || 1500);
    state.settings.displayName = document.getElementById("setting-display-name").value.trim();
    state.settings.major = document.getElementById("setting-major").value.trim() || "能源动力类";
    saveState();
    renderAll();
    showToast("设置已保存");
  }

  function startTimer() {
    if (timerRunning) return;
    timerRunning = true;
    const subject = document.getElementById("focus-subject").value;
    renderTimer();
    timerInterval = window.setInterval(() => {
      timerRemaining -= 1;
      if (timerRemaining <= 0) {
        timerRemaining = 0;
        finishTimerSession(subject);
      } else if (timerRemaining % 60 === 0) {
        addFocusMinute(subject, 1);
      }
      renderTimer();
    }, 1000);
  }

  function pauseTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
    renderTimer();
  }

  function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerRunning = false;
    timerRemaining = timerDuration * 60;
    renderTimer();
  }

  function finishTimerSession(subject) {
    clearInterval(timerInterval);
    timerInterval = null;
    timerRunning = false;
    addFocusMinute(subject, 1);
    timerRemaining = timerDuration * 60;
    renderTimer();
    renderDashboard();
    renderGlobal();
    showToast("专注完成，已计入今日打卡");
  }

  function addFocusMinute(subject, amount) {
    const dateKey = formatDateKey(new Date());
    const day = getDayState(dateKey);
    day.minutes += amount;
    if (subject) day.subjectMinutes[subject] = (day.subjectMinutes[subject] || 0) + amount;
    saveState();
  }

  function openCourseDialog(title) {
    const profile = courseProfile(title);
    const progress = getCourseProgress(title);
    const dialog = document.getElementById("course-dialog");
    document.getElementById("course-dialog-tier").textContent = `${profile.tier} 级优先 · 计划周投入 ${profile.weeklyHours} 小时`;
    document.getElementById("course-dialog-title").textContent = title;
    document.getElementById("course-dialog-body").innerHTML = `
      <section class="course-detail-section">
        <h3>本学期重点</h3>
        <p>${escapeHtml(profile.focus)}</p>
      </section>
      <section class="course-detail-section">
        <h3>执行方法</h3>
        <p>${escapeHtml(profile.strategy)}</p>
      </section>
      <section class="course-detail-section">
        <h3>成绩反推</h3>
        <div class="score-grid">
          <label class="field">
            <span>课程学分</span>
            <input type="number" min="0" max="20" step="0.5" value="${progress.credits || ""}" placeholder="待教务确认" data-course-field="credits">
          </label>
          <label class="field">
            <span>目标分</span>
            <input type="number" min="60" max="100" step="1" value="${progress.target}" data-course-field="target">
          </label>
          <label class="field">
            <span>当前或预计分</span>
            <input type="number" min="0" max="100" step="1" value="${progress.score || ""}" placeholder="尚未得到" data-course-field="score">
          </label>
        </div>
      </section>
      <section class="course-detail-section">
        <h3>进度记录</h3>
        <div class="progress-editor">
          ${["review", "homework", "mistakes"].map((key) => {
            const labels = { review: "课堂复习", homework: "作业完成", mistakes: "错题回炉" };
            return `
              <div class="progress-item">
                <label for="progress-${key}">${labels[key]}</label>
                <input id="progress-${key}" type="range" min="0" max="100" step="5" value="${progress[key]}" data-course-progress="${key}">
                <output>${progress[key]}%</output>
              </div>
            `;
          }).join("")}
        </div>
      </section>
    `;
    dialog.dataset.courseTitle = title;
    dialog.showModal();
  }

  function saveCourseProgress(key, value) {
    const dialog = document.getElementById("course-dialog");
    const title = dialog.dataset.courseTitle;
    if (!title) return;
    if (!state.courseProgress[title]) state.courseProgress[title] = {};
    state.courseProgress[title][key] = Number(value);
    saveState();
  }

  function saveCourseField(key, value) {
    const dialog = document.getElementById("course-dialog");
    const title = dialog.dataset.courseTitle;
    if (!title) return;
    if (!state.courseProgress[title]) state.courseProgress[title] = {};
    state.courseProgress[title][key] = value === "" ? "" : Number(value);
    saveState();
    renderCourses();
  }

  function escapeIcs(value) {
    return String(value ?? "")
      .replaceAll("\\", "\\\\")
      .replaceAll(";", "\\;")
      .replaceAll(",", "\\,")
      .replaceAll("\n", "\\n");
  }

  function icsDateTime(dateKey, time) {
    return `${dateKey.replaceAll("-", "")}T${time.replace(":", "")}00`;
  }

  function exportScheduleICS() {
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//HL Study Workbench//Course Schedule//CN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      `X-WR-CALNAME:${escapeIcs(calendarData?.term?.name || "华理学习台课表")}`
    ];
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

    for (const event of courseEvents) {
      lines.push(
        "BEGIN:VEVENT",
        `UID:${escapeIcs(event.id)}@ncst-study-workbench`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${icsDateTime(event.date, event.start)}`,
        `DTEND:${icsDateTime(event.date, event.end)}`,
        `SUMMARY:${escapeIcs(event.title)}`,
        `LOCATION:${escapeIcs(event.location || "")}`,
        `DESCRIPTION:${escapeIcs(`${event.teacher || ""} ${courseProfile(event.title).focus}`.trim())}`,
        "END:VEVENT"
      );
    }

    lines.push("END:VCALENDAR");
    downloadBlob("华理学习台-2026-2027-第一学期.ics", lines.join("\r\n"), "text/calendar;charset=utf-8");
    showToast("课表已导出，可用 iPhone 日历打开");
  }

  function exportReview() {
    const start = startOfWeek(new Date());
    const end = addDays(start, 6);
    const review = state.reviews[formatDateKey(start)] || {};
    const minutes = weeklyMinutes(start);
    const taskRate = getWeekTaskRate(start);
    const lines = [
      `华理学习台周报`,
      `周期：${formatDateKey(start)} 至 ${formatDateKey(end)}`,
      `有效专注：${minutes} 分钟`,
      `任务完成率：${taskRate}%`,
      `平均睡眠：${review.sleep || "未填写"} 小时`,
      `自评掌握度：${review.mastery || "未填写"} / 5`,
      "",
      `最大的收获：`,
      review.win || "未填写",
      "",
      `下周必须修正：`,
      review.fix || "未填写"
    ];
    downloadBlob(`${formatDateKey(start)}-学习周报.txt`, lines.join("\n"), "text/plain;charset=utf-8");
    showToast("周报已导出");
  }

  function getWeekTaskRate(start) {
    let done = 0;
    let total = 0;
    for (let index = 0; index < 7; index += 1) {
      const stats = taskCompletion(formatDateKey(addDays(start, index)));
      done += stats.done;
      total += stats.total;
    }
    return total ? Math.round((done / total) * 100) : 0;
  }

  function exportAllData() {
    downloadBlob("华理学习台-备份.json", JSON.stringify(state, null, 2), "application/json;charset=utf-8");
    showToast("备份已导出");
  }

  function downloadBlob(filename, content, type) {
    const blob = new Blob([content], { type });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value);
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const nav = event.target.closest("[data-view]");
      if (nav && nav.closest("nav")) {
        setView(nav.dataset.view);
        return;
      }

      const goView = event.target.closest("[data-go-view]");
      if (goView) {
        setView(goView.dataset.goView);
        return;
      }

      const taskToggle = event.target.closest("[data-task-toggle]");
      if (taskToggle) {
        toggleTask(taskToggle.dataset.taskToggle);
        return;
      }

      const taskRemove = event.target.closest("[data-task-remove]");
      if (taskRemove) {
        removeTask(taskRemove.dataset.taskRemove);
        return;
      }

      const courseButton = event.target.closest("[data-course]");
      if (courseButton) {
        openCourseDialog(courseButton.dataset.course);
        return;
      }

      const planDayButton = event.target.closest("[data-plan-day]");
      if (planDayButton) {
        planDay = Number(planDayButton.dataset.planDay);
        renderPlan();
      }
    });

    document.getElementById("top-checkin").addEventListener("click", markCheckIn);
    document.getElementById("add-task").addEventListener("click", () => {
      document.getElementById("task-form").reset();
      document.getElementById("task-dialog").showModal();
      setTimeout(() => document.getElementById("task-title").focus(), 0);
    });

    document.getElementById("timer-toggle").addEventListener("click", () => {
      if (timerRunning) pauseTimer();
      else startTimer();
    });

    document.getElementById("timer-reset").addEventListener("click", resetTimer);

    document.getElementById("duration-options").addEventListener("click", (event) => {
      const button = event.target.closest("[data-duration]");
      if (!button || timerRunning) return;
      timerDuration = Number(button.dataset.duration);
      timerRemaining = timerDuration * 60;
      renderTimer();
    });

    document.getElementById("focus-subject").addEventListener("change", (event) => {
      if (timerRunning) showToast(`正在专注：${event.target.value}`);
    });

    document.getElementById("prev-week").addEventListener("click", () => {
      currentWeekStart = addWeeks(currentWeekStart, -1);
      renderSchedule();
    });
    document.getElementById("next-week").addEventListener("click", () => {
      currentWeekStart = addWeeks(currentWeekStart, 1);
      renderSchedule();
    });
    document.getElementById("current-week").addEventListener("click", () => {
      currentWeekStart = startOfWeek(new Date());
      renderSchedule();
    });

    document.getElementById("task-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const title = document.getElementById("task-title").value.trim();
      if (!title) return;
      const dateKey = formatDateKey(new Date());
      const day = getDayState(dateKey);
      const id = `custom-${Date.now()}`;
      day.customTasks.push({
        id,
        title,
        detail: "手动添加",
        course: document.getElementById("task-course").value
      });
      saveState();
      document.getElementById("task-dialog").close();
      renderDashboard();
      renderGlobal();
      showToast("任务已添加");
    });

    document.getElementById("course-dialog-close").addEventListener("click", () => {
      document.getElementById("course-dialog").close();
    });

    document.getElementById("course-dialog-body").addEventListener("input", (event) => {
      const slider = event.target.closest("[data-course-progress]");
      if (slider) {
        slider.nextElementSibling.value = `${slider.value}%`;
        saveCourseProgress(slider.dataset.courseProgress, slider.value);
        renderCourses();
        return;
      }

      const field = event.target.closest("[data-course-field]");
      if (field) saveCourseField(field.dataset.courseField, field.value);
    });

    document.getElementById("review-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const key = formatDateKey(startOfWeek(new Date()));
      state.reviews[key] = {
        sleep: document.getElementById("review-sleep").value,
        mastery: document.getElementById("review-mastery").value,
        win: document.getElementById("review-win").value.trim(),
        fix: document.getElementById("review-fix").value.trim(),
        updatedAt: new Date().toISOString()
      };
      saveState();
      showToast("周复盘已保存");
    });

    document.getElementById("export-review").addEventListener("click", exportReview);
    document.getElementById("export-ics").addEventListener("click", exportScheduleICS);

    document.getElementById("settings-form").addEventListener("submit", saveSettings);
    document.querySelector("#settings-form button[type='submit']").addEventListener("click", saveSettings);

    document.getElementById("export-data").addEventListener("click", exportAllData);
    document.getElementById("import-data").addEventListener("click", () => {
      document.getElementById("import-file").click();
    });
    document.getElementById("import-file").addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          state = normalizeState(JSON.parse(String(reader.result)));
          saveState();
          renderAll();
          showToast("备份已导入");
        } catch {
          showToast("备份格式无法识别");
        }
      };
      reader.readAsText(file);
      event.target.value = "";
    });
    document.getElementById("reset-data").addEventListener("click", () => {
      if (!window.confirm("确定清空当前浏览器中的全部打卡、计时和复盘数据吗？")) return;
      state = clone(defaultState);
      saveState();
      renderAll();
      showToast("本机数据已清空");
    });

    window.addEventListener("hashchange", () => {
      const hash = location.hash.replace("#", "");
      if (hash && hash !== activeView) setView(hash);
    });
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Offline capability is optional; the app still works without it.
    });
  }

  function init() {
    renderNavigation();
    renderFocusSubjects();
    renderTaskCourseOptions();
    bindEvents();
    const initialView = location.hash.replace("#", "");
    setView(NAV_ITEMS.some((item) => item.id === initialView) ? initialView : "dashboard");
    registerServiceWorker();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
