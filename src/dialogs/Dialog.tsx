import { Icon as PhosphorIcon } from "@phosphor-icons/react";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// styles
import "./Dialog.css";

// components
import Button from "../buttons/Button";

export type DialogCategories = "primary" | "secondary" | "danger" | "warn";

export type DialogContextProps = {
  open: boolean;
  title: string;
  description: string;
  category: DialogCategories;
  confirmIcon?: PhosphorIcon;
  confirmText: string;
  onConfirm: () => void;
  Icon?: PhosphorIcon;
  onCancel?: () => void;
};

export type DialogContextType = {
  dialogProps: DialogContextProps;
  OpenDialog: (props: Omit<DialogContextProps, "open">) => void;
  CloseDialog: () => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

type DialogProviderProps = {
  children: React.ReactNode;
};

export const DialogProvider = function ({ children }: DialogProviderProps) {
  const initialDialogProps: DialogContextProps = {
    open: false,
    title: "",
    description: "",
    confirmText: "Confirmar",
    category: "primary",
    onConfirm: function () {
      return;
    },
    onCancel: function () {
      CloseDialog();
      return;
    },
  };

  const [dialogProps, setDialogProps] =
    useState<DialogContextProps>(initialDialogProps);

  const OpenDialog = function (
    newDialogProps: Omit<DialogContextProps, "open">,
  ) {
    setDialogProps({
      ...newDialogProps,
      open: true,
    });
    return;
  };

  const CloseDialog = function () {
    setDialogProps(initialDialogProps);
    return;
  };

  return (
    <DialogContext.Provider value={{ dialogProps, OpenDialog, CloseDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = function () {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};

export const DialogElement = function () {
  const { dialogProps, CloseDialog } = useDialog();
  const dialogContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(function () {
    const HandleClickButton = function (event: MouseEvent) {
      if (
        event.target &&
        dialogContainerRef.current &&
        !dialogContainerRef.current.contains(event.target as Node)
      ) {
        CloseDialog();
        return;
      }
      return;
    };
    document.addEventListener("mousedown", HandleClickButton);
    return function () {
      document.removeEventListener("mousedown", HandleClickButton);
      return;
    };
  }, []);

  return (
    dialogProps?.open && (
      <div className="fz-dialog">
        <div ref={dialogContainerRef} className="fz-dialog-container">
          <div className="fz-dialog-content">
            <div className="fz-dialog-title">
              {dialogProps.Icon && <dialogProps.Icon />}
              <span>{dialogProps.title}</span>
            </div>
            <div className="fz-dialog-description">
              {dialogProps.description}
            </div>
          </div>
          <div className="fz-dialog-footer">
            <Button
              type="button"
              text="Cancelar"
              category="neutral"
              onClick={dialogProps?.onCancel || CloseDialog}
            />
            <Button
              type="submit"
              Icon={dialogProps.confirmIcon}
              text={dialogProps.confirmText}
              category={dialogProps.category}
              onClick={dialogProps.onConfirm}
            />
          </div>
        </div>
      </div>
    )
  );
};
