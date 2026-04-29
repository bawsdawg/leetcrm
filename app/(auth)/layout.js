export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-black px-4 py-10">
      {children}
    </div>
  );
}
