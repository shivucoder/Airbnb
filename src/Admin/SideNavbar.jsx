/* eslint-disable max-len */
import {useState} from 'react';
import Dashboard from './Dashboard';
import Inbox from './Inbox';
import Analytics from './Analytic';
import {useDispatch} from 'react-redux';
import {logout} from '../Redux/action';
import {useNavigate} from 'react-router-dom';

const SideNavbar = () => {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('Dashboard'); // Default to Dashboard

  const Menus = [
    {title: 'Dashboard', src: 'Chart_fill', component: <Dashboard />},
    {title: 'Add Data', src: 'Chat', component: <Inbox />},

    {title: 'Analytics', src: 'Chart', component: <Analytics />},
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMenuClick = (title) => {
    setSelectedMenu(title);
  };

  function handleLogout() {
    dispatch(logout());
    navigate('/');
  }

  return (
    <>
      <div
        className={` ${
          open ? 'w-72' : 'w-20 '
        } bg-dark-purple p-5  pt-8 fixed top-0 z-50 duration-300 w-full flex justify-between`}
      >
        <img src="/airbnb.png" alt="" className=" w-[120px] h-[50px]" />

        <div className="flex gap-x-4 items-center justify-center align-middle">
          <div className=" flex gap-8 align-middle justify-center items-center">
            {Menus.map((Menu, index) => (
              <p
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-lg font-bold	 items-center gap-x-4 
              ${Menu.gap ? 'mt-9' : 'mt-2'} ${
                Menu.title === selectedMenu && 'bg-light-white'
              } `}
                onClick={() => handleMenuClick(Menu.title)}
              >
                <h1 className={`${!open && 'hidden'} origin-left duration-200`}>
                  {Menu.title}
                </h1>
              </p>
            ))}
          </div>
        </div>
        <button
          className=" px-3  border relative right-0  text-zinc-100 hover:bg-[#f18488] bg-[#f54a50] font-bold rounded-lg"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>

      {/* </div> */}
      <div className="h-screen flex-1 p-7">
        {Menus.find((item) => item.title === selectedMenu)?.component}
      </div>
    </>
  );
};

export default SideNavbar;
