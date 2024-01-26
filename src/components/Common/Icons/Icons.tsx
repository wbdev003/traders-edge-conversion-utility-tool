import { IoMdClose } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import {
  IoIosArrowBack,
  IoMdDownload,
  IoIosCloudUpload,
  IoIosHelp,
} from "react-icons/io";
import { FaCheckCircle, FaEdit } from "react-icons/fa";

interface IIcons {
  type: string;
  size: number;
  color?: string;
}

const Icons = ({ type, size, color }: IIcons) => {
  return (
    <div className="text-white">
      {
        {
          check: <FaCheckCircle size={size} color={color} />,
          help: <IoIosHelp size={size} color={color} />,
          back: <IoIosArrowBack size={size} color={color} />,
          upload: <IoIosCloudUpload size={size} color={color} />,
          close: <IoMdClose size={size} color={color} />,
          next: <MdNavigateNext size={size} color={color} />,
          download: <IoMdDownload size={size} color={color} />,
        }[type]
      }
    </div>
  );
};

export default Icons;
