import create from "zustand";

const defaultStore = create((set, get) => ({
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

  // route init
  members: [],
  setmembers: (val, index) => {
    const tmpmember = get().members;
    if (tmpmember[index]) {
      tmpmember[index] = [...tmpmember[index], val];
    } else {
      tmpmember[index] = [val];
    }
    set(() => ({ members: tmpmember }));
  },
  targetMember: "",
  settargetMember: (val) => {
    set(() => ({ targetMember: val }));
  },

  // attachment
  attachmentTagOptionList: [
    //  체크
    { id: 1, name: "ETC" },
    { id: 2, name: "개발사양서" },
    { id: 3, name: "디자인첨부" },
  ], // add default
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
    console.log(2);
  },
  setdataSearchBoxProperty: (type, val) => {
    set(() => ({ [type]: val }));
  },
  searchBoxType: "",
  setsearchBoxType: (val) => {
    set(() => ({ searchBoxType: val, dataSearchBoxType: "" }));
  },
  setsearchBoxProperty: (target, val, index) => {
    if (target) {
      if (index) {
        const targetArray = get()[`${target}`];
        if (Array.isArray(targetArray)) {
          targetArray[index] = val;
        }
        set(() => ({ [target]: targetArray }));
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
  // init
  initDefaultStore: () => {
    set(() => ({
      //  default
      isLoading: false,
      tempId: "",
      routeId: "",
      // route
      routeNumber: "",
      routeData: [],
      isRouteActive: false,
      // route init
      members: [],
      targetMember: "",
      // ref
      informationRef: "",
      attachmentRef: "",
      routeRef: "",
      // attachment
      attachmentTagOptionList: [
        { id: 1, name: "ETC" },
        { id: 2, name: "개발사양서" },
        { id: 3, name: "디자인첨부" }, //    체크
      ],
      // add default
      attachmentFileArray: [],
      attachmentOriginArray: [],
      attachmentTagArray: [],
      attachmentCommentArray: [],
      attachmentUploaderArray: [],
      attachmentDateArray: [],
      attachmentIdArray: [],
      attachmentModifiedAtArray: [],
      // edit attachment
      deletedFileIdArray: [],
      addedAttachmentArray: [],
      deletedAttachmentArray: [],
      // searchBox
      dataSearchBoxType: "",
      searchBoxType: "",
    }));
  },
}));
export default defaultStore;
