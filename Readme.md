# KOSHIN

Helping you automate the generation of summary reports for all your Github repos


### How to use this app.
- Visit [KOSHIN](https://koshin.herokuapp.com) and login with your github account
- Add repositories you want to generate update reports for. Repository settings can be set by expanding the repository section.
  **It is strongly recommended that setup the repo before adding, edit feature is not available at the moment.** See below for setup instruction.
- Add organisation repository from the **Organisation Repos** tab.
- Provide a github personal access token for access to private repos.
- Add distribution email list on the settings page.
- Go to the Reports tab from the homepage to preview and edit generated report.
- Click on send to send report to your email list.

### Repository details setup.
 - **Product Name**: The on the product your are building. It defaults the repo name.
 - **Start Report From**: A date field to select the date to start generating reports from. defaults to last seven(7) days.
 - **Base Branch**: The branch to pick PRs for the report from. Tries to pick **develop**, or **development**,or **master**. When those are not present, you have to select a branch yourself.
 - **Description**: A brief description of the product. It defaults to the Repository description.

##### Note
- All organisation repositories are treated as private currently.
- You can select repos to genretae report by selecting and deselecting repos from your watched repos side bar.