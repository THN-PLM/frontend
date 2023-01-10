import create from "zustand";

const projectStore = create((set, get) => ({
  // ref
  informationRef: "",
  setinformationRef: (val) => {
    set(() => ({ informationRef: val }));
  },
  attachmentRef: "",
  setattachmentRef: (val) => {
    set(() => ({ attachmentRef: val }));
  },
  routeRef: "",
  setrouteRef: (val) => {
    set(() => ({ routeRef: val }));
  },
  // project states
  id: "",
  setid: (val) => {
    set(() => ({ id: val }));
  },
  type: "", //  post시는 projectTypeId : 1,2
  settype: (val) => {
    set(() => ({ type: val }));
  },
  period: "", // all도, 초도, proto, p1 => "",1,2,숫자로
  setperiod: (val) => {
    set(() => ({ period: val }));
  },
  number: "", // 문자열
  setnumber: (val) => {
    set(() => ({ number: val }));
  },
  name: "", // 문자열
  setname: (val) => {
    set(() => ({ name: val }));
  },
  allDoStartPeriod: "", // 날짜
  setallDoStartPeriod: (val) => {
    set(() => ({ allDoStartPeriod: val }));
  },
  allDoOverPeriod: "", //  날짜
  setallDoOverPeriod: (val) => {
    set(() => ({ allDoOverPeriod: val }));
  },
  protoStartPeriod: "", //  날짜
  setprotoStartPeriod: (val) => {
    set(() => ({ protoStartPeriod: val }));
  },
  protoOverPeriod: "", //  날짜
  setprotoOverPeriod: (val) => {
    set(() => ({ protoOverPeriod: val }));
  },
  p1StartPeriod: "", // 날짜
  setp1StartPeriod: (val) => {
    set(() => ({ p1StartPeriod: val }));
  },
  p1OverPeriod: "", // 날짜
  setp1OverPeriod: (val) => {
    set(() => ({ p1OverPeriod: val }));
  },
  p2StartPeriod: "", //  날짜
  setp2StartPeriod: (val) => {
    set(() => ({ p2StartPeriod: val }));
  },
  p2OverPeriod: "", // 날짜
  setp2OverPeriod: (val) => {
    set(() => ({ p2OverPeriod: val }));
  },
  mStartPeriod: "", // 날짜
  setmStartPeriod: (val) => {
    set(() => ({ mStartPeriod: val }));
  },
  mOverPeriod: "", //  날짜
  setmOverPeriod: (val) => {
    set(() => ({ mOverPeriod: val }));
  },
  productId: "5", // 정수
  setproductId: (val) => {
    set(() => ({ productId: val }));
  },
  buyerOrganization: "", // post할때는 buyerOrganizationIOrganizationI
  //   {
  //     "id": 1,
  //     "code1": "12",
  //     "code2": "23",
  //     "history1": "해외",
  //     "history2": "나노 하이텍"
  // },
  setbuyerOrganization: (val) => {
    set(() => ({ buyerOrganization: val }));
  },
  produceOrganization: "", // post할때는producerOrganizationI
  //   {
  //     "id": 1,
  //     "code1": "123",
  //     "code2": "7878",
  //     "history1": "본사",
  //     "history2": "1공장"
  // }
  setproduceOrganization: (val) => {
    set(() => ({ produceOrganization: val }));
  },

  // init
  initProjectModule: () => {
    set(() => ({
      id: "",
      type: "",
      period: "",
      number: "",
      name: "",
      allDoStartPeriod: "",
      allDoOverPeriod: "",
      protoStartPeriod: "",
      protoOverPeriod: "",
      p1StartPeriod: "",
      p1OverPeriod: "",
      p2StartPeriod: "",
      p2OverPeriod: "",
      mStartPeriod: "",
      mOverPeriod: "",
      productId: "",
      buyerOrganization: "",
      produceOrganization: "",
    }));
  },

  getisConditionFullfill: () => {
    let condition = true;
    const { type, productId } = get();
    condition = !!type && !!productId;
    return condition;
  },
  attachmentTagOptionList: [
    { id: 1, name: "ETC" },
    { id: 2, name: "개발사양서" },
    { id: 3, name: "디자인첨부" },
  ],
}));
export default projectStore;
