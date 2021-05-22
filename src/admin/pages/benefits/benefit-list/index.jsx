import React from 'react';

import { withRouter } from 'react-router';

import TabsController from './../../../../common/tabs/controller';
import Tabs from './../../../../common/tabs/index';
import TabsHeader from './../../../../common/tabs/headers/index';
import TabHeader from './../../../../common/tabs/headers/header/index';
import TabsContent from './../../../../common/tabs/contents/index';
import TabContent from './../../../../common/tabs/contents/content/index';
import AgreementsList from './agreements/index';
import HealthsList from './healths/index';

class BenefitListTabs extends TabsController {
  constructor(props) {
    super(props, 'agreements');
  }

  render() {
    return (
      <Tabs>
        <TabsHeader>
          <TabHeader onClick={ this.changeTab } target="agreements" current={ this.state.tabActive } title="Convênios"/>
          <TabHeader onClick={ this.changeTab } target="healths" current={ this.state.tabActive } title="Saúde"/>
        </TabsHeader>
        <TabsContent>
          <TabContent id="agreements" current={ this.state.tabActive }>
            <AgreementsList />
          </TabContent>
          <TabContent id="healths" current={ this.state.tabActive }>
            <HealthsList />
          </TabContent>
        </TabsContent>
      </Tabs>
    );
  }
}

export default withRouter(BenefitListTabs);
