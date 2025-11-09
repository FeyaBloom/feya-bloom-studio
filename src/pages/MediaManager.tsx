import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Upload, 
  Trash2, 
  Copy, 
  Check, 
  Search,
  X,
  Image,
  Video,
  File,
  Folder,
  FolderPlus,
  Home
} from "lucide-react";
import { toast } from "sonner";

interface MediaFile {
  name: string;
  url: string;
  type: string;
  size: number;
  created_at: string;
  isFolder?: boolean;
}

const MediaManager = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentPath, setCurrentPath] = useState<string>('');
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolder, setShowNewFolder] = useState(false);

  useEffect(() => {
    checkAuth();
    loadFiles();
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
      .eq('role', 'admin')
      .maybeSingle();

    if (!roles) {
      toast.error('Access denied. Admin privileges required.');
      navigate('/');
    }
  };

  const loadFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from('media')
        .list(currentPath, {
          limit: 100,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' }
        });

      if (error) throw error;

      const filesWithUrls = await Promise.all(
        (data || []).map(async (file) => {
          // Если это папка (id === null в Supabase Storage)
          if (file.id === null) {
            return {
              name: file.name,
              url: '',
              type: 'folder',
              size: 0,
              created_at: '',
              isFolder: true
            };
          }

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

      setFiles(filesWithUrls);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load files');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast.error('File too large. Maximum size is 50MB.');
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

      toast.success('File uploaded successfully!');
      setSelectedFile(null);
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      loadFiles();
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const createFolder = async () => {
    if (!newFolderName.trim()) {
      toast.error('Please enter a folder name');
      return;
    }

    try {
      // В Supabase Storage папка создается при загрузке файла в нее
      // Создаем пустой placeholder файл .keep
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

      toast.success('Folder created successfully!');
      setNewFolderName('');
      setShowNewFolder(false);
      loadFiles();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create folder');
    }
  };

  const handleDelete = async (fileName: string, isFolder: boolean) => {
    try {
      if (isFolder) {
        // Удаляем все файлы в папке
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

      toast.success(isFolder ? 'Folder deleted successfully' : 'File deleted successfully');
      loadFiles();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete');
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
      toast.success('URL copied to clipboard!');
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      toast.error('Failed to copy URL');
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
        <p className="text-xl text-white">Loading media...</p>
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
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-4xl font-serif text-white">Media Manager</h1>
          </div>
        </div>

        {/* Breadcrumb / Path */}
        <div className="flex items-center gap-2 mb-6 text-white/80 text-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToRoot}
            className="gap-1 text-white/80 hover:text-white"
          >
            <Home className="h-4 w-4" />
            Root
          </Button>
          {currentPath.split('/').filter(Boolean).map((part, index, arr) => (
            <span key={index} className="flex items-center gap-2">
              <span>/</span>
              <span className={index === arr.length - 1 ? 'text-white font-medium' : ''}>
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
            New Folder
          </Button>
          {currentPath && (
            <Button
              onClick={goBack}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          )}
        </div>

        {/* New Folder Input */}
        {showNewFolder && (
          <Card className="p-4 mb-6 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="flex gap-4">
              <Input
                placeholder="Folder name..."
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && createFolder()}
                className="flex-1"
              />
              <Button onClick={createFolder}>Create</Button>
              <Button variant="outline" onClick={() => {
                setShowNewFolder(false);
                setNewFolderName('');
              }}>
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Upload Section */}
        <Card className="p-6 mb-8 bg-white/10 backdrop-blur-sm border-white/20">
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
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
            {selectedFile && (
              <div className="flex items-center gap-2 text-sm text-white/80">
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
              placeholder="Search files..."
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
              className={`p-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all ${
                file.isFolder ? 'cursor-pointer' : ''
              }`}
              onClick={() => file.isFolder && openFolder(file.name)}
            >
              {/* Preview */}
              <div className="aspect-video bg-black/20 rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                {file.isFolder ? (
                  <Folder className="w-16 h-16 text-white/50" />
                ) : file.type.startsWith('image/') ? (
                  <img 
                    src={file.url} 
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-white/50">
                    {getFileIcon(file.type)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  {getFileIcon(file.isFolder ? 'folder' : file.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {file.name}
                    </p>
                    {!file.isFolder && (
                      <p className="text-xs text-white/60">
                        {formatFileSize(file.size)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {!file.isFolder && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(file.url);
                      }}
                      className="flex-1 gap-2"
                    >
                      {copiedUrl === file.url ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy URL
                        </>
                      )}
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
                    Delete Folder
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">
              {searchQuery ? 'No files found' : 'This folder is empty'}
            </p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setDeleteTarget(null)}>
          <Card className="p-6 max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">
              Delete {files.find(f => f.name === deleteTarget)?.isFolder ? 'Folder' : 'File'}?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              This action cannot be undone. This will permanently delete the {
                files.find(f => f.name === deleteTarget)?.isFolder ? 'folder and all its contents' : 'file'
              } from storage.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setDeleteTarget(null)} className="flex-1">
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  const file = files.find(f => f.name === deleteTarget);
                  if (file) handleDelete(deleteTarget, file.isFolder || false);
                }} 
                className="flex-1"
              >
                Delete
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MediaManager;