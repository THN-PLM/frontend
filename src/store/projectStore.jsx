import create from "zustand";

const projectStore = create((set, get) => ({
  // project states
  projectType: "", // {id,name?}
  setprojectType: (val) => {
    set(() => ({ projectType: val }));
  },
  projectPeriod: 0, // all도, 초도, proto, p1 => 0,1,2,숫자로
  setprojectPeriod: (val) => {
    set(() => ({ projectPeriod: val }));
  },
  // init
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
