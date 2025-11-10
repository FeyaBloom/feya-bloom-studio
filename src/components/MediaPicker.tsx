import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Folder, Image, Video, Home, ArrowLeft, Search, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaFile {
  name: string;
  url: string;
  type: string;
  isFolder: boolean;
}

interface MediaPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  acceptTypes?: string[]; // ['image', 'video']
}

export const MediaPicker = ({ open, onClose, onSelect, acceptTypes = ['image', 'video'] }: MediaPickerProps) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [currentPath, setCurrentPath] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      loadFiles();
    }
  }, [open, currentPath]);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const { data: fileList, error } = await supabase.storage
        .from('media')
        .list(currentPath, {
          limit: 1000,
          offset: 0,
        });

      if (error) throw error;

      if (!fileList) {
        setFiles([]);
        return;
      }

      // Separate folders and files
      const folders = fileList
        .filter(file => file.id === null)
        .map(folder => ({
          name: folder.name,
          url: '',
          type: 'folder',
          isFolder: true
        }));

      const regularFiles = await Promise.all(
        fileList
          .filter(file => file.id !== null && file.name !== '.keep')
          .map(async (file) => {
            const filePath = currentPath ? `${currentPath}/${file.name}` : file.name;
            const { data: { publicUrl } } = supabase.storage
              .from('media')
              .getPublicUrl(filePath);

            return {
              name: file.name,
              url: publicUrl,
              type: file.metadata?.mimetype || 'unknown',
              isFolder: false
            };
          })
      );

      // Filter by accepted types
      const filteredFiles = regularFiles.filter(file => {
        if (acceptTypes.includes('image') && file.type.startsWith('image/')) return true;
        if (acceptTypes.includes('video') && file.type.startsWith('video/')) return true;
        return false;
      });

      setFiles([...folders, ...filteredFiles]);
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || 'Не удалось загрузить файлы',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const openFolder = (folderName: string) => {
    const newPath = currentPath ? `${currentPath}/${folderName}` : folderName;
    setCurrentPath(newPath);
    setSearchQuery('');
  };

  const goBack = () => {
    const pathParts = currentPath.split('/');
    pathParts.pop();
    setCurrentPath(pathParts.join('/'));
  };

  const goToRoot = () => {
    setCurrentPath('');
  };

  const handleSelect = () => {
    if (selectedUrl) {
      onSelect(selectedUrl);
      onClose();
      setSelectedUrl('');
      setCurrentPath('');
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Выбрать медиа</DialogTitle>
        </DialogHeader>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToRoot}
            className="gap-1 h-8"
          >
            <Home className="h-4 w-4" />
            Корень
          </Button>
          {currentPath.split('/').filter(Boolean).map((part, index, arr) => (
            <span key={index} className="flex items-center gap-2">
              <span>/</span>
              <span className={index === arr.length - 1 ? 'font-medium' : ''}>
                {part}
              </span>
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {currentPath && (
            <Button
              onClick={goBack}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
          )}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск файлов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Files Grid */}
        <ScrollArea className="flex-1 pr-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">Загрузка...</p>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">
                {searchQuery ? 'Файлы не найдены' : 'Папка пуста'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {filteredFiles.map((file) => (
                <div
                  key={file.name}
                  className={`relative border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                    selectedUrl === file.url ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => {
                    if (file.isFolder) {
                      openFolder(file.name);
                    } else {
                      setSelectedUrl(file.url);
                    }
                  }}
                >
                  {/* Preview */}
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    {file.isFolder ? (
                      <Folder className="w-12 h-12 text-muted-foreground" />
                    ) : file.type.startsWith('image/') ? (
                      <img 
                        src={file.url} 
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : file.type.startsWith('video/') ? (
                      <Video className="w-12 h-12 text-muted-foreground" />
                    ) : (
                      <Image className="w-12 h-12 text-muted-foreground" />
                    )}
                  </div>

                  {/* Selected indicator */}
                  {selectedUrl === file.url && (
                    <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}

                  {/* Name */}
                  <div className="p-2 bg-background">
                    <p className="text-xs truncate" title={file.name}>
                      {file.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSelect} disabled={!selectedUrl}>
            Выбрать
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};