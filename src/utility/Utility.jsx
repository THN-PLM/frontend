import React, { useEffect, useState } from "react";
import axios from "axios";
import projectStore from "../store/projectStore";

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
      `${url}&page=${conditionObject.pageNum}` // page,name이랑뒤에거추가하기
    );
    setresultData(response.data);
    // totalPage설정
  };
  useEffect(() => {
    // getData();
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
// append attachment formdata
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
export const useSave = (url, appendFormData, moduleStore, temp, edit) => {
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
  const save = async () => {
    setisLoading(true);
    const formData = appendFormData(
      edit,
      attachmentFileArray,
      attachmentCommentArray,
      attachmentTagArray,
      deletedAttachmentArray,
      addedAttachmentArray
    );
    try {
      if (temp) {
        if (tempId) {
          const response = await tokenAxios.put(
            `/${url}/temp/${tempId}`,
            formData
          );
        } else {
          const response = await tokenAxios.post(`/${url}/temp`, formData);
          settempId(response.data.result.data.id);
        }
      } else {
        let response = "";
        if (!tempId) {
          response = await tokenAxios.post(`/${url}`, formData);
        } else {
          response = await tokenAxios.put(
            `/${url}/temp/end/${tempId}`,
            formData
          );
        }
        setisRouteActive(true);
        // route부분으로 스크롤
        // setrouteNumber(response.data.result.data.routeId);
        setrouteId(response.data.result.data.id);
      }
      setisLoading(false);
    } catch (err) {
      setisRouteActive(false);
    }
  };
  return save;
};

// project
export const useappendProjectForm = (
  edit,
  moduleStore // 스토어 함수 실행한 object
) => {
  const formData = new FormData();
  // 여기다가 추가
  appendAttachmentFormData(formData, edit, moduleStore);
  return formData;
};

export const usegetProjectData = async (
  id,
  projectstore // 스토어 함수를 실행한 것
) => {
  const response = await tokenAxios.get(`/project/${id}`);
  const { data } = response.data.result;
  // setstate
  setAttachmentArrays(data.attachments, projectstore);
  // setRouteNumber(id)
};
