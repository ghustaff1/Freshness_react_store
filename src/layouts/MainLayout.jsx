import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Cart from '../pages/Cart/Cart';
import Footer from '../components/Footer/Footer';
import AccountPopup from '../components/AccountPopup/AccountPopup';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';


const MainLayout = () => {

  //пока не разобрался с логином и регистрацией на сайте будет по дефолту 'login'
  //userStatus can be authing, authed, auth
  const [userStatus, setUserStatus] = React.useState('');
  console.log('MAINLAYOUT')
  const checkAuth = () => {
    const loginTime = localStorage.getItem('loginTime');
    if (loginTime) {
      const currentTime = Date.now();
      const timeDiff = (currentTime - loginTime) / 1000 / 60 / 60;
      if (timeDiff >= 1) {
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('userPhone');
        localStorage.removeItem('userSurname');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('isLoggedIn');
        setUserStatus('auth');
      }
      else {
        setUserStatus('authed');
      }
    }
  }

  const layoutRef = React.useRef();

  React.useEffect(() => {

    checkAuth();

  }, []);


  userStatus === 'authenticating' ?
    disablePageScroll(layoutRef.current) :
    enablePageScroll(layoutRef.current);

  

  return (
    <div ref={layoutRef}>
      <Header
        userStatus={userStatus}
        setUserStatus={setUserStatus} />
      <AccountPopup
        userStatus={userStatus}
        setUserStatus={setUserStatus} />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout;