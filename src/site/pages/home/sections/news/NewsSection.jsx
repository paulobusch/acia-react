import './NewsSection.css';

import React from 'react';

import Section from '../../../../common/section/Section';
import NewsCard from './news-card/NewsCard';
import Loading from '../../../../../common/loading';

export default props => (
  <Section id="news">
    <h2>NOTÍCIAS</h2>
    <div className="news">
      { props.loading && <Loading block/> }
      { !props.loading && props.news.map(n => <NewsCard key={ n.id } image={ n.image } title={ n.title }>{ n.text }</NewsCard>) }
    </div>
  </Section>
);
