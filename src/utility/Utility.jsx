import React, { useEffect, useState } from "react";
import axios from "axios";
//  모듈별 스토어 모음

export const tokenAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});
tokenAxios.interceptors.request.use(
  async (config) => {
    const configure = config;
    const auth = localStorage.getItem("token");
    configure.headers = {
      Authorization: auth,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    };
    return configure;
  },
  (error) => {
    Promise.reject(error);
  }
);
tokenAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    originalRequest._retry = true;
    if (
      error.response.status > 499 ||
      (error.response.status <= 499 && !error.response.data.result)
    ) {
      if (error.config.method === "post" || error.config.method === "put") {
        // window.location.href="/notFound"                                                              //추가됨
      }
    }
    if (error && error.response.data.result) {
      if (error.response.data.result.msg === "리프레시가 필요합니다.") {
        fetch(`${process.env.REACT_APP_BASE_URL}/refresh-token`, {
          credentials: "include",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: {},
        })
          .then((response) => {
            if (response.status !== 200) {
              throw new Error(response.status);
            }
            return response.json();
          })
          .catch(() => {
            // setIsLogged(false);
            const userId = JSON.parse(localStorage.getItem("undefined")).state
              .userData.id;
            fetch(`${process.env.REACT_APP_BASE_URL}/logout/${userId}`, {
              // credentials: "include",
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
              },
              // body: {},
            });

            alert(
              "로그인 이후 많은 시간이 경과해 자동으로 로그아웃 되었습니다. 다시 로그인 해주세요."
            );
            localStorage.removeItem("token");
            localStorage.removeItem("alarmArr");

            window.location.reload(); // 추가됨
          })
          .then((response) => {
            let aToken = JSON.stringify(response.result.data.accessToken);
            aToken = aToken.replaceAll(`"`, ``);
            localStorage.setItem("token", aToken);
            const rauth = localStorage.getItem("token");
            axios.defaults.headers.common.Authorization = rauth;
            originalRequest.headers.Authorization = rauth;
            if (error.config.method === "get") {
              window.location.reload(); // 추가됨
            } else {
              return axios(originalRequest);
            }

            return axios(originalRequest);
          });
      } else {
        console.log(error.response);
        alert(error.response.data.result.msg);
      }
    } else {
      return " ";
    }
    return error;
  }
);

export const useUpdateObjState = (object) => {
  // 이미 존재하는 object의 val를 업데이트하는 훅. key가 없을 때에는 콘솔에 에러
  const [objState, setobjState] = useState(object);
  const setState = (key, value) => {
    const tmpObj = objState;
    if (tmpObj.key) {
      tmpObj.key = value;
    } else {
      console.log(key, "not in", objState);
    }
    setobjState(tmpObj);
  };
  return [objState, setState];
};

export const usePageConditionList = (url, ...more) => {
  //  url과 다른 조건들을 받아서
  //  다른 조건 : 기본 조건은 페이지 넘버, rowsperpage, totalpage.
  //  여기에 추가할 조건들을 넣는 형태
  // 다른 조건들은 searchText, isManager이 있음
  //  조건 객체, 조건 객체 변경 함수, 결과 리스트 값을 반환
  const [resultData, setresultData] = useState([]);
  const initObj = {
    pageNum: "0",
    rowsPerPage: "10",
    totalPage: "0",
  };
  if (more) {
    more.forEach((item) => {
      initObj[item] = "";
    });
  }
  const [conditionObject, setconditionObject] = useState(initObj);
  const changeCondition = (key, value) => {
    const tmpObj = { ...conditionObject };
    tmpObj[key] = value;
    setconditionObject(tmpObj);
  };

  const getData = async () => {
    const response = await tokenAxios.get(
      `${url}${conditionObject.isManager ? "/management" : ""}?size=${
        conditionObject.rowsPerPage
      }&page=${conditionObject.pageNum}&name=${conditionObject.searchText}` // page,name이랑뒤에거추가하기
    );
    setresultData(response.data.content);
    // totalPage설정
  };
  useEffect(() => {
    getData();
  }, [conditionObject]);
  return [conditionObject, changeCondition, resultData];
};

