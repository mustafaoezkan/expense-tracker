import React from "react";
import { Route, Redirect } from "react-router";
import { Col, Layout, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import AppHeader from "./components/AppHeader";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./components/Categories";
import Records from "./components/Record";
import Logout from "./components/Logout";

const { Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header>
        <Row>
          <Col span={4}>
            <div style={{ color: "#FF8F00" }}>Expense Tracker</div>
          </Col>
          <Col span={20}>
            <AppHeader />
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: "0 5rem" }}>
        <div style={{ margin: "1.5rem 0" }}>
          <Row style={{ justifyContent: "center" }}>
            <Route path="/register" component={SignUp} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/categories" component={Categories} />
            <PrivateRoute path="/records" component={Records} />
            <Route path="/logout" component={Logout} />
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/records" />;
              }}
            />
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: "center", color: "#FF8F00" }}>
        Expense Tracker ©2022
      </Footer>
    </Layout>
  );
}

export default App;
