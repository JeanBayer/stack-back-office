import { render } from '@testing-library/react';
import { VerticalDotsIcon } from '../../components/icons/verticalDotsIcon';

describe('VerticalDotsIcon', () => {
  it('renders without crashing', () => {
    const { container } = render(<VerticalDotsIcon />);
    expect(container).toBeInTheDocument();
  });

  it('applies default size when no size, width, or height is provided', () => {
    const { container } = render(<VerticalDotsIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('width', '24');
  });

  it('applies provided size', () => {
    const { container } = render(<VerticalDotsIcon size={32} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('height', '32');
    expect(svg).toHaveAttribute('width', '32');
  });

  it('applies provided width and height', () => {
    const { container } = render(<VerticalDotsIcon width={40} height={50} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('width', '24');
  });

  it('applies additional props', () => {
    const { container } = render(
      <VerticalDotsIcon data-testid="vertical-dots-icon" />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('data-testid', 'vertical-dots-icon');
  });
});
