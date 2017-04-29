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
    const orgs = this.props.user.organisations;
    const pat = this.props.user.personalAccessToken || this.refs.pat.value;

    if (orgs.indexOf(orgName.toLowerCase()) > -1) {
      return this.props.fetchOrgRepos(orgName, pat);
    }

    const user = {
      id: this.props.user.id,
      organisations: orgName
    };
    if (this.refs.pat) {
      user.personalAccessToken = pat;
    }

    this.props.updateUserDetails(user);
    this.props.fetchOrgRepos(orgName, pat);
  }

  toggleButton() {
    const orgName = this.refs.orgName.value;
    const pat = this.refs.pat ? this.refs.pat.value : null;
    if (orgName.trim() && pat === null) {
      return this.setState({ disabled: false });
    } else if (pat && pat.trim() && orgName.trim()) {
      return this.setState({ disabled: false });
    }
    return this.setState({ disabled: true });
  }

  addOrgForm() {
    return (
      <div style={{ margin: '10px 0px 0px 20px' }}>
        <form className="form-horizontal">
          <div className="form-group space" style={{ width: '25%', display: 'inline-block', marginRight: '25px' }}>
            <label>Organization Name</label>
            <input className="form-control" type="text" ref="orgName" onChange={this.toggleButton} />
          </div>
          {
            this.props.user.personalAccessToken ?
              ''
              :
              <div className="form-group space" style={{ width: '40%', display: 'inline-block' }}>
                <label htmlFo="pat">Personal Access Token</label>
                <input type="text" className="form-control" id="pat" ref="pat" onChange={this.toggleButton} />
              </div>
          }
          <div className="form-group space" style={{ width: '20%', display: 'inline-block', marginLeft: '25px' }}>
            <input onClick={this.addUserOrganisation}
              type="button"
              className="btn btn-primary"
              disabled={this.state.disabled} value="Add Organization" />
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
      <RepoDetails key={item.id} repo={item} className={index === 0 ? 'in' : ''} />
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