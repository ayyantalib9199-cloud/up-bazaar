import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Search, Menu, X, Trash2, Plus, Minus, Star, Heart, ArrowRight, CheckCircle, MapPin, PlusCircle, Upload, ChevronDown } from 'lucide-react';

// --- Mock Data ---
const COLLEGES = [
  "All Colleges",
  "Aligarh Muslim University (AMU)",
  "Allahabad University",
  "Amity University, Noida",
  "Babasaheb Bhimrao Ambedkar University (BBAU)",
  "Banaras Hindu University (BHU)",
  "bundelkhand Institute of Engineering & Technology (BIET), Jhansi",
  "Bennett University, Greater Noida",
  "Bundelkhand University, Jhansi",
  "Chhatrapati Shahu Ji Maharaj University (CSJMU), Kanpur",
  "Chaudhary Charan Singh University (CCSU), Meerut",
  "Deen Dayal Upadhyaya Gorakhpur University (DDU)",
  "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
  "Dr. Ram Manohar Lohia Avadh University (RMLAU), Ayodhya",
  "Galgotias University, Greater Noida",
  "GLA University, Mathura",
  "Harcourt Butler Technical University (HBTU), Kanpur",
  "institute of Engineering and Technology (IET), Lucknow",
  "IIIT Allahabad",
  "IIIT Lucknow",
  "IIT BHU, Varanasi",
  "IIT Kanpur",
  "Integral University, Lucknow",
  "Kamla Nehru Institute of Technology (KNIT), Sultanpur",
  "King George's Medical University (KGMU), Lucknow",
  "Lucknow University",
  "Madan Mohan Malaviya University of Technology (MMMUT)",
  "Mahatma Gandhi Kashi Vidyapith (MGKVP), Varanasi",
  "Mahatma Jyotiba Phule Rohilkhand University (MJPRU), Bareilly",
  "Motilal Nehru National Institute of Technology (MNNIT), Allahabad",
  "Sharda University, Greater Noida",
  "Shiv Nadar University, Greater Noida",
  "Veer Bahadur Singh Purvanchal University (VBSPU), Jaunpur"
];

const CATEGORIES = ["All", "Books & Notes", "Mattresses", "Utensils", "Electronics", "Bicycles", "Furniture"];

const PRODUCTS = [
  {
    id: 1,
    name: "Sleepwell Mattress (Single)",
    price: 850,
    category: "Mattresses",
    college: "Lucknow University",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    description: "Used for 1 year, good condition. foam mattress perfect for hostel beds."
  },
  {
    id: 2,
    name: "Engineering Physics + Math Books",
    price: 400,
    category: "Books & Notes",
    college: "Kamla Nehru Institute of Technology (KNIT), Sultanpur",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
    description: "1st year B.Tech books set. No torn pages, highlighted notes included."
  },
  {
    id: 3,
    name: "Prestige Induction Cooktop",
    price: 1200,
    category: "Electronics",
    college: "Banaras Hindu University (BHU)",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    description: "Working perfectly. Saves gas money. Cable included."
  },
  {
    id: 4,
    name: "Steel Dinner Set (Thali, Bowl, Glass)",
    price: 250,
    category: "Utensils",
    college: "IIT Kanpur",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80",
    description: "Complete stainless steel set for one person. Rust-free."
  },
  {
    id: 5,
    name: "Atlas Cycle (Needs Service)",
    price: 1500,
    category: "Bicycles",
    college: "Aligarh Muslim University (AMU)",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1485965120184-e224f723d621?auto=format&fit=crop&w=800&q=80",
    description: "Standard cycle. Brakes need tightening, otherwise runs smooth."
  },
  {
    id: 6,
    name: "Foldable Study Table",
    price: 600,
    category: "Furniture",
    college: "Amity University, Noida",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=800&q=80",
    description: "Wooden finish, foldable legs. Can be used on bed."
  },
  {
    id: 7,
    name: "Scientific Calculator fx-991ES",
    price: 550,
    category: "Electronics",
    college: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587145820266-a7951b81b37b?auto=format&fit=crop&w=800&q=80",
    description: "Original Casio calculator. Essential for engineering exams."
  },
  {
    id: 8,
    name: "Electric Kettle (1.5L)",
    price: 450,
    category: "Utensils",
    college: "Allahabad University",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1585239757424-4b5c7f8c0944?auto=format&fit=crop&w=800&q=80",
    description: "Boils water in 2 mins. Great for Maggi and Coffee."
  }
];

// --- Components ---

const CollegeSelector = ({ selectedCollege, setSelectedCollege, isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredColleges = query === "" 
    ? COLLEGES 
    : COLLEGES.filter((c) => c.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className={`relative ${isMobile ? 'w-full' : 'w-72'}`} ref={wrapperRef}>
      <div 
        className={`flex items-center bg-gray-100 px-3 py-2 border border-transparent transition-all duration-200 ${
          isMobile ? 'rounded-lg w-full' : 'rounded-full cursor-pointer hover:bg-gray-200'
        } ${isOpen ? 'ring-2 ring-orange-500 bg-white shadow-sm' : ''}`}
        onClick={() => {
            if(!isOpen) {
                setIsOpen(true);
                setQuery(""); 
            }
        }}
      >
        <MapPin className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
        <input 
            type="text"
            className="bg-transparent border-none focus:ring-0 text-sm font-medium text-gray-700 w-full outline-none placeholder-gray-500 cursor-pointer"
            placeholder="Select College..."
            value={isOpen ? query : selectedCollege}
            onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
            }}
            onFocus={() => {
                setQuery("");
                setIsOpen(true);
            }}
        />
        <div className="ml-1 text-gray-400">
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[280px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto animate-fadeIn">
            {filteredColleges.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">No college found</div>
            ) : (
                filteredColleges.map((college) => (
                    <div
                        key={college}
                        className={`px-4 py-3 text-sm cursor-pointer border-b border-gray-50 last:border-none transition-colors ${
                            selectedCollege === college ? 'bg-orange-50 text-orange-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCollege(college);
                            setIsOpen(false);
                        }}
                    >
                        {college}
                    </div>
                ))
            )}
        </div>
      )}
    </div>
  );
};

const Navbar = ({ cartCount, setIsCartOpen, activeCategory, setActiveCategory, searchTerm, setSearchTerm, selectedCollege, setSelectedCollege, setIsSellModalOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setActiveCategory("All")}>
            <div className="bg-orange-600 text-white p-2 rounded-lg mr-2">
              <ShoppingBagIcon className="h-6 w-6" />
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900 tracking-tight block leading-none">UP Campus</span>
              <span className="text-xs text-orange-600 font-semibold tracking-wider">BAZAAR</span>
            </div>
          </div>

          {/* College Selector (Desktop) */}
          <div className="hidden lg:block ml-6 mr-4">
             <CollegeSelector selectedCollege={selectedCollege} setSelectedCollege={setSelectedCollege} />
          </div>

          {/* Search & Actions */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-1 justify-end">
            <div className="hidden md:flex relative text-gray-400 focus-within:text-gray-600 w-full max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
                onClick={() => setIsSellModalOpen(true)}
                className="hidden md:flex items-center px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-full hover:bg-orange-700 focus:outline-none transition-colors shadow-sm flex-shrink-0"
            >
                <PlusCircle className="h-4 w-4 mr-1.5" />
                Sell
            </button>

            <button
              className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none flex-shrink-0"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="px-4 py-3 space-y-3">
             <div className="mb-2">
                 <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Select College</label>
                 <CollegeSelector selectedCollege={selectedCollege} setSelectedCollege={setSelectedCollege} isMobile={true} />
             </div>
             
             <input
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => { setIsSellModalOpen(true); setIsMenuOpen(false); }}
                className="w-full flex items-center justify-center px-4 py-2 bg-orange-600 text-white text-base font-medium rounded-md hover:bg-orange-700"
            >
                <PlusCircle className="h-5 w-5 mr-2" />
                Sell Item
            </button>
          </div>
          <div className="px-2 pt-2 pb-3 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setIsMenuOpen(false);
                }}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeCategory === cat ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-gray-100 text-gray-700 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Desktop Categories Bar */}
      <div className="hidden md:block bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex space-x-8 overflow-x-auto py-3 no-scrollbar">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                        activeCategory === cat ? 'text-orange-600 border-b-2 border-orange-600 pb-2 -mb-2.5' : 'text-gray-500 hover:text-gray-900'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
              </div>
          </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <div className="relative bg-orange-900 overflow-hidden">
    <div className="absolute inset-0">
      <img
        className="w-full h-full object-cover opacity-30"
        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80"
        alt="College Campus"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-orange-900 to-transparent opacity-90"></div>
    </div>
    <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
        Student to Student.
      </h1>
      <p className="mt-4 text-xl text-orange-100 max-w-2xl">
        Buy and sell second-hand books, mattresses, utensils, and notes within UP colleges. Save money and reduce waste.
      </p>
      <div className="mt-8 flex space-x-4">
        <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-orange-700 bg-white hover:bg-orange-50 shadow-lg">
          Browse Items
        </button>
        <button className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-orange-800 bg-transparent">
          Sell Now
        </button>
      </div>
    </div>
  </div>
);

const ProductCard = ({ product, addToCart }) => (
  <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
    <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden bg-gray-200 relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
        {product.college}
      </div>
    </div>
    <div className="flex-1 p-4 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {product.name}
            </h3>
            <p className="text-lg font-bold text-orange-600">₹{product.price}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
        <div className="mt-2 flex items-center">
             <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                />
                ))}
             </div>
            <span className="ml-1 text-xs text-gray-500">({product.rating})</span>
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{product.description}</p>
      </div>
      <button
        onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
        }}
        className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 transition-colors"
      >
        Contact Seller / Buy
      </button>
    </div>
  </div>
);

const CartSidebar = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, checkout }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col h-full animate-slideInRight">
          <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-medium text-gray-900">Interested Items</h2>
              <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={onClose}>
                 <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-8">
              {cart.length === 0 ? (
                <div className="text-center py-10">
                  <div className="mx-auto h-12 w-12 text-gray-300 flex items-center justify-center rounded-full bg-gray-100 mb-3">
                    <ShoppingBagIcon className="h-6 w-6" />
                  </div>
                  <p className="mt-2 text-gray-500">You haven't selected any items yet.</p>
                </div>
              ) : (
                <div className="flow-root">
                  <ul className="-my-6 divide-y divide-gray-200">
                    {cart.map((product) => (
                      <li key={product.id} className="py-6 flex">
                        <div className="flex-shrink-0 w-20 h-20 border border-gray-200 rounded-md overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>

                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{product.name}</h3>
                              <p className="ml-4">₹{product.price * product.quantity}</p>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">{product.college}</p>
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <div className="text-gray-500">
                                Qty: {product.quantity}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(product.id)}
                              className="font-medium text-red-600 hover:text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {cart.length > 0 && (
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6 bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Estimated</p>
                <p>₹{subtotal}</p>
              </div>
              <p className="mt-0.5 text-xs text-gray-500">Meet seller on campus to verify item before paying.</p>
              <div className="mt-6">
                <button
                  onClick={checkout}
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700"
                >
                  Contact Sellers
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SellModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
             <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
             <div className="flex items-center justify-center min-h-screen p-4">
                <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-6 overflow-hidden">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-xl font-bold text-gray-900">Sell an Item</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); alert("Listing Submitted for Review!"); }}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Item Name</label>
                            <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm border p-2" placeholder="e.g. 1st Year Chemistry Books" required />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                                <input type="number" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm border p-2" placeholder="500" required />
                             </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm border p-2">
                                    {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                                </select>
                             </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm border p-2" placeholder="Condition, how old it is, etc." required></textarea>
                        </div>

                        <div>
                             <label className="block text-sm font-medium text-gray-700">Upload Photo</label>
                             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:bg-gray-50 cursor-pointer">
                                <div className="space-y-1 text-center">
                                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none">
                                            <span>Upload a file</span>
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                </div>
                             </div>
                        </div>

                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                            Post Ad
                        </button>
                    </form>
                </div>
             </div>
        </div>
    );
}

const CheckoutSuccess = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    <div>
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Interest Sent!</h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    We have notified the sellers. Check your student email for their contact details to arrange a meetup on campus.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                        <button
                            type="button"
                            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:text-sm"
                            onClick={onClose}
                        >
                            Back to Bazaar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Icon helper
const ShoppingBagIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);


// --- Main App Component ---

const App = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("All Colleges");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Filter products
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesCollege = selectedCollege === "All Colleges" || product.college === selectedCollege;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && matchesCollege;
  });

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleCheckout = () => {
      setTimeout(() => {
          setCart([]);
          setIsCartOpen(false);
          setShowSuccess(true);
      }, 500);
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar
        cartCount={cartCount}
        setIsCartOpen={setIsCartOpen}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCollege={selectedCollege}
        setSelectedCollege={setSelectedCollege}
        setIsSellModalOpen={setIsSellModalOpen}
      />

      {/* Conditionally render Hero only on "All" view to save space when browsing deeply */}
      {activeCategory === "All" && !searchTerm && (
        <Hero />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    {activeCategory === "All" ? "Fresh Listings" : `${activeCategory}`}
                </h2>
                {selectedCollege !== "All Colleges" && (
                    <span className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {selectedCollege}
                    </span>
                )}
            </div>
            <p className="text-gray-500 mt-2 md:mt-0">
                Found {filteredProducts.length} items
            </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-xl border border-dashed border-gray-300">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Search className="h-8 w-8 text-gray-400" />
             </div>
            <h3 className="text-lg font-medium text-gray-900">No items found</h3>
            <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                No one in {selectedCollege} is selling {searchTerm || "this item"} right now.
            </p>
            <button 
                onClick={() => {setActiveCategory("All"); setSearchTerm(""); setSelectedCollege("All Colleges")}}
                className="mt-4 text-orange-600 hover:text-orange-800 font-medium"
            >
                View all items in UP
            </button>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <span className="text-gray-400 hover:text-gray-500">Facebook</span>
            <span className="text-gray-400 hover:text-gray-500">Instagram</span>
            <span className="text-gray-400 hover:text-gray-500">Twitter</span>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2024 UP Campus Bazaar. Built for Students.
            </p>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        checkout={handleCheckout}
      />
      <SellModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
      />
      <CheckoutSuccess 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
};

export default App;