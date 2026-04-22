import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LOGO-HDNOBG.png";

export default function ContactCard() {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const closeCard = () => {
    setShow(false);
  };

  const goToContact = () => {
    navigate("/contact-us");
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-9999 w-[95%] max-w-md">
      <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">

        {/* CLOSE BUTTON */}
        <button
          onClick={closeCard}
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-lg"
        >
          ✕
        </button>

        {/* CONTENT */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={logo}
              alt="Soul FM Logo"
              className="w-12 h-12 object-contain bg-black rounded-md p-1"
            />

            <h3 className="text-xl font-semibold text-gray-800">
              Reach Out Now
            </h3>
          </div>

          <p className="text-sm text-gray-600 leading-6 mb-6">
            You’ll have the dance floor alive and unforgettable moments in no
            time when you trust our DJs to bring the music.
          </p>

          {/* CTA BUTTON */}
          <button
            onClick={goToContact}
            className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
          >
            Contact us
            <span className="text-lg">›</span>
          </button>
        </div>

      </div>
    </div>
  );
}