import React from 'react';
import TinyMCE from 'react-tinymce';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startReportBuild, fetchRepoPRs } from '../../actions/prActions';
import { sendReportAction } from '../../actions/reportActions';
import { reportThisRepo } from '../../utils/reports';
import Toastr from 'toastr';

class Report extends React.Component {

  constructor() {
    super();
    this.state = {
      reportingRepo: []
    };
    this.buildReport = this.buildReport.bind(this);
    this.compileReport = this.compileReport.bind(this);
    this.sendReport = this.sendReport.bind(this);
  }

  componentDidUpdate() {
    const status = this.props.report.sendStatus;
    if (status) {
      this.showReportStatus(status);
    }
  }

  showReportStatus(status) {
    if (status.error) {
      Toastr.error(status.error);
    } else if (status.success) {
      Toastr.success(status.success)
    }
  }

  privateRepos(repos) {
    return repos.filter((repo) => repo.private);
  }

  buildReport() {
    const token = this.props.user.personalAccessToken;
    this.props.startReportBuild();
    const repos = this.props.watchedRepos.filter((repo) => {
      return repo.report;
    });
    if (token || !this.privateRepos(repos).length) {
      this.setState({ reportingRepo: repos }, () => {
        this.props.fetchRepoPRs(repos, token);
      });
      return;
    }
    Toastr.error('Please set your Personal Access Token in user settings.');
  }

  handleEditorChange(e) {
    e.target.getContent();
  }

  compileReport() {
    let report = '';
    const repos = this.props.repoRPs.data || [];
    const reportingRepo = this.state.reportingRepo;
    if (repos.length && reportingRepo.length) {
      report = repos.map((repo, index) => {
        return reportThisRepo(repo, reportingRepo[index]);
      }).join('');
    }
    return report;
  }

  sendReport() {
    const user = this.props.user;
    const report = window.tinyMCE.activeEditor.getContent();
    console.log('################', user)
    if (!report) {
      Toastr.error('Cannot send empty report body');
      return;
    }
    const body = {
      report,
      userId: user.id,
      sender: user.senderEmail
    };

    console.log('===', body)
    this.props.sendReportAction(body);
  }

  displayBody() {
    const disabled = this.props.watchedRepos.length ? false : true;
    if (this.props.repoRPs.isGenerating) {
      return (
        <div style={{ fontSize: '30px', width: '100%', textAlign: 'center', marginTop: '20vh' }}>
          <i className="fa fa-refresh fa-spin fa-3x fa-fw fa-lg" style={{ margin: 'auto', display: 'block', marginBottom: '20px' }} aria-hidden="true"></i>
          <span>Working...</span>
        </div>
      );
    }

    return (
      <div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '5px 0px' }}>
          <button
            className="btn btn-default btn-lg"
            onClick={this.buildReport}
            disabled={disabled}
          >
            Preview Report
          </button>
        </div>
        <TinyMCE
          content={this.compileReport()}
          config={{
            menubar: 'edit format',
            plugins: 'autolink link image lists print preview emoticons',
            browser_spellcheck: true,
            min_height: 450,
            resize: false,
            status_bar: false,
            elementpath: false,
            list_styles: "circle disc square",
            toolbar: 'undo redo | bold italic underline | bullist numlist outdent indent | fontsizeselect fontselect | ' +
            'alignleft aligncenter alignright | autolink link emoticons | preview print'
          }}
          onChange={this.handleEditorChange}
        />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
          <button className="btn btn-default btn-lg" onClick={this.sendReport}>Send Report</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.displayBody()}
      </div>
    );
  }
}

Report.propTypes = {
  repoRPs: React.PropTypes.object,
  startReportBuild: React.PropTypes.func,
  watchedRepos: React.PropTypes.array,
  fetchRepoPRs: React.PropTypes.func,
  sendReportAction: React.PropTypes.func,
  user: React.PropTypes.object.isRequired,
  report: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    watchedRepos: state.watchedRepos.data,
    repoRPs: state.repoRPs,
    user: state.user.data.local,
    report: state.report
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startReportBuild,
    fetchRepoPRs,
    sendReportAction
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);
