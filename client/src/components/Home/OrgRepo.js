import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RepoDetails from '../common/RepoDetails';
import { fetchOrgRepos } from '../../actions/repoActions';
import { updateUserDetails } from '../../actions/userActions';

class OrgRepos extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true
    };
    this.addUserOrganisation = this.addUserOrganisation.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
  }

  componentDidMount() {
    const user = this.props.user;
    const orgs = user.organisations;
    if (orgs && orgs.length) {
      orgs.forEach(org => {
        this.props.fetchOrgRepos(org, user.personalAccessToken);
      });
    }
  }

  addUserOrganisation(e) {
    e.preventDefault();
    const orgName = this.refs.orgName.value;
    const pat = this.refs.pat.value;
    const user = {
      id: this.props.user.id,
      organisations: orgName
    };
    if (this.refs.pat) {
      user.personalAccessToken = pat;
    }
    this.props.updateUserDetails(user);
    this.props.fetchOrgRepos(orgName, pat, this.refs.privateRepo.checked);
  }

  toggleButton() {
    const orgName = this.refs.orgName.value;
    const pat = this.refs.pat.value;
    if (pat.trim() && orgName.trim()) {
      return this.setState({ disabled: false });
    }
    return this.setState({ disabled: true });
  }

  addOrgForm() {
    return (
      <div style={{ margin: '10px 0px 0px 20px' }}>
        <form className="form-horizontal">
          <div className="form-group">
            Organization Name: <input type="text" ref="orgName" onChange={this.toggleButton} />
          </div>
          <div className="form-group">
            Personal Access Token: <input type="text" ref="pat" onChange={this.toggleButton} />
          </div>

          <div className="form-group">
            <input type="checkbox" name="privateRepo" ref="privateRepo" />
            <div className="col-sm-offset-2 col-sm-10">
              <button onClick={this.addUserOrganisation} type="submit" className="btn btn-default" disabled={this.state.disabled}>Add Organization</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  renderOrgRepos() {
    const { isFetching, data } = this.props.orgRepos;
    if (isFetching) {
      return (<div>
        <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
      </div>);
    }
    if (data && !data.length) {
      return <div>Organisation repo not found</div>;
    }
    return data.map((item, index) =>
      <RepoDetails key={item.id} repo={item} />
    );
  }

  render() {
    return (
      <div>
        {this.addOrgForm()}
        {this.renderOrgRepos()}
      </div>
    )
  }
}

OrgRepos.propTypes = {
  user: React.PropTypes.object.isRequired,
  orgRepos: React.PropTypes.object,
  updateUserDetails: React.PropTypes.func,
  fetchOrgRepos: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    user: state.user.data.local,
    orgRepos: state.allRepos.orgRepos
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchOrgRepos,
    updateUserDetails
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrgRepos);