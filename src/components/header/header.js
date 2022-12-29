import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import auth from "../../../firebase/firebase.config";
import { logoutUser, setUser } from "../features/atuh/authSlice";

export const Header = () => {
  const [signout, setSignOut] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        dispatch(setUser(user.email))
      }
    })
  }, [dispatch])



  const { authentication } = useSelector(state => state);
  console.log(authentication);

  if (authentication) {
    console.log('ace');
  }

  const hangleLogout = () => {
    signOut(auth);
    dispatch(logoutUser());
  }

  return (
    <div>
      <header>
        <nav className="topnav">
          <Link href="/" passHref>
            <span>Home</span>
          </Link>
          <Link href="/events" passHref>
            <span>Events</span>
          </Link>
          <Link href="/about-us" passHref>
            <span>About-us</span>
          </Link>
          <div>
            {
              authentication?.email ? <a onClick={hangleLogout}>
                <span>Logout </span>

              </a> : <div>
                <Link href="/signup" passHref>
                  <span>Signup </span>
                </Link>
                <Link href="/login" passHref>
                  <span>Login</span>
                </Link>
              </div>
            }
          </div>
        </nav>
        <style jsx>{`
          .topnav {
            overflow: hidden;
            background-color: #333;
          }
          
          .topnav span {
            float: left;
            color: #f2f2f2;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            font-size: 17px;
          }
          
          .topnav span:hover {
            background-color: #ddd;
            color: black;
          }
          
          .topnav span.active {
            background-color: #04AA6D;
            color: white;
          }
         
        `}</style>
      </header >
    </div>
  )
}
