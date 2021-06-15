import './articles.css';

import PostSectionBase from './../shared/post-section/index';
import { POST_ARTICLE } from '../../../../../../reducers/posts/post-type';

export default class ArticlesSection extends PostSectionBase {
  constructor(props) {
    super(props, POST_ARTICLE);
  }
}
