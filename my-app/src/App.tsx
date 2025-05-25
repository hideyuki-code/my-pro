import Button from './components/common/Button';

function App() {
  return (
    <div style={{ padding: 32 }}>
      <h1>共通ボタンコンポーネントの動作確認</h1>
      <Button onClick={() => alert('Primary!')}>プライマリーボタン</Button>
      <Button variant="secondary" onClick={() => alert('Secondary!')}>セカンダリーボタン</Button>
      <Button variant="danger" onClick={() => alert('Danger!')}>危険ボタン</Button>
      <Button disabled>無効化ボタン</Button>
    </div>
  );
}

export default App;
