import { render, screen, waitFor } from '@testing-library/react'
import { GithubContributions } from '@/components/github-contributions'

// Mock react-github-calendar to avoid ESM issues in Jest environment
jest.mock('react-github-calendar', () => ({
  GitHubCalendar: function DummyCalendar(props: any) {
    return (
      <div data-testid="github-calendar-mock">
        Calendar for {props.username}
      </div>
    )
  }
}))

describe('GithubContributions', () => {
  it('renders the contributions section and passes correct props to calendar', async () => {
    render(<GithubContributions />)
    
    // Check if the mocked calendar is rendered with correct username
    const calendar = await screen.findByTestId('github-calendar-mock')
    expect(calendar).toBeInTheDocument()
    expect(calendar).toHaveTextContent('Calendar for newbdez33')
  })
})
