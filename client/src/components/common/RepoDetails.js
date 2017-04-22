import React from 'react';

class RepoDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      direction: 'down'
    };
    this.changeChevron = this.changeChevron.bind(this);
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
            <label>Description</label>: {repo.description}
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
