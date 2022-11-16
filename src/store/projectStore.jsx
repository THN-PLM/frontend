import create from "zustand";

const projectStore = create((set, get) => ({
  // project states
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
  protoStartPeriodd: "", //  날짜
  setprotoStartPeriodd: (val) => {
    set(() => ({ protoStartPeriodd: val }));
  },
  protoOverPeriod: "", //  날짜
  setprotoOverPeriod: (val) => {
    set(() => ({ protoOverPeriod: val }));
  },
  p1StartPeriodd: "", // 날짜
  setp1StartPeriodd: (val) => {
    set(() => ({ p1StartPeriodd: val }));
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
  productId: "", // 정수
  setproductId: (val) => {
    set(() => ({ productId: val }));
  },
  buyerOrganizationId: "", // post할때는 buyerOrganizationIdOrganizationId
  //   {
  //     "id": 1,
  //     "code1": "12",
  //     "code2": "23",
  //     "history1": "해외",
  //     "history2": "나노 하이텍"
  // },
  setbuyerOrganizationId: (val) => {
    set(() => ({ buyerOrganizationId: val }));
  },
  produceOrganizationId: "", // post할때는producerOrganizationId
  //   {
  //     "id": 1,
  //     "code1": "123",
  //     "code2": "7878",
  //     "history1": "본사",
  //     "history2": "1공장"
  // }
  setproduceOrganizationId: (val) => {
    set(() => ({ producerOrganizationId: val }));
  },

  // init
  initProjectModule: () => {
    set(() => ({
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
      buyerOrganizationId: "",
      produceOrganizationId: "",
      //  default
    }));
  },
  getIsConditionFullfill: () => {
    let condition = false;
    condition = !!get().type && !!get().productId;
    return condition;
  },
  // default/////////////////////////////////////
  // savefunction
  isRouteActive: false,
  setisRouteActive: (val) => {
    set(() => ({ isRouteActive: val }));
  },
  isLoading: false,
  setisLoading: (val) => {
    set(() => ({ isLoading: val }));
  },
  tempId: "",
  settempId: (val) => {
    set(() => ({ tempId: val }));
  },
  routeId: "",
  setrouteId: (val) => {
    set(() => ({ routeId: val }));
  },
  // route
  routeNumber: "",
  setrouteNumber: (val) => {
    set(() => ({ routeNumber: val }));
  },
  routeData: [],
  setrouteData: (val) => {
    set(() => ({ routeData: val }));
  },
  isRouteActivate: false,
  setisRouteActivate: (val) => {
    set(() => ({ isRouteActivate: val }));
  },
  // route init
  members: [],
  setmembers: (val) => {
    set(() => ({ members: val }));
  },
  targetMember: "",
  settargetMember: (val) => {
    set(() => ({ targetMember: val }));
  },
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
  // attachment
  attachmentTagOptionList: [], // add default
  setattachmentTagOptionList: (val) => {
    set(() => ({ attachmentTagOptionList: val }));
  },
  attachmentFileArray: [],
  setattachmentFileArray: (val) => {
    set(() => ({ attachmentFileArray: val }));
  },
  attachmentOriginArray: [],
  setattachmentOriginArray: (val) => {
    set(() => ({
      attachmentOriginArray: val,
    }));
  },
  attachmentTagArray: [],
  setattachmentTagArray: (val) => {
    set(() => ({ attachmentTagArray: val }));
  },
  attachmentCommentArray: [],
  setattachmentCommentArray: (val) => {
    set(() => ({ attachmentCommentArray: val }));
  },
  attachmentUploaderArray: [],
  setattachmentUploaderArray: (val) => {
    set(() => ({ attachmentUploaderArray: val }));
  },
  attachmentDateArray: [],
  setattachmentDateArray: (val) => {
    set(() => ({ attachmentDateArray: val }));
  },
  attachmentIdArray: [],
  setattachmentIdArray: (val) => {
    set(() => ({ attachmentIdArray: val }));
  },
  attachmentModifiedAtArray: [],
  setattachmentModifiedAtArray: (val) => {
    set(() => ({ attachmentModifiedAtArray: val }));
  },
  // edit attachment
  deletedFileIdArray: [],
  setdeletedFileIdArray: (val) => {
    set(() => ({ deletedFileIdArray: val }));
  },
  addedAttachmentArray: [],
  setaddedAttachmentArray: (val) => {
    set(() => ({ addedAttachmentArray: val }));
  },
  deletedAttachmentArray: [],
  setdeletedAttachmentArray: (val) => {
    set(() => ({ deletedAttachmentArray: val }));
  },

  // searchBox
  dataSearchBoxType: "",
  setdataSearchBoxType: (val) => {
    set(() => ({ searchBoxType: "", dataSearchBoxType: val }));
  },
  setDataSearcBoxProperty: (type, val) => {
    set(() => ({ [type]: val }));
  },
  searchBoxType: "",
  setsearchBoxType: (val) => {
    set(() => ({ searchBoxType: val, dataSearchBoxType: "" }));
  },
  setsearchBoxProperty: (target, val, index) => {
    if (target) {
      if (index) {
        if (target === "members") {
          const tmpmember = get().members;
          if (tmpmember[index]) {
            tmpmember[index] = [...tmpmember[index], val];
          } else {
            tmpmember[index] = [val];
          }
          set(() => ({ members: tmpmember }));
        } else {
          const targetArray = get()[`${target}`];
          if (Array.isArray(targetArray)) {
            targetArray[index] = val;
          }
          set(() => ({ [target]: targetArray }));
        }
      } else {
        set(() => ({ [target]: val }));
      }
    }
  },
  deletemember: (id, index) => {
    const tmpmemberArr = get().members;
    const newArr =
      tmpmemberArr[index] && tmpmemberArr[index].filter((mem) => mem.id !== id);
    tmpmemberArr[index] = newArr;
    set(() => ({ member: tmpmemberArr }));
  },
}));
export default projectStore;
