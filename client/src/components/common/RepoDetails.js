import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToWatchedRepo } from '../../actions/userActions';

class RepoDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      direction: 'down',
      element: 'edit',
      disabled: true,
      description: ''
    };
    this.changeChevron = this.changeChevron.bind(this);
    this.toggleDesciption = this.toggleDesciption.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.addRepo = this.addRepo.bind(this);
    this.last7Days = this.last7Days.bind(this);
  }

  changeChevron(e) {
    let direction;
    if (e.target.classList.value.includes('collapsed')) {
      direction = 'down';
    } else {
      direction = 'up';
    }
    this.setState({ direction });
  }

  branchSelect() {
    const branches = this.props.repo.branches || [];
    return (
      <select id={`select-${this.props.repo.id}-branch`}>
        {branches.map((branch, index) =>
          <option key={index} value={branch.name}>{branch.name}</option>)}
      </select>
    );
  }

  addRepo() {
    const repo = this.props.repo;
    const branch = document
      .querySelector(`#select-${repo.id}-branch`).value;
    const date = document.querySelector(`#report-${repo.id}-date`).value;
    const description = this.state.description ||
      document.querySelector(`#repo-${repo.id}-description`).value;
    const content = {
      userId: this.props.user.data.id.toString(),
      name: repo.full_name,
      url: repo.url,
      description: description,
      lastReportDate: date,
      defaultReportBranch: branch
    }
    this.props.addToWatchedRepo(content);
  }

  last7Days() {
    const days7 = 60000 * 60 * 24 * 7;
    return new Date(new Date().getTime() - days7);
  }

  getDate() {
    const now = this.last7Days();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    return year + '-'
      + (month.toString().length > 1 ? month : '0' + month) + '-'
      + (date.toString().length > 1 ? date : '0' + date);
  }

  toggleDesciption() {
    let edit = this.state.element;
    if (edit === 'edit') {
      edit = 'disable';
    } else {
      edit = 'edit';
    }
    const elem = document.querySelector(`#repo-${this.props.repo.id}-description`);
    this.setState({
      disabled: !this.state.disabled,
      element: edit,
      description: elem.value
    });
  }

  cancelEdit() {
    const elem = document
      .querySelector(`#repo-${this.props.repo.id}-description`);
    elem.value = this.state.description;
    this.toggleDesciption();
  }

  element() {
    if (this.state.element === 'edit') {
      return (
        <i className="fa fa-pencil"
          aria-hidden="true"
          onClick={this.toggleDesciption}
        >
        </i>
      );
    }
    return (
      <div style={{ display: 'inline-block' }}>
        <input type="button" className="btn btn-danger" value="Cancel" onClick={this.cancelEdit} />
        <input type="button" className="btn btn-success" value="Save" onClick={this.toggleDesciption} />
      </div>
    )
  }

  render() {
    const repo = this.props.repo;
    return (
      <div className="add-repo-list panel panel-default" style={{ margin: '10px' }}>
        <div className="panel-heading">
          <h3 className="panel-title">
            {repo.name} <span style={{ fontWeight: 'light' }}>
              ({repo.full_name})</span>
          </h3>
          <div style={{ display: 'inline', float: 'right' }}>

            <input type="button" className="btn btn-primary" name="repo_name" value="Add" onClick={this.addRepo} />
            <i className={`fa fa-chevron-${this.state.direction}`}
              aria-hidden="true"
              style={{ marginLeft: '20px', fontSize: '25px' }}
              data-toggle="collapse"
              data-target={`#${repo.id}`}
              onClick={this.changeChevron}
            >
            </i>
          </div>
        </div>
        <div id={repo.id}
          className={'repodetails panel-body collapse'} >
          <label>Base Branch (For reports)</label>: {this.branchSelect()}
          <div style={{ marginLeft: '20px', display: 'inline' }}>
            <label>Start Report from: </label>
            <input type="date" defaultValue={this.getDate()} id={`report-${this.props.repo.id}-date`} />
          </div>
          <div>
            <label>Description</label>:
            <textarea id={`repo-${this.props.repo.id}-description`} disabled={this.state.disabled} defaultValue={repo.description} />
            {this.element()}
          </div>
        </div>
      </div >
    );
  }
}

RepoDetails.propTypes = {
  repo: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
  addToWatchedRepo: React.PropTypes.func,
  user: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addToWatchedRepo
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoDetails);
