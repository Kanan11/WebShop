import { useState, useEffect } from "react";

interface User {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  }

export function useGetUser() {
  const [userLoggedIn, setUserLoggedIn] = useState<User>();

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
    async function fetchData() {
      if (jwtToken) {
        try {
          const res = await fetch(`http://localhost:1337/api/users/${userId}`, {
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
    fetchData();
  }, [jwtToken, userId]);

  return { userLoggedIn };
}