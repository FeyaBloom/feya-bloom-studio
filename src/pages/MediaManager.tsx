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
  FolderInput,
  Edit,
  Edit2,
  Home
} from "lucide-react";
import { toast } from "sonner";

interface MediaFile {
  name: string;
  url: string;
  type: string;
  size: number;
  created_at: string;
  isFolder: boolean;
  fullPath: string;
}

const MediaManager = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [currentPath, setCurrentPath] = useState('');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [buckets] = useState(['media', 'project-images']);
  const [currentBucket, setCurrentBucket] = useState('media');

  useEffect(() => {
    checkAuth();
    loadFiles();
  }, [currentPath, currentBucket]);

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
        .from(currentBucket)
        .list(currentPath, {
          limit: 1000,
          offset: 0,
          sortBy: { column: 'name', order: 'asc' }
        });

      if (error) throw error;

      const filesWithUrls = await Promise.all(
        (data || []).map(async (item) => {
          const fullPath = currentPath ? `${currentPath}/${item.name}` : item.name;
          const isFolder = item.id === null;

          if (isFolder) {
            return {
              name: item.name,
              fullPath,
              url: '',
              type: 'folder',
              size: 0,
              created_at: '',
              isFolder: true
            };
          }

          const { data: { publicUrl } } = supabase.storage
            .from(currentBucket)
            .getPublicUrl(fullPath);

          return {
            name: item.name,
            fullPath,
            url: publicUrl,
            type: item.metadata?.mimetype || 'unknown',
            size: item.metadata?.size || 0,
            created_at: item.created_at,
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

  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      let totalSize = 0;
      for (let i = 0; i < files.length; i++) {
        totalSize += files[i].size;
      }
      if (totalSize > 200 * 1024 * 1024) {
        toast.error('Total size too large. Maximum is 200MB.');
        return;
      }
      setSelectedFiles(files);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    try {
      setUploading(true);

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileName = file.name;
        const filePath = currentPath ? `${currentPath}/${fileName}` : fileName;

        const { error } = await supabase.storage
          .from(currentBucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
          });

        if (error) throw error;
      }

      toast.success(`${selectedFiles.length} file(s) uploaded successfully!`);
      setSelectedFiles(null);
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      loadFiles();
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload files');
    } finally {
      setUploading(false);
    }
  };

  const createFolder = async () => {
  if (!newFolderName.trim()) {
    toast.error('Please enter folder name');
    return;
  }

  try {
    
        ? `${currentFolder}/${newFolderName}/.placeholder.png`
        : `${newFolderName}/.placeholder.png`;

      // Create a minimal 1x1 transparent PNG
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 1, 1);
      }
      
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png');
      });

