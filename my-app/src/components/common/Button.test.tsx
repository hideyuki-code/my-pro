import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Buttonコンポーネント', () => {
  it('子要素（children）がボタンに表示される', () => {
    render(<Button>クリックしてね</Button>);
    expect(screen.getByRole('button', { name: /クリックしてね/ })).toBeInTheDocument();
  });

  it('クリック時にonClickが呼ばれる', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>クリック</Button>);
    fireEvent.click(screen.getByText(/クリック/));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('デフォルトでprimaryのスタイルが適用される', () => {
    render(<Button>プライマリーボタン</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-500');
  });

  it('secondaryのスタイルが適用される', () => {
    render(<Button variant="secondary">セカンダリーボタン</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-gray-500');
  });
  
  it('disabledを指定するとボタンが無効化される', () => {
    render(<Button disabled>無効化ボタン</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});