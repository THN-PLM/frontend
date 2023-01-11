import create from "zustand";
import produce from "immer";

const PCBStore = create((set, get) => ({
  stateObj: {},

  setStateByKey: (key) => {
    //  하나의 속성을 관리하는 setState함수를 반환.
    //  인풋에 setState함수를 콜백으로 넘길 때 setStateByKey("carType")
    const { stateObj } = get();
    const setState = (val) => {
      //  already has key or not
      set(() => ({
        stateObj: produce(stateObj, (draft) => {
          draft.key = val;
        }),
      }));
    };
    return setState;
  },

  setStateObj: (val, add = "add") => {
    //  val은 obj
    const { stateObj } = get();
    if (add === "add") {
      //  추가. 중복된 키는 덮어씀
      set(() => ({
        stateObj: produce(stateObj, (draft) => {
          draft = { ...draft, ...val }; //  체크
        }),
      }));
    } else {
      // add==="init"
      //  아예 기존거 무시하고 덮어쓰기
      set(() => ({
        stateObj: val,
      }));
    }
  },

  initStateObj: (sourceObjArr) => {
    //  sourceObj에서 키값들을 빼와 stateObj의 기본 키값 초기화
    //  기존에 있는 키값에 새로운 키값을 더함(inputGrid 여러개 사용 대응)
    const { stateObj } = get();
    const newObj = { ...stateObj };
    sourceObjArr
      .map((obj) => obj.requestName)
      .forEach((stateName) => {
        newObj[stateName] = newObj[stateName] ? newObj[stateName] : "";
      });

    set(() => ({
      stateObj: newObj,
    }));
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
  getisConditionFullfill: () => {
    let condition = true;
    const { type, productId } = get();
    condition = !!type && !!productId;
    return condition;
  },
}));
export default PCBStore;
