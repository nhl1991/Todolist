import { SetStateAction } from "react";

export default function AlertModal({
  setModalOpen,
}: {
  setModalOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <article className="w-screen h-screen flex items-center justify-center p-4 fixed bg-black/50 top-0 left-0 z-10">
      <div className="md:max-w-80 w-full h-80 rounded-xl bg-white dark:bg-slate-900 p-2 flex flex-col justify-between gap-y-4 items-center ">
        <header className="">
          <h2 className="text-xl font-extrabold py-4">ご案内</h2>
        </header>
        <section>
          <p className="px-4">
            サーバーとデータベースを無料プランで運用しているため、コールドスタートに時間がかかる場合があります。
            <br />
            少々お待ちいただけますと幸いです。
          </p>
        </section>
        <footer className="">
          <button className="btn-hover" onClick={() => setModalOpen(false)}>
            確認
          </button>
        </footer>
      </div>
    </article>
  );
}
