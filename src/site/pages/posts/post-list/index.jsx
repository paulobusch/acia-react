import './post-list.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllByFilter, mapTypeToTitle } from '../../../../reducers/posts/post-actions';
import { withRouter } from 'react-router';
import Loading from './../../../../common/loading/index';
import PostCard from './../../home/sections/posts/shared/post-card/index';
import { Field, Form, reduxForm } from 'redux-form';
import Input from './../../../../common/fields/input/index';
import Message from './../../../../common/message/index';

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      loading: true, 
      search: this.props.router.location.query.search 
    };
    this.type = this.props.router.params.type;
    this.title = mapTypeToTitle(this.type);
    this.afterLoad = this.afterLoad.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.search = this.search.bind(this);
    if (this.state.search) this.props.initialize({ search: this.state.search });
  }

  componentWillMount() {
    this.props.getAllByFilter({ type: this.type, search: this.state.search }, this.afterLoad);
  }

  afterLoad(success, list) {
    if (success) {
      this.setState({
        ...this.state,
        loading: false,
        posts: list.sort((a, b) => b.type.localeCompare(a.type))
      });
    }
  }

  toggleLoading(loading) {
    this.setState({ 
      ...this.state, 
      loading: loading
    });
  }

  render() {
    return (
      <div id="post-list">
        <h2>{ this.title }</h2>
        { this.searchForm() }
        <div className="posts">
          { this.list() }
        </div>
      </div>
    );
  }

  searchForm() {
    const { handleSubmit } = this.props;
    
    return (
      <Form id="search-posts" onSubmit={ handleSubmit(this.search) }>
        <Field name="search" type="text" placeholder="Termo de busca" autoComplete="off"
          action={ { icon: 'fas fa-search', onClick: this.search } } 
          onchange={ this.onSearch } component={ Input }
        />
      </Form>
    );
  }

  onSearch(ev) {
    this.setState({
      ...this.state,
      search: ev.target.value
    });
    if (this.searchId) clearTimeout(this.searchId);
    this.searchId = setTimeout(() => this.search(), 500);
  }  
  
  search() {
    if (this.searchId) {
      clearTimeout(this.searchId); 
      this.searchId = null;
    }
    this.toggleLoading(true);
    this.props.getAllByFilter({ type: this.type, search: this.state.search }, this.afterLoad);
  }

  list() {
    const { posts, loading } = this.state;
    if (loading) return <Loading block style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    if (!posts || posts.length === 0) return <Message style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    return posts.map(p => <PostCard key={ p.id } { ...p }/>);
  }   
}

const form = reduxForm({ form: 'search-posts-from' })(withRouter(PostList));
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter }, dispatch);
export default connect(null, mapDispatchToProps)(form);