const { error } = await supabase.storage
        .from("project-images")
        .upload(folderPath, blob, {
          cacheControl: "3600",
        });

    if (error) throw error;

      toast({
        title: "Успешно",
        description: "Папка создана",
      });
      setNewFolderName("");
      loadFiles();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRename = async (oldPath: string, isFolder: boolean) => {
    if (!newName.trim() || newName === oldPath.split('/').pop()) {
      setEditingItem(null);
      setNewName('');
      return;
    }

    try {
      const pathParts = oldPath.split('/');
      pathParts[pathParts.length - 1] = newName;
      const newPath = pathParts.join('/');

      if (isFolder) {
        const { data: folderContents } = await supabase.storage
          .from(currentBucket)
          .list(oldPath);

        if (folderContents && folderContents.length > 0) {
          for (const item of folderContents) {
            const oldFilePath = `${oldPath}/${item.name}`;
            const newFilePath = `${newPath}/${item.name}`;

            const { data: fileData } = await supabase.storage
              .from(currentBucket)
              .download(oldFilePath);

            if (!fileData) continue;

            await supabase.storage
              .from(currentBucket)
              .upload(newFilePath, fileData, { upsert: true });

            await supabase.storage
              .from(currentBucket)
              .remove([oldFilePath]);
          }
        }
      } else {
        const { data: fileData } = await supabase.storage
          .from(currentBucket)
          .download(oldPath);

        if (!fileData) throw new Error('Failed to download file');

        await supabase.storage
          .from(currentBucket)
          .upload(newPath, fileData, { upsert: true });

        await supabase.storage
          .from(currentBucket)
          .remove([oldPath]);
      }

      toast.success('Renamed successfully!');
      setEditingItem(null);
      setNewName('');
      loadFiles();
    } catch (error: any) {
      toast.error(error.message || 'Failed to rename');
      setEditingItem(null);
      setNewName('');
    }
  };

  const handleDelete = async (fullPath: string, isFolder: boolean) => {
    try {
      if (isFolder) {
        const deleteRecursive = async (path: string) => {
          const { data } = await supabase.storage
            .from(currentBucket)
            .list(path);

          if (data && data.length > 0) {
            for (const item of data) {
              const itemPath = `${path}/${item.name}`;
              if (item.id === null) {
                await deleteRecursive(itemPath);
              } else {
                await supabase.storage.from(currentBucket).remove([itemPath]);
              }
            }
          }
        };

        await deleteRecursive(fullPath);
      } else {
        const { error } = await supabase.storage
          .from(currentBucket)
          .remove([fullPath]);

        if (error) throw error;
      }

      toast.success('Deleted successfully!');
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

  const navigateToPath = (index: number) => {
    const pathParts = currentPath.split('/').filter(Boolean);
    const newPath = pathParts.slice(0, index + 1).join('/');
    setCurrentPath(newPath);
  };

  const goToRoot = () => setCurrentPath('');

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      toast.success('URL copied!');
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
    if (bytes === 0) return '';
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

        {/* Bucket Selector */}
        <div className="mb-6">
          <label className="text-white/80 text-sm mb-2 block">Storage Bucket:</label>
          <select
            value={currentBucket}
            onChange={(e) => {
              setCurrentBucket(e.target.value);
              setCurrentPath('');
            }}
            className="w-64 h-10 rounded-md border border-white/20 bg-white/10 backdrop-blur-sm text-white px-3 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {buckets.map(bucket => (
              <option key={bucket} value={bucket} className="bg-gray-800">
                {bucket}
              </option>
            ))}
          </select>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToRoot}
            className="text-white/80 hover:text-white gap-1"
          >
            <Home className="h-4 w-4" />
            Root
          </Button>
          {currentPath.split('/').filter(Boolean).map((part, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-white/60">/</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateToPath(index)}
                className="text-white/80 hover:text-white"
              >
                {part}
              </Button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setCreatingFolder(!creatingFolder)}
            variant="outline"
            className="gap-2"
          >
            <FolderPlus className="h-4 w-4" />
            New Folder
          </Button>
        </div>

        {/* New Folder Input */}
        {creatingFolder && (
          <Card className="p-4 mb-6 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="flex gap-4">
              <Input
                placeholder="Folder name..."
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && createFolder()}
              />
              <Button onClick={createFolder}>Create</Button>
              <Button variant="outline" onClick={() => {
                setCreatingFolder(false);
                setNewFolderName('');
              }}>Cancel</Button>
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
                onChange={handleFilesSelect}
                accept="image/*,video/*"
                multiple
                className="flex-1"
              />
              <Button
                onClick={handleUpload}
                disabled={!selectedFiles || uploading}
                className="gap-2"
              >
                <Upload className="h-4 w-4" />
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
            {selectedFiles && selectedFiles.length > 0 && (
              <div className="text-sm text-white/80">
                <p>{selectedFiles.length} file(s) selected</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFiles.map((file) => (
            <Card 
              key={file.fullPath} 
              className="p-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all cursor-pointer"
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
                    {editingItem === file.fullPath ? (
                      <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRename(file.fullPath, file.isFolder);
                          if (e.key === 'Escape') {
                            setEditingItem(null);
                            setNewName('');
                          }
                        }}
                        autoFocus
                        className="h-7 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <>
                        <p className="text-sm font-medium text-white truncate">
                          {file.name}
                        </p>
                        {!file.isFolder && (
                          <p className="text-xs text-white/60">
                            {formatFileSize(file.size)}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {!file.isFolder && (
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
                          Copy
                        </>
                      )}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingItem(file.fullPath);
                      setNewName(file.name);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget(file.fullPath);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setDeleteTarget(null)}>
          <Card className="p-6 max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">Delete?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setDeleteTarget(null)} className="flex-1">
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  const file = files.find(f => f.fullPath === deleteTarget);
                  if (file) handleDelete(deleteTarget, file.isFolder);
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