import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Trash2, Copy, FolderPlus, Folder, Edit, FolderInput } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface FileItem {
  name: string;
  id: string;
  created_at: string;
  updated_at: string;
}

export default function MediaManager() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [currentFolder, setCurrentFolder] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [deleteFile, setDeleteFile] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [renamingFile, setRenamingFile] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState("");
  const [moveToFolder, setMoveToFolder] = useState<string | null>(null);
  const [folders, setFolders] = useState<FileItem[]>([]);

  useEffect(() => {
    checkAuth();
    loadFiles();
  }, [currentFolder]);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/login");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      navigate("/");
    }
  };

  const loadFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage
        .from("project-images")
        .list(currentFolder, {
          sortBy: { column: "name", order: "asc" },
        });

      if (error) throw error;
      
      const allFiles = data || [];
      const folderItems = allFiles.filter(item => item.id === null);
      const fileItems = allFiles.filter(item => item.id !== null && item.name !== '.placeholder.png');
      
      setFiles(fileItems);
      setFolders(folderItems);
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name}: не является изображением`);
        errorCount++;
        continue;
      }
      
      // Validate file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        errors.push(`${file.name}: размер превышает 50MB`);
        errorCount++;
        continue;
      }
      
      const filePath = currentFolder ? `${currentFolder}/${file.name}` : file.name;

      try {
        const { error } = await supabase.storage
          .from("project-images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (error) {
          errors.push(`${file.name}: ${error.message}`);
          errorCount++;
        } else {
          successCount++;
        }
      } catch (error: any) {
        errors.push(`${file.name}: ${error.message}`);
        errorCount++;
      }
    }

    if (successCount > 0) {
      toast({
        title: "Успешно",
        description: `Загружено файлов: ${successCount}${errorCount > 0 ? `, ошибок: ${errorCount}` : ''}`,
      });
      loadFiles();
    }
    
    if (errors.length > 0) {
      toast({
        title: "Ошибки загрузки",
        description: errors.join('\n'),
        variant: "destructive",
      });
    }
    
    setUploading(false);
    // Reset input
    e.target.value = '';
  };

  const handleDelete = async () => {
    if (!deleteFile) return;

    try {
      const filePath = currentFolder ? `${currentFolder}/${deleteFile}` : deleteFile;
      const { error } = await supabase.storage
        .from("project-images")
        .remove([filePath]);

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Файл удалён",
      });
      loadFiles();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeleteFile(null);
    }
  };

  const createFolder = async () => {
    if (!newFolderName.trim()) return;

    try {
      const folderPath = currentFolder 
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

  const copyUrl = (fileName: string) => {
    const filePath = currentFolder ? `${currentFolder}/${fileName}` : fileName;
    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);

    navigator.clipboard.writeText(data.publicUrl);
    toast({
      title: "Скопировано",
      description: "URL скопирован в буфер обмена",
    });
  };

  const isFolder = (item: FileItem) => {
    return item.id === null;
  };

  const openFolder = (folderName: string) => {
    setCurrentFolder(currentFolder ? `${currentFolder}/${folderName}` : folderName);
  };

  const goBack = () => {
    const parts = currentFolder.split("/");
    parts.pop();
    setCurrentFolder(parts.join("/"));
  };

  const toggleFileSelection = (fileName: string) => {
    const newSelected = new Set(selectedFiles);
    if (newSelected.has(fileName)) {
      newSelected.delete(fileName);
    } else {
      newSelected.add(fileName);
    }
    setSelectedFiles(newSelected);
  };

  const deleteSelectedFiles = async () => {
    if (selectedFiles.size === 0) return;

    try {
      const filePaths = Array.from(selectedFiles).map(fileName => 
        currentFolder ? `${currentFolder}/${fileName}` : fileName
      );
      
      const { error } = await supabase.storage
        .from("project-images")
        .remove(filePaths);

      if (error) throw error;

      toast({
        title: "Успешно",
        description: `Удалено файлов: ${selectedFiles.size}`,
      });
      setSelectedFiles(new Set());
      loadFiles();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRename = async () => {
    if (!renamingFile || !newFileName.trim()) return;

    try {
      const oldPath = currentFolder ? `${currentFolder}/${renamingFile}` : renamingFile;
      const newPath = currentFolder ? `${currentFolder}/${newFileName}` : newFileName;

      // Download file
      const { data: fileData, error: downloadError } = await supabase.storage
        .from("project-images")
        .download(oldPath);

      if (downloadError) throw downloadError;

      // Upload with new name
      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(newPath, fileData, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Delete old file
      const { error: deleteError } = await supabase.storage
        .from("project-images")
        .remove([oldPath]);

      if (deleteError) throw deleteError;

      toast({
        title: "Успешно",
        description: "Файл переименован",
      });
      setRenamingFile(null);
      setNewFileName("");
      loadFiles();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const moveSelectedFiles = async (targetFolder: string) => {
    if (selectedFiles.size === 0) return;

    try {
      let successCount = 0;
      const errors: string[] = [];

      for (const fileName of Array.from(selectedFiles)) {
        const oldPath = currentFolder ? `${currentFolder}/${fileName}` : fileName;
        const newPath = targetFolder ? `${targetFolder}/${fileName}` : fileName;

        try {
          // Download file
          const { data: fileData, error: downloadError } = await supabase.storage
            .from("project-images")
            .download(oldPath);

          if (downloadError) throw downloadError;

          // Upload to new location
          const { error: uploadError } = await supabase.storage
            .from("project-images")
            .upload(newPath, fileData, {
              cacheControl: "3600",
              upsert: true,
            });

          if (uploadError) throw uploadError;

          // Delete from old location
          const { error: deleteError } = await supabase.storage
            .from("project-images")
            .remove([oldPath]);

          if (deleteError) throw deleteError;

          successCount++;
        } catch (error: any) {
          errors.push(`${fileName}: ${error.message}`);
        }
      }

      if (successCount > 0) {
        toast({
          title: "Успешно",
          description: `Перемещено файлов: ${successCount}`,
        });
        setSelectedFiles(new Set());
        loadFiles();
      }

      if (errors.length > 0) {
        toast({
          title: "Ошибки перемещения",
          description: errors.join('\n'),
          variant: "destructive",
        });
      }

      setMoveToFolder(null);
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">Управление медиа</h1>
          </div>
        </div>

        <div className="mb-6 space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Название новой папки"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="max-w-xs"
            />
            <Button onClick={createFolder} variant="outline">
              <FolderPlus className="h-4 w-4 mr-2" />
              Создать папку
            </Button>
          </div>

          <div className="flex gap-2">
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="max-w-xs"
              id="file-upload"
            />
            <Button
              onClick={() => document.getElementById("file-upload")?.click()}
              disabled={uploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Загрузка..." : "Загрузить файлы"}
            </Button>
          </div>

          {currentFolder && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Button variant="ghost" size="sm" onClick={goBack}>
                ← Назад
              </Button>
              <span>Текущая папка: {currentFolder}</span>
            </div>
          )}

          {selectedFiles.size > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">
                Выбрано: {selectedFiles.size}
              </span>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={deleteSelectedFiles}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Удалить выбранные
              </Button>
              {folders.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMoveToFolder("select")}
                >
                  <FolderInput className="h-4 w-4 mr-2" />
                  Переместить в папку
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedFiles(new Set())}
              >
                Снять выбор
              </Button>
            </div>
          )}
        </div>

        {loading ? (
          <p className="text-muted-foreground">Загрузка...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <div
                key={folder.name}
                className="border rounded-lg p-4 bg-card hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => openFolder(folder.name)}
              >
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-3">
                  <Folder className="h-16 w-16 text-muted-foreground" />
                </div>
                <p className="font-medium truncate">{folder.name}</p>
              </div>
            ))}
            {files.map((file) => {
              const filePath = currentFolder ? `${currentFolder}/${file.name}` : file.name;

              return (
                <div
                  key={file.name}
                  className="border rounded-lg p-4 bg-card hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedFiles.has(file.name)}
                      onChange={() => toggleFileSelection(file.name)}
                      className="absolute top-2 left-2 z-10 w-5 h-5 cursor-pointer"
                    />
                    <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                      <img
                        src={supabase.storage.from("project-images").getPublicUrl(filePath).data.publicUrl}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {renamingFile === file.name ? (
                    <div className="space-y-2 mb-2">
                      <Input
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        placeholder="Новое имя"
                        className="text-sm"
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleRename} className="flex-1">
                          Сохранить
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => {
                            setRenamingFile(null);
                            setNewFileName("");
                          }}
                        >
                          Отмена
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="font-medium truncate mb-2">{file.name}</p>
                  )}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyUrl(file.name)}
                      title="Копировать URL"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setRenamingFile(file.name);
                        setNewFileName(file.name);
                      }}
                      title="Переименовать"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setDeleteFile(file.name)}
                      title="Удалить"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteFile} onOpenChange={() => setDeleteFile(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить файл?</AlertDialogTitle>
            <AlertDialogDescription>
              Это действие нельзя отменить. Файл будет удалён навсегда.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Удалить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={moveToFolder === "select"} onOpenChange={() => setMoveToFolder(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Переместить файлы</AlertDialogTitle>
            <AlertDialogDescription>
              Выберите папку назначения для {selectedFiles.size} файлов
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2 my-4">
            {currentFolder && (
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => moveSelectedFiles("")}
              >
                <Folder className="h-4 w-4 mr-2" />
                Корневая папка
              </Button>
            )}
            {folders.map((folder) => (
              <Button
                key={folder.name}
                variant="outline"
                className="w-full justify-start"
                onClick={() => moveSelectedFiles(currentFolder ? `${currentFolder}/${folder.name}` : folder.name)}
              >
                <Folder className="h-4 w-4 mr-2" />
                {folder.name}
              </Button>
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
