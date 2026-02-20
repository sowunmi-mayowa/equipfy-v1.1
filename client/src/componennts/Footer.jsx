import React from "react";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import { FaBars, FaWhatsapp } from "react-icons/fa";
import { PiPhoneThin } from "react-icons/pi";
import { logo } from "../assets";
import { Link } from "react-router-dom";
import Hr from "./Hr";

const Footer = () => {
  return (
    <div style={{ background: "rgba(250, 250, 250, 0.50)" }}>
      <div className=" py-12 mx-8 md:mx-12 xl:mx-auto xl:max-w-6xl">
        <div className="flex gap-4  md:items-start justify-between flex-col md:flex-row md:flex-wrap md:gap-12 lg:gap-0 lg:flex-nowrap font-aeonik capitalize">
          <div>
            <img src={logo} alt="logo" className="w-4xl" />
          </div>
          {/* <div>
            <ul>
              <li className="text-eBlack font-bold text-base mb-4">About Us</li>
              <li className="text-[#747474] text-sm font-medium mb-2">
                Help Center
              </li>
              <li className="text-[#747474] text-sm font-medium">Team</li>
            </ul>
          </div> */}
          <div>
            <ul>
              <li className="text-eBlack font-bold text-base mb-4">buyers</li>
              <li className="text-[#747474] text-sm font-medium mb-2">
                <Link to="/buy">Browse Equipment</Link>
              </li>
              <li className="text-[#747474] text-sm font-medium mb-2">
                Fleet & telematics
              </li>
              <li className="text-[#747474] text-sm font-medium">
                Part & Tools
              </li>
              <li className="text-[#747474] text-sm font-medium">Finance</li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="text-eBlack font-bold text-base mb-4">Features</li>
              <li className="text-[#747474] text-sm font-medium mb-2">
                About Us
              </li>
              <li className="text-[#747474] text-sm font-medium mb-2">
                Request Service
              </li>
              <li className="text-[#747474] text-sm font-medium">
                Parts Ordering
              </li>
              <li className="text-[#747474] text-sm font-medium">
                Technician Requests
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="text-eBlack font-bold text-base mb-4">Privacy</li>
              <li className="text-[#747474] text-sm font-medium mb-2">
                Cookies
              </li>
              <li className="text-[#747474] text-sm font-medium mb-2">
                Privacy Policy
              </li>
              <li className="text-[#747474] text-sm font-medium">
                Terms & Condition
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="text-eBlack font-bold text-base mb-4">
                Contact us
              </li>
              <li className="text-[#747474] text-sm font-medium mb-2">
                <p className="mb-2">
                  Yaba, Lagos <br /> Call or WhatsApp us
                </p>
                <div className="flex items-center font-medium gap-2 ">
                  <PiPhoneThin className="text-2xl" />
                  <details>
                    <summary className=" tracking-wider">
                      Call us:{" "}
                      <span className="font-semibold">+234-702-670-1092</span>
                    </summary>
                    <Link
                      to="https://wa.me/+2347026701092"
                      className="flex gap-2 items-center"
                    >
                      {" "}
                      <FaWhatsapp /> +234-702-670-1092{" "}
                    </Link>
                    <a
                      href="tel:+2347026701092"
                      className="flex gap-2 items-center"
                    >
                      {" "}
                      <PiPhoneThin className="text-2xl" />{" "}
                      +234-702-670-1092{" "}
                    </a>
                  </details>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <Hr />
        <div className="flex items-start md:items-center md:justify-between flex-col gap-4 md:flex-row w-full">
          <p className="text-sm text-[#747474]">&copy; 2026</p>
          {/* <div>
            <ul className="flex gap-2 md:gap-4 flex-col md:flex-row font-aeonik text-sm font-medium capitalize text-[#747474]">
              <li>privacy</li>
              <li>terms and condition</li>
              <li>cookies</li>
            </ul>
          </div> */}
          <p className="md:text-center text-sm text-[#747474]">
            West Africa’s digital dealer for foreign-used equipment, parts, and
            repairs.
          </p>
          <div className="flex gap-2">
            <FiFacebook />
            <FiTwitter />
            <FiInstagram />
            <FiYoutube />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
