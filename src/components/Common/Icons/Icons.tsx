import { IoMdClose } from "react-icons/io";
import { MdNavigateNext } from "react-icons/md";
import { IoIosArrowBack, IoIosCloudUpload } from "react-icons/io";

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
          back: <IoIosArrowBack size={size} color={color} />,
          upload: <IoIosCloudUpload size={size} color={color} />,
          close: <IoMdClose size={size} color={color} />,
          next: <MdNavigateNext size={size} color={color} />,
        }[type]
      }
    </div>
  );
};

export default Icons;
