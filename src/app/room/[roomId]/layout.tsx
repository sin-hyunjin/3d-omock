export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={` antialiased`}>{children}</div>;
}
