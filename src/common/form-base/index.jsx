import './form-base.css';

import React, { Component } from 'react';
import Card from '../../admin/partials/card';
import CardHeader from '../../admin/partials/card/card-header';
import CardContent from '../../admin/partials/card/card-content';
import CardFooter from '../../admin/partials/card/card-footer';
import SubmitButton from '../buttons/submit';
import Loading from '../loading';

export default class FormBase extends Component { 
  constructor(props) {
    super(props);

    this.state = { loading: false, saveLoading: false };
    this.submit = this.submit.bind(this);
    this.goBack = this.goBack.bind(this);
    this.afterLoad = this.afterLoad.bind(this);
    this.afterSubmit = this.afterSubmit.bind(this);
    this.id = this.getId();
    if (this.id) {
      this.data = this.getData(this.id);
    }
  }

  form() { }

  getId() {
    const { router } = this.props;
    const { pathname } = router.location;
    const regex = /\/edit\//;
    const index = pathname.search(regex);
    if (index === -1) return null;
    return pathname.substring(index).replace(regex, '');
  }

  getData(id) { 
    this.state.loading = true;
    this.props.loadForm(id, this.afterLoad);
  }

  afterLoad(success) {
    if (success) this.toggleLoading(false);
  }

  toggleLoading(loading) {
    this.setState({ 
      ...this.state, 
      loading: loading
    });
  }

  getTitle() {
    if (this.id) {
      if (this.state.loading)
        return 'Carregando...';
      else
        return `Edição do ${this.title}`;
    }
    
    return `Cadastro de ${this.title}`;
  }

  submit(values) {
    this.toggleSaveLoading(true);
    if (this.id){
      values.id = this.id;
      this.props.update(values, this.afterSubmit);
    } else
      this.props.create(values, this.afterSubmit);
  }
    
  afterSubmit(success) {
    this.toggleSaveLoading(false);
    if (success) this.goBack();
  }

  toggleSaveLoading(loading) {
    this.setState({ 
      ...this.state, 
      saveLoading: loading
    });
  }

  goBack() {
    const { router } = this.props;
    if (!this.needGoBack()) return;
    
    router.goBack();
  }

  needGoBack() {
    const { router } = this.props;
    const { pathname } = router.location;
    return pathname.search(/\/edit\/|\/new/) !== -1;
  }

  render() {
    const needBack = this.needGoBack();
    return (
      <div className="page-base-form">
        <Card>
          <CardHeader>
            <h2>{ this.getTitle() }</h2>
            { needBack && <i title="Voltar" className="go-back fas fa-times" onClick={ this.goBack }></i> }
          </CardHeader>
          <CardContent>
            { this.state.loading ? <Loading /> : this.form() }
          </CardContent>
          <CardFooter>
            <SubmitButton text="SALVAR" loading={ this.state.saveLoading } onClick={ this.props.submitForm }/>
          </CardFooter>
        </Card>
      </div>
    );
  }
}
