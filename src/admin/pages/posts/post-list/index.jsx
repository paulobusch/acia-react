import React from 'react';

import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { POST_ACTION, POST_ARTICLE } from '../../../../reducers/posts/post-type';
import TabsController from './../../../../common/tabs/controller';
import Tabs from './../../../../common/tabs/index';
import TabsHeader from './../../../../common/tabs/headers/index';
import TabHeader from './../../../../common/tabs/headers/header/index';
import TabsContent from './../../../../common/tabs/contents/index';
import TabContent from './../../../../common/tabs/contents/content/index';
import ActionList from './actions/index';
import { POST_NEWS } from './../../../../reducers/posts/post-type';
import ArticlesList from './articles/index';
import NewsList from './news/index';

class PostListTabs extends TabsController {
  constructor(props) {
    super(props, 'actions');
  }

  render() {
    return (
      <Tabs>
        <TabsHeader>
          <TabHeader onClick={ this.changeTab } target="actions" current={ this.state.tabActive } title="Acia em Ação"/>
          <TabHeader onClick={ this.changeTab } target="news" current={ this.state.tabActive } title="Notícias"/>
          <TabHeader onClick={ this.changeTab } target="articles" current={ this.state.tabActive } title="Artigos"/>
        </TabsHeader>
        <TabsContent>
          <TabContent id="actions" current={ this.state.tabActive }>
            <ActionList/>
          </TabContent>
          <TabContent id="news" current={ this.state.tabActive }>
            <NewsList/>
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
