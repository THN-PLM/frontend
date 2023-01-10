import create from "zustand";

const itemStore = create((set, get) => ({
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
export default itemStore;
