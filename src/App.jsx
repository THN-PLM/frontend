import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Header from "./organism/Header";
import NavigationBar from "./organism/NavigationBar";
import Home from "./x-module/Home";
import LogIn from "./page/LogIn";
import NotFound from "./page/NotFound";
import ProjectModule from "./x-module/ProjectModule";
import ProjectListPage from "./page/ProjectListPage";
import ProjectAddPage from "./page/ProjectAddPage";
import ProjectDetailPage from "./page/ProjectDetailPage";
import ProjectEditPage from "./page/ProjectEditPage";
import commonStore from "./store/commonStore";
import SignUp from "./page/SignUp";
import ItemModule from "./x-module/ItemModule";
import ItemListPage from "./page/ItemListPage";
import PCBPage from "./page/PCBPage";

const AppStyle = styled.div`
  width: 100%;
  min-height: 100%;
  .route {
    width: 100%;
    min-width: 1000px;
    min-height: 580px;
    height: calc(100vh);

    display: flex;
    padding-top: 100px; //heqder + padding
    padding-left: ${(props) => (props.isHover ? "200px" : "160px")};
    padding-bottom: 24px;
    padding-right: 24px;
    transition: 0.45s;
    background-color: var(--lightGray);
  }
`;
function App() {
  const [isHover, setisHover] = useState(false);
  const { isLogged } = commonStore();
  // const isLogged = true;
  return (
    <div className="App">
      {!isLogged ? (
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />

          <Route path="*" element={<NotFound />} />

          {/* <Route path="/signup" element={<SignUp />} /> */}
        </Routes>
      ) : (
        <AppStyle isHover={isHover}>
          <Header isHover={isHover} />
          <NavigationBar isHover={isHover} setisHover={setisHover} />
          <div className="route">
            <Routes>
              <Route path="/" element={<Home />} />
              {/** Project Module */}
              <Route path="/project" element={<ProjectModule />}>
                <Route path="list" element={<ProjectListPage />} />
                <Route path="add" element={<ProjectAddPage />} />
                <Route
                  path="detail/:projectId"
                  element={<ProjectDetailPage />}
                />
                <Route path="edit/:projectId" element={<ProjectEditPage />} />
              </Route>
              <Route path="/item" element={<ItemModule />}>
                <Route path="list" element={<ItemListPage />} />
                <Route path="pcb/add" element={<PCBPage type="add" />} />
                <Route
                  path="pcb/detail/:id"
                  element={<PCBPage type="detail" />}
                />
                <Route
                  path="pcb/editS/:id"
                  element={<PCBPage type="editS" />}
                />
                <Route
                  path="pcb/editD/:id"
                  element={<PCBPage type="editD" />}
                />
                <Route path="pcb/" element={<PCBPage type="add" />} />

                <Route path="" element={<ItemListPage />} />
              </Route>
              {/* <Route path="/item" element={<ItemModule />}>
                <Route path="" element={<ItemListPage />} />
                <Route path="add/:id" element={<ItemAddPage />} />
                <Route path="edit/:itemId" element={<ItemEditPage />} />
                <Route
                  path="edit/:itemId/:reviseId"
                  element={<ItemRevisePage />}
                />

                <Route path="detail/:itemId" element={<ItemDetailPage />} />
                <Route path="review/:itemId" element={<ItemReviewPage />} />
              </Route> */}

              {/* {userData.admin && (
                <Route path="/admin" element={<AdminModule />}>
                  <Route path="/admin" element={<AdminListPage />} />
                  <Route path="/admin/add/" element={<AdminTaskChangePage />} />
                </Route>
              )} */}

              <Route path="/notFound" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AppStyle>
      )}
    </div>
  );
}

export default App;
