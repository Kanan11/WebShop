import { useState, useEffect, useRef } from "react";
import { User } from '../types/types';


// interface User {
//     lastname: string;
//     orders: any;
//     id: number;
//     username: string;
//     email: string;
//     provider: string;
//     confirmed: boolean;
//     blocked: boolean;
//     createdAt: string;
//     updatedAt: string;
//   }

export function UseGetUser() {
  const [userLoggedIn, setUserLoggedIn] = useState<User>();
  const isMounted = useRef(true);

  function getJwtTokenAndUserIdFromCookie() {
    const cookies = document.cookie.split(';');
    let jwtToken = null;
    let userId = null;
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('jwt=')) {
        jwtToken = cookie.substring('jwt='.length, cookie.length);
      } else if (cookie.startsWith('userId=')) {
        userId = cookie.substring('userId='.length, cookie.length);
      }
    }
    return { jwtToken, userId };
  }

  const jwtTokenAndUserId = getJwtTokenAndUserIdFromCookie();
  const { jwtToken, userId } = jwtTokenAndUserId;
  
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    async function fetchData() {
      if (jwtToken) {
        try {
          const res = await fetch(`http://localhost:1337/api/users/${userId}?&populate=*`, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });
          const data = await res.json();
          setUserLoggedIn(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    if (jwtToken && userId) {
      timeoutId = setTimeout(() => {
        fetchData();
      }, 500);
    }
    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [jwtToken, userId]);

  return { userLoggedIn };
}
