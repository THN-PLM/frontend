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
  const isLogged = true;
  return (
    <div className="App">
      {!isLogged ? (
        <Routes>
          <Route path="/" element={<LogIn />} />
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
