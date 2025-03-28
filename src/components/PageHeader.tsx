const PageHeader = ({ title }: { title: string }) => {
  return (
    <>
      <h2 className="self-start">{title}</h2>
      <div className="w-full h-[1px] bg-accent mt-2 mb-5"></div>
    </>
  );
};

export default PageHeader;
