'use client'
export default function TodoItemWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="flex flex-col justify-between max-w-2xl w-full px-8 py-4 rounded-xl gap-4 relative box-shadow">
      {children}
    </article>
  );
}
