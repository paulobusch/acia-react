import './ActionsSection.css';

import React from 'react';

import Section from '../../../../common/section/Section';
import ActionCard from './action-card/ActionCard';
import Loading from '../../../../../common/loading';

export default props => (
  <Section id="actions">
    <h2>ACIA EM AÇÃO</h2>
    <div className="actions">
      { props.loading && <Loading block/> }
      { !props.loading && props.actions.map(n => <ActionCard key={ n.id } image={ n.image } title={ n.title } text={ n.text }/>) }
    </div>
  </Section>
);
