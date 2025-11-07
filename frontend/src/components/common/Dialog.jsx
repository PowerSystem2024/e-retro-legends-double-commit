import { createRoot } from "react-dom/client";
import { X } from "lucide-react"

export const showDialog = ({ content }) => {
  const dialog = document.createElement("dialog");
  document.body.appendChild(dialog);

  const root = createRoot(dialog);
  const controller = new AbortController();

  dialog.style.animation = "slideIn 0.3s ease-in";
  dialog.showModal();

  const closeDialogWithAnimation = () => {
    dialog.style.animation = "slideOut .3s ease-out";

    dialog.addEventListener(
      "animationend",
      () => {
        dialog.close();
        dialog.remove();
        root.unmount();
        controller.abort();
      },
      { once: true, signal: controller.signal }
    );
  };

  root.render(
    <>
      <span
        onClick={closeDialogWithAnimation}
        className="absolute top-2 right-2"
        title="Cerrar"
      >
        <X size={24} className="hover:text-red-400" />
      </span>
      {content}
    </>
  );

  dialog.addEventListener(
    "click",
    (event) => {
      const firstChildDialog = document.querySelector("dialog")?.firstChild;
      if (dialog.open && !firstChildDialog?.contains(event.target)) {
        closeDialogWithAnimation();
      }
    },
    { signal: controller.signal }
  );
};
