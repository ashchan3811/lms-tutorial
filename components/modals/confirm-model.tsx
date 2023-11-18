"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;

  showCancel?: boolean;
  cancelText?: string;

  continueText?: string;
}

const ConfirmModal = ({
  children,
  onConfirm,
  showCancel,
  cancelText,
  continueText,
}: ConfirmModalProps) => {
  showCancel = showCancel === undefined ? true : showCancel;
  cancelText = cancelText || "Cancel";

  continueText = continueText || "Continue";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {showCancel && <AlertDialogCancel>{cancelText}</AlertDialogCancel>}
          <AlertDialogAction onClick={onConfirm}>
            {continueText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
