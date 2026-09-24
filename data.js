(function () {
  "use strict";

  const courseLibrary = {
    sports: {
      title: "体育-1",
      teacher: "王金福",
      location: "曹妃甸校区实践教室东一体育场",
      color: "#d95d46"
    },
    english: {
      title: "大学英语-1",
      teacher: "褚杨杨",
      color: "#173b57"
    },
    history: {
      title: "中国近现代史纲要",
      teacher: "严颖颖",
      location: "曹妃甸校区HE座HE-301",
      color: "#7b4e2b"
    },
    mathematics: {
      title: "高等数学A-1",
      teacher: "刘琳琳",
      color: "#147d73"
    },
    cpp: {
      title: "C/C++语言程序设计A",
      teacher: "闫海波",
      color: "#65558f"
    },
    engineeringDrawing: {
      title: "工程图学",
      teacher: "张海峰",
      color: "#426a8c"
    },
    linearAlgebra: {
      title: "线性代数A",
      teacher: "姜娟娟",
      color: "#b05730"
    },
    campusIntroduction: {
      title: "校园导论",
      teacher: "李海英",
      location: "曹妃甸校区HB座HB-107",
      color: "#8a3f6e"
    },
    healthLecture: {
      title: "大学生健康素养大讲堂",
      teacher: "蒋守芳",
      location: "曹妃甸校区线上教室16",
      color: "#3f7a47"
    },
    mindNavigation: {
      title: "心灵导航",
      teacher: "刘威",
      location: "曹妃甸校区C区1号教学楼冀101",
      color: "#b1822d"
    },
    disciplineIntroduction: {
      title: "学科导论",
      teacher: "王洪利、刘良旭",
      color: "#3d6f74"
    },
    militaryTheory: {
      title: "军事理论",
      teacher: "杨占岭",
      location: "曹妃甸校区HC座HC-阶2",
      color: "#6b6044"
    },
    policy: {
      title: "形势与政策1",
      teacher: "郑海英",
      location: "曹妃甸校区HE座HE-阶3",
      color: "#a33e4f"
    }
  };

  const courseSeries = [
    {
      id: "sports-monday",
      course: "sports",
      start: "14:00",
      end: "15:35",
      dates: [
        "2026-09-21",
        "2026-10-12",
        "2026-10-19",
        "2026-10-26",
        "2026-11-02",
        "2026-11-09",
        "2026-11-16",
        "2026-11-23",
        "2026-11-30",
        "2026-12-07",
        "2026-12-14",
        "2026-12-21",
        "2026-12-28"
      ]
    },
    {
      id: "english-tuesday",
      course: "english",
      start: "08:30",
      end: "10:05",
      location: "曹妃甸校区HC座HC-302",
      dates: [
        "2026-09-22",
        "2026-10-06",
        "2026-10-13",
        "2026-10-20",
        "2026-10-27",
        "2026-11-03",
        "2026-11-10",
        "2026-11-17",
        "2026-11-24",
        "2026-12-01",
        "2026-12-08",
        "2026-12-15",
        "2026-12-22",
        "2026-12-29"
      ]
    },
    {
      id: "history-tuesday",
      course: "history",
      start: "10:25",
      end: "12:00",
      dates: [
        "2026-09-22",
        "2026-10-06",
        "2026-10-13",
        "2026-10-20",
        "2026-10-27",
        "2026-11-03",
        "2026-11-10",
        "2026-11-17",
        "2026-11-24",
        "2026-12-01",
        "2026-12-08",
        "2026-12-15",
        "2026-12-22",
        "2026-12-29"
      ]
    },
    {
      id: "engineering-drawing-tuesday",
      course: "engineeringDrawing",
      start: "15:55",
      end: "17:30",
      location: "曹妃甸校区HA座HA-203",
      dates: [
        "2026-10-06",
        "2026-10-13",
        "2026-10-20",
        "2026-10-27",
        "2026-11-03",
        "2026-11-10",
        "2026-11-17",
        "2026-11-24",
        "2026-12-01",
        "2026-12-08"
      ]
    },
    {
      id: "campus-introduction-tuesday",
      course: "campusIntroduction",
      start: "19:00",
      end: "20:35",
      dates: ["2026-10-06", "2026-10-13", "2026-10-20", "2026-10-27"]
    },
    {
      id: "mathematics-wednesday",
      course: "mathematics",
      start: "14:00",
      end: "15:35",
      location: "曹妃甸校区HB座HB-204",
      dates: [
        "2026-09-23",
        "2026-10-07",
        "2026-10-14",
        "2026-10-21",
        "2026-10-28",
        "2026-11-04",
        "2026-11-11",
        "2026-11-18",
        "2026-11-25",
        "2026-12-02",
        "2026-12-09",
        "2026-12-16",
        "2026-12-23",
        "2026-12-30"
      ]
    },
    {
      id: "cpp-wednesday",
      course: "cpp",
      start: "15:55",
      end: "17:30",
      location: "曹妃甸校区计算机中心HF-机房18",
      dates: [
        "2026-09-23",
        "2026-10-07",
        "2026-10-14",
        "2026-10-21",
        "2026-10-28",
        "2026-11-04",
        "2026-11-11",
        "2026-11-18",
        "2026-11-25",
        "2026-12-02",
        "2026-12-09",
        "2026-12-16"
      ]
    },
    {
      id: "mind-navigation-wednesday",
      course: "mindNavigation",
      start: "19:00",
      end: "20:35",
      dates: [
        "2026-10-14",
        "2026-10-21",
        "2026-10-28",
        "2026-11-04",
        "2026-11-11",
        "2026-11-18",
        "2026-11-25",
        "2026-12-02"
      ]
    },
    {
      id: "english-thursday",
      course: "english",
      start: "08:30",
      end: "10:05",
      location: "曹妃甸校区HC座HC-202",
      dates: ["2026-09-24", "2026-10-08", "2026-10-15", "2026-10-22"]
    },
    {
      id: "engineering-drawing-thursday",
      course: "engineeringDrawing",
      start: "10:25",
      end: "12:00",
      location: "曹妃甸校区HB座HB-301",
      dates: [
        "2026-10-08",
        "2026-10-15",
        "2026-10-22",
        "2026-10-29",
        "2026-11-05",
        "2026-11-12",
        "2026-11-19",
        "2026-11-26",
        "2026-12-03",
        "2026-12-10"
      ]
    },
    {
      id: "linear-algebra-thursday",
      course: "linearAlgebra",
      start: "15:55",
      end: "17:30",
      location: "曹妃甸校区HA座HA-301",
      dates: [
        "2026-09-24",
        "2026-10-08",
        "2026-10-15",
        "2026-10-22",
        "2026-10-29",
        "2026-11-05",
        "2026-11-12",
        "2026-11-19"
      ]
    },
    {
      id: "discipline-introduction-thursday",
      course: "disciplineIntroduction",
      start: "19:00",
      end: "20:35",
      location: "曹妃甸校区HA座HA-303",
      dates: ["2026-10-15", "2026-10-22", "2026-10-29", "2026-11-05"]
    },
    {
      id: "policy-thursday",
      course: "policy",
      start: "19:00",
      end: "20:35",
      dates: ["2026-11-19"]
    },
    {
      id: "cpp-friday",
      course: "cpp",
      start: "08:30",
      end: "10:05",
      location: "曹妃甸校区计算机中心HF-机房11",
      dates: [
        "2026-09-25",
        "2026-10-09",
        "2026-10-16",
        "2026-10-23",
        "2026-10-30",
        "2026-11-06",
        "2026-11-13",
        "2026-11-20",
        "2026-11-27",
        "2026-12-04",
        "2026-12-11",
        "2026-12-18"
      ]
    },
    {
      id: "history-friday",
      course: "history",
      start: "10:25",
      end: "12:00",
      dates: [
        "2026-09-25",
        "2026-10-09",
        "2026-10-16",
        "2026-10-23",
        "2026-10-30",
        "2026-11-06",
        "2026-11-13",
        "2026-11-20"
      ]
    },
    {
      id: "mathematics-friday",
      course: "mathematics",
      start: "15:55",
      end: "17:30",
      location: "曹妃甸校区HB座HB-206",
      dates: [
        "2026-09-25",
        "2026-10-09",
        "2026-10-16",
        "2026-10-23",
        "2026-10-30",
        "2026-11-06",
        "2026-11-13",
        "2026-11-20",
        "2026-11-27",
        "2026-12-04",
        "2026-12-11",
        "2026-12-18",
        "2026-12-25",
        "2027-01-01"
      ]
    },
    {
      id: "mathematics-saturday",
      course: "mathematics",
      start: "08:30",
      end: "10:05",
      location: "曹妃甸校区HB座HB-105",
      dates: [
        "2026-09-26",
        "2026-10-10",
        "2026-10-17",
        "2026-10-24",
        "2026-10-31",
        "2026-11-07",
        "2026-11-14",
        "2026-11-21",
        "2026-11-28",
        "2026-12-05",
        "2026-12-12",
        "2026-12-19"
      ]
    },
    {
      id: "linear-algebra-saturday",
      course: "linearAlgebra",
      start: "10:25",
      end: "12:00",
      location: "曹妃甸校区HA座HA-101",
      dates: [
        "2026-09-26",
        "2026-10-10",
        "2026-10-17",
        "2026-10-24",
        "2026-10-31",
        "2026-11-07",
        "2026-11-14",
        "2026-11-21"
      ]
    },
    {
      id: "health-lecture-saturday",
      course: "healthLecture",
      start: "14:00",
      end: "15:35",
      dates: [
        "2026-10-10",
        "2026-10-17",
        "2026-10-24",
        "2026-10-31",
        "2026-11-07",
        "2026-11-14",
        "2026-11-21"
      ]
    },
    {
      id: "military-monday",
      course: "militaryTheory",
      start: "15:55",
      end: "17:30",
      dates: [
        "2026-11-09",
        "2026-11-16",
        "2026-11-23",
        "2026-11-30",
        "2026-12-07",
        "2026-12-14",
        "2026-12-21",
        "2026-12-28"
      ]
    }
  ];

  const selectionEvents = [
    {
      date: "2026-09-06",
      title: "03-补退选",
      allDay: true
    },
    {
      date: "2026-09-07",
      title: "03-补退选",
      allDay: true
    },
    {
      date: "2026-09-08",
      start: "00:00",
      end: "16:30",
      title: "03-补退选"
    },
    {
      date: "2026-09-09",
      start: "15:00",
      end: "00:00",
      title: "冀唐课程选课"
    },
    {
      date: "2026-09-10",
      allDay: true,
      title: "冀唐课程选课"
    },
    {
      date: "2026-09-11",
      start: "00:00",
      end: "16:00",
      title: "冀唐课程选课"
    },
    {
      date: "2026-09-18",
      start: "09:00",
      end: "00:00",
      title: "冀唐补退选"
    },
    {
      date: "2026-09-19",
      allDay: true,
      title: "冀唐补退选"
    },
    {
      date: "2026-09-20",
      allDay: true,
      title: "冀唐补退选"
    },
    {
      date: "2026-09-21",
      allDay: true,
      title: "冀唐补退选"
    },
    {
      date: "2026-09-22",
      start: "00:00",
      end: "16:00",
      title: "冀唐补退选"
    }
  ];

  function createCourseId(seriesId, date) {
    return `builtin-${seriesId}-${date}`;
  }

  function createCourseEvents() {
    return courseSeries.flatMap((series) => {
      const course = courseLibrary[series.course];
      return series.dates.map((date) => ({
        id: createCourseId(series.id, date),
        source: "builtin",
        type: "course",
        title: course.title,
        date,
        start: series.start,
        end: series.end,
        allDay: false,
        location: series.location || course.location || "",
        teacher: series.teacher || course.teacher || "",
        notes: "",
        color: course.color
      }));
    });
  }

  function createSelectionEvents() {
    return selectionEvents.map((event, index) => ({
      id: `builtin-selection-${index + 1}`,
      source: "builtin",
      type: "task",
      title: event.title,
      date: event.date,
      start: event.start || "",
      end: event.end || "",
      allDay: Boolean(event.allDay),
      location: "",
      teacher: "",
      notes: "教务选课节点",
      color: "#a36d13"
    }));
  }

  window.HL_CALENDAR_DATA = {
    version: 1,
    term: {
      name: "2026-2027 学年第一学期",
      startDate: "2026-09-21"
    },
    eventTypes: {
      course: { label: "课程", color: "#173b57" },
      personal: { label: "个人", color: "#147d73" },
      exam: { label: "考试", color: "#d95d46" },
      task: { label: "任务", color: "#a36d13" }
    },
    courseCatalog: Object.values(courseLibrary).map((course) => ({ ...course })),
    createSeedEvents: function () {
      return [...createSelectionEvents(), ...createCourseEvents()];
    }
  };
})();
