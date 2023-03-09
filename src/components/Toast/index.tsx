import { X } from "phosphor-react";

import {
  ToastProvider,
  ToastClose,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from "./styles";

interface ToastProps {
  title: string;
  description: string;
  type: "message" | "error" | "success";
  isOpen?: boolean;
  onClose: () => void;
}

function Toast({
  title,
  description,
  type,
  isOpen = false,
  onClose,
}: ToastProps) {
  return (
    <ToastProvider>
      <ToastRoot open={isOpen} onOpenChange={onClose}>
        <ToastTitle type={type}>{title}</ToastTitle>
        <ToastDescription>{description}</ToastDescription>

        <ToastClose>
          <X weight="bold" />
        </ToastClose>
      </ToastRoot>

      <ToastViewport />
    </ToastProvider>
  );
}

Toast.displayName = "Toast";

export { Toast };
