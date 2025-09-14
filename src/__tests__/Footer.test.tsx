import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders external links with target _blank', () => {
    render(<Footer />);
    const linkedin = screen.getByTitle(/linkedin/i);
    expect(linkedin).toHaveAttribute('target', '_blank');
    expect(linkedin).toHaveAttribute('rel', 'noopener');
  });

  it('calls GA4 on link click', () => {
    window.gtag = jest.fn();
    render(<Footer />);
    const link = screen.getByText(/Opportunités|Opportunities/);
    fireEvent.click(link);
    expect(window.gtag).toHaveBeenCalledWith('event', 'footer_link_click', expect.any(Object));
  });
});
