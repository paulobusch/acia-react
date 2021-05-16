import { POST_ACTION } from '../../../../../../reducers/posts/post-type';
import PostSectionBase from './../shared/post-section/index';

export default class ActionsSection extends PostSectionBase {
  constructor(props) {
    super(props, POST_ACTION);
  }
}