// getData원형
const setAttachmentArrays = (attachmentsArray, moduleStore) => {
  const {
    setattachmentFileArray,
    setattachmentIdArray,
    setattachmentCommentArray,
    setattachmentTagArray,
    setattachmentOriginArray,
    setattachmentDateArray,
    setattachmentUploaderArray,
    setdeletedFileIdArray,
    setattachmentModifiedAtArray,
  } = moduleStore;
  const tempfileArray = [];
  const temptagArray = [];
  const tempcommentArray = [];
  const temporiginArray = [];
  const tempuploaderArray = [];
  const tempdateArray = [];
  const tempidArray = [];
  const tempdeletedFileArray = [];
  const tempModifiedAtArray = [];
  attachmentsArray.forEach((item) => {
    tempfileArray.push(item.originName);
    tempcommentArray.push(item.attach_comment);
    temptagArray.push(item.tag);
    temporiginArray.push(item.attachmentaddress);
    tempuploaderArray.push(item.upload);
    tempdateArray.push(item.date);
    tempidArray.push(item.id);
    if (item.deleted) {
      tempdeletedFileArray.push(item.id);
    }
    tempModifiedAtArray.push(item.modifiedAt ? item.modifiedAt : "");
  });
  setattachmentFileArray(tempfileArray);
  setattachmentIdArray(tempidArray);
  setattachmentCommentArray(tempcommentArray);
  setattachmentTagArray(temptagArray);
  setattachmentOriginArray(temporiginArray);
  setattachmentDateArray(tempdateArray);
  setattachmentUploaderArray(tempuploaderArray);
  setdeletedFileIdArray(tempdeletedFileArray);
  setattachmentModifiedAtArray(tempModifiedAtArray);
};
const appendAttachmentFormData = (formData, edit, moduleStore) => {
  const {
    attachmentFileArray,
    attachmentCommentArray,
    attachmentTagArray,
    deletedAttachmentArray,
    addedAttachmentArray,
  } = moduleStore;
  if (edit) {
    // edit attachment
    addedAttachmentArray.forEach((file) => {
      formData.append("addedAttachments", file);
    });

    formData.append("addedAttachmentComment", attachmentCommentArray);
    formData.append(
      "addedTag",
      attachmentTagArray.map((item) => (item.id ? item.id : item))
    );
    formData.append("deletedAttachments", deletedAttachmentArray);
  } else {
    // attachment
    attachmentFileArray.forEach((file) => {
      if (typeof file !== "string") {
        formData.append("attachments", file);
      }
    });

    formData.append("attachmentComment", attachmentCommentArray);
    formData.append(
      "tag",
      attachmentTagArray.map((item) => (item.id ? item.id : item))
    );
  }
};
// save원형
export const useSave = (url, appendFormData, moduleStore, edit) => {
  // url, formData추가 함수(appendFormData), store객체, temp여부, edit여부를 받아서
  //  save명령을 보내는 save함수를 반환
  const {
    attachmentFileArray,
    attachmentCommentArray,
    attachmentTagArray,
    deletedAttachmentArray,
    addedAttachmentArray,
    setrouteId,
    tempId,
    settempId,
    setisLoading,
    setisRouteActive,
  } = moduleStore;

  //  각 store에 해당 속성들 꼭 있도록 확인
  const save = async () => {
    setisLoading(true);
    const formData = appendFormData(edit, moduleStore);
    try {
      let response = "";
      if (tempId || edit) {
        response = await tokenAxios.put(`/${url}/temp/end/${tempId}`, formData);
      } else {
        response = await tokenAxios.post(`/${url}`, formData);
      }
      setisRouteActive(true);
      // setrouteNumber(response.data.result.data.routeId);
      setrouteId(response.data.result.data.id);
      setisLoading(false);
    } catch (err) {
      setisRouteActive(false);
    }
  };
  return save;
};
export const usetempSave = (url, appendFormData, moduleStore) => {
  // url, formData추가 함수(appendFormData), store객체, temp여부, edit여부를 받아서
  //  save명령을 보내는 save함수를 반환
  const {
    attachmentFileArray,
    attachmentCommentArray,
    attachmentTagArray,
    deletedAttachmentArray,
    addedAttachmentArray,
    setrouteId,
    tempId,
    settempId,
    setisLoading,
    setisRouteActive,
  } = moduleStore;

  //  각 store에 해당 속성들 꼭 있도록 확인
  const save = async () => {
    setisLoading(true);
    const formData = appendFormData(false, moduleStore);
    try {
      if (tempId) {
        const response = await tokenAxios.put(
          `/${url}/temp/${tempId}`,
          formData
        );
      } else {
        const response = await tokenAxios.post(`/${url}/temp`, formData);
        settempId(response.data.result.data.id);
      }

      setisLoading(false);
    } catch (err) {
      setisRouteActive(false);
    }
  };
  return save;
};

