import { twMerge } from "tailwind-merge";
const DropDown = ({
  data,
  className,
  animName = "",
  value,
  onChange,
  formdata,
}) => {
  // Check if data.subtext exists and is not an empty string

  return (
    <div
      className={twMerge(
        "mb-4 h-screen flex items-center  justify-center bg-black",
        className
      )}
    >
      <div
        className={`flex flex-col  items-center md:!items-start z-[4] mx-auto w-[95%] ${animName}  `}
      >
        <label className='text-white mb-1 font-bold text-3xl '>
          {data.label}
        </label>
        {data.subtext && (
          <div className='text-gray-400 text-sm text-center md:text-left md:w-4/5'>
            {data.subtext}
          </div>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='bg-transparent border-[1px] cursor-pointer border-green-500 my-4 p-3  text-white rounded-md md:w-[40vw] w-[70vw] focus:outline-none focus:ring focus:border-green-500 dropdown-custom'
          style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.5)" }}
        >
          <option
            value=''
            disabled
            hidden
            className='disabled:bg-black disabled:text-white'
          >
            {data.placeholder}
          </option>
          {data.options.map((option, index) => (
            <option
              className='cursor-pointer bg-black'
              key={index}
              value={option}
              disabled={Object.values(formdata).includes(option)}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropDown;
