import { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoGrid from '@/components/blocks/VideoGrid';
import Carousel from '@/components/blocks/Carousel';
import VideoCard from '@/components/cards/VideoCard';
import ChannelCard from '@/components/cards/ChannelCard';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  const mockVideos = [
    { 
      id: '1', 
      slug: 'cyberpunk-2077-night-city',
      title: 'Cyberpunk 2077: Night City Adventures', 
      description: 'Исследуем темные улицы Найт-Сити в этом эпическом прохождении',
      thumbnails: ['/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg'],
      duration_sec: 932, 
      views_count: 2400000, 
      publishedAt: '2024-01-15T10:00:00Z',
      author: {
        id: 'u1',
        displayName: 'GamerPro',
        handle: 'gamerpro',
        avatar: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg'
      },
      categories: [{ name: 'Экшн', slug: 'action' }]
    },
    { 
      id: '2', 
      slug: 'minecraft-building-castles',
      title: 'Minecraft: Building Epic Castles', 
      description: 'Строим невероятные замки в майнкрафте шаг за шагом',
      thumbnails: ['/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg'],
      duration_sec: 1337, 
      views_count: 1800000, 
      publishedAt: '2024-01-14T10:00:00Z',
      author: {
        id: 'u2',
        displayName: 'BuildMaster',
        handle: 'buildmaster',
        avatar: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg'
      },
      categories: [{ name: 'Приключения', slug: 'adventure' }]
    },
    { 
      id: '3', 
      slug: 'fifa-24-ultimate-team',
      title: 'FIFA 24: Ultimate Team Guide', 
      description: 'Гайд по созданию лучшей команды в FIFA 24',
      thumbnails: ['/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg'],
      duration_sec: 1124, 
      views_count: 1200000, 
      publishedAt: '2024-01-13T10:00:00Z',
      author: {
        id: 'u3',
        displayName: 'SportGamer',
        handle: 'sportgamer',
        avatar: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg'
      },
      categories: [{ name: 'Спорт', slug: 'sports' }]
    },
    { 
      id: '4', 
      slug: 'elden-ring-boss-battles',
      title: 'Elden Ring: Boss Battle Compilation', 
      description: 'Эпичные битвы с боссами Elden Ring',
      thumbnails: ['/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg'],
      duration_sec: 1695, 
      views_count: 3100000, 
      publishedAt: '2024-01-12T10:00:00Z',
      author: {
        id: 'u4',
        displayName: 'BossFighter',
        handle: 'bossfighter',
        avatar: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg'
      },
      categories: [{ name: 'Экшн', slug: 'action' }]
    },
    { 
      id: '5', 
      slug: 'baldurs-gate-3-character',
      title: 'Baldur\'s Gate 3: Character Creation', 
      description: 'Создаем идеального персонажа в Baldur\'s Gate 3',
      thumbnails: ['/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg'],
      duration_sec: 728, 
      views_count: 845000, 
      publishedAt: '2024-01-11T10:00:00Z',
      author: {
        id: 'u5',
        displayName: 'RPGMaster',
        handle: 'rpgmaster',
        avatar: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg'
      },
      categories: [{ name: 'РПГ', slug: 'rpg' }]
    },
    { 
      id: '6', 
      slug: 'forza-horizon-5-cars',
      title: 'Forza Horizon 5: Best Cars 2024', 
      description: 'Обзор лучших автомобилей в Forza Horizon 5',
      thumbnails: ['/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg'],
      duration_sec: 983, 
      views_count: 634000, 
      publishedAt: '2024-01-10T10:00:00Z',
      author: {
        id: 'u6',
        displayName: 'SpeedDemon',
        handle: 'speeddemon',
        avatar: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg'
      },
      categories: [{ name: 'Гонки', slug: 'racing' }]
    }
  ];

  const mockChannels = [
    {
      id: 'u1',
      handle: 'gamerpro',
      displayName: 'GamerPro',
      bio: 'Профессиональный игрок с 10-летним опытом. Стримы каждый день!',
      avatar: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg',
      banner: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg',
      followers_count: 245000,
      videos_count: 328,
      isSubscribed: false
    },
    {
      id: 'u2',
      handle: 'buildmaster',
      displayName: 'BuildMaster',
      bio: 'Мастер строительства в Minecraft и других играх',
      avatar: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg',
      followers_count: 189000,
      videos_count: 156,
      isSubscribed: true
    },
    {
      id: 'u3',
      handle: 'sportgamer',
      displayName: 'SportGamer',
      bio: 'Всё о спортивных играх: FIFA, NBA 2K, F1',
      avatar: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg',
      followers_count: 167000,
      videos_count: 89,
      isSubscribed: false
    }
  ];

  const popularVideos = mockVideos.slice(0, 4);
  const newVideos = mockVideos.slice(2, 6);
  const topChannels = mockChannels;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Navigate to search page with query
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <Header 
        isAuthenticated={false}
        onSearch={handleSearch}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Montserrat'}}>
            Мир игровых видео
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8" style={{fontFamily: 'Open Sans'}}>
            Открой для себя лучшие игровые моменты, обучающие гайды и эпичные прохождения
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search">
              <Button size="lg" className="bg-game-blue hover:bg-game-blue/90 text-white">
                <Icon name="Search" size={16} className="mr-2" />
                Найти видео
              </Button>
            </Link>
            <Link to="/categories">
              <Button size="lg" variant="outline">
                <Icon name="Grid3X3" size={16} className="mr-2" />
                Все категории
              </Button>
            </Link>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Montserrat'}}>
              Популярные категории
            </h2>
            <Link to="/categories">
              <Button variant="outline" size="sm">
                <Icon name="Grid3X3" size={16} className="mr-2" />
                Все категории
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category) => (
              <Link key={category.id} to={`/category/${category.id}`}>
                <Card 
                  className={`${category.color} border-0 cursor-pointer hover:scale-105 transition-transform duration-200 text-white overflow-hidden group`}
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
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Videos Carousel */}
        <section className="mb-12">
          <Carousel
            title="🔥 Популярные видео"
            itemsPerView={4}
            autoPlay={true}
            showNavigation={true}
          >
            {popularVideos.map((video) => (
              <VideoCard key={video.id} video={video} showAuthor={true} />
            ))}
          </Carousel>
        </section>

        {/* New Videos Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Montserrat'}}>
              ✨ Новые видео
            </h2>
            <Link to="/new">
              <Button variant="outline" size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Все новинки
              </Button>
            </Link>
          </div>
          
          <VideoGrid 
            videos={newVideos}
            columns={4}
            showAuthor={true}
          />
        </section>

        {/* Top Channels */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900" style={{fontFamily: 'Montserrat'}}>
              🏆 Популярные каналы
            </h2>
            <Button variant="outline" size="sm">
              <Icon name="Users" size={16} className="mr-2" />
              Все каналы
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topChannels.map((channel) => (
              <ChannelCard 
                key={channel.id} 
                channel={channel} 
                variant="default"
                showSubscribeButton={true}
              />
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section className="mb-12">
          <Link to="/trending">
            <Card className="bg-gradient-to-r from-game-red to-game-coral text-white border-0 cursor-pointer hover:scale-105 transition-transform duration-200 overflow-hidden group">
              <CardContent className="p-8 text-center relative">
                <div className="relative z-10">
                  <Icon name="TrendingUp" size={48} className="mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-2" style={{fontFamily: 'Montserrat'}}>
                    🔥 В тренде сегодня
                  </h2>
                  <p className="text-white/90 mb-4">
                    Самые горячие видео за последние 24 часа
                  </p>
                  <Button size="lg" className="bg-white text-game-red hover:bg-gray-100">
                    <Icon name="PlayCircle" size={16} className="mr-2" />
                    Смотреть тренды
                  </Button>
                </div>
                <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Icon name="Flame" size={120} />
                </div>
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Stats Banner */}
        <section className="bg-gradient-to-r from-game-blue to-game-purple rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4" style={{fontFamily: 'Montserrat'}}>
            Присоединяйся к сообществу геймеров!
          </h2>
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-6">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-white text-game-blue hover:bg-gray-100">
                <Icon name="UserPlus" size={16} className="mr-2" />
                Регистрация
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-game-blue">
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-t fixed bottom-0 left-0 right-0 z-50">
        <div className="flex items-center justify-around py-2">
          {[
            { icon: 'Home', label: 'Главная', path: '/', active: true },
            { icon: 'Grid3X3', label: 'Категории', path: '/categories' },
            { icon: 'TrendingUp', label: 'Тренды', path: '/trending' },
            { icon: 'Search', label: 'Поиск', path: '/search' },
            { icon: 'User', label: 'Профиль', path: '/profile' }
          ].map((item, index) => (
            <Link key={index} to={item.path}>
              <Button variant="ghost" size="sm" className="flex flex-col items-center p-2 h-auto">
                <Icon name={item.icon as any} size={18} className={item.active ? 'text-game-blue' : 'text-gray-600'} />
                <span className={`text-xs mt-1 ${item.active ? 'text-game-blue font-medium' : 'text-gray-600'}`}>
                  {item.label}
                </span>
              </Button>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}