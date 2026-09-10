import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '../ui/spaceCard';
import { faCab, faIdCard } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  return (
    // 👇 Full-screen wrapper, relative so Card can absolutely position inside it
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      
      {/* 👇 Animated space card as the background layer */}
      <div className="absolute inset-0 w-full h-full">
        <Card />
      </div>

      {/* 👇 Login form sits on top, centered */}
      <form className="relative z-10 flex flex-col gap-2.5 bg-white/95 backdrop-blur-sm p-8 w-[450px] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] font-sans">
        {/* Email */}
        <div className="flex flex-col">
          <label className="text-[#151717] font-semibold">Email</label>
        </div>
        <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center pl-2.5 transition-all duration-200 ease-in-out focus-within:border-[#2d79f3]">
          <i className="fa-regular fa-envelope text-[18px] text-gray-500 mr-2 w-5 text-center"></i>
          <input
            placeholder="Enter your Email"
            className="border-none w-full h-full bg-transparent text-[15px] outline-none placeholder:text-gray-400 placeholder:font-sans"
            type="email"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-[#151717] font-semibold">Password</label>
        </div>
        <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center pl-2.5 transition-all duration-200 ease-in-out focus-within:border-[#2d79f3]">
          <i className="fa-solid fa-lock text-[18px] text-gray-500 mr-2 w-5 text-center"></i>
          <input
            placeholder="Enter your Password"
            className="border-none w-full h-full bg-transparent text-[15px] outline-none placeholder:text-gray-400 placeholder:font-sans"
            type="password"
          />
        </div>

        {/* Remember me & Forgot password */}
        <div className="flex flex-row items-center gap-2.5 justify-between">
          <div className="flex items-center gap-1.5">
            <input type="checkbox" id="remember" className="m-0 cursor-pointer" />
            <label htmlFor="remember" className="text-sm text-black font-normal">
              Remember me
            </label>
          </div>
          <span className="text-sm text-[#2d79f3] font-medium cursor-pointer">
            Forgot password?
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-5 mb-2.5 bg-[#151717] hover:bg-[#2d79f3] text-white text-[15px] font-medium rounded-[10px] h-[50px] w-full cursor-pointer transition-colors duration-200"
        >
          Sign In
        </button>

        <p className="text-center text-black text-sm my-1">
          Didn't FOund Your account?{' '}
          <span className="text-sm text-[#2d79f3] font-medium cursor-pointer ml-1">
            Contact
          </span>
        </p>

        {/* Divider */}
        <p className="relative text-center text-gray-500 text-sm my-1 before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[30%] before:h-px before:bg-[#e0e0e0] after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[30%] after:h-px after:bg-[#e0e0e0]">
          Or With
        </p>

        {/* Social buttons */}
        <div className="flex flex-row items-center gap-2.5 justify-between">
          <button
            type="button"
            className="mt-2.5 w-full h-12.5 rounded-[10px] flex justify-center items-center font-medium gap-2.5 border border-[#ededef] hover:border-[#2d79f3] hover:bg-[#f8faff] bg-white cursor-pointer transition-all duration-200 text-[15px]"
          >
            <FontAwesomeIcon icon={faCab} />
            Google
          </button>
          <button
            type="button"
            className="mt-2.5 w-full h-12.5 rounded-[10px] flex justify-center items-center font-medium gap-2.5 border border-[#ededef] hover:border-[#2d79f3] hover:bg-[#f8faff] bg-white cursor-pointer transition-all duration-200 text-[15px]"
          >
            <FontAwesomeIcon icon={faIdCard} size='2xl' />
            ID Card
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;