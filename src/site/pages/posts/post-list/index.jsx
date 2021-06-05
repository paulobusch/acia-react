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
import Row from './../../../../common/row/index';
import Select from './../../../../common/fields/select/index';
import { POST_SORT_DATE, POST_SORT_TYPE, POST_SORT_TITLE } from './../../../../reducers/posts/post-sort';
import required from './../../../../common/validators/required';

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      loading: true, 
      search: this.props.router.location.query.search,
      sort: POST_SORT_TYPE
    };
    this.type = this.props.router.params.type;
    this.title = mapTypeToTitle(this.type);
    this.afterLoad = this.afterLoad.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSort = this.onSort.bind(this);
    this.search = this.search.bind(this);
    if (this.state.search || this.state.sort) 
      this.props.initialize({ search: this.state.search, sort: this.state.sort });
  }

  componentWillMount() {
    this.props.getAllByFilter({ type: this.type }, this.afterLoad);
  }

  afterLoad(success, list) {
    if (success) {
      this.setState({
        ...this.state,
        loading: false,
        fullPosts: list,
        filtredPosts: this.applySort(this.applyFilter(list))
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

  applyFilter(posts) {
    if (this.state.search) 
      return posts.filter(a => a.title.toLowerCase().search(this.state.search.toLowerCase()) !== -1)
    return posts;
  }

  applySort(posts) {
    const { sort } = this.state;
    if (!sort) return posts;
    if (sort === POST_SORT_TYPE) return posts.sort((a, b) => b.type.localeCompare(a.type));
    if (sort === POST_SORT_DATE) return posts.sort((a, b) => a.createdAt - b.createdAt);
    if (sort === POST_SORT_TITLE) return posts.sort((a, b) => a.title.localeCompare(b.title));
    return posts;
  }

  searchForm() {
    const { handleSubmit } = this.props;
    const sortOptions = [POST_SORT_TYPE, POST_SORT_TITLE, POST_SORT_DATE];

    return (
      <Form id="search-posts" onSubmit={ handleSubmit(this.search) }>
        <Row className="row-fields">
          <Field name="search" type="text" placeholder="Termo de busca" autoComplete="off"
            action={ { icon: 'fas fa-search', onClick: this.search } } 
            onchange={ this.onSearch } component={ Input }
            flex="80"
          />
          <Field name="sort" title="Ordenação" flex="20" 
            onchange={ this.onSort } component={ Select } options={ sortOptions} validate={ required }
          />
        </Row>
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

  onSort(ev) {
    this.setState({ ...this.state, sort: ev }, () => this.search());
  }
  
  search() {
    if (this.searchId) {
      clearTimeout(this.searchId); 
      this.searchId = null;
    }
    this.toggleLoading(true);
    this.setState({ 
      ...this.state, loading: false,
      filtredPosts: this.applySort(this.applyFilter(this.state.fullPosts))
    });
  }

  list() {
    const { filtredPosts, loading } = this.state;
    if (loading) return <Loading block style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    if (!filtredPosts || filtredPosts.length === 0) return <Message style={ { paddingTop: 'calc(38vh - 250px)' } }/>;

    return filtredPosts.map(p => <PostCard key={ p.id } { ...p }/>);
  }   
}

const form = reduxForm({ form: 'search-posts-from' })(withRouter(PostList));
const mapDispatchToProps = dispatch => bindActionCreators({ getAllByFilter }, dispatch);
export default connect(null, mapDispatchToProps)(form);
