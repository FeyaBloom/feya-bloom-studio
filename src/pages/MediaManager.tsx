import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Trash2, Copy, FolderPlus, Folder } from "lucide-react";
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
      setFiles(data || []);
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

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = currentFolder ? `${currentFolder}/${file.name}` : file.name;

      try {
        const { error } = await supabase.storage
          .from("project-images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (error) throw error;
        successCount++;
      } catch (error: any) {
        toast({
          title: "Ошибка загрузки",
          description: `${file.name}: ${error.message}`,
          variant: "destructive",
        });
      }
    }

    if (successCount > 0) {
      toast({
        title: "Успешно",
        description: `Загружено файлов: ${successCount}`,
      });
      loadFiles();
    }
    setUploading(false);
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
        ? `${currentFolder}/${newFolderName}/.keep`
        : `${newFolderName}/.keep`;

      const { error } = await supabase.storage
        .from("project-images")
        .upload(folderPath, new Blob([""], { type: "text/plain" }), {
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
            <div className="flex items-center gap-2">
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
            {files.map((file) => {
              const isDir = isFolder(file);
              const filePath = currentFolder ? `${currentFolder}/${file.name}` : file.name;

              return (
                <div
                  key={file.name}
                  className="border rounded-lg p-4 bg-card hover:shadow-lg transition-shadow"
                >
                  {isDir ? (
                    <div
                      className="cursor-pointer"
                      onClick={() => openFolder(file.name)}
                    >
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-3">
                        <Folder className="h-16 w-16 text-muted-foreground" />
                      </div>
                      <p className="font-medium truncate">{file.name}</p>
                    </div>
                  ) : (
                    <>
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
                      <p className="font-medium truncate mb-2">{file.name}</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyUrl(file.name)}
                          className="flex-1"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setDeleteFile(file.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
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
    </div>
  );
}
