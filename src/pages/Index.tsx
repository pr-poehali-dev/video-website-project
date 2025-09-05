import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: 'action', name: 'Экшн', color: 'bg-game-red', count: 127 },
    { id: 'adventure', name: 'Приключения', color: 'bg-game-coral', count: 89 },
    { id: 'strategy', name: 'Стратегии', color: 'bg-game-teal', count: 64 },
    { id: 'rpg', name: 'РПГ', color: 'bg-game-blue', count: 43 },
    { id: 'racing', name: 'Гонки', color: 'bg-game-mint', count: 35 },
    { id: 'sports', name: 'Спорт', color: 'bg-game-yellow', count: 28 },
    { id: 'puzzle', name: 'Головоломки', color: 'bg-game-purple', count: 52 },
    { id: 'shooter', name: 'Шутеры', color: 'bg-game-dark', count: 73 }
  ];

  const popularVideos = [
    { id: '1', title: 'Cyberpunk 2077: Night City Adventures', category: 'action', views: '2.4M', duration: '15:32', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '2', title: 'Minecraft: Building Epic Castles', category: 'adventure', views: '1.8M', duration: '22:17', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '3', title: 'FIFA 24: Ultimate Team Guide', category: 'sports', views: '1.2M', duration: '18:44', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '4', title: 'Elden Ring: Boss Battle Compilation', category: 'action', views: '3.1M', duration: '28:15', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' }
  ];

  const newVideos = [
    { id: '5', title: 'Baldur\'s Gate 3: Character Creation', category: 'rpg', views: '845K', duration: '12:08', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '6', title: 'Forza Horizon 5: Best Cars 2024', category: 'racing', views: '634K', duration: '16:23', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '7', title: 'Tetris Effect: Zen Mode', category: 'puzzle', views: '423K', duration: '9:41', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '8', title: 'Call of Duty: Warzone Tips', category: 'shooter', views: '1.1M', duration: '21:55', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' }
  ];

  const toggleFavorite = (videoId: string) => {
    setFavorites(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const VideoCard = ({ video }: { video: any }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm border-0">
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
            {video.duration}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/90 hover:bg-white"
            onClick={() => toggleFavorite(video.id)}
          >
            <Icon 
              name={favorites.includes(video.id) ? "Heart" : "Heart"} 
              size={16}
              className={favorites.includes(video.id) ? "fill-game-red text-game-red" : "text-gray-600"}
            />
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-game-blue transition-colors">
            {video.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Icon name="Eye" size={14} />
              {video.views}
            </span>
            <span className="capitalize text-xs bg-gray-100 px-2 py-1 rounded-full">
              {categories.find(c => c.id === video.category)?.name}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-game-blue to-game-purple bg-clip-text text-transparent" style={{fontFamily: 'Montserrat'}}>
                VideoHub 🚀
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Поиск видео..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 border-gray-200 focus:border-game-blue"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="User" size={16} />
                Профиль
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-t fixed bottom-0 left-0 right-0 z-50">
        <div className="flex items-center justify-around py-2">
          {[
            { icon: 'Home', label: 'Главная', active: true },
            { icon: 'Grid3X3', label: 'Категории' },
            { icon: 'TrendingUp', label: 'Популярное' },
            { icon: 'Heart', label: 'Избранное' },
            { icon: 'User', label: 'Профиль' }
          ].map((item, index) => (
            <Button key={index} variant="ghost" size="sm" className="flex flex-col items-center p-2 h-auto">
              <Icon name={item.icon as any} size={18} className={item.active ? 'text-game-blue' : 'text-gray-600'} />
              <span className={`text-xs mt-1 ${item.active ? 'text-game-blue font-medium' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </Button>
          ))}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Montserrat'}}>
            Мир игровых видео
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto" style={{fontFamily: 'Open Sans'}}>
            Открой для себя лучшие игровые моменты, обучающие гайды и эпичные прохождения
          </p>
        </section>

        {/* Categories Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Montserrat'}}>
              Категории
            </h2>
            <Button variant="outline" size="sm">
              <Icon name="Grid3X3" size={16} className="mr-2" />
              Все категории
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card 
                key={category.id}
                className={`${category.color} border-0 cursor-pointer hover:scale-105 transition-transform duration-200 text-white overflow-hidden group`}
                onClick={() => setActiveCategory(category.id)}
              >
                <CardContent className="p-6 relative">
                  <div className="flex flex-col items-start">
                    <h3 className="font-semibold text-lg mb-2 text-white" style={{fontFamily: 'Montserrat'}}>
                      {category.name}
                    </h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <Icon name="Play" size={14} className="mr-1" />
                      {category.count} видео
                    </div>
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:opacity-30 transition-opacity">
                    <Icon name="Gamepad2" size={48} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Popular Videos */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Montserrat'}}>
              🔥 Популярное
            </h2>
            <Button variant="outline" size="sm">
              <Icon name="TrendingUp" size={16} className="mr-2" />
              Смотреть всё
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        {/* New Videos */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Montserrat'}}>
              ✨ Новинки
            </h2>
            <Button variant="outline" size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              Все новинки
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Montserrat'}}>
                ❤️ Избранное
              </h2>
              <span className="text-sm text-gray-600">{favorites.length} видео</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...popularVideos, ...newVideos]
                .filter(video => favorites.includes(video.id))
                .map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
            </div>
          </section>
        )}

        {/* Stats Banner */}
        <section className="bg-gradient-to-r from-game-blue to-game-purple rounded-2xl p-8 text-center text-white mb-8">
          <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'Montserrat'}}>
            Присоединяйся к сообществу геймеров!
          </h2>
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div>
              <div className="text-2xl font-bold">1M+</div>
              <div className="text-sm opacity-90">Пользователей</div>
            </div>
            <div>
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm opacity-90">Видео</div>
            </div>
            <div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm opacity-90">Игр</div>
            </div>
          </div>
          <Button size="lg" className="mt-6 bg-white text-game-blue hover:bg-gray-100">
            <Icon name="UserPlus" size={16} className="mr-2" />
            Регистрация
          </Button>
        </section>
      </main>
    </div>
  );
}