"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  ADD_USER_DEFAULT_VALUES,
  addUserSchema,
  type AddUserFormValues,
} from "@/features/users/lib/add-user-schema";
import { createLocalUserId, type User } from "@/features/users/types/user";

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (user: User) => void;
}

export function AddUserDialog({ open, onClose, onCreate }: AddUserDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddUserFormValues>({
    resolver: zodResolver(addUserSchema),
    defaultValues: ADD_USER_DEFAULT_VALUES,
  });

  const handleClose = () => {
    reset(ADD_USER_DEFAULT_VALUES);
    onClose();
  };

  const onSubmit = handleSubmit(async (values) => {
    const user: User = {
      id: createLocalUserId(),
      name: values.name,
      username: values.username,
      email: values.email,
      phone: values.phone,
      website: values.website,
      address: {
        street: values.street,
        suite: "",
        city: values.city,
        zipcode: values.zipcode,
        geo: { lat: "0", lng: "0" },
      },
      company: {
        name: values.companyName,
        catchPhrase: "",
        bs: "",
      },
    };

    onCreate(user);
    reset(ADD_USER_DEFAULT_VALUES);
    onClose();
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title="Add user"
      description="Create a local user profile. It will be saved in this browser and appear in the directory immediately."
      size="lg"
    >
      <form onSubmit={onSubmit} className="space-y-5" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Full name"
            required
            autoComplete="name"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Username"
            required
            autoComplete="username"
            error={errors.username?.message}
            {...register("username")}
          />
          <Input
            label="Email"
            type="email"
            required
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Phone"
            type="tel"
            autoComplete="tel"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <Input
            label="Website"
            autoComplete="url"
            error={errors.website?.message}
            {...register("website")}
          />
          <Input
            label="Company name"
            error={errors.companyName?.message}
            {...register("companyName")}
          />
          <Input
            label="Street"
            autoComplete="street-address"
            error={errors.street?.message}
            {...register("street")}
          />
          <Input
            label="City"
            autoComplete="address-level2"
            error={errors.city?.message}
            {...register("city")}
          />
          <div className="sm:col-span-2">
            <Input
              label="ZIP code"
              autoComplete="postal-code"
              error={errors.zipcode?.message}
              {...register("zipcode")}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end dark:border-slate-700">
          <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating…" : "Create user"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
