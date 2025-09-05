import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

export default function CategoryPage() {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categoryInfo = {
    action: { name: 'Экшн', color: 'bg-game-red', description: 'Динамичные игры с быстрым геймплеем' },
    adventure: { name: 'Приключения', color: 'bg-game-coral', description: 'Увлекательные квесты и исследования' },
    strategy: { name: 'Стратегии', color: 'bg-game-teal', description: 'Тактические игры на размышление' },
    rpg: { name: 'РПГ', color: 'bg-game-blue', description: 'Ролевые игры с развитием персонажа' }
  };

  const currentCategory = categoryInfo[category as keyof typeof categoryInfo] || categoryInfo.action;

  const videos = [
    { id: '1', title: 'Cyberpunk 2077: Секретные концовки', views: '2.1M', duration: '25:43', author: 'GameMaster', publishedAt: '2 дня назад', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '2', title: 'Call of Duty: Лучшие моменты', views: '1.8M', duration: '18:32', author: 'ProGamer', publishedAt: '1 день назад', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '3', title: 'GTA 6: Новые подробности', views: '3.2M', duration: '32:15', author: 'NewsGaming', publishedAt: '3 дня назад', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '4', title: 'Resident Evil 4: Полное прохождение', views: '1.5M', duration: '2:15:30', author: 'WalkthroughPro', publishedAt: '1 неделя назад', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '5', title: 'Doom Eternal: Все секреты', views: '967K', duration: '28:44', author: 'SecretHunter', publishedAt: '5 дней назад', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '6', title: 'Mortal Kombat 1: Комбо гайд', views: '743K', duration: '15:22', author: 'FightClub', publishedAt: '2 недели назад', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' }
  ];

  const VideoCard = ({ video }: { video: any }) => (
    <Link to={`/video/${video.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm border-0 cursor-pointer">
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
              <span className="text-xs">{video.publishedAt}</span>
            </div>
            <div className="flex items-center mt-2 text-sm text-gray-600">
              <Icon name="User" size={14} className="mr-1" />
              {video.author}
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
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Поиск в категории..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 border-gray-200 focus:border-game-blue"
                />
              </div>
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
        {/* Category Header */}
        <div className={`${currentCategory.color} rounded-2xl p-8 text-white mb-8`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{fontFamily: 'Montserrat'}}>
                {currentCategory.name}
              </h1>
              <p className="text-xl opacity-90 mb-4" style={{fontFamily: 'Open Sans'}}>
                {currentCategory.description}
              </p>
              <div className="flex items-center text-white/90">
                <Icon name="Play" size={16} className="mr-2" />
                {videos.length} видео в категории
              </div>
            </div>
            <div className="hidden md:block">
              <Icon name="Gamepad2" size={64} className="opacity-30" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Сортировать:</span>
            <div className="flex gap-2">
              {[
                { key: 'popular', label: 'Популярное', icon: 'TrendingUp' },
                { key: 'newest', label: 'Новые', icon: 'Clock' },
                { key: 'views', label: 'Просмотры', icon: 'Eye' }
              ].map((sort) => (
                <Button
                  key={sort.key}
                  variant={sortBy === sort.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy(sort.key)}
                  className={sortBy === sort.key ? "bg-game-blue hover:bg-game-blue/90 text-white" : ""}
                >
                  <Icon name={sort.icon as any} size={14} className="mr-1" />
                  {sort.label}
                </Button>
              ))}
            </div>
          </div>
          
          <Link to="/categories">
            <Button variant="outline" size="sm">
              <Icon name="Grid3X3" size={16} className="mr-2" />
              Все категории
            </Button>
          </Link>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-game-blue hover:bg-game-blue/90 text-white">
            <Icon name="Plus" size={16} className="mr-2" />
            Загрузить ещё
          </Button>
        </div>

        {/* Quick Navigation */}
        <div className="mt-16 bg-white/90 backdrop-blur-sm rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Montserrat'}}>
            Другие категории
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(categoryInfo).map(([key, cat]) => (
              <Link key={key} to={`/category/${key}`}>
                <Card className={`${cat.color} border-0 cursor-pointer hover:scale-105 transition-transform duration-200 text-white`}>
                  <CardContent className="p-4 text-center">
                    <Icon name="Gamepad2" size={24} className="mx-auto mb-2" />
                    <div className="font-semibold text-sm">{cat.name}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}