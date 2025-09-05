import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'GamerPro',
    email: 'gamer@example.com',
    bio: 'Страстный игрок с 10-летним опытом. Люблю экшены и РПГ.',
    location: 'Москва, Россия',
    website: 'https://gamerpro.example.com'
  });

  const stats = {
    videosWatched: 1247,
    hoursWatched: 342,
    favoritesCount: 89,
    subscriptions: 23
  };

  const favoriteVideos = [
    { id: '1', title: 'Cyberpunk 2077: Night City Adventures', views: '2.4M', duration: '15:32', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '2', title: 'Elden Ring: Boss Battle Compilation', views: '3.1M', duration: '28:15', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '3', title: 'Minecraft: Building Epic Castles', views: '1.8M', duration: '22:17', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '4', title: 'Baldur\'s Gate 3: Character Creation', views: '845K', duration: '12:08', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' }
  ];

  const watchHistory = [
    { id: '5', title: 'Call of Duty: Warzone Tips', views: '1.1M', duration: '21:55', watchedAt: '2 часа назад', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '6', title: 'FIFA 24: Ultimate Team Guide', views: '1.2M', duration: '18:44', watchedAt: '1 день назад', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '7', title: 'Forza Horizon 5: Best Cars 2024', views: '634K', duration: '16:23', watchedAt: '3 дня назад', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' }
  ];

  const subscriptions = [
    { id: '1', name: 'GameMaster', subscribers: '2.4M', avatar: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '2', name: 'ProGamer', subscribers: '1.8M', avatar: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '3', name: 'NewsGaming', subscribers: '967K', avatar: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' }
  ];

  const VideoCard = ({ video, showWatchedAt = false }: { video: any, showWatchedAt?: boolean }) => (
    <Link to={`/video/${video.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 cursor-pointer">
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
              {video.duration}
            </div>
          </div>
          <div className="p-3">
            <h3 className="font-medium text-sm text-gray-900 line-clamp-2 group-hover:text-game-blue transition-colors mb-1">
              {video.title}
            </h3>
            <div className="flex items-center text-xs text-gray-600">
              <Icon name="Eye" size={12} className="mr-1" />
              {video.views}
              {showWatchedAt && (
                <>
                  <span className="mx-2">•</span>
                  <span>{video.watchedAt}</span>
                </>
              )}
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
              <Link to="/search">
                <Button variant="ghost" size="sm">
                  <Icon name="Search" size={16} />
                  Поиск
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <Icon name="Settings" size={16} />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-game-blue to-game-purple rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Icon name="User" size={48} className="text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold" style={{fontFamily: 'Montserrat'}}>
                  {userInfo.name}
                </h1>
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Icon name="Edit" size={16} className="mr-2" />
                  {isEditing ? 'Сохранить' : 'Редактировать'}
                </Button>
              </div>
              
              <p className="text-white/90 mb-4" style={{fontFamily: 'Open Sans'}}>
                {userInfo.bio}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-white/80">
                <div className="flex items-center">
                  <Icon name="MapPin" size={14} className="mr-1" />
                  {userInfo.location}
                </div>
                <div className="flex items-center">
                  <Icon name="Globe" size={14} className="mr-1" />
                  <a href={userInfo.website} className="hover:text-white">{userInfo.website}</a>
                </div>
                <div className="flex items-center">
                  <Icon name="Calendar" size={14} className="mr-1" />
                  Зарегистрирован в марте 2023
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-game-blue">{stats.videosWatched}</div>
              <div className="text-sm text-gray-600">Просмотрено видео</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-game-red">{stats.hoursWatched}</div>
              <div className="text-sm text-gray-600">Часов просмотра</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-game-purple">{stats.favoritesCount}</div>
              <div className="text-sm text-gray-600">В избранном</div>
            </CardContent>
          </Card>
          <Card className="bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-game-teal">{stats.subscriptions}</div>
              <div className="text-sm text-gray-600">Подписки</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Icon name="Heart" size={16} />
              Избранное
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Icon name="History" size={16} />
              История
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <Icon name="UserPlus" size={16} />
              Подписки
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Icon name="Settings" size={16} />
              Настройки
            </TabsTrigger>
          </TabsList>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card className="bg-white/90 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900" style={{fontFamily: 'Montserrat'}}>
                    Избранные видео
                  </h2>
                  <Button variant="outline" size="sm">
                    <Icon name="ArrowUpDown" size={16} className="mr-2" />
                    Сортировать
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {favoriteVideos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card className="bg-white/90 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900" style={{fontFamily: 'Montserrat'}}>
                    История просмотров
                  </h2>
                  <Button variant="outline" size="sm">
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Очистить историю
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {watchHistory.map((video) => (
                    <VideoCard key={video.id} video={video} showWatchedAt />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions">
            <Card className="bg-white/90 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Montserrat'}}>
                  Подписки
                </h2>
                <div className="space-y-4">
                  {subscriptions.map((channel) => (
                    <div key={channel.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-game-blue to-game-purple rounded-full flex items-center justify-center">
                          <Icon name="User" size={20} className="text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{channel.name}</div>
                          <div className="text-sm text-gray-600">{channel.subscribers} подписчиков</div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Icon name="Bell" size={16} className="mr-2" />
                        Уведомления
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-white/90 backdrop-blur-sm border-0">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6" style={{fontFamily: 'Montserrat'}}>
                  Настройки профиля
                </h2>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Имя пользователя</Label>
                      <Input
                        id="name"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">О себе</Label>
                      <Input
                        id="bio"
                        value={userInfo.bio}
                        onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Конфиденциальность</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        Показывать историю просмотров
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        Получать уведомления о новых видео
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        Публичный профиль
                      </label>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <Button variant="destructive">
                      <Icon name="Trash2" size={16} className="mr-2" />
                      Удалить аккаунт
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}