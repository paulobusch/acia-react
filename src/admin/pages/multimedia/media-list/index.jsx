import React from 'react';

import { withRouter } from 'react-router';

import TabsController from '../../../../common/tabs/controller';
import Tabs from '../../../../common/tabs/index';
import TabsHeader from '../../../../common/tabs/headers/index';
import TabHeader from '../../../../common/tabs/headers/header/index';
import TabsContent from '../../../../common/tabs/contents/index';
import TabContent from '../../../../common/tabs/contents/content/index';

class MediaListTabs extends TabsController {
  constructor(props) {
    super(props, 'photos');
  }

  render() {
    return (
      <Tabs>
        <TabsHeader>
          <TabHeader onClick={ this.changeTab } target="photos" current={ this.state.tabActive } title="Fotos"/>
          <TabHeader onClick={ this.changeTab } target="videos" current={ this.state.tabActive } title="Vídeos"/>
        </TabsHeader>
        <TabsContent>
          <TabContent id="photos" current={ this.state.tabActive }>
            Fotos
          </TabContent>
          <TabContent id="videos" current={ this.state.tabActive }>
            Vídeos
          </TabContent>
        </TabsContent>
      </Tabs>
    );
  }
}

export default withRouter(MediaListTabs);
