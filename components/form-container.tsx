export function FormContainer({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <div className="md:px-20 md:mt-20">{children}</div>;
}
