import { Link } from "react-router-dom"

const ButtonBack = () => {
  return (
   <Link to='/register' className="hover:cursor-pointer font-manrope font-bold text-[20px] absolute left-4 top-4">
      ← Kembali
   </Link>
  )
}

export default ButtonBack