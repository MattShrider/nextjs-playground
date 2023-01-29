import type { User } from "./user";

// import { Octokit } from "octokit";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/auth/session";
import { NextApiRequest, NextApiResponse } from "next";
// const octokit = new Octokit();

export default withIronSessionApiRoute(loginRoute, sessionOptions);

export interface LoginBody {
  username: string;
}

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username } = (await req.body) as LoginBody;

  try {
    // const {
    //   data: { login, avatar_url },
    // } = await octokit.rest.users.getByUsername({ username });

    const user = { isLoggedIn: true, login: username, avatarUrl: "" } as User;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
