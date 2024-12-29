import { Fot1, Fot2 } from "./index";

const Footer = () => {
  const footerNavs = [
    { href: "javascript:void(0)", name: "Terms" },
    { href: "javascript:void(0)", name: "License" },
    { href: "javascript:void(0)", name: "Privacy" },
    { href: "javascript:void(0)", name: "About us" },
  ];

  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="justify-between sm:flex">
          <div className="space-y-6">
            <img
              src="https://media.istockphoto.com/id/1313843101/vector/blue-logistics-logo-with-lines-highway-vector.jpg?s=612x612&w=0&k=20&c=8mueJQSnrwO6Mr-oRp12v3drokq1RJJZj6PWvmFjmWY="
              className="w-32"
              alt="Float UI Logo"
            />
            <p className="max-w-md">
             All Your supply chain Services
            </p>
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {footerNavs.map((item, idx) => (
                <li
                  key={idx}
                  className="text-gray-800 hover:text-gray-500 duration-150"
                >
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-gray-700 font-semibold">Get the app</p>
            <div className="flex items-center gap-3 mt-3 sm:block">
              <a href="javascript:void(0)">
                <Fot1 />
              </a>
              <a href="javascript:void(0)" className="mt-0 block sm:mt-3">
                <Fot2 />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 py-10 border-t text-center">
          <p>Logistics | All right reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
