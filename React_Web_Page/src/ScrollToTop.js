/**
 * 12-11
 * 진행 사항:
 * footer를 만드는 도중 화면이 하단에 있다면 클릭했을 때 화면이 하단을 비추는 문제를 발견하여 페이지를 클릭하면 최상단으로 이동하도록 만들었다.
 * 컴포넌트로 만들어서 App.js에 넣으면 된다.
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}