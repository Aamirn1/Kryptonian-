import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Programme",
  description:
    "Join the Krypton Digital Partner Programme. Collaborate with us to deliver exceptional digital solutions.",
};

export default function PartnerProgrammeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
