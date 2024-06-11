import DashboardPanel from './dashboardPanel.vue'

describe('<DashboardPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(DashboardPanel)
  })
})