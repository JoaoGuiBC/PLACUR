import { atom, useAtom } from "jotai";
import type { ReactNode } from "react";

import { Toast } from "../Toast";
import { Footer } from "../Footer";
import { Header } from "../Header";

import { Container } from "./styles";

export const toastState = atom<{
  title: string;
  description: string;
  type: "message" | "error" | "success";
  isOpen: boolean;
}>({
  title: "",
  description: "",
  type: "message",
  isOpen: false,
});

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [toastData, setToastData] = useAtom(toastState);

  function handleCloseToast() {
    setToastData({ ...toastData, isOpen: false });
  }

  return (
    <>
      <Toast
        title={toastData.title}
        description={toastData.description}
        type={toastData.type}
        isOpen={toastData.isOpen}
        onClose={handleCloseToast}
      />
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
}