// export const appendForm = (edit, projectStore) => {
//   const formData = new FormData();

//   appendAttachmentFormData(formData, edit, projectStore);
//   return formData;
// };

// project

export const appendProjectForm = (edit, projectStore) => {
  const {
    type,
    period,
    name,
    allDoStartPeriod,
    allDoOverPeriod,
    protoStartPeriod,
    protoOverPeriod,
    p1StartPeriod,
    p1OverPeriod,
    p2StartPeriod,
    p2OverPeriod,
    mStartPeriod,
    mOverPeriod,
    productId,
    buyerOrganizationId,
    produceOrganizationId,
    carTypeId,
  } = projectStore;
  const formData = new FormData();
  formData.append("projectTypeId", type);
  // formData.append(period);
  // formData.append(number);
  formData.append("name", name);
  formData.append("allDoStartPeriod", allDoStartPeriod);
  formData.append("allDoOverPeriod", allDoOverPeriod);
  formData.append("protoStartPeriod", protoStartPeriod);
  formData.append("protoOverPeriod", protoOverPeriod);
  formData.append("p1StartPeriod", p1StartPeriod);
  formData.append("p1OverPeriod", p1OverPeriod);
  formData.append("p2StartPeriod", p2StartPeriod);
  formData.append("p2OverPeriod", p2OverPeriod);
  formData.append("mStartPeriod", mStartPeriod);
  formData.append("mOverPeriod", mOverPeriod);
  formData.append("productId", productId);
  formData.append("buyerOrganizationId", buyerOrganizationId);
  formData.append("producerOrganizationId", produceOrganizationId);
  formData.append("carTypeId", carTypeId);
  appendAttachmentFormData(formData, edit, projectStore);
  return formData;
};

export const usegetProjectData = async (id, projectStore) => {
  const response = await tokenAxios.get(`/project/${id}`);
  const { data } = response.data.result;
  const {
    setperiod,
    setnumber,
    setname,
    setallDoStartPeriod,
    setallDoOverPeriod,
    setprotoStartPeriod,
    setprotoOverPeriod,
    setp1StartPeriod,
    setp1OverPeriod,
    setp2StartPeriod,
    setp2OverPeriod,
    setmStartPeriod,
    setmOverPeriod,
    setproductId,
    setbuyer,
    setproduceOrganization,
    setrouteNumber,
  } = projectStore;
  // setstate
  setperiod(data.period);
  setnumber(data.number);
  setname(data.name);
  setallDoStartPeriod();
  setallDoOverPeriod();
  setprotoStartPeriod();
  setprotoOverPeriod();
  setp1StartPeriod();
  setp1OverPeriod();
  setp2StartPeriod();
  setp2OverPeriod();
  setmStartPeriod();
  setmOverPeriod();
  setproductId();
  setbuyer(data.buyer);
  setproduceOrganization(data.producerOrganization);

  setAttachmentArrays(data.projectAttachmentList, projectStore);
  setrouteNumber(data.id);
};
