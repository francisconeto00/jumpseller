import { type ReactNode } from "react";
interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <div className="p-4">
      <h1 className="text-right text-lg font-bold text-rose-600">
        Francisco Neto {"<>"} Jumpseller{" "}
      </h1>
      {children}
    </div>
  );
}
