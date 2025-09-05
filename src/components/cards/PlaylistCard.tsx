import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface Playlist {
  id: string;
  slug: string;
  title: string;
  description?: string;
  cover?: string;
  visibility: 'public' | 'unlisted' | 'private';
  videos_count: number;
  total_duration: number;
  owner: {
    displayName: string;
    handle: string;
  };
  updatedAt: string;
}

interface PlaylistCardProps {
  playlist: Playlist;
  variant?: 'default' | 'horizontal' | 'compact';
  className?: string;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours} ч ${minutes} мин`;
  }
  return `${minutes} мин`;
}

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const updated = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - updated.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'только что';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} мин назад`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ч назад`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} дней назад`;
  return `${Math.floor(diffInSeconds / 604800)} недель назад`;
}

const visibilityIcons = {
  public: 'Globe',
  unlisted: 'Link',
  private: 'Lock'
};

const visibilityLabels = {
  public: 'Публичный',
  unlisted: 'По ссылке',
  private: 'Приватный'
};

export default function PlaylistCard({
  playlist,
  variant = 'default',
  className
}: PlaylistCardProps) {

  if (variant === 'horizontal') {
    return (
      <Link to={`/playlist/${playlist.slug}`}>
        <Card className={cn(
          "group hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 cursor-pointer",
          className
        )}>
          <CardContent className="p-0">
            <div className="flex gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-48 h-28 bg-gradient-to-br from-game-purple to-game-blue rounded-l-lg flex items-center justify-center">
                  {playlist.cover ? (
                    <img 
                      src={playlist.cover} 
                      alt={playlist.title}
                      className="w-full h-full object-cover rounded-l-lg"
                    />
                  ) : (
                    <Icon name="PlayCircle" size={32} className="text-white" />
                  )}
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                  {playlist.videos_count} видео
                </div>
              </div>
              <div className="flex-1 p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-game-blue transition-colors line-clamp-2">
                  {playlist.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Icon name="User" size={14} className="mr-1" />
                  {playlist.owner.displayName}
                  <span className="mx-2">•</span>
                  <Icon name={visibilityIcons[playlist.visibility] as any} size={14} className="mr-1" />
                  {visibilityLabels[playlist.visibility]}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Обновлен {formatTimeAgo(playlist.updatedAt)}</span>
                  <span className="mx-2">•</span>
                  <span>{formatDuration(playlist.total_duration)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link to={`/playlist/${playlist.slug}`}>
        <Card className={cn(
          "group hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 cursor-pointer",
          className
        )}>
          <CardContent className="p-0">
            <div className="relative">
              <div className="w-full h-24 bg-gradient-to-br from-game-purple to-game-blue rounded-t-lg flex items-center justify-center">
                {playlist.cover ? (
                  <img 
                    src={playlist.cover} 
                    alt={playlist.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                ) : (
                  <Icon name="PlayCircle" size={24} className="text-white" />
                )}
              </div>
              <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1.5 py-0.5 rounded text-xs font-medium">
                {playlist.videos_count}
              </div>
            </div>
            <div className="p-2">
              <h3 className="font-medium text-sm text-gray-900 line-clamp-2 group-hover:text-game-blue transition-colors mb-1">
                {playlist.title}
              </h3>
              <div className="flex items-center text-xs text-gray-600">
                <Icon name={visibilityIcons[playlist.visibility] as any} size={12} className="mr-1" />
                {visibilityLabels[playlist.visibility]}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  // Default variant
  return (
    <Link to={`/playlist/${playlist.slug}`}>
      <Card className={cn(
        "group hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 cursor-pointer hover:scale-105",
        className
      )}>
        <CardContent className="p-0">
          <div className="relative">
            <div className="w-full h-48 bg-gradient-to-br from-game-purple to-game-blue rounded-t-lg flex items-center justify-center">
              {playlist.cover ? (
                <img 
                  src={playlist.cover} 
                  alt={playlist.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              ) : (
                <div className="text-center text-white">
                  <Icon name="PlayCircle" size={48} className="mb-2" />
                  <div className="text-sm font-medium">Плейлист</div>
                </div>
              )}
            </div>
            
            {/* Video count overlay */}
            <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
              {playlist.videos_count} видео
            </div>
            
            {/* Visibility badge */}
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" size="sm">
                <Icon name={visibilityIcons[playlist.visibility] as any} size={12} className="mr-1" />
                {visibilityLabels[playlist.visibility]}
              </Badge>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-game-blue transition-colors line-clamp-2">
              {playlist.title}
            </h3>
            
            {playlist.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {playlist.description}
              </p>
            )}

            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Icon name="User" size={14} className="mr-1" />
              <Link 
                to={`/channel/${playlist.owner.handle}`}
                className="hover:text-game-blue transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {playlist.owner.displayName}
              </Link>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{formatTimeAgo(playlist.updatedAt)}</span>
              <div className="flex items-center">
                <Icon name="Clock" size={12} className="mr-1" />
                {formatDuration(playlist.total_duration)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}