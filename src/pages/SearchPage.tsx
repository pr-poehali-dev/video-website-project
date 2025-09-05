import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const allVideos = [
    { id: '1', title: 'Cyberpunk 2077: Night City Adventures', category: 'action', views: '2.4M', duration: '15:32', author: 'GamerPro', publishedAt: '3 дня назад', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '2', title: 'Minecraft: Building Epic Castles', category: 'adventure', views: '1.8M', duration: '22:17', author: 'BuildMaster', publishedAt: '1 день назад', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '3', title: 'FIFA 24: Ultimate Team Guide', category: 'sports', views: '1.2M', duration: '18:44', author: 'SportGamer', publishedAt: '5 дней назад', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '4', title: 'Elden Ring: Boss Battle Compilation', category: 'action', views: '3.1M', duration: '28:15', author: 'BossFighter', publishedAt: '1 неделя назад', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '5', title: 'Baldur\'s Gate 3: Character Creation', category: 'rpg', views: '845K', duration: '12:08', author: 'RPGMaster', publishedAt: '2 дня назад', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '6', title: 'Forza Horizon 5: Best Cars Guide', category: 'racing', views: '634K', duration: '16:23', author: 'SpeedDemon', publishedAt: '4 дня назад', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' }
  ];

  const popularQueries = [
    'Cyberpunk 2077', 'Minecraft', 'Elden Ring', 'FIFA 24', 'Call of Duty', 
    'Baldur\'s Gate 3', 'Forza Horizon', 'GTA 6', 'Diablo 4', 'Starfield'
  ];

  const categories = [
    { id: 'all', name: 'Все', count: allVideos.length },
    { id: 'action', name: 'Экшн', count: 2 },
    { id: 'adventure', name: 'Приключения', count: 1 },
    { id: 'sports', name: 'Спорт', count: 1 },
    { id: 'rpg', name: 'РПГ', count: 1 },
    { id: 'racing', name: 'Гонки', count: 1 }
  ];

  useEffect(() => {
    if (query.trim()) {
      let filtered = allVideos.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.author.toLowerCase().includes(query.toLowerCase())
      );

      if (activeFilter !== 'all') {
        filtered = filtered.filter(video => video.category === activeFilter);
      }

      // Sort results
      if (sortBy === 'views') {
        filtered.sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
      } else if (sortBy === 'newest') {
        // Simple newest sort (would be actual date comparison in real app)
        filtered.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
      }

      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [query, activeFilter, sortBy]);

  const VideoCard = ({ video }: { video: any }) => (
    <Link to={`/video/${video.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 cursor-pointer">
        <CardContent className="p-0">
          <div className="flex gap-4">
            <div className="relative flex-shrink-0">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-48 h-28 object-cover rounded-l-lg"
              />
              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                {video.duration}
              </div>
            </div>
            <div className="flex-1 p-4">
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-game-blue transition-colors line-clamp-2">
                {video.title}
              </h3>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Icon name="User" size={14} className="mr-1" />
                {video.author}
                <span className="mx-2">•</span>
                <Icon name="Eye" size={14} className="mr-1" />
                {video.views}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span>{video.publishedAt}</span>
                <span className="mx-2">•</span>
                <span className="bg-gray-100 px-2 py-1 rounded-full text-xs capitalize">
                  {categories.find(c => c.id === video.category)?.name}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Главная
              </Button>
              <div className="text-2xl font-bold bg-gradient-to-r from-game-blue to-game-purple bg-clip-text text-transparent" style={{fontFamily: 'Montserrat'}}>
                VideoHub 🚀
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/categories">
                <Button variant="ghost" size="sm">
                  <Icon name="Grid3X3" size={16} />
                  Категории
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  <Icon name="User" size={16} />
                  Профиль
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Montserrat'}}>
            Поиск видео
          </h1>
          
          {/* Search Input */}
          <div className="relative mb-6">
            <Icon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Найти игры, авторов, жанры..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg border-gray-200 focus:border-game-blue rounded-xl"
              autoFocus
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setQuery('')}
              >
                <Icon name="X" size={16} />
              </Button>
            )}
          </div>

          {/* Popular Queries */}
          {!query && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Популярные запросы</h3>
              <div className="flex flex-wrap gap-2">
                {popularQueries.map((popularQuery) => (
                  <Button
                    key={popularQuery}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuery(popularQuery)}
                    className="hover:bg-game-blue hover:text-white hover:border-game-blue"
                  >
                    <Icon name="TrendingUp" size={14} className="mr-1" />
                    {popularQuery}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {query && (
          <>
            {/* Filters and Sorting */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeFilter === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter(category.id)}
                    className={activeFilter === category.id ? "bg-game-blue hover:bg-game-blue/90 text-white" : ""}
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Сортировать:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded px-3 py-1 text-sm focus:border-game-blue focus:outline-none"
                >
                  <option value="relevance">По релевантности</option>
                  <option value="newest">Сначала новые</option>
                  <option value="views">По просмотрам</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <span className="text-gray-600">
                Найдено {searchResults.length} результатов для "{query}"
              </span>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {searchResults.length > 0 ? (
                searchResults.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))
              ) : (
                <div className="text-center py-16">
                  <Icon name="SearchX" size={64} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ничего не найдено</h3>
                  <p className="text-gray-600 mb-6">
                    Попробуйте изменить поисковый запрос или выбрать другую категорию
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button 
                      variant="outline"
                      onClick={() => setQuery('')}
                    >
                      Очистить поиск
                    </Button>
                    <Link to="/categories">
                      <Button className="bg-game-blue hover:bg-game-blue/90 text-white">
                        <Icon name="Grid3X3" size={16} className="mr-2" />
                        Все категории
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* No Query State */}
        {!query && (
          <div className="text-center py-16">
            <Icon name="Search" size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Начните поиск</h3>
            <p className="text-gray-600 mb-6">
              Введите название игры, автора или категорию в поле выше
            </p>
            <Link to="/categories">
              <Button className="bg-game-blue hover:bg-game-blue/90 text-white">
                <Icon name="Grid3X3" size={16} className="mr-2" />
                Посмотреть все категории
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}