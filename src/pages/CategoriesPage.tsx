import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'action', name: 'Экшн', color: 'bg-game-red', count: 127, description: 'Динамичные игры с быстрым геймплеем', icon: 'Zap' },
    { id: 'adventure', name: 'Приключения', color: 'bg-game-coral', count: 89, description: 'Увлекательные квесты и исследования', icon: 'Compass' },
    { id: 'strategy', name: 'Стратегии', color: 'bg-game-teal', count: 64, description: 'Тактические игры на размышление', icon: 'Brain' },
    { id: 'rpg', name: 'РПГ', color: 'bg-game-blue', count: 43, description: 'Ролевые игры с развитием персонажа', icon: 'Shield' },
    { id: 'racing', name: 'Гонки', color: 'bg-game-mint', count: 35, description: 'Скоростные автомобильные симуляторы', icon: 'Car' },
    { id: 'sports', name: 'Спорт', color: 'bg-game-yellow', count: 28, description: 'Футбол, баскетбол и другие виды спорта', icon: 'Trophy' },
    { id: 'puzzle', name: 'Головоломки', color: 'bg-game-purple', count: 52, description: 'Логические игры и паззлы', icon: 'Puzzle' },
    { id: 'shooter', name: 'Шутеры', color: 'bg-game-dark', count: 73, description: 'Игры в жанре первого и третьего лица', icon: 'Target' },
    { id: 'simulation', name: 'Симуляторы', color: 'bg-orange-500', count: 39, description: 'Симуляция жизни и различных процессов', icon: 'Settings' },
    { id: 'horror', name: 'Хоррор', color: 'bg-gray-800', count: 24, description: 'Игры ужасов и триллеры', icon: 'Ghost' },
    { id: 'indie', name: 'Инди', color: 'bg-emerald-500', count: 67, description: 'Независимые игры от малых студий', icon: 'Lightbulb' },
    { id: 'mmo', name: 'MMO', color: 'bg-violet-500', count: 31, description: 'Многопользовательские онлайн-игры', icon: 'Users' }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
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
              <Link to="/search">
                <Button variant="ghost" size="sm">
                  <Icon name="Search" size={16} />
                  Поиск
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
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Montserrat'}}>
            Все категории
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8" style={{fontFamily: 'Open Sans'}}>
            Выберите интересующую вас категорию игр и откройте мир новых видео
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Найти категорию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-200 focus:border-game-blue"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredCategories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <Card className={`${category.color} border-0 cursor-pointer hover:scale-105 transition-all duration-300 text-white group shadow-lg`}>
                <CardContent className="p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <Icon name={category.icon as any} size={32} className="text-white" />
                      <div className="text-right">
                        <div className="text-2xl font-bold">{category.count}</div>
                        <div className="text-sm opacity-90">видео</div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2" style={{fontFamily: 'Montserrat'}}>
                      {category.name}
                    </h3>
                    
                    <p className="text-white/90 text-sm leading-relaxed" style={{fontFamily: 'Open Sans'}}>
                      {category.description}
                    </p>
                    
                    <div className="flex items-center mt-4 text-white/80 group-hover:text-white transition-colors">
                      <Icon name="ArrowRight" size={16} className="mr-2" />
                      <span className="text-sm font-medium">Смотреть видео</span>
                    </div>
                  </div>
                  
                  {/* Background decoration */}
                  <div className="absolute -bottom-6 -right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon name={category.icon as any} size={80} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Search" size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Категории не найдены</h3>
            <p className="text-gray-600">Попробуйте изменить поисковый запрос</p>
          </div>
        )}

        {/* Stats Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Montserrat'}}>
            Статистика платформы
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-game-blue">{categories.reduce((sum, cat) => sum + cat.count, 0)}+</div>
              <div className="text-gray-600">Всего видео</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-game-red">{categories.length}</div>
              <div className="text-gray-600">Категорий</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-game-purple">1M+</div>
              <div className="text-gray-600">Пользователей</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-game-teal">24/7</div>
              <div className="text-gray-600">Онлайн</div>
            </div>
          </div>
          
          <div className="mt-8">
            <Link to="/register">
              <Button size="lg" className="bg-game-blue hover:bg-game-blue/90 text-white">
                <Icon name="UserPlus" size={16} className="mr-2" />
                Присоединиться к сообществу
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}