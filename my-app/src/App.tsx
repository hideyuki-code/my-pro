import SearchBar from './components/features/SearchAndFilter/SearchBar';
import TypeFilter from './components/features/SearchAndFilter/TypeFilter';


function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">ポケモン図鑑</h1>

      <div className="md:flex md:space-x-4 mb-6">
        <div className="md:w-1/2">
          <SearchBar /* onSearch={handleSearch} */ />
        </div>
        <div className="md:w-1/2">
          <TypeFilter /* onTypeChange={handleTypeChange} */ />
        </div>
      </div>

      {/* ポケモン一覧表示エリア (F1-8で実装) */}
    </div>
  );
}

export default App;
