import { FaAlignLeft, FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <div>
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem icon={FaAlignLeft} label="Manage Contest" address="manage-contest" />
    </div>
  );
};

export default AdminMenu;
