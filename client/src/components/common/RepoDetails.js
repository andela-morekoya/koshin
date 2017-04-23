import React from 'react';

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
      <select>
        {branches.map((branch, index) =>
          <option key={index} value={branch.name}>{branch.name}</option>)}
      </select>
    );
  }

  getDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
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
    const elem = document.querySelector('#repo-description');
    this.setState({
      disabled: !this.state.disabled,
      element: edit,
      description: elem.value
    });
  }

  cancelEdit() {
    const elem = document.querySelector('#repo-description');
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
      <div style={{display: 'inline-block'}}>
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

            <input type="button" className="btn btn-primary" name="repo_name" value="Add" />
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
          className={`repodetails panel-body collapse ${this.props.className}`}>
          <label>Base Branch (For reports)</label>: {this.branchSelect()}
          <div style={{ marginLeft: '20px', display: 'inline' }}>
            <label>Start Report from: </label>
            <input type="date" defaultValue={this.getDate()} />
          </div>
          <div>
            <label>Description</label>: 
            <textarea id="repo-description" disabled={this.state.disabled} defaultValue={repo.description} />
            {this.element()}
          </div>
        </div>
      </div>
    );
  }
}

RepoDetails.propTypes = {
  repo: React.PropTypes.object.isRequired,
  className: React.PropTypes.string
}

export default RepoDetails;
