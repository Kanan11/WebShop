export const makeRequest = async (path: string, method: string, data?: any) => {
    const url = `${process.env.REACT_APP_API_URL}/${path}`;
    const headers = {
      Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
      "Content-Type": "application/json",
    };
  
    const options: RequestInit = {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
    };
  
    const response = await fetch(url, options);
  return await response.json();
  };
  