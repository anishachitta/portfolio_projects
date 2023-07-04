import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
export default function ReactTabs() {
  const [tabKey, setTabKey] = useState("one");
  return (
    <div>
      <h2 class="h1">User Management</h2>
      <Tabs activeKey={tabKey} onSelect={(e) => setTabKey(e)}>
        <Tab eventKey="one" title="Users">
          <p>User Administration</p>
          <Tab1 />
        </Tab>
        <Tab eventKey="two" title="Roles">
          <p>Roles Management</p>
          <Tab2 />
        </Tab>
        <Tab eventKey="three" title="Permissions">
          <p>Permissions</p>
          <Tab3 />
        </Tab>
      </Tabs>
    </div>
  );
}
