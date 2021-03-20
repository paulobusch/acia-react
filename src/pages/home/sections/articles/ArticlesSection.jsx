import './ArticlesSection.css';

import React from 'react';
import Section from '../../../../common/section/Section';
import ArticleItem from './article-item/ArticleItem';

export default props => (
  <Section id="articles">
    <h2>ARTIGOS</h2>
    <ArticleItem title="CRÉDITO" image="images/articles/credit.jpg"/>
    <ArticleItem title="SEGURANÇA" image="images/articles/security.jpg"/>
    <ArticleItem title="FINANÇAS" image="images/articles/finance.jpg"/>
    <ArticleItem title="ECONOMIA" image="images/articles/piggy.jpg"/>
  </Section>
);
