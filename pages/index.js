import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../lib/session";
import Link from "next/link";

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;
  if (typeof user === "undefined" || !user.isLoggedIn) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: null,
      },
    };
  }
  return { props: { user: req.session.user } };
},
sessionOptions);

export default function Home({ user }) {
  return (
    <>
      <span>Todo okey ya estas logeado</span>
      <p>User: {JSON.stringify(user)}</p>

      <Link href="/api/logout">
        <a>LogOut</a>
      </Link>
    </>
  );
}
