import Logout from "@/components/common/components/logout-btn";


export default function UserNameDisplay({
  user,
}: {
  user: { username: string; };
}) {
  return (
    <>
      <div>
        <h1 className="username-display">{user.username}</h1>
      </div>
    </>
  );
}
