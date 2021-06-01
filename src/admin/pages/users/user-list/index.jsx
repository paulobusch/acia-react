import React, { Component } from 'react';

import { withRouter } from 'react-router';

import Tabs from '../../../../common/tabs';
import TabsContent from '../../../../common/tabs/contents';
import TabContent from '../../../../common/tabs/contents/content';
import TabsHeader from '../../../../common/tabs/headers/index';
import TabHeader from '../../../../common/tabs/headers/header';
import TabsController from '../../../../common/tabs/controller';
import UserListEditor from './editor/index';
import UserListAdmin from './admin/index';

class UserListTabs extends TabsController {
  constructor(props) {
    super(props, 'editors');
  }

  render() {
    return (
      <Tabs>
        <TabsHeader>
          <TabHeader onClick={ this.changeTab } target="editors" current={ this.state.tabActive } title="Editores"/>
          <TabHeader onClick={ this.changeTab } target="admins" current={ this.state.tabActive } title="Administradores"/>
        </TabsHeader>
        <TabsContent>
          <TabContent id="editors" current={ this.state.tabActive }>
            <UserListEditor/>
          </TabContent>
          <TabContent id="admins" current={ this.state.tabActive }>
            <UserListAdmin/>
          </TabContent>
        </TabsContent>
      </Tabs>
    );
  }
}

export default withRouter(UserListTabs);
