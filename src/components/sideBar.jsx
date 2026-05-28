import {
  LayoutDashboard,
  ReceiptText,
  Wallet,
  User,
  LogOut,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { userLogout } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: ReceiptText, label: "Transaksi", path: "/transaksi" },
    { icon: Wallet, label: "Vault", path: "/vault" },
    { icon: User, label: "Profil", path: "/profile" },
  ];
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      await userLogout(refreshToken);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      navigate("/login");
    } catch (error) {
      console.log(error);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      navigate("/login");
    }
  };
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={false}
        animate={{ x: isOpen || window.innerWidth >= 768 ? 0 : -260 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 w-[260px] bg-white border-r border-slate-200 z-50 flex flex-col py-8"
      >
        <div className="px-8 mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-[#15157D] tracking-tight">
              CukuPin
            </h1>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">
              Financial Health
            </p>
          </div>
          <button
            onClick={onClose}
            className="md:hidden text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-8 py-3.5 transition-all duration-200 ${
                  isActive
                    ? "border-l-4 border-[#15157D] bg-blue-50/50 text-[#15157D] font-semibold"
                    : "text-slate-500 hover:text-[#15157D] hover:bg-slate-50 border-l-4 border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-sm">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="px-8 pt-6 border-t border-slate-100 mt-auto">
          <a
            href="#"
            className="flex items-center gap-3 py-3 text-slate-500 hover:text-[#15157D] transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium" onClick={handleLogout}>
              Logout
            </span>
          </a>
        </div>
      </motion.nav>
    </>
  );
};

export default Sidebar;
