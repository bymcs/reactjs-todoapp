import { DiGithubBadge } from "react-icons/di";

const Footer = () => {
    
    return (
        
      <footer className="flex items-center justify-between bg-gray-100 px-4 py-2 fixed bottom-0 left-0 right-0">
        <div className="flex items-center">
        <a href="https://github.com/bymcs" className="flex items-center mr-4 text-gray-500 hover:text-gray-700">
          <DiGithubBadge className="mr-2" size={25} /> Github
        </a>
        </div>
        <p className="flex items-center flex-grow justify-center text-gray-500">2023</p>
        <div className="flex items-center">
          <img
            src="https://avatars.githubusercontent.com/u/56798318"
            alt="Profile"
            className="w-6 h-6 rounded-full mr-2"
          />
          <p className="text-gray-500">BYMCS</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;