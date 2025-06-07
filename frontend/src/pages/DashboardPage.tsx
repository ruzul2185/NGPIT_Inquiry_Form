import supabase from "../auth/supabaseClient";

const DashboardPage = () => {

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        throw error;
    }

  return (
    <div>
      Dashboard Page
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default DashboardPage;
