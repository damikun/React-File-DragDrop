
import clsx from "clsx";


export type CancleButtonProps = {
  onClick: ()=>void;
}

export default function CancleButton({onClick}:CancleButtonProps) {
  return <button
  type="button"
  onClick={onClick}
  className={clsx(
    ` flex-no-wrap 
      bg-transparent 
      my-auto
      h-full  
      font-bold 
      border 
      rounded-md 
      outline-none focus:outline-none 
      transition 
      border-transparent hover:text-red-500
      duration-200`
  )}
>
  <div className="text-xs md:text-sm w-full leading-none">
    X
  </div>
</button> 
}