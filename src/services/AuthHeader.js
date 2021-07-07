export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    console.log("token", user.accessToken);
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
