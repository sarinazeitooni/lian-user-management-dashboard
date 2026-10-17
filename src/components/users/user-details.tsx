import { Building2, Mail, MapPin, UserRound } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { formatWebsite } from "@/lib/utils";
import type { User } from "@/features/users/types/user";

interface UserDetailsProps {
  user: User;
}

function DetailItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  if (!value) {
    return (
      <div>
        <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </dt>
        <dd className="mt-1 text-sm text-slate-400">Not provided</dd>
      </div>
    );
  }

  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-slate-800 dark:text-slate-100">
        {href ? (
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center gap-2">
        <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
          {title}
        </h2>
      </div>
      <dl className="grid gap-4 sm:grid-cols-2">{children}</dl>
    </section>
  );
}

export function UserDetails({ user }: UserDetailsProps) {
  const addressParts = [
    user.address?.street,
    user.address?.suite,
    user.address?.city,
    user.address?.zipcode,
  ].filter(Boolean);
  const fullAddress = addressParts.join(", ");
  const website = user.website?.trim() ?? "";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Avatar name={user.name} size="lg" />
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {user.name}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              @{user.username}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="Profile" icon={UserRound}>
          <DetailItem label="Full name" value={user.name} />
          <DetailItem label="Username" value={user.username} />
        </Section>

        <Section title="Contact information" icon={Mail}>
          <DetailItem
            label="Email"
            value={user.email}
            href={user.email ? `mailto:${user.email}` : undefined}
          />
          <DetailItem
            label="Phone"
            value={user.phone}
            href={user.phone ? `tel:${user.phone}` : undefined}
          />
          <DetailItem
            label="Website"
            value={website}
            href={website ? formatWebsite(website) : undefined}
          />
        </Section>

        <Section title="Address" icon={MapPin}>
          <div className="sm:col-span-2">
            <DetailItem label="Full address" value={fullAddress} />
          </div>
          <DetailItem label="Street" value={user.address?.street ?? ""} />
          <DetailItem label="City" value={user.address?.city ?? ""} />
          <DetailItem label="ZIP code" value={user.address?.zipcode ?? ""} />
        </Section>

        <Section title="Company" icon={Building2}>
          <DetailItem label="Company name" value={user.company?.name ?? ""} />
          <DetailItem
            label="Catchphrase"
            value={user.company?.catchPhrase ?? ""}
          />
          <div className="sm:col-span-2">
            <DetailItem label="Business" value={user.company?.bs ?? ""} />
          </div>
        </Section>
      </div>
    </div>
  );
}
