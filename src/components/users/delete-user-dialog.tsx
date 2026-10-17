"use client";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import type { User } from "@/features/users/types/user";

interface DeleteUserDialogProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteUserDialog({
  user,
  open,
  onClose,
  onConfirm,
}: DeleteUserDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Delete user"
      description="This action removes the user from your local collection. It cannot be undone."
    >
      <div className="space-y-5">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-900 dark:text-slate-50">
            {user?.name}
          </span>
          {user?.email ? (
            <>
              {" "}
              (<span className="font-medium">{user.email}</span>)
            </>
          ) : null}
          ?
        </p>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete user
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
