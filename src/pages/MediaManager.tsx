import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Upload, 
  Folder, 
  FolderPlus,
  ArrowLeft, 
  Home,
  Search,
  Trash2,
  Copy,
  Check,
  X,
  Image,
  Video,
  File,
  Edit2,
  FolderInput
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MediaFile {
  name: string;
  url: string;
  type: string;
  size: number;
  created_at: string;
  isFolder: boolean;
}

export default function MediaManager() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState('');
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  
  // Rename/Move modal states
  const [renameTarget, setRenameTarget] = useState<MediaFile | null>(null);
  const [newFileName, setNewFileName] = useState('');
  const [moveTarget, setMoveTarget] = useState<MediaFile | null>(null);
  const [moveDestination, setMoveDestination] = useState('');
  const [availableFolders, setAvailableFolders] = useState<string[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      loadFiles();
    }
  }, [currentPath]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate('/login');
      return;
    }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!roles || roles.role !== 'admin') {
      toast({
        title: "Доступ запрещен",
        description: "У вас нет прав администратора",
        variant: "destructive"
      });
      navigate('/');
      return;
    }

    setLoading(false);
  };

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
          size: 0,
          created_at: folder.created_at || '',
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
              size: file.metadata?.size || 0,
              created_at: file.created_at,
              isFolder: false
            };
          })
      );

      setFiles([...folders, ...regularFiles]);
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

  const loadAvailableFolders = async () => {
    try {
      const folders: string[] = ['/ (корень)'];
      
      const loadFoldersRecursive = async (path: string) => {
        const { data: fileList } = await supabase.storage
          .from('media')
          .list(path);

        if (fileList) {
          for (const file of fileList) {
            if (file.id === null) { // It's a folder
              const folderPath = path ? `${path}/${file.name}` : file.name;
              folders.push(folderPath);
              await loadFoldersRecursive(folderPath);
            }
          }
        }
      };

      await loadFoldersRecursive('');
      setAvailableFolders(folders);
    } catch (error) {
      console.error('Error loading folders:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "Ошибка",
          description: 'Файл слишком большой. Максимум 50MB.',
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);

      const fileExt = selectedFile.name.split('.').pop();
      const cleanName = selectedFile.name.replace(/\.[^/.]+$/, "").replace(/[^a-z0-9]/gi, '-').toLowerCase();
      const fileName = `${cleanName}-${Date.now()}.${fileExt}`;
      const filePath = currentPath ? `${currentPath}/${fileName}` : fileName;

      const { error } = await supabase.storage
        .from('media')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: 'Файл загружен успешно!'
      });
      setSelectedFile(null);
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      loadFiles();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || 'Не удалось загрузить файл',
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const createFolder = async () => {
    if (!newFolderName.trim()) {
      toast({
        title: "Ошибка",
        description: 'Введите имя папки',
        variant: "destructive"
      });
      return;
    }

    try {
      const folderPath = currentPath 
        ? `${currentPath}/${newFolderName}/.keep` 
        : `${newFolderName}/.keep`;

      const { error } = await supabase.storage
        .from('media')
        .upload(folderPath, new Blob([''], { type: 'text/plain' }), {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: 'Папка создана успешно!'
      });
      setNewFolderName('');
      setShowNewFolder(false);
      loadFiles();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || 'Не удалось создать папку',
        variant: "destructive"
      });
    }
  };

  const handleRename = async () => {
    if (!renameTarget || !newFileName.trim()) return;

    try {
      const oldPath = currentPath ? `${currentPath}/${renameTarget.name}` : renameTarget.name;
      const fileExt = renameTarget.name.split('.').pop();
      const newPath = currentPath ? `${currentPath}/${newFileName}.${fileExt}` : `${newFileName}.${fileExt}`;

      // Copy file to new location
      const { error: copyError } = await supabase.storage
        .from('media')
        .copy(oldPath, newPath);

      if (copyError) throw copyError;

      // Delete old file
      const { error: deleteError } = await supabase.storage
        .from('media')
        .remove([oldPath]);

      if (deleteError) throw deleteError;

      toast({
        title: "Успешно",
        description: 'Файл переименован'
      });
      setRenameTarget(null);
      setNewFileName('');
      loadFiles();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || 'Не удалось переименовать файл',
        variant: "destructive"
      });
    }
  };

  const handleMove = async () => {
    if (!moveTarget || moveDestination === undefined) return;

    try {
      const oldPath = currentPath ? `${currentPath}/${moveTarget.name}` : moveTarget.name;
      const destPath = moveDestination === '/ (корень)' ? '' : moveDestination;
      const newPath = destPath ? `${destPath}/${moveTarget.name}` : moveTarget.name;

      if (oldPath === newPath) {
        toast({
          title: "Ошибка",
          description: 'Файл уже находится в этой папке',
          variant: "destructive"
        });
        return;
      }

      // Copy file to new location
      const { error: copyError } = await supabase.storage
        .from('media')
        .copy(oldPath, newPath);

      if (copyError) throw copyError;

      // Delete old file
      const { error: deleteError } = await supabase.storage
        .from('media')
        .remove([oldPath]);

      if (deleteError) throw deleteError;

      toast({
        title: "Успешно",
        description: 'Файл перемещен'
      });
      setMoveTarget(null);
      setMoveDestination('');
      loadFiles();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || 'Не удалось переместить файл',
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (fileName: string, isFolder: boolean) => {
    try {
      if (isFolder) {
        const folderPath = currentPath ? `${currentPath}/${fileName}` : fileName;
        const { data: folderFiles } = await supabase.storage
          .from('media')
          .list(folderPath);

        if (folderFiles && folderFiles.length > 0) {
          const filePaths = folderFiles.map(f => `${folderPath}/${f.name}`);
          const { error } = await supabase.storage
            .from('media')
            .remove(filePaths);
          
          if (error) throw error;
        }
      } else {
        const filePath = currentPath ? `${currentPath}/${fileName}` : fileName;
        const { error } = await supabase.storage
          .from('media')
          .remove([filePath]);
        
        if (error) throw error;
      }

      toast({
        title: "Успешно",
        description: isFolder ? 'Папка удалена' : 'Файл удален'
      });
      loadFiles();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || 'Не удалось удалить',
        variant: "destructive"
      });
    } finally {
      setDeleteTarget(null);
    }
  };

  const openFolder = (folderName: string) => {
    const newPath = currentPath ? `${currentPath}/${folderName}` : folderName;
    setCurrentPath(newPath);
  };

  const goBack = () => {
    const pathParts = currentPath.split('/');
    pathParts.pop();
    setCurrentPath(pathParts.join('/'));
  };

  const goToRoot = () => {
    setCurrentPath('');
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      toast({
        title: "Успешно",
        description: 'URL скопирован в буфер обмена!'
      });
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: 'Не удалось скопировать URL',
        variant: "destructive"
      });
    }
  };

  const getFileIcon = (type: string) => {
    if (type === 'folder') return <Folder className="w-5 h-5" />;
    if (type.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (type.startsWith('video/')) return <Video className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-mystic">
        <p className="text-xl text-foreground">Загрузка медиа...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-mystic">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/admin')}
              className="text-foreground hover:bg-accent"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-4xl font-serif text-foreground">Медиа Менеджер</h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-muted-foreground text-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToRoot}
            className="gap-1"
          >
            <Home className="h-4 w-4" />
            Корень
          </Button>
          {currentPath.split('/').filter(Boolean).map((part, index, arr) => (
            <span key={index} className="flex items-center gap-2">
              <span>/</span>
              <span className={index === arr.length - 1 ? 'text-foreground font-medium' : ''}>
                {part}
              </span>
            </span>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setShowNewFolder(!showNewFolder)}
            variant="outline"
            className="gap-2"
          >
            <FolderPlus className="h-4 w-4" />
            Новая папка
          </Button>
          {currentPath && (
            <Button
              onClick={goBack}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад
            </Button>
          )}
        </div>

        {/* New Folder Input */}
        {showNewFolder && (
          <Card className="p-4 mb-6">
            <div className="flex gap-4">
              <Input
                placeholder="Имя папки..."
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && createFolder()}
                className="flex-1"
              />
              <Button onClick={createFolder}>Создать</Button>
              <Button variant="outline" onClick={() => {
                setShowNewFolder(false);
                setNewFolderName('');
              }}>
                Отмена
              </Button>
            </div>
          </Card>
        )}

        {/* Upload Section */}
        <Card className="p-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Input
                id="file-input"
                type="file"
                onChange={handleFileSelect}
                accept="image/*,video/*"
                className="flex-1"
              />
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                {uploading ? 'Загрузка...' : 'Загрузить'}
              </Button>
            </div>
            {selectedFile && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{selectedFile.name}</span>
                <span>({formatFileSize(selectedFile.size)})</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedFile(null)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFiles.map((file) => (
            <Card 
              key={file.name} 
              className={`p-4 hover:shadow-lg transition-all ${
                file.isFolder ? 'cursor-pointer' : ''
              }`}
              onClick={() => file.isFolder && openFolder(file.name)}
            >
              {/* Preview */}
              <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                {file.isFolder ? (
                  <Folder className="w-16 h-16 text-muted-foreground" />
                ) : file.type.startsWith('image/') ? (
                  <img 
                    src={file.url} 
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-muted-foreground">
                    {getFileIcon(file.type)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  {getFileIcon(file.isFolder ? 'folder' : file.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {file.name}
                    </p>
                    {!file.isFolder && (
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {!file.isFolder && (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(file.url);
                      }}
                      className="flex-1"
                    >
                      {copiedUrl === file.url ? (
                        <><Check className="h-4 w-4 mr-1" />Скопировано</>
                      ) : (
                        <><Copy className="h-4 w-4 mr-1" />Копировать</>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRenameTarget(file);
                        setNewFileName(file.name.replace(/\.[^/.]+$/, ""));
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMoveTarget(file);
                        loadAvailableFolders();
                      }}
                    >
                      <FolderInput className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTarget(file.name);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {file.isFolder && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget(file.name);
                    }}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Удалить папку
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {searchQuery ? 'Файлы не найдены' : 'Эта папка пуста'}
            </p>
          </div>
        )}
      </div>

      {/* Rename Modal */}
      <Dialog open={!!renameTarget} onOpenChange={() => setRenameTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Переименовать файл</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Новое имя (без расширения)</Label>
              <Input
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="Имя файла"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameTarget(null)}>
              Отмена
            </Button>
            <Button onClick={handleRename}>Переименовать</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Move Modal */}
      <Dialog open={!!moveTarget} onOpenChange={() => setMoveTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Переместить файл</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Выберите папку назначения</Label>
              <Select value={moveDestination} onValueChange={setMoveDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите папку" />
                </SelectTrigger>
                <SelectContent>
                  {availableFolders.map((folder) => (
                    <SelectItem key={folder} value={folder}>
                      {folder}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMoveTarget(null)}>
              Отмена
            </Button>
            <Button onClick={handleMove}>Переместить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setDeleteTarget(null)}>
          <Card className="p-6 max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">
              Удалить {files.find(f => f.name === deleteTarget)?.isFolder ? 'папку' : 'файл'}?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Это действие нельзя отменить. {
                files.find(f => f.name === deleteTarget)?.isFolder ? 'Папка и всё её содержимое будет удалено' : 'Файл будет удален'
              }.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setDeleteTarget(null)} className="flex-1">
                Отмена
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  const file = files.find(f => f.name === deleteTarget);
                  if (file) handleDelete(deleteTarget, file.isFolder || false);
                }} 
                className="flex-1"
              >
                Удалить
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};