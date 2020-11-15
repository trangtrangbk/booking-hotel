import React from "react";
import Information from "./Infomation";
import Password from "./Password";
import Setup from "./Setup";
import TabComponent from "../../../components/Tabs";
import { useSelector } from "react-redux";
const Profile = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="content" style={{ padding: "20px" }}>
      {user?.linked ? (
        <TabComponent tabs={["Information", "Setup"]}>
          <Information />
          <Setup />
        </TabComponent>
      ) : (
        <TabComponent tabs={["Information", "Password", "Setup"]}>
          <Information />
          <Password />
          <Setup />
        </TabComponent>
      )}
    </div>
  );
};

export default Profile;
