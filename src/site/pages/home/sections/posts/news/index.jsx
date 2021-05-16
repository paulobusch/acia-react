import PostSectionBase from '../shared/post-section/index';
import { POST_NEWS } from './../../../../../../reducers/posts/post-type';

export default class NewsSection extends PostSectionBase {
  constructor(props) {
    super(props, POST_NEWS);
  }
}
