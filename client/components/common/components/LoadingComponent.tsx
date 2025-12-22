import { useState } from "react";
import LoadingSpinner from "../ui/loadingSpinner";
import AlertModal from "./alertModal";

export default function InitialLoadingComponent() {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    <>
      {modalOpen ? <AlertModal setModalOpen={setModalOpen} /> : null}
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    </>
  );
}
