import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function VideoPage() {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const video = {
    id: id,
    title: 'Cyberpunk 2077: Night City Adventures - Полное прохождение',
    description: 'Погружаемся в мир будущего в Cyberpunk 2077! В этом видео я покажу вам лучшие квесты Night City, секретные локации и эпичные моменты игры. Приготовьтесь к невероятному путешествию!',
    views: '2.4M',
    likes: '89K',
    duration: '45:32',
    category: 'Экшн',
    author: 'GamerPro',
    publishedAt: '3 дня назад',
    thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg'
  };

  const relatedVideos = [
    { id: '2', title: 'Cyberpunk 2077: Лучшие билды персонажа', views: '1.2M', duration: '18:24', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '3', title: 'Elden Ring: Секретные боссы', views: '856K', duration: '22:15', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' },
    { id: '4', title: 'Minecraft: Мегапостройки', views: '1.8M', duration: '35:42', thumbnail: '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
              <div className="text-2xl font-bold bg-gradient-to-r from-game-blue to-game-purple bg-clip-text text-transparent" style={{fontFamily: 'Montserrat'}}>
                VideoHub 🚀
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/search">
                <Button variant="ghost" size="sm">
                  <Icon name="Search" size={16} />
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card className="bg-black/90 border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <Button 
                    size="lg" 
                    className="absolute bg-white/20 hover:bg-white/30 border-2 border-white/50 text-white backdrop-blur-sm"
                  >
                    <Icon name="Play" size={32} className="ml-1" />
                  </Button>
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded text-sm font-medium">
                    {video.duration}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Video Info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{fontFamily: 'Montserrat'}}>
                  {video.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Icon name="Eye" size={14} />
                    {video.views} просмотров
                  </span>
                  <span>•</span>
                  <span>{video.publishedAt}</span>
                  <span>•</span>
                  <span className="bg-game-blue/10 text-game-blue px-2 py-1 rounded-full text-xs">
                    {video.category}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button 
                  variant={isLiked ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? "bg-game-red hover:bg-game-red/90 text-white" : ""}
                >
                  <Icon name="ThumbsUp" size={16} className="mr-2" />
                  {video.likes}
                </Button>
                
                <Button 
                  variant={isFavorite ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? "bg-game-purple hover:bg-game-purple/90 text-white" : ""}
                >
                  <Icon name="Heart" size={16} className="mr-2" />
                  В избранное
                </Button>
                
                <Button variant="outline" size="sm">
                  <Icon name="Share" size={16} className="mr-2" />
                  Поделиться
                </Button>
              </div>

              {/* Author Info */}
              <Card className="bg-white/90 backdrop-blur-sm border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-game-blue to-game-purple rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{video.author}</div>
                        <div className="text-sm text-gray-600">127K подписчиков</div>
                      </div>
                    </div>
                    <Button className="bg-game-red hover:bg-game-red/90 text-white">
                      <Icon name="UserPlus" size={16} className="mr-2" />
                      Подписаться
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="bg-white/90 backdrop-blur-sm border-0">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Описание</h3>
                  <p className="text-gray-700 leading-relaxed" style={{fontFamily: 'Open Sans'}}>
                    {video.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Montserrat'}}>
                Похожие видео
              </h3>
              <div className="space-y-4">
                {relatedVideos.map((relatedVideo) => (
                  <Link key={relatedVideo.id} to={`/video/${relatedVideo.id}`}>
                    <Card className="group hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 cursor-pointer">
                      <CardContent className="p-3">
                        <div className="flex gap-3">
                          <div className="relative flex-shrink-0">
                            <img 
                              src={relatedVideo.thumbnail} 
                              alt={relatedVideo.title}
                              className="w-24 h-16 object-cover rounded"
                            />
                            <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1 py-0.5 rounded text-xs">
                              {relatedVideo.duration}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-gray-900 line-clamp-2 group-hover:text-game-blue transition-colors">
                              {relatedVideo.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-600 mt-1">
                              <Icon name="Eye" size={12} className="mr-1" />
                              {relatedVideo.views}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories Quick Links */}
            <Card className="bg-white/90 backdrop-blur-sm border-0">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Категории</h3>
                <div className="space-y-2">
                  {['Экшн', 'РПГ', 'Стратегии', 'Гонки', 'Спорт'].map((category) => (
                    <Link key={category} to={`/category/${category.toLowerCase()}`}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Icon name="Gamepad2" size={14} className="mr-2" />
                        {category}
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}