import React from 'react';

import { withRouter } from 'react-router';

import TabsController from './../../../../common/tabs/controller';
import Tabs from './../../../../common/tabs/index';
import TabsHeader from './../../../../common/tabs/headers/index';
import TabHeader from './../../../../common/tabs/headers/header/index';
import TabsContent from './../../../../common/tabs/contents/index';
import TabContent from './../../../../common/tabs/contents/content/index';
import PresidencyForm from './presidency/index';

class BoardTabs extends TabsController {
  constructor(props) {
    super(props, 'presidency');
  }

  render() {
    return (
      <Tabs>
        <TabsHeader>
          <TabHeader onClick={ this.changeTab } target="presidency" current={ this.state.tabActive } title="Presidência"/>
          <TabHeader onClick={ this.changeTab } target="vice-presidency" current={ this.state.tabActive } title="Vice Presidência"/>
          <TabHeader onClick={ this.changeTab } target="secretaries" current={ this.state.tabActive } title="Secretários"/>
          <TabHeader onClick={ this.changeTab } target="treasurers" current={ this.state.tabActive } title="Tesoureiros"/>
          <TabHeader onClick={ this.changeTab } target="direction" current={ this.state.tabActive } title="Direção"/>
        </TabsHeader>
        <TabsContent>
          <TabContent id="presidency" current={ this.state.tabActive }>
            <PresidencyForm />
          </TabContent>
          <TabContent id="vice-presidency" current={ this.state.tabActive }>
            vice-presidency
          </TabContent>
          <TabContent id="secretaries" current={ this.state.tabActive }>
            secretaries
          </TabContent>
          <TabContent id="treasurers" current={ this.state.tabActive }>
            treasurers
          </TabContent>
          <TabContent id="direction" current={ this.state.tabActive }>
            direction
          </TabContent>
        </TabsContent>
      </Tabs>
    );
  }
}

export default withRouter(BoardTabs);
