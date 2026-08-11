export default function TodoWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="w-full md:w-2xl min-h-screen py-2 flex flex-col gap-y-2">{children}</section>;
}
