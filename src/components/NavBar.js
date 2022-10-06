import { message } from "antd";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import requests from "../api/requests";
import useAuthentication from "../hooks/useAuthentication";
import { logout } from "../_actions/user_action";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);

  const onLogoutClick = async () => {
    dispatch(logout())
      .then((result) => {
        const {
          payload: { success },
        } = result;
        if (success) {
          message.success("로그아웃을 완료했습니다.");
          navigate("/login", {
            replace: true,
          });
          return;
        } else {
          message.warning("로그아웃에 실패했습니다.");
        }
      })
      .catch((err) => {});
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Beautifula</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          {user && user.userData && user.userData.isAuth && (
            <Nav>
              <Nav.Link href="/mypage">MyPage</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link onClick={onLogoutClick}>Logout</Nav.Link>
            </Nav>
          )}
          {user && user.userData && !user.userData.isAuth && (
            <Nav>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
