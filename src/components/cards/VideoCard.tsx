import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface Video {
  id: string;
  slug: string;
  title: string;
  description?: string;
  thumbnails: string[];
  duration_sec: number;
  views_count: number;
  publishedAt: string;
  author: {
    id: string;
    displayName: string;
    handle: string;
    avatar?: string;
  };
  categories?: { name: string; slug: string }[];
}

interface VideoCardProps {
  video: Video;
  variant?: 'default' | 'horizontal' | 'compact';
  showAuthor?: boolean;
  showCategory?: boolean;
  className?: string;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const published = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - published.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'только что';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} мин назад`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ч назад`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} дней назад`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} недель назад`;
  return `${Math.floor(diffInSeconds / 2592000)} месяцев назад`;
}

export default function VideoCard({ 
  video, 
  variant = 'default', 
  showAuthor = true, 
  showCategory = false,
  className 
}: VideoCardProps) {
  const thumbnail = video.thumbnails?.[0] || '/img/c1a04e2e-5efb-4932-a03d-df834442934a.jpg';

  if (variant === 'horizontal') {
    return (
      <Link to={`/video/${video.slug}`}>
        <Card className={cn(
          "group hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 cursor-pointer",
          className
        )}>
          <CardContent className="p-0">
            <div className="flex gap-4">
              <div className="relative flex-shrink-0">
                <img 
                  src={thumbnail} 
                  alt={video.title}
                  className="w-48 h-28 object-cover rounded-l-lg"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
                  {formatDuration(video.duration_sec)}
                </div>
              </div>
              <div className="flex-1 p-4">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-game-blue transition-colors line-clamp-2">
                  {video.title}
                </h3>
                {showAuthor && (
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <Icon name="User" size={14} className="mr-1" />
                    {video.author.displayName}
                    <span className="mx-2">•</span>
                    <Icon name="Eye" size={14} className="mr-1" />
                    {formatViews(video.views_count)}
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-500">
                  <span>{formatTimeAgo(video.publishedAt)}</span>
                  {showCategory && video.categories?.[0] && (
                    <>
                      <span className="mx-2">•</span>
                      <Badge variant="secondary" size="sm">
                        {video.categories[0].name}
                      </Badge>
                    </>
                  )}
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
      <Link to={`/video/${video.slug}`}>
        <Card className={cn(
          "group hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 cursor-pointer",
          className
        )}>
          <CardContent className="p-0">
            <div className="relative">
              <img 
                src={thumbnail} 
                alt={video.title}
                className="w-full h-24 object-cover rounded-t-lg"
              />
              <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1.5 py-0.5 rounded text-xs font-medium">
                {formatDuration(video.duration_sec)}
              </div>
            </div>
            <div className="p-2">
              <h3 className="font-medium text-sm text-gray-900 line-clamp-2 group-hover:text-game-blue transition-colors mb-1">
                {video.title}
              </h3>
              <div className="flex items-center text-xs text-gray-600">
                <Icon name="Eye" size={12} className="mr-1" />
                {formatViews(video.views_count)}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  // Default variant
  return (
    <Link to={`/video/${video.slug}`}>
      <Card className={cn(
        "group hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 cursor-pointer hover:scale-105",
        className
      )}>
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={thumbnail} 
              alt={video.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
              {formatDuration(video.duration_sec)}
            </div>
            <div className="absolute top-2 right-2">
              <div className="bg-black/60 text-white px-2 py-1 rounded text-xs">
                <Icon name="Eye" size={12} className="mr-1 inline" />
                {formatViews(video.views_count)}
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-game-blue transition-colors line-clamp-2">
              {video.title}
            </h3>
            
            {showAuthor && (
              <div className="flex items-center mb-3">
                <Avatar size="sm" className="mr-2">
                  <AvatarImage src={video.author.avatar} alt={video.author.displayName} />
                  <AvatarFallback>{video.author.displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                <Link 
                  to={`/channel/${video.author.handle}`}
                  className="text-sm text-gray-700 hover:text-game-blue transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {video.author.displayName}
                </Link>
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{formatTimeAgo(video.publishedAt)}</span>
              {showCategory && video.categories?.[0] && (
                <Badge variant="secondary" size="sm">
                  {video.categories[0].name}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}