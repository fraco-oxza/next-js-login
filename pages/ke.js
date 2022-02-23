import useUser from "../lib/useUser";

export default function Ke() {
  let user = useUser("/login");
  if (!user || user.isLoggedIn === false) {
    return <>loading</>;
  }
  return <>{JSON.stringify(user)}</>;
}
