import React from "react";
import { Tabs } from "antd";
const { TabPane } = Tabs;

function Room_Payment() {
  return (
    <div className="mt-5 ml-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>s</h1>
        </TabPane>

        <TabPane tab="Bookings" key="2">
          <h1>k</h1>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Room_Payment;
