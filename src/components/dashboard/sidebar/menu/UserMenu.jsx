import { FcSettings } from "react-icons/fc";
import MenuItem from "./MenuItem";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaAward } from "react-icons/fa";

const UserMenu = () => {
  return (
    <div>
      <MenuItem
                icon={FaBookOpenReader}
                label="My Participated Contest"
                address="my-participated-contest"
              />
              <MenuItem
                icon={FaAward}
                label="My Winning Contest"
                address="my-winning-contest"
              />
      <MenuItem label={"Profile"} address="/dashboard/my-profile" icon={FcSettings} />
    </div>
  );
};

export default UserMenu;