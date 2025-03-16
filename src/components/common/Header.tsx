import { styled } from "styled-components";
import logo from "../../assets/images/logo.png";
import {
  FaSignInAlt,
  FaRegUser,
  FaUserCircle,
  FaBars,
  FaAngleRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";
import { useAuthStore } from "../../store/authStore";
import { logout } from "@/api/auth.api";
import Dropdown from "./Dropdown";
import ThemeSwitcher from "../header/ThemeSwitcher";
import { useState } from "react";

function Header() {
  const { category } = useCategory();
  const { isloggedIn, storeLogout } = useAuthStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <HeaderStyle $isOpen={isMobileOpen}>
      <h1 className="logo">
        <Link to="/">
          <img src={logo} alt="book store" />
        </Link>
      </h1>
      <nav className="category">
        <button
          className="menu-button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <FaAngleRight /> : <FaBars />}
        </button>
        <ul>
          {category.map((item) => (
            <li key={item.category_id}>
              <Link
                to={
                  item.category_id === null
                    ? "/books"
                    : `/books?categoryId=${item.category_id}`
                }
              >
                {item.category_name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="auth">
        {isloggedIn ? (
          <Dropdown toggleButton={<FaUserCircle />}>
            <DropdownMenu>
              <li>
                <Link to="/cart">장바구니</Link>
              </li>
              <li>
                <Link to="/orderlist">주문내역</Link>
              </li>
              <li>
                <button
                  onClick={async () => {
                    try {
                      await logout();
                      storeLogout();
                      window.location.href = "/";
                    } catch (error) {
                      console.error("로그아웃 실패:", error);
                    }
                  }}
                >
                  로그아웃
                </button>
              </li>
            </DropdownMenu>
            <ThemeSwitcher />
          </Dropdown>
        ) : (
          <AuthMenu>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                로그인
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <FaRegUser />
                회원가입
              </Link>
            </li>
          </AuthMenu>
        )}
      </nav>
    </HeaderStyle>
  );
}

interface HeaderStyleProps {
  $isOpen: boolean;
}

const HeaderStyle = styled.header<HeaderStyleProps>`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  .logo {
    img {
      width: 200px;
    }
  }

  .category {
    .menu-button {
      display: none;
    }
    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};
          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    height: 52px;

    .logo {
      padding: 0 0 0 12px;
      img {
        width: 140px;
      }
    }

    .auth {
      position: absolute;
      top: 12px;
      right: 12px;
    }

    .category {
      .menu-button {
        display: flex;
        position: absolute;
        top: 14px;
        right: ${({ $isOpen }) => ($isOpen ? "62%" : "52px")};
        background: #fff;
        border: 0;
        font-size: 1.5rem;
        transition: right 0.3s ease-in-out;
      }

      ul {
        position: fixed;
        top: 0;
        right: ${({ $isOpen }) => ($isOpen ? "0" : "-100%")};
        width: 60%;
        height: 100vh;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: right 0.3s ease-in-out;
        margin: 0;
        padding: 24px;
        z-index: 1000;
        flex-direction: column;
        gap: 16px;
      }
    }
  }
`;

// 비로그인 상태의 메뉴 스타일
const AuthMenu = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

  li {
    a {
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      background: ${({ theme }) => theme.color.primaryLight};
      border-radius: 4px;
      padding: 8px 12px;

      &:hover {
        background: ${({ theme }) => theme.color.primary};
        color: white;
      }

      svg {
        margin-right: 6px;
      }
    }
  }
`;

// 로그인 상태의 드롭다운 메뉴 스타일
const DropdownMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  width: 100px;

  li {
    width: 100%;
    a,
    button {
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      line-height: 1;
      background: ${({ theme }) => theme.color.primaryLight};
      border-radius: 4px;
      padding: 8px 12px;
      border: 0;
      cursor: pointer;
      width: 100%;
      text-align: left;

      &:hover {
        background: ${({ theme }) => theme.color.primary};
        color: white;
      }

      svg {
        margin-right: 6px;
      }
    }
  }
`;

export default Header;
