export const isLoggedIn = () => {
    const token = localStorage.getItem("authToken");
    return !!token; // Returns true if the token exists
  };
  