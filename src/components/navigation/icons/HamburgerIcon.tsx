export default function HamburgerIcon() {
  return (
    <div className="relative h-5 w-6">
      <span className="absolute left-0 top-0 h-[2.5px] w-6 rounded-full bg-white" />
      <span className="absolute left-0 top-[8px] h-[2.5px] w-6 rounded-full bg-white" />
      <span className="absolute left-0 top-4 h-[2.5px] w-6 rounded-full bg-white" />
    </div>
  );
}