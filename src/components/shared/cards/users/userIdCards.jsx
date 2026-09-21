export default function UserIdCard({ children = "HOVER" }) {
  return (
    <div
      className="
        group relative flex h-80 w-[99%] cursor-pointer
        items-center justify-center overflow-hidden
        rounded-[15px] bg-mediumturquoise
        text-[25px] font-bold

        before:absolute before:right-0 before:top-0
        before:z-20 before:flex before:h-1/5 before:w-1/5
        before:items-center before:justify-center
        before:rounded-tr-[15px] before:rounded-bl-[100%]
        before:bg-lightblue
        before:transition-all before:duration-500
        before:content-['']

        after:absolute after:bottom-0 after:left-0
        after:z-20 after:flex after:h-1/5 after:w-1/5
        after:items-center after:justify-center
        after:rounded-tl-[100%] after:rounded-br-[15px]
        after:bg-lightblue
        after:transition-all after:duration-500
        after:content-['']

        hover:before:h-full hover:before:w-full
        hover:before:rounded-[15px]

        hover:after:h-full hover:after:w-full
        hover:after:rounded-[15px]
      "
    >
      {children}
    </div>
  );
}