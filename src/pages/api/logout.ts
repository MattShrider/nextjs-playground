import { createServerSupabaseClient } from "@/lib/supabase";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const logoutHandler: NextApiHandler = async (req, res) => {
  const supabase = createServerSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.access_token) {
    try {
      const { error } = await supabase.auth.admin.signOut(session.access_token);
      if (error) throw error;
    } catch (e) {
      console.error("Error signing out user", e, session);
      return res.status(500).send(null);
    }
  }

  return res.status(200).send(null);
};

export default logoutHandler;
