import React from 'react';
import AccessToken from './AccessToken';
import Emails from './Emails';

const Settings = () =>
  <div>
    <div className="col-md-2">
    <ul className="nav nav-pills nav-stacked">
      <li className="active">
        <a data-toggle="tab" href="#psa">Access Token</a>
      </li>
      <li>
        <a data-toggle="tab" href="#emails">Emails </a>
      </li>
    </ul>
    </div>
    <div className="col-md-10 tab-content">
      <div id="psa" className="tab-pane fade in active">
        <AccessToken />
      </div>
      <div id="emails" className="tab-pane fade">
        <Emails />
      </div>
    </div>
  </div>;

export default Settings;