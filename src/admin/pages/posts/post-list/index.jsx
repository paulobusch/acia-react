import React from 'react';

import { withRouter } from 'react-router';

import TabsController from './../../../../common/tabs/controller';
import Tabs from './../../../../common/tabs/index';
import TabsHeader from './../../../../common/tabs/headers/index';
import TabHeader from './../../../../common/tabs/headers/header/index';
import TabsContent from './../../../../common/tabs/contents/index';
import TabContent from './../../../../common/tabs/contents/content/index';
import ActionList from './actions/index';
import ArticlesList from './articles/index';

class PostListTabs extends TabsController {
  constructor(props) {
    super(props, 'actions');
  }

  render() {
    return (
      <Tabs>
        <TabsHeader>
          <TabHeader onClick={ this.changeTab } target="actions" current={ this.state.tabActive } title="Acia em Ação"/>
          <TabHeader onClick={ this.changeTab } target="articles" current={ this.state.tabActive } title="Artigos"/>
        </TabsHeader>
        <TabsContent>
          <TabContent id="actions" current={ this.state.tabActive }>
            <ActionList/>
          </TabContent>
          <TabContent id="articles" current={ this.state.tabActive }>
            <ArticlesList/>
          </TabContent>
        </TabsContent>
      </Tabs>
    );
  }
}

export default withRouter(PostListTabs);
