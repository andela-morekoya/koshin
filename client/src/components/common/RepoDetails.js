import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToWatchedRepo } from '../../actions/repoActions';

class RepoDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      direction: 'down',
      element: 'edit',
      disabled: true,
      description: '',
      branch: '',
      product_name: ''
    };
    this.changeChevron = this.changeChevron.bind(this);
    this.toggleDesciption = this.toggleDesciption.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.addRepo = this.addRepo.bind(this);
    this.last7Days = this.last7Days.bind(this);
    this.getDefaultBranch = this.getDefaultBranch.bind(this);
    this.getBranches = this.getBranches.bind(this);
    this.handleBranchChange = this.handleBranchChange.bind(this);
    this.updateBranch = this.updateBranch.bind(this);
    this.getProductName = this.getProductName.bind(this);
  }

  componentDidMount() {
    this.getProductName();
  }

  changeChevron(e) {
    let direction;
    if (e.target.classList.value.includes('collapsed')) {
      direction = 'down';
    } else {
      direction = 'up';
      this.updateBranch();
    }
    this.setState({ direction });
  }

  updateBranch() {
    if (!this.state.branch) {
      const branch = this.getDefaultBranch();
      this.setState({ branch });
    }
  }

  getBranches() {
    const repoBranches = this.props.repo.branches || [];
    return repoBranches.map(item => item.name);
  }

  getDefaultBranch() {
    const branches = this.getBranches();

    let defaultBranch;
    if (branches.indexOf('develop') > -1) {
      defaultBranch = 'develop'
    } else if (branches.indexOf('development') > -1) {
      defaultBranch = 'development';
    } else if (branches.indexOf('master') > -1) {
      defaultBranch = 'master';
    }
    return defaultBranch;
  }

  handleBranchChange(e) {
    const branch = e.target.value;
    this.setState({ branch });
  }

  branchSelect() {
    const branches = this.getBranches();

    return (
      <select
        id={`select-${this.props.repo.id}-branch`}
        value={this.state.branch}
        onChange={this.handleBranchChange}
      >
        {branches.map((branch, index) =>
          <option key={index} value={branch}>
            {branch}
          </option>)}
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
      userId: this.props.user.id.toString(),
      name: repo.full_name,
      productName: this.state.product_name,
      url: repo.url,
      description,
      lastReportDate: date,
      defaultReportBranch: branch || this.getDefaultBranch()
    };

    if (!content.defaultReportBranch) {
      return alert(`Edit Repository settings, default branch is missing.`);
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
    );
  }

  getProductName(e) {
    let name = this.props.repo.product_name || this.props.repo.name;
    if (e) {
      name = e.target.value;
    }
    this.setState({ product_name: name });
  }

  render() {
    const repo = this.props.repo;
    return (
      <div className="add-repo-list panel panel-default" style={{ margin: '10px' }}>
        <div className="panel-heading">
          <div className="row">
            <div className="col-sm-10">
              <h3 className="panel-title">
                {repo.name} <span style={{ fontWeight: 'light', lineHeight: '2em' }}>
                  ({repo.full_name})</span>
              </h3>
            </div>
            <div className="col-sm-2">
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
        </div>

        <div id={repo.id}
          className={'repodetails panel-body collapse'} >
          <label>Product name:</label>
          <input type="text" value={this.state.product_name} onChange={this.getProductName} />
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
    user: state.user.data.github
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addToWatchedRepo
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoDetails);
