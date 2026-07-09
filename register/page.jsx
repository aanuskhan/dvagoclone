//
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, ShoppingCart, LogOut } from "lucide-react";

export default function LoginRegisterPage() {
  const router = useRouter();
  const [tab, setTab] = useState("login");
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Check if user already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("dvago_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const validateLogin = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter valid email";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Min 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    else if (formData.name.length < 3) newErrors.name = "Min 3 characters";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter valid email";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Min 6 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setLoading(true);
    setTimeout(() => {
      if (
        formData.email === "test@dvago.pk" &&
        formData.password === "123456"
      ) {
        const userData = {
          name: "Test User",
          email: formData.email,
          loggedIn: true,
        };
        localStorage.setItem("dvago_user", JSON.stringify(userData));
        setUser(userData);

        // Redirect back if user came from add to cart
        const redirect = localStorage.getItem("redirect_after_login") || "/";
        localStorage.removeItem("redirect_after_login");
        router.push(redirect);
      } else {
        setErrors({ submit: "Invalid email or password" });
      }
      setLoading(false);
    }, 1000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    setLoading(true);
    setTimeout(() => {
      const userData = {
        name: formData.name,
        email: formData.email,
        loggedIn: true,
      };
      localStorage.setItem("dvago_user", JSON.stringify(userData));
      setUser(userData);

      const redirect = localStorage.getItem("redirect_after_login") || "/";
      localStorage.removeItem("redirect_after_login");
      router.push(redirect);
      setLoading(false);
    }, 1000);
  };

  // LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("dvago_user");
    localStorage.removeItem("dvago_cart");
    setUser(null);
    setTab("login");
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  // DVAGO LOGIC: Direct redirect to /login if not logged in
  const handleAddToCart = (product) => {
    if (!user?.loggedIn) {
      // Save current page and product to add after login
      localStorage.setItem("redirect_after_login", window.location.pathname);
      localStorage.setItem("pending_cart_item", JSON.stringify(product));
      router.push("/login"); // Direct redirect to login page
      return false;
    }

    // User logged in - proceed with cart
    const cart = JSON.parse(localStorage.getItem("dvago_cart") || "[]");
    cart.push(product);
    localStorage.setItem("dvago_cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    return true;
  };

  const switchTab = (newTab) => {
    setTab(newTab);
    setErrors({});
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  // If already logged in, show message
  if (user?.loggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-md p-8 text-center shadow-2xl">
          <div className="mb-4 flex justify-center">
            <svg width="74" height="73" viewBox="0 0 74 73" fill="none">
              <path
                d="M37 11L14 41L37 71L60 41L37 11Z"
                stroke="#76bc21"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Already Logged In
          </h2>
          <p className="text-gray-500 mb-6">Welcome back, {user.name}!</p>

          <button
            onClick={() => router.push("/")}
            className="w-full bg-[#76bc21] hover:bg-[#5a9518] text-white font-semibold py-3 rounded-lg transition mb-3"
          >
            Go to Shop
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-white border-2 border-[#76bc21] hover:bg-gray-50 text-[#76bc21] font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            LOGOUT
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative shadow-2xl">
        {/* V Logo Tab - Dvago Logo */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-t-full w-16 h-12 flex items-start justify-center pt-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3L4 11L12 19L20 11L12 3Z"
              stroke="#76bc21"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="px-8 pt-12 pb-8">
          <h2 className="text-3xl font-semibold text-gray-700 text-center mb-2">
            {tab === "login" ? "Hey There!" : "Join DVAGO"}
          </h2>
          <p className="text-gray-500 text-center text-sm mb-6">
            {tab === "login"
              ? "Login below as a Customer to explore more"
              : "Create your account"}
          </p>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => switchTab("login")}
              className={`flex-1 py-2 text-sm font-semibold transition ${
                tab === "login"
                  ? "text-[#76bc21] border-b-2 border-[#76bc21]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              LOGIN
            </button>
            <button
              onClick={() => switchTab("register")}
              className={`flex-1 py-2 text-sm font-semibold transition ${
                tab === "register"
                  ? "text-[#76bc21] border-b-2 border-[#76bc21]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              REGISTER
            </button>
          </div>

          {/* LOGIN FORM */}
          {tab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none transition ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#76bc21]"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password*"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none transition ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#76bc21]"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {errors.submit && (
                <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded">
                  {errors.submit}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#76bc21] hover:bg-[#5a9518] disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition mt-6"
              >
                {loading ? "LOGGING IN..." : "LOGIN"}
              </button>
              <p className="text-sm text-gray-600 mt-4 text-center">OR</p>

              <p className="text-sm text-gray-600 mt-4 text-center">
                LOGIN AS ADMIN?{" "}
                <a href="/adminLogin" className="text-blue-600 hover:underline">
                  Login as an Administrator
                </a>
              </p>
            </form>
          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name*"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none transition ${
                    errors.name
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#76bc21]"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address*"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none transition ${
                    errors.email
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#76bc21]"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password*"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none transition ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#76bc21]"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Confirm Password*"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none transition ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300 focus:border-[#76bc21]"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#76bc21] hover:bg-[#5a9518] disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition mt-6"
              >
                {loading ? "CREATING ACCOUNT..." : "REGISTER"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
