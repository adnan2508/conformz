import { HiClipboardList } from "react-icons/hi";
import { IoIosAddCircle } from "react-icons/io";
import { IoListCircle } from "react-icons/io5";
import MenuItem from "./MenuItem";

const CreatorMenu = () => {
  return (
    <div>
      <MenuItem label={"Add Contest"} address="/dashboard/add-contest"
        icon={IoIosAddCircle}
      />
      <MenuItem label={"My Created Contest"} address="/dashboard/my-created-contest"
        icon={HiClipboardList}
      />
      <MenuItem label={"Contest Submitted"} address="/dashboard/contest-submitted"
        icon={IoListCircle}
      />
    </div>
  );
};

export default CreatorMenu;
